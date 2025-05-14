
import React, { useState } from "react";
import { Account, AccountNode } from "@/types/accounts";
import { AccountTree } from "./AccountTree";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountAnalysisCharts } from "./AccountAnalysisCharts";
import { useAccountDialogs } from "./AccountDialogsContext";

interface AccountsContentProps {
  filteredAccounts: Account[] | AccountNode[];
  filterType: string;
  minBalance: string;
  maxBalance: string;
  isLoading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string, method: 'link' | 'email' | 'whatsapp') => void;
}

export const AccountsContent: React.FC<AccountsContentProps> = ({
  filteredAccounts,
  filterType,
  minBalance,
  maxBalance,
  isLoading,
  onEdit,
  onDelete,
  onShare
}) => {
  const { setIsEditDialogOpen } = useAccountDialogs();
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<{ id: string; name: string } | null>(null);

  const handleEditClick = (id: string) => {
    onEdit(id);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (id: string, name: string) => {
    setAccountToDelete({ id, name });
    setIsDeleteConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (accountToDelete) {
      onDelete(accountToDelete.id);
    }
    setIsDeleteConfirmOpen(false);
  };

  // Convert Account[] to AccountNode[] if needed
  const accountNodes = filteredAccounts.map((acc: any) => {
    if (!acc.children) {
      return { ...acc, children: [] };
    }
    return acc;
  }) as AccountNode[];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <Tabs defaultValue="tree" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="tree">شجرة الحسابات</TabsTrigger>
          <TabsTrigger value="analysis">تحليل الحسابات</TabsTrigger>
        </TabsList>

        <TabsContent value="tree" className="p-2">
          <AccountTree
            accounts={accountNodes}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onShare={onShare}
            loading={isLoading}
          />
        </TabsContent>

        <TabsContent value="analysis" className="p-2">
          <AccountAnalysisCharts
            accounts={filteredAccounts as Account[]}
          />
        </TabsContent>
      </Tabs>

      {accountToDelete && (
        <DeleteConfirmDialog
          open={isDeleteConfirmOpen}
          onOpenChange={setIsDeleteConfirmOpen}
          onConfirm={handleDeleteConfirm}
          accountName={accountToDelete.name}
        />
      )}
    </div>
  );
};
