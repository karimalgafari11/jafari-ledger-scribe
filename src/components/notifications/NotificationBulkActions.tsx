
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNotifications } from '@/hooks/useNotifications';
import { toast } from 'sonner';

interface NotificationBulkActionsProps {
  selectedIds: string[];
  onSelectionClear: () => void;
}

const NotificationBulkActions = ({
  selectedIds,
  onSelectionClear,
}: NotificationBulkActionsProps) => {
  const { markAsRead, deleteNotification } = useNotifications();
  
  const handleMarkAsRead = async () => {
    let success = true;
    
    for (const id of selectedIds) {
      const result = await markAsRead(id);
      if (!result) success = false;
    }
    
    if (success) {
      toast.success(`تم تعيين ${selectedIds.length} إشعارات كمقروءة`);
      onSelectionClear();
    } else {
      toast.error('حدث خطأ أثناء تعيين بعض الإشعارات كمقروءة');
    }
  };
  
  const handleDeleteSelected = async () => {
    let success = true;
    
    for (const id of selectedIds) {
      const result = await deleteNotification(id);
      if (!result) success = false;
    }
    
    if (success) {
      toast.success(`تم حذف ${selectedIds.length} إشعارات بنجاح`);
      onSelectionClear();
    } else {
      toast.error('حدث خطأ أثناء حذف بعض الإشعارات');
    }
  };
  
  if (selectedIds.length === 0) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-2 bg-muted/50 p-2 rounded-md">
      <span className="text-sm ml-3">
        تم تحديد {selectedIds.length} {selectedIds.length === 1 ? 'إشعار' : 'إشعارات'}
      </span>
      
      <Button variant="ghost" size="sm" onClick={handleMarkAsRead}>
        <Check className="h-4 w-4 ml-1" />
        تعيين كمقروء
      </Button>
      
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash className="h-4 w-4 ml-1" />
            حذف
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>هل أنت متأكد من حذف الإشعارات المحددة؟</AlertDialogTitle>
            <AlertDialogDescription>
              سيتم حذف {selectedIds.length} {selectedIds.length === 1 ? 'إشعار' : 'إشعارات'} بشكل نهائي.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteSelected} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Button variant="ghost" size="sm" className="ml-auto" onClick={onSelectionClear}>
        إلغاء التحديد
      </Button>
    </div>
  );
};

export default NotificationBulkActions;
