import React, { useState } from "react";
import { Header } from "@/components/Header";
import { useAccounts } from "@/hooks/useAccounts";
import { Account } from "@/types/accounts";
import { AccountTree } from "@/components/accounting/AccountTree";
import { AccountForm } from "@/components/accounting/AccountForm";
import { SearchBar } from "@/components/SearchBar";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, Filter, FileBarChart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AccountAnalysisCharts } from "@/components/accounting/AccountAnalysisCharts";
import { cn } from "@/lib/utils";

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

  const handleGenerateReport = () => {
    toast.success("جاري تحضير التقرير...");
    // Future enhancement: Generate and download PDF report
  };

  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="دليل الحسابات" showBack={true} />

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4 w-1/2">
          <SearchBar placeholder="البحث في الحسابات..." onChange={handleSearch} />
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
                <span className="sr-only">تصفية</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 rtl">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">نوع الحساب</label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="">الكل</option>
                    <option value="asset">أصول</option>
                    <option value="liability">التزامات</option>
                    <option value="equity">حقوق ملكية</option>
                    <option value="revenue">إيرادات</option>
                    <option value="expense">مصروفات</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">الرصيد</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      placeholder="الحد الأدنى"
                      className="p-2 border rounded-md"
                      value={minBalance}
                      onChange={(e) => setMinBalance(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="الحد الأقصى"
                      className="p-2 border rounded-md"
                      value={maxBalance}
                      onChange={(e) => setMaxBalance(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            variant="outline"
            size="icon"
            onClick={handleGenerateReport}
          >
            <FileBarChart className="h-4 w-4" />
            <span className="sr-only">تقرير</span>
          </Button>
        </div>

        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة حساب
        </Button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-4">
          {filteredAccounts.length > 0 ? (
            <AccountTree
              accounts={filteredAccounts}
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

        <AccountAnalysisCharts accounts={accountTree} />
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
