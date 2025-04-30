
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
import { Currency } from "@/types/definitions";

interface DeleteCurrencyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  currency: Currency | null;
}

export const DeleteCurrencyDialog = ({
  isOpen,
  onClose,
  onConfirm,
  currency,
}: DeleteCurrencyDialogProps) => {
  if (!currency) return null;

  const canDelete = !currency.isDefault;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>هل أنت متأكد من حذف العملة؟</AlertDialogTitle>
          <AlertDialogDescription>
            {canDelete
              ? `سيتم حذف العملة "${currency.name}" من النظام. هذا الإجراء لا يمكن التراجع عنه.`
              : "لا يمكن حذف العملة الافتراضية. يرجى تعيين عملة أخرى كعملة افتراضية أولاً."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={!canDelete}
          >
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
