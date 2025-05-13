
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, RefreshCw, Trash2 } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { toast } from 'sonner';

interface NotificationBulkActionsProps {
  selectedIds: string[];
  onSelectionClear: () => void;
}

const NotificationBulkActions: React.FC<NotificationBulkActionsProps> = ({
  selectedIds,
  onSelectionClear
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { markAsRead, deleteNotification, markAllAsRead, deleteNotifications } = useNotifications();
  
  if (selectedIds.length === 0) return null;
  
  const handleMarkSelectedAsRead = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      const promises = selectedIds.map(id => markAsRead(id));
      const results = await Promise.all(promises);
      
      if (results.every(Boolean)) {
        toast.success(`تم تعيين ${selectedIds.length} إشعارات كمقروءة`);
        onSelectionClear();
      } else {
        toast.error("فشل تعيين بعض الإشعارات كمقروءة");
      }
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      toast.error("حدث خطأ أثناء تعيين الإشعارات كمقروءة");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleDeleteSelected = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    try {
      const success = await deleteNotifications(selectedIds);
      
      if (success) {
        toast.success(`تم حذف ${selectedIds.length} إشعارات`);
        onSelectionClear();
      } else {
        toast.error("فشل حذف بعض الإشعارات");
      }
    } catch (error) {
      console.error("Error deleting notifications:", error);
      toast.error("حدث خطأ أثناء حذف الإشعارات");
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <div className="flex justify-between items-center p-2 border rounded-lg bg-muted/40">
      <div className="flex items-center">
        <span className="text-sm font-medium">
          تم تحديد {selectedIds.length} إشعارات
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectionClear()}
        >
          إلغاء التحديد
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkSelectedAsRead}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Check className="h-4 w-4 mr-2" />
          )}
          تعيين كمقروء
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleDeleteSelected}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4 mr-2" />
          )}
          حذف
        </Button>
      </div>
    </div>
  );
};

export default NotificationBulkActions;
