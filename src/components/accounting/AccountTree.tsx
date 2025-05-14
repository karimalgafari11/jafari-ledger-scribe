
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
    return <div className="py-4 text-center text-gray-500">جاري التحميل...</div>;
  }

  if (accounts.length === 0) {
    return <div className="py-4 text-center text-gray-500">لا توجد حسابات متطابقة مع البحث</div>;
  }

  return (
    <div className="space-y-2 rtl">
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
