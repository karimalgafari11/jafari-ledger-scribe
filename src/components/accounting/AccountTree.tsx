
import React from "react";
import { AccountNode } from "@/types/accounts";
import { AccountTreeNode } from "./AccountTreeNode";

interface AccountTreeProps {
  accounts: AccountNode[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string, method: 'link' | 'email' | 'whatsapp') => void;
}

export const AccountTree: React.FC<AccountTreeProps> = ({
  accounts,
  onEdit,
  onDelete,
  onShare,
}) => {
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
