
import { useState, useCallback, useMemo } from "react";
import { Account, AccountNode } from "@/types/accounts";
import { mockAccounts } from "@/data/mockAccounts";
import { toast } from "sonner";

// تحويل القائمة المسطحة إلى شجرة
const buildAccountTree = (accounts: Account[]): AccountNode[] => {
  const accountMap = new Map<string, AccountNode>();

  // تحويل جميع الحسابات إلى نقاط في الشجرة
  accounts.forEach(account => {
    accountMap.set(account.id, { ...account, children: [] });
  });

  const tree: AccountNode[] = [];

  // بناء العلاقات بين الحسابات
  accounts.forEach(account => {
    const node = accountMap.get(account.id)!;
    
    if (account.parentId === null) {
      // حساب رئيسي (جذر الشجرة)
      tree.push(node);
    } else {
      // حساب فرعي
      const parentNode = accountMap.get(account.parentId);
      if (parentNode) {
        parentNode.children.push(node);
      }
    }
  });

  return tree;
};

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [filteredAccounts, setFilteredAccounts] = useState<Account[]>(mockAccounts);
  
  // بناء شجرة الحسابات
  const accountTree = buildAccountTree(filteredAccounts);

  // إضافة حساب جديد
  const addAccount = useCallback((account: Omit<Account, "id" | "createdAt" | "updatedAt">) => {
    const newAccount: Account = {
      ...account,
      id: `acc-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setAccounts(prev => [newAccount, ...prev]);
    setFilteredAccounts(prev => [newAccount, ...prev]);
    toast.success("تم إضافة الحساب بنجاح");
    return newAccount;
  }, []);

  // تعديل حساب
  const updateAccount = useCallback((updatedAccount: Account) => {
    setAccounts(prev => prev.map(account => 
      account.id === updatedAccount.id ? { ...updatedAccount, updatedAt: new Date() } : account
    ));
    setFilteredAccounts(prev => prev.map(account => 
      account.id === updatedAccount.id ? { ...updatedAccount, updatedAt: new Date() } : account
    ));
    setSelectedAccount(null);
    toast.success("تم تعديل الحساب بنجاح");
  }, []);

  // حذف حساب
  const deleteAccount = useCallback((id: string) => {
    // التحقق من عدم وجود حسابات فرعية
    const hasChildren = accounts.some(account => account.parentId === id);
    
    if (hasChildren) {
      toast.error("لا يمكن حذف الحساب لأنه يحتوي على حسابات فرعية");
      return false;
    }
    
    setAccounts(prev => prev.filter(account => account.id !== id));
    setFilteredAccounts(prev => prev.filter(account => account.id !== id));
    toast.success("تم حذف الحساب بنجاح");
    return true;
  }, [accounts]);

  // البحث في الحسابات
  const searchAccounts = useCallback((searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredAccounts(accounts);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = accounts.filter(account => 
      account.name.toLowerCase().includes(term) || 
      account.number.includes(term)
    );
    
    setFilteredAccounts(filtered);
  }, [accounts]);

  // مصفوفة الخيارات المستخدمة في قائمة الحساب الأب - مع منع القيم الفارغة
  const getParentAccountOptions = useCallback(() => {
    console.log("useAccounts - Generating parent options from accounts:", accounts);
    
    // تطبيق تصفية صارمة للتأكد من عدم وجود قيم فارغة
    const validAccounts = accounts.filter(account => 
      account.level < 3 && 
      account.id && 
      typeof account.id === 'string' && 
      account.id.trim() !== ''
    );
    
    const options = validAccounts.map(account => ({
      label: `${account.number} - ${account.name}`,
      value: account.id
    }));
    
    // تصفية نهائية للتأكد من عدم وجود قيم فارغة
    const filteredOptions = options.filter(option => 
      option.value && 
      typeof option.value === 'string' && 
      option.value.trim() !== ''
    );
    
    console.log("useAccounts - Final parent options:", filteredOptions);
    
    return filteredOptions;
  }, [accounts]);

  // اقتراح الحسابات بناءً على النوع
  const suggestAccountNumber = useCallback((type: Account['type'], parentId: string | null) => {
    let baseNumber = "";
    let prefix = "";
    
    switch(type) {
      case "asset": prefix = "1"; break;
      case "liability": prefix = "2"; break;
      case "equity": prefix = "3"; break;
      case "revenue": prefix = "4"; break;
      case "expense": prefix = "5"; break;
    }
    
    if (parentId) {
      const parent = accounts.find(acc => acc.id === parentId);
      if (parent) {
        baseNumber = parent.number;
        
        // البحث عن آخر حساب فرعي لهذا الحساب
        const siblingAccounts = accounts.filter(acc => acc.parentId === parentId);
        if (siblingAccounts.length > 0) {
          const maxNumber = Math.max(...siblingAccounts.map(acc => parseInt(acc.number.slice(-2))));
          return `${baseNumber}${(maxNumber + 1).toString().padStart(2, '0')}`;
        } else {
          return `${baseNumber}01`;
        }
      }
    }
    
    // للحسابات الرئيسية
    const rootAccounts = accounts.filter(acc => 
      acc.parentId === null && acc.type === type
    );
    
    if (rootAccounts.length === 0) {
      return `${prefix}000`;
    }
    
    const maxNumber = Math.max(...rootAccounts.map(acc => parseInt(acc.number)));
    return (maxNumber + 100).toString();
  }, [accounts]);
  
  // Memoize parent options to avoid calculations on every render
  const parentOptions = useMemo(() => getParentAccountOptions(), [getParentAccountOptions]);

  return {
    accounts,
    filteredAccounts,
    accountTree,
    selectedAccount,
    setSelectedAccount,
    addAccount,
    updateAccount,
    deleteAccount,
    searchAccounts,
    getParentAccountOptions,
    parentOptions,
    suggestAccountNumber
  };
};
