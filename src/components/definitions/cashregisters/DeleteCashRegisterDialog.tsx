
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteCashRegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  registerName: string;
  onConfirm: () => void;
}

export const DeleteCashRegisterDialog: React.FC<DeleteCashRegisterDialogProps> = ({
  open,
  onOpenChange,
  registerName,
  onConfirm,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-right">تأكيد حذف الصندوق</AlertDialogTitle>
          <AlertDialogDescription className="text-right">
            هل أنت متأكد من رغبتك في حذف صندوق "{registerName}"؟ هذا الإجراء لا يمكن التراجع عنه.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row-reverse justify-start">
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
