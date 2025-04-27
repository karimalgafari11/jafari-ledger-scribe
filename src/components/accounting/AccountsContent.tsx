
import React from "react";
import { AccountTree } from "./AccountTree";
import { AccountAnalysisCharts } from "./AccountAnalysisCharts";
import { Loader } from "lucide-react";
import { Account, AccountNode } from "@/types/accounts";

interface AccountsContentProps {
  isLoading: boolean;
  filteredAccounts: AccountNode[];
  filterType: string;
  minBalance: string;
  maxBalance: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string, method: 'link' | 'email' | 'whatsapp') => void;
}

export const AccountsContent: React.FC<AccountsContentProps> = ({
  isLoading,
  filteredAccounts,
  filterType,
  minBalance,
  maxBalance,
  onEdit,
  onDelete,
  onShare,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredAccounts.length > 0 ? (
          <>
            {(filterType || minBalance || maxBalance) && (
              <div className="mb-4 text-sm text-gray-500">
                تم العثور على {filteredAccounts.length} حساب
              </div>
            )}
            <AccountTree
              accounts={filteredAccounts}
              onEdit={onEdit}
              onDelete={onDelete}
              onShare={onShare}
            />
          </>
        ) : (
          <div className="text-center py-8 text-gray-500">
            لم يتم العثور على حسابات. أضف حسابًا جديدًا للبدء.
          </div>
        )}
      </div>

      <AccountAnalysisCharts accounts={filteredAccounts} />
    </div>
  );
};
