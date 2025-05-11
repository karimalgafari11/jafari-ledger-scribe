
import { useState, useEffect, useCallback } from 'react';
import { Transaction } from '@/types/transactions';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AccountSummary {
  balance: number;
  totalDebit: number;
  totalCredit: number;
  entriesCount: number;
  lastTransaction?: Date;
}

export interface LedgerAccount {
  id: string;
  number: string;
  name: string;
  type: string;
  balance: number;
  lastActivity?: Date;
  status: 'active' | 'inactive';
}

export const useLedgerEntries = () => {
  const [entries, setEntries] = useState<Transaction[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<Transaction[]>([]);
  const [accounts, setAccounts] = useState<LedgerAccount[]>([]);
  const [currentAccount, setCurrentAccount] = useState<LedgerAccount | null>(null);
  const [accountSummary, setAccountSummary] = useState<AccountSummary>({
    balance: 0,
    totalDebit: 0,
    totalCredit: 0,
    entriesCount: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initially load mock data (will be replaced with real data from Supabase)
  useEffect(() => {
    setIsLoading(true);
    try {
      const mockTransactions = generateMockTransactions();
      setEntries(mockTransactions);
      setFilteredEntries(mockTransactions);
      updateAccountSummary(mockTransactions);

      // Generate mock accounts
      const mockAccounts = generateMockAccounts();
      setAccounts(mockAccounts);
      
      // Set the first account as current by default
      if (mockAccounts.length > 0) {
        setCurrentAccount(mockAccounts[0]);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error("حدث خطأ أثناء تحميل البيانات");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateAccountSummary = useCallback((transactions: Transaction[]) => {
    const summary = {
      balance: transactions.length > 0 ? transactions[transactions.length - 1].balance : 0,
      totalDebit: transactions.reduce((sum, t) => sum + t.debit, 0),
      totalCredit: transactions.reduce((sum, t) => sum + t.credit, 0),
      entriesCount: transactions.length,
      lastTransaction: transactions.length > 0 ? transactions[transactions.length - 1].date : undefined
    };
    setAccountSummary(summary);
  }, []);

  const searchEntries = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredEntries(entries);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = entries.filter(entry => 
      entry.description.toLowerCase().includes(term) || 
      entry.reference.toLowerCase().includes(term) ||
      entry.type.toLowerCase().includes(term)
    );

    setFilteredEntries(filtered);
    updateAccountSummary(filtered);
  }, [entries, updateAccountSummary]);

  const filterEntriesByAccountId = useCallback((accountId: string) => {
    // In a real application, this would fetch entries for the specified account
    // For now, we'll filter the mock data differently for each account
    setIsLoading(true);
    try {
      // Find the account
      const account = accounts.find(acc => acc.id === accountId);
      if (account) {
        setCurrentAccount(account);
        
        // Simulate different data for different accounts
        const seed = accountId.charCodeAt(0) % 10; // Use the first character of ID as a seed
        const filtered = generateMockTransactions(20 + seed, seed * 1000);
        
        setFilteredEntries(filtered);
        updateAccountSummary(filtered);
      }
    } catch (err: any) {
      setError(err.message);
      toast.error("حدث خطأ أثناء تصفية البيانات");
    } finally {
      setIsLoading(false);
    }
  }, [accounts, updateAccountSummary]);

  const filterEntriesByPeriod = useCallback((period: string) => {
    setIsLoading(true);
    try {
      const today = new Date();
      let filtered: Transaction[] = [];

      switch (period) {
        case 'today':
          filtered = entries.filter(entry => 
            new Date(entry.date).toDateString() === today.toDateString()
          );
          break;
        case 'this-week': {
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          filtered = entries.filter(entry => 
            new Date(entry.date) >= startOfWeek
          );
          break;
        }
        case 'this-month': {
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          filtered = entries.filter(entry => 
            new Date(entry.date) >= startOfMonth
          );
          break;
        }
        case 'this-quarter': {
          const quarter = Math.floor(today.getMonth() / 3);
          const startOfQuarter = new Date(today.getFullYear(), quarter * 3, 1);
          filtered = entries.filter(entry => 
            new Date(entry.date) >= startOfQuarter
          );
          break;
        }
        case 'this-year': {
          const startOfYear = new Date(today.getFullYear(), 0, 1);
          filtered = entries.filter(entry => 
            new Date(entry.date) >= startOfYear
          );
          break;
        }
        case 'all':
        default:
          filtered = entries;
      }

      setFilteredEntries(filtered);
      updateAccountSummary(filtered);
    } catch (err: any) {
      setError(err.message);
      toast.error("حدث خطأ أثناء تصفية البيانات حسب الفترة");
    } finally {
      setIsLoading(false);
    }
  }, [entries, updateAccountSummary]);

  const filterByDateRange = useCallback((startDate: Date, endDate: Date) => {
    setIsLoading(true);
    try {
      const filtered = entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate >= startDate && entryDate <= endDate;
      });
      
      setFilteredEntries(filtered);
      updateAccountSummary(filtered);
    } catch (err: any) {
      setError(err.message);
      toast.error("حدث خطأ أثناء تصفية البيانات حسب التاريخ");
    } finally {
      setIsLoading(false);
    }
  }, [entries, updateAccountSummary]);

  const addTransaction = useCallback(async (transaction: Partial<Transaction>) => {
    try {
      // In a real app, this would save to the database
      const newTransaction: Transaction = {
        id: uuidv4(),
        date: transaction.date || new Date(),
        type: transaction.type || 'payment',
        reference: transaction.reference || `REF-${Date.now()}`,
        description: transaction.description || '',
        debit: transaction.debit || 0,
        credit: transaction.credit || 0,
        balance: 0, // Will be calculated
      };
      
      // Calculate the new balance
      const lastBalance = entries.length > 0 ? entries[entries.length - 1].balance : 0;
      newTransaction.balance = lastBalance + (newTransaction.debit - newTransaction.credit);
      
      setEntries(prev => [...prev, newTransaction]);
      setFilteredEntries(prev => [...prev, newTransaction]);
      
      toast.success("تم إضافة الحركة المالية بنجاح");
      return true;
    } catch (err: any) {
      setError(err.message);
      toast.error("حدث خطأ أثناء إضافة الحركة المالية");
      return false;
    }
  }, [entries]);

  const updateTransaction = useCallback(async (id: string, transaction: Partial<Transaction>) => {
    try {
      // In a real app, this would update the database
      setEntries(prev => {
        const index = prev.findIndex(t => t.id === id);
        if (index === -1) return prev;
        
        const updatedEntries = [...prev];
        updatedEntries[index] = {...prev[index], ...transaction};
        
        // Recalculate balances for all subsequent entries
        for (let i = index; i < updatedEntries.length; i++) {
          const prevBalance = i > 0 ? updatedEntries[i-1].balance : 0;
          updatedEntries[i].balance = prevBalance + 
            (updatedEntries[i].debit - updatedEntries[i].credit);
        }
        
        return updatedEntries;
      });
      
      // Update filtered entries as well
      setFilteredEntries(prev => {
        const index = prev.findIndex(t => t.id === id);
        if (index === -1) return prev;
        
        const updatedEntries = [...prev];
        updatedEntries[index] = {...prev[index], ...transaction};
        
        // Recalculate balances for all subsequent entries
        for (let i = index; i < updatedEntries.length; i++) {
          const prevBalance = i > 0 ? updatedEntries[i-1].balance : 0;
          updatedEntries[i].balance = prevBalance + 
            (updatedEntries[i].debit - updatedEntries[i].credit);
        }
        
        return updatedEntries;
      });
      
      toast.success("تم تحديث الحركة المالية بنجاح");
      return true;
    } catch (err: any) {
      setError(err.message);
      toast.error("حدث خطأ أثناء تحديث الحركة المالية");
      return false;
    }
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    try {
      // In a real app, this would delete from the database
      setEntries(prev => {
        const index = prev.findIndex(t => t.id === id);
        if (index === -1) return prev;
        
        const updatedEntries = prev.filter(t => t.id !== id);
        
        // Recalculate balances for all entries after the deleted one
        for (let i = index; i < updatedEntries.length; i++) {
          const prevBalance = i > 0 ? updatedEntries[i-1].balance : 0;
          updatedEntries[i].balance = prevBalance + 
            (updatedEntries[i].debit - updatedEntries[i].credit);
        }
        
        return updatedEntries;
      });
      
      setFilteredEntries(prev => {
        const filtered = prev.filter(t => t.id !== id);
        updateAccountSummary(filtered);
        return filtered;
      });
      
      toast.success("تم حذف الحركة المالية بنجاح");
      return true;
    } catch (err: any) {
      setError(err.message);
      toast.error("حدث خطأ أثناء حذف الحركة المالية");
      return false;
    }
  }, [updateAccountSummary]);

  const exportToExcel = useCallback((data: Transaction[]) => {
    // In a real app, this would actually export to Excel
    // For now, we'll just show a toast
    toast.success("تم تصدير البيانات إلى ملف إكسل");
  }, []);

  const shareViaWhatsApp = useCallback((data: Transaction[], accountName: string) => {
    // In a real app, this would actually share via WhatsApp
    // For now, we'll just show a toast
    toast.success(`تم مشاركة بيانات حساب ${accountName} عبر واتساب`);
  }, []);

  const getAllAccounts = useCallback(() => {
    return accounts;
  }, [accounts]);

  return {
    entries,
    filteredEntries,
    accountSummary,
    isLoading,
    error,
    currentAccount,
    searchEntries,
    filterEntriesByAccountId,
    filterEntriesByPeriod,
    filterByDateRange,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    exportToExcel,
    shareViaWhatsApp,
    getAllAccounts
  };
};

// Mock data generators
function generateMockAccounts(): LedgerAccount[] {
  const accountTypes = [
    { type: 'asset', prefix: '1' },
    { type: 'liability', prefix: '2' },
    { type: 'equity', prefix: '3' },
    { type: 'revenue', prefix: '4' },
    { type: 'expense', prefix: '5' }
  ];
  
  const accounts: LedgerAccount[] = [];
  
  // Create multiple accounts for each type
  accountTypes.forEach(({ type, prefix }) => {
    const count = type === 'asset' || type === 'expense' ? 5 : 3; // more assets and expenses
    
    for (let i = 1; i <= count; i++) {
      const accountNumber = `${prefix}${i.toString().padStart(3, '0')}`;
      let accountName = '';
      
      switch(type) {
        case 'asset':
          accountName = ['الصندوق', 'البنك', 'المخزون', 'الأثاث والمعدات', 'الذمم المدينة'][i-1] || `حساب أصول ${i}`;
          break;
        case 'liability':
          accountName = ['الذمم الدائنة', 'القروض', 'مصاريف مستحقة'][i-1] || `حساب التزامات ${i}`;
          break;
        case 'equity':
          accountName = ['رأس المال', 'الأرباح المحتجزة', 'المسحوبات الشخصية'][i-1] || `حساب حقوق ملكية ${i}`;
          break;
        case 'revenue':
          accountName = ['إيرادات المبيعات', 'إيرادات الخدمات', 'إيرادات متنوعة'][i-1] || `حساب إيرادات ${i}`;
          break;
        case 'expense':
          accountName = ['الرواتب', 'الإيجار', 'المرافق', 'المشتريات', 'مصاريف متنوعة'][i-1] || `حساب مصروفات ${i}`;
          break;
      }
      
      accounts.push({
        id: uuidv4(),
        number: accountNumber,
        name: accountName,
        type,
        balance: Math.floor(Math.random() * 10000) * (type === 'liability' ? -1 : 1),
        lastActivity: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        status: Math.random() > 0.1 ? 'active' : 'inactive'
      });
    }
  });
  
  return accounts;
}

function generateMockTransactions(count = 50, startBalance = 5000): Transaction[] {
  const startDate = new Date(2023, 0, 1);
  const transactions: Transaction[] = [];
  let balance = startBalance;
  
  for (let i = 0; i < count; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const isDebit = Math.random() > 0.5;
    const amount = Math.floor(Math.random() * 5000) + 100;
    const types = ['invoice', 'payment', 'return'];
    const type = types[Math.floor(Math.random() * types.length)] as 'invoice' | 'payment' | 'return';
    
    if (isDebit) {
      balance += amount;
      transactions.push({
        id: uuidv4(),
        date,
        type,
        reference: `REF-${1000 + i}`,
        description: `معاملة ${i + 1} - ${isDebit ? 'مدين' : 'دائن'}`,
        debit: amount,
        credit: 0,
        balance
      });
    } else {
      balance -= amount;
      transactions.push({
        id: uuidv4(),
        date,
        type,
        reference: `REF-${1000 + i}`,
        description: `معاملة ${i + 1} - ${isDebit ? 'مدين' : 'دائن'}`,
        debit: 0,
        credit: amount,
        balance
      });
    }
  }
  
  return transactions.sort((a, b) => a.date.getTime() - b.date.getTime());
}
