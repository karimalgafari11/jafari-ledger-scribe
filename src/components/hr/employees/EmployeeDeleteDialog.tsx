
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
import { Employee } from "@/types/hr";

interface EmployeeDeleteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  employee: Employee | null;
  onConfirm: () => void;
}

const EmployeeDeleteDialog: React.FC<EmployeeDeleteDialogProps> = ({
  open,
  setOpen,
  employee,
  onConfirm,
}) => {
  if (!employee) return null;

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="rtl">
        <AlertDialogHeader>
          <AlertDialogTitle>حذف الموظف</AlertDialogTitle>
          <AlertDialogDescription>
            هل أنت متأكد من رغبتك في حذف الموظف "{employee.name}"؟
            <br />
            سيتم حذف جميع البيانات المرتبطة بهذا الموظف بشكل نهائي ولن تتمكن من استرجاعها.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            حذف
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default EmployeeDeleteDialog;
