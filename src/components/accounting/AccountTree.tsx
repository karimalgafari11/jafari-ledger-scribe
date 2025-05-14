
import React from "react";
import { AccountNode } from "@/types/accounts";
import { AccountTreeNode } from "./AccountTreeNode";

interface AccountTreeProps {
  accounts: AccountNode[];
  onEdit: (id: string) => void;
  onDelete: (id: string, name?: string) => void; // Updated to accept optional name parameter
  onShare: (id: string, method: 'link' | 'email' | 'whatsapp') => void;
  loading?: boolean;
}

export const AccountTree: React.FC<AccountTreeProps> = ({
  accounts,
  onEdit,
  onDelete,
  onShare,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="flex flex-col space-y-2 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-14 bg-gray-100 rounded-md"></div>
        ))}
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted/30 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 text-muted-foreground">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">لا توجد حسابات متطابقة</h3>
        <p className="mt-1 text-sm text-gray-500">لم يتم العثور على حسابات تطابق معايير البحث أو التصفية.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {accounts.map((account) => (
        <AccountTreeNode
          key={account.id}
          account={account}
          onEdit={onEdit}
          onDelete={onDelete}
          onShare={onShare}
        />
      ))}
    </div>
  );
};
