
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
import { AccountTree } from "./AccountTree";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

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
      case "asset": return "bg-blue-100 text-blue-700 border-blue-200";
      case "liability": return "bg-red-100 text-red-700 border-red-200";
      case "equity": return "bg-green-100 text-green-700 border-green-200";
      case "revenue": return "bg-purple-100 text-purple-700 border-purple-200";
      case "expense": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "asset": return "أصول";
      case "liability": return "التزامات";
      case "equity": return "حقوق ملكية";
      case "revenue": return "إيرادات";
      case "expense": return "مصروفات";
      default: return type;
    }
  };

  const getLevelClass = (level: number) => {
    switch (level) {
      case 1: return "bg-muted/30 font-bold";
      case 2: return "bg-white";
      case 3: return "bg-white";
      default: return "";
    }
  };

  return (
    <div className="rounded-md border border-muted-foreground/10 bg-white mb-2 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className={cn(
        "flex items-center justify-between p-3",
        getLevelClass(account.level)
      )}>
        <div className="flex items-center flex-1 space-x-2 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            {hasChildren ? (
              <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CollapsibleTrigger className="focus:outline-none p-1 hover:bg-gray-100 rounded-full">
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-gray-500 transition-transform duration-200",
                      isOpen ? "transform rotate-180" : ""
                    )}
                  />
                </CollapsibleTrigger>
              </Collapsible>
            ) : (
              <div className="w-7" />
            )}
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex-1 cursor-default">
                <div className="flex items-center gap-3">
                  <span className="font-semibold min-w-[60px] text-primary/80">{account.number}</span>
                  <span className="font-medium">{account.name}</span>
                  <Badge variant="outline" className={cn("ml-2 text-xs", getTypeColor(account.type))}>
                    {getTypeLabel(account.type)}
                  </Badge>
                </div>
                {account.balance !== 0 && (
                  <div className="text-xs text-muted-foreground mt-1">
                    الرصيد: {account.balance.toLocaleString("ar-SA")} ر.س
                  </div>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>نوع الحساب: {getTypeLabel(account.type)}</p>
              <p>المستوى: {account.level}</p>
              {!account.isActive && <p className="text-red-500">حساب غير مفعل</p>}
            </TooltipContent>
          </Tooltip>
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
            <div className="border-t border-gray-100 pr-6 pt-1 pb-1">
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

      <DeleteConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        onConfirm={() => onDelete(account.id)}
        accountName={account.name}
      />
    </div>
  );
};
