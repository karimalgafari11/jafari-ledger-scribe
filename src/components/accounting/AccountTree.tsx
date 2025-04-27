
import React, { useState } from "react";
import { AccountNode } from "@/types/accounts";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, Edit, Trash, Share } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

interface AccountTreeNodeProps {
  account: AccountNode;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string, method: 'link' | 'email' | 'whatsapp') => void;
}

const AccountTreeNode: React.FC<AccountTreeNodeProps> = ({
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
      case "asset":
        return "text-blue-600";
      case "liability":
        return "text-red-600";
      case "equity":
        return "text-green-600";
      case "revenue":
        return "text-purple-600";
      case "expense":
        return "text-orange-600";
      default:
        return "text-gray-600";
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
                {/* The CollapsibleContent is defined later in the component */}
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
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(account.id)}
              className="h-8 w-8"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">تعديل</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setConfirmDelete(true)}
              className="h-8 w-8"
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">حذف</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Share className="h-4 w-4" />
                  <span className="sr-only">مشاركة</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onShare(account.id, 'link')}>
                  نسخ الرابط
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onShare(account.id, 'email')}>
                  مشاركة عبر البريد
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onShare(account.id, 'whatsapp')}>
                  مشاركة عبر واتساب
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {hasChildren && (
          // This is no longer needed, since we have the Collapsible component in place
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

      <Dialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من حذف الحساب "{account.name}"؟ هذه العملية لا يمكن التراجع عنها.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(account.id);
                setConfirmDelete(false);
              }}
            >
              حذف
            </Button>
            <Button
              variant="outline"
              onClick={() => setConfirmDelete(false)}
            >
              إلغاء
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
