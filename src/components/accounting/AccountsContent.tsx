
import React, { useState } from "react";
import { Account, AccountNode } from "@/types/accounts";
import { AccountTree } from "./AccountTree";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountAnalysisCharts } from "./AccountAnalysisCharts";
import { useAccountDialogs } from "./AccountDialogsContext";
import { Card } from "@/components/ui/card";

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
    <Card className="bg-white rounded-lg shadow-md overflow-hidden border-none">
      <Tabs defaultValue="tree" className="w-full">
        <div className="bg-muted/20 p-2 border-b">
          <TabsList className="bg-background/80 backdrop-blur-sm">
            <TabsTrigger value="tree" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              شجرة الحسابات
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-primary data-[state=active]:text-white">
              تحليل الحسابات
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tree" className="p-4">
          <AccountTree
            accounts={accountNodes}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            onShare={onShare}
            loading={isLoading}
          />
        </TabsContent>

        <TabsContent value="analysis" className="p-4">
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
    </Card>
  );
};
