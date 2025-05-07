
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCheck } from 'lucide-react';

interface NotificationBulkActionsProps {
  selectedCount: number;
  onDeselectAll: () => void;
  onMarkAsRead: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

const NotificationBulkActions = ({ 
  selectedCount, 
  onDeselectAll, 
  onMarkAsRead, 
  onDelete, 
  isLoading 
}: NotificationBulkActionsProps) => {
  if (selectedCount === 0) return null;
  
  return (
    <div className="flex items-center justify-between bg-muted/30 p-3 border-b">
      <div className="flex items-center">
        <CheckCheck className="h-4 w-4 ml-2 text-muted-foreground" />
        <span>تم تحديد {selectedCount} إشعارات</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDeselectAll}
        >
          إلغاء التحديد
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onMarkAsRead}
          disabled={isLoading}
        >
          تعيين كمقروءة
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={onDelete}
          disabled={isLoading}
        >
          حذف المحدد
        </Button>
      </div>
    </div>
  );
};

export default NotificationBulkActions;
