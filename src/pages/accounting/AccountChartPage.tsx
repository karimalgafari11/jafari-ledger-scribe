import React, { useState } from "react";
import { Header } from "@/components/Header";
import { useAccounts } from "@/hooks/useAccounts";
import { toast } from "sonner";
import { AccountPageHeader } from "@/components/accounting/AccountPageHeader";
import { AccountsContent } from "@/components/accounting/AccountsContent";
import { AccountDialogs } from "@/components/accounting/AccountDialogs";

const AccountChartPage: React.FC = () => {
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

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("");
  const [minBalance, setMinBalance] = useState<string>("");
  const [maxBalance, setMaxBalance] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const filteredAccounts = React.useMemo(() => {
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
  }, [accountTree, filterType, minBalance, maxBalance]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchAccounts(e.target.value);
  };

  const handleEdit = (id: string) => {
    const account = findAccount(id);
    if (account) {
      setSelectedAccount(account);
      setIsEditDialogOpen(true);
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
    
    setIsAddDialogOpen(false);
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
    
    setIsEditDialogOpen(false);
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

  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="دليل الحسابات" showBack={true} />

      <AccountPageHeader
        onSearch={handleSearch}
        onAddAccount={() => setIsAddDialogOpen(true)}
        filterType={filterType}
        minBalance={minBalance}
        maxBalance={maxBalance}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        accounts={filteredAccounts}
        onGenerateReport={handleGenerateReport}
      />

      <AccountsContent
        isLoading={isLoading}
        filteredAccounts={filteredAccounts}
        filterType={filterType}
        minBalance={minBalance}
        maxBalance={maxBalance}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onShare={handleShare}
      />

      <AccountDialogs
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        selectedAccount={selectedAccount}
        parentOptions={getParentAccountOptions()}
        onAddSubmit={handleAddSubmit}
        onEditSubmit={handleEditSubmit}
        onSuggestNumber={suggestAccountNumber}
      />
    </div>
  );
};

export default AccountChartPage;
