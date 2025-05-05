
import { useState, useEffect } from 'react';
import { Transaction } from '@/types/transactions';
import { v4 as uuidv4 } from 'uuid';

interface AccountSummary {
  balance: number;
  totalDebit: number;
  totalCredit: number;
  entriesCount: number;
}

export const useLedgerEntries = () => {
  const [entries, setEntries] = useState<Transaction[]>(generateMockTransactions());
  const [filteredEntries, setFilteredEntries] = useState<Transaction[]>([]);
  const [accountSummary, setAccountSummary] = useState<AccountSummary>({
    balance: 0,
    totalDebit: 0,
    totalCredit: 0,
    entriesCount: 0
  });

  useEffect(() => {
    setFilteredEntries(entries);
    updateAccountSummary(entries);
  }, [entries]);

  const updateAccountSummary = (transactions: Transaction[]) => {
    const summary = {
      balance: transactions.length > 0 ? transactions[transactions.length - 1].balance : 0,
      totalDebit: transactions.reduce((sum, t) => sum + t.debit, 0),
      totalCredit: transactions.reduce((sum, t) => sum + t.credit, 0),
      entriesCount: transactions.length
    };
    setAccountSummary(summary);
  };

  const searchEntries = (searchTerm: string) => {
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
  };

  const filterEntriesByAccountId = (accountId: string) => {
    // في تطبيق حقيقي، سنقوم بتصفية الإدخالات بناءً على معرّف الحساب
    // هنا نقوم بمحاكاة هذه العملية بتحديد بعض المعاملات فقط
    const filtered = entries.slice(0, 15); // فقط للتوضيح
    setFilteredEntries(filtered);
    updateAccountSummary(filtered);
  };

  const filterEntriesByPeriod = (period: string) => {
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
      default:
        filtered = entries;
    }

    setFilteredEntries(filtered);
    updateAccountSummary(filtered);
  };

  return {
    entries,
    filteredEntries,
    accountSummary,
    searchEntries,
    filterEntriesByAccountId,
    filterEntriesByPeriod
  };
};

// إنشاء بيانات وهمية لغرض العرض
function generateMockTransactions(): Transaction[] {
  const startDate = new Date(2023, 0, 1);
  const transactions: Transaction[] = [];
  let balance = 5000;
  
  for (let i = 0; i < 50; i++) {
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
