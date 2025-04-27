
import React, { useState } from "react";
import { AccountNode } from "@/types/accounts";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { AccountActions } from "./AccountActions";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";

interface AccountTreeNodeProps {
  account: AccountNode;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string, method: 'link' | 'email' | 'whatsapp') => void;
}

export const AccountTreeNode: React.FC<AccountTreeNodeProps> = ({
  account,
  onEdit,
  onDelete,
  onShare,
}) => {
  const [isOpen, setIsOpen] = useState(account.level === 1);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const hasChildren = account.children.length > 0;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "asset": return "text-blue-600";
      case "liability": return "text-red-600";
      case "equity": return "text-green-600";
      case "revenue": return "text-purple-600";
      case "expense": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  return (
    <>
      <div className="rounded-md border border-gray-200 bg-white">
        <div className={cn(
          "flex items-center justify-between p-2",
          account.level === 1 && "bg-gray-50"
        )}>
          <div className="flex items-center">
            {hasChildren ? (
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="mr-2 p-1 hover:bg-gray-100 rounded-full">
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-gray-500 transition-transform duration-200",
                      isOpen ? "transform rotate-180" : ""
                    )}
                  />
                </CollapsibleTrigger>
              </Collapsible>
            ) : (
              <div className="mr-2 w-6" />
            )}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{account.number}</span>
                <span className={cn(
                  "font-medium",
                  getTypeColor(account.type)
                )}>
                  {account.name}
                </span>
              </div>
              {account.balance !== 0 && (
                <div className="text-xs text-gray-600">
                  الرصيد: {account.balance.toLocaleString("ar-SA")} ر.س
                </div>
              )}
            </div>
          </div>
          
          <AccountActions
            accountId={account.id}
            onEdit={onEdit}
            onDelete={() => setConfirmDelete(true)}
            onShare={onShare}
          />
        </div>

        {hasChildren && (
          <Collapsible open={isOpen}>
            <CollapsibleContent>
              <div className="border-t border-gray-100 pr-4 pt-1 pb-1">
                <AccountTree
                  accounts={account.children}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onShare={onShare}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>

      <DeleteConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        onConfirm={() => onDelete(account.id)}
        accountName={account.name}
      />
    </>
  );
};
