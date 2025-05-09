
import { useState } from "react";
import { toast } from "sonner";
import { useAccounts } from "./useAccounts";
import { Account } from "@/types/accounts";

export const useAccountChartPage = () => {
  const {
    accountTree,
    selectedAccount,
    setSelectedAccount,
    addAccount,
    updateAccount,
    deleteAccount,
    searchAccounts,
    getParentAccountOptions,
    suggestAccountNumber,
  } = useAccounts();

  const [filterType, setFilterType] = useState<string>("");
  const [minBalance, setMinBalance] = useState<string>("");
  const [maxBalance, setMaxBalance] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredAccounts = useState(() => {
    let filtered = [...accountTree];

    if (filterType) {
      filtered = filtered.filter(account => account.type === filterType);
    }

    if (minBalance) {
      filtered = filtered.filter(account => account.balance >= Number(minBalance));
    }

    if (maxBalance) {
      filtered = filtered.filter(account => account.balance <= Number(maxBalance));
    }

    return filtered;
  })[0];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchAccounts(e.target.value);
  };

  const handleEdit = (id: string) => {
    const account = findAccount(id);
    if (account) {
      setSelectedAccount(account);
    }
  };

  const handleDelete = (id: string) => {
    deleteAccount(id);
  };

  const handleShare = (id: string, method: 'link' | 'email' | 'whatsapp') => {
    const account = findAccount(id);
    if (!account) return;

    const accountInfo = `${account.number} - ${account.name}`;

    switch (method) {
      case 'link':
        navigator.clipboard.writeText(`${window.location.origin}/accounting/chart?account=${id}`);
        toast.success("تم نسخ الرابط");
        break;
      case 'email':
        window.location.href = `mailto:?subject=مشاركة معلومات حساب&body=معلومات الحساب: ${accountInfo}`;
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=معلومات الحساب: ${accountInfo}`, "_blank");
        break;
    }
  };

  const findAccount = (id: string): Account | null => {
    const findRecursive = (id: string, accounts: any[]): Account | null => {
      for (const account of accounts) {
        if (account.id === id) return account;
        if (account.children) {
          const found = findRecursive(id, account.children);
          if (found) return found;
        }
      }
      return null;
    };
    
    return findRecursive(id, accountTree);
  };

  const handleAddSubmit = (data: any) => {
    const parentAccount = data.parentId && data.parentId !== "null" ? findAccount(data.parentId) : null;
    const level = parentAccount ? parentAccount.level + 1 : 1;
    
    addAccount({
      ...data,
      parentId: data.parentId === "null" ? null : data.parentId,
      balance: 0,
      level,
      isActive: true,
    });
  };

  const handleEditSubmit = (data: any) => {
    if (!selectedAccount) return;
    
    const parentAccount = data.parentId && data.parentId !== "null" ? findAccount(data.parentId) : null;
    const level = parentAccount ? parentAccount.level + 1 : 1;
    
    updateAccount({
      ...selectedAccount,
      ...data,
      parentId: data.parentId === "null" ? null : data.parentId,
      level,
    });
  };

  const handleFilterChange = (type: string, min: string, max: string) => {
    setIsLoading(true);
    setFilterType(type);
    setMinBalance(min);
    setMaxBalance(max);
    setTimeout(() => setIsLoading(false), 500);
    toast.success("تم تطبيق التصفية");
  };

  const handleResetFilters = () => {
    setFilterType("");
    setMinBalance("");
    setMaxBalance("");
    toast.success("تم إعادة تعيين التصفية");
  };

  const handleGenerateReport = async (type: string) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success(`تم إنشاء التقرير بنجاح (${type})`);
    } catch (error) {
      toast.error("حدث خطأ أثناء إنشاء التقرير");
      throw error;
    }
  };

  return {
    accountTree,
    filteredAccounts,
    selectedAccount,
    filterType,
    minBalance,
    maxBalance,
    isLoading,
    handleSearch,
    handleEdit,
    handleDelete,
    handleShare,
    handleAddSubmit,
    handleEditSubmit,
    handleFilterChange,
    handleResetFilters,
    handleGenerateReport,
    getParentAccountOptions,
    suggestAccountNumber
  };
};
