
import React from 'react';
import { Notification, NotificationPriority } from '@/types/notifications';
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { CheckCircle, AlertTriangle, AlertCircle, Info, Link } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';

interface NotificationItemProps {
  notification: Notification;
  showActions?: boolean;
}

const NotificationItem = ({ notification, showActions = false }: NotificationItemProps) => {
  const { markAsRead } = useNotifications();
  
  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // Handle click based on notification type/entity
    if (notification.relatedEntityId && notification.relatedEntityType) {
      console.log(`Navigate to: ${notification.relatedEntityType}/${notification.relatedEntityId}`);
      // Navigate to related entity - would use router here
    }
  };
  
  // Get icon based on priority
  const getIcon = (priority: NotificationPriority) => {
    switch (priority) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'medium':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'low':
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };
  
  return (
    <DropdownMenuItem
      className={cn(
        "flex items-start gap-3 p-3 cursor-pointer",
        !notification.read && "bg-muted/50"
      )}
      onClick={handleClick}
    >
      <div className="mt-0.5 flex-shrink-0">
        {getIcon(notification.priority)}
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
            {notification.title}
          </p>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(notification.createdAt, { addSuffix: true, locale: ar })}
          </span>
        </div>
        
        <p className="text-xs text-muted-foreground">
          {notification.message}
        </p>
        
        {notification.relatedEntityId && notification.relatedEntityType && (
          <div className="flex items-center text-xs text-blue-600 pt-1">
            <Link className="h-3 w-3 mr-1" />
            <span>عرض التفاصيل</span>
          </div>
        )}
      </div>
    </DropdownMenuItem>
  );
};

export default NotificationItem;
