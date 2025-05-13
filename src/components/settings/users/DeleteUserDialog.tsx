
import React from 'react';
import { User } from '@/types/settings';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

interface DeleteUserDialogProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
}

export const DeleteUserDialog: React.FC<DeleteUserDialogProps> = ({
  user,
  open,
  onOpenChange,
  onDelete
}) => {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            <DialogTitle>تأكيد حذف المستخدم</DialogTitle>
          </div>
          <DialogDescription className="pt-3">
            <p className="mb-3">
              هل أنت متأكد من رغبتك في حذف حساب المستخدم التالي؟
            </p>
            <div className="bg-muted p-3 rounded-md">
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <p className="mt-3 text-destructive text-sm">
              هذا الإجراء نهائي ولا يمكن التراجع عنه.
            </p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            حذف المستخدم
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
