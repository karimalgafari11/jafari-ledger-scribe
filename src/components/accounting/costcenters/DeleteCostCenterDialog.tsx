
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface DeleteCostCenterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  name: string;
}

export const DeleteCostCenterDialog: React.FC<DeleteCostCenterDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  name,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle>هل أنت متأكد من حذف مركز الكلفة؟</AlertDialogTitle>
          <AlertDialogDescription>
            أنت على وشك حذف مركز الكلفة "{name}". هذا الإجراء لا يمكن التراجع عنه.
            <br />
            سيتم حذف كافة البيانات المرتبطة بمركز الكلفة.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            نعم، حذف مركز الكلفة
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
