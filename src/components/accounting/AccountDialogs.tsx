
import React, { useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AccountForm } from "./AccountForm";
import { Account } from "@/types/accounts";

interface AccountDialogsProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  selectedAccount: Account | null;
  parentOptions: { label: string; value: string }[];
  onAddSubmit: (data: any) => void;
  onEditSubmit: (data: any) => void;
  onSuggestNumber: (type: Account['type'], parentId: string | null) => string;
}

export const AccountDialogs: React.FC<AccountDialogsProps> = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  isEditDialogOpen,
  setIsEditDialogOpen,
  selectedAccount,
  parentOptions,
  onAddSubmit,
  onEditSubmit,
  onSuggestNumber,
}) => {
  // Debug logs for troubleshooting
  console.log("AccountDialogs - Parent options received:", parentOptions);
  
  // Ensure we have valid parent options - strict validation
  const validatedParentOptions = useMemo(() => {
    if (!Array.isArray(parentOptions)) {
      return [];
    }
  
    return parentOptions.filter(option => 
      option && 
      typeof option === 'object' &&
      'value' in option && 
      option.value && 
      typeof option.value === 'string' && 
      option.value.trim() !== ''
    );
  }, [parentOptions]);
    
  console.log("AccountDialogs - Validated parent options:", validatedParentOptions);
  
  return (
    <>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>إضافة حساب جديد</DialogTitle>
          </DialogHeader>
          <AccountForm
            parentOptions={validatedParentOptions}
            onSubmit={onAddSubmit}
            onSuggestNumber={onSuggestNumber}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>تعديل حساب</DialogTitle>
          </DialogHeader>
          {selectedAccount && (
            <AccountForm
              account={selectedAccount}
              parentOptions={validatedParentOptions}
              onSubmit={onEditSubmit}
              onSuggestNumber={onSuggestNumber}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
