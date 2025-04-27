
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { useAccounts } from "@/hooks/useAccounts";
import { Account } from "@/types/accounts";
import { AccountTree } from "@/components/accounting/AccountTree";
import { AccountForm } from "@/components/accounting/AccountForm";
import { SearchBar } from "@/components/SearchBar";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="دليل الحسابات" showBack={true} />

      <div className="flex items-center justify-between mb-6">
        <div className="w-1/2">
          <SearchBar placeholder="البحث في الحسابات..." onChange={handleSearch} />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة حساب
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow p-4">
        {accountTree.length > 0 ? (
          <AccountTree
            accounts={accountTree}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShare={handleShare}
          />
        ) : (
          <div className="text-center py-8 text-gray-500">
            لم يتم العثور على حسابات. أضف حسابًا جديدًا للبدء.
          </div>
        )}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>إضافة حساب جديد</DialogTitle>
          </DialogHeader>
          <AccountForm
            parentOptions={getParentAccountOptions()}
            onSubmit={handleAddSubmit}
            onSuggestNumber={suggestAccountNumber}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>تعديل حساب</DialogTitle>
          </DialogHeader>
          {selectedAccount && (
            <AccountForm
              account={selectedAccount}
              parentOptions={getParentAccountOptions()}
              onSubmit={handleEditSubmit}
              onSuggestNumber={suggestAccountNumber}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountChartPage;
