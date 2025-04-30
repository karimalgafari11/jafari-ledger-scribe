
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

interface DeleteWarehouseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  warehouseName: string;
  onConfirm: () => void;
}

export const DeleteWarehouseDialog = ({
  open,
  onOpenChange,
  warehouseName,
  onConfirm,
}: DeleteWarehouseDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>هل أنت متأكد من حذف المستودع؟</AlertDialogTitle>
          <AlertDialogDescription>
            سيتم حذف المستودع <span className="font-bold">{warehouseName}</span> بشكل نهائي.
            هذا الإجراء لا يمكن التراجع عنه.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-red-600 hover:bg-red-700">
            نعم، قم بالحذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
