
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Trash, Share } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface AccountActionsProps {
  accountId: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onShare: (id: string, method: 'link' | 'email' | 'whatsapp') => void;
}

export const AccountActions: React.FC<AccountActionsProps> = ({
  accountId,
  onEdit,
  onDelete,
  onShare,
}) => {
  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onEdit(accountId);
        }}
        className="h-8 w-8"
      >
        <Edit className="h-4 w-4" />
        <span className="sr-only">تعديل</span>
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(accountId);
        }}
        className="h-8 w-8"
      >
        <Trash className="h-4 w-4" />
        <span className="sr-only">حذف</span>
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Share className="h-4 w-4" />
            <span className="sr-only">مشاركة</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            onClick={(e) => {
              e.stopPropagation();
              onShare(accountId, 'link');
            }}
          >
            نسخ الرابط
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={(e) => {
              e.stopPropagation();
              onShare(accountId, 'email');
            }}
          >
            مشاركة عبر البريد
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={(e) => {
              e.stopPropagation();
              onShare(accountId, 'whatsapp');
            }}
          >
            مشاركة عبر واتساب
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
