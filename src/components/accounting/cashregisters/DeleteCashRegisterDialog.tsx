
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
import { CashRegister } from "@/types/definitions";

interface DeleteCashRegisterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  register: CashRegister | null;
}

export const DeleteCashRegisterDialog = ({
  isOpen,
  onClose,
  onConfirm,
  register,
}: DeleteCashRegisterDialogProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent dir="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle>هل أنت متأكد من حذف هذا الصندوق؟</AlertDialogTitle>
          <AlertDialogDescription>
            {register?.name ? (
              <>
                سيتم حذف الصندوق <strong>{register.name}</strong> وجميع البيانات المرتبطة به. هذا الإجراء لا يمكن التراجع عنه.
              </>
            ) : (
              "سيتم حذف الصندوق وجميع البيانات المرتبطة به. هذا الإجراء لا يمكن التراجع عنه."
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
          >
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
