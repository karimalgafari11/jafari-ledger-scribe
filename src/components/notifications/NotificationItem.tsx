
import React from 'react';
import { Notification } from '@/types/notifications';
import { cn } from '@/lib/utils';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationItemActions from './NotificationItemActions';
import NotificationTimestamp from './NotificationTimestamp';
import NotificationCategory from './NotificationCategory';
import NotificationContent from './NotificationContent';
import { getPriorityIcon } from './utils/notificationItemUtils';

interface NotificationItemProps {
  notification: Notification;
  showActions?: boolean;
}

const NotificationItem = ({ notification, showActions = false }: NotificationItemProps) => {
  const { markAsRead, deleteNotification } = useNotifications();
  
  const handleClick = async () => {
    if (!notification.read) {
      await markAsRead(notification.id);
    }
    
    // Handle click based on notification type/entity
    if (notification.relatedEntityId && notification.relatedEntityType) {
      console.log(`Navigate to: ${notification.relatedEntityType}/${notification.relatedEntityId}`);
      // Navigation logic would go here based on entity type and ID
    }
  };
  
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 cursor-pointer hover:bg-muted/20 transition-colors",
        !notification.read && "bg-muted/30"
      )}
      onClick={handleClick}
    >
      <div className="mt-0.5 flex-shrink-0">
        {getPriorityIcon(notification.priority)}
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
              {notification.title}
            </p>
            
            <NotificationCategory eventType={notification.eventType} />
          </div>
          
          <div className="flex items-center">
            <NotificationTimestamp createdAt={notification.createdAt} />
            
            {showActions && (
              <NotificationItemActions 
                notification={notification}
                markAsRead={markAsRead}
                deleteNotification={deleteNotification}
              />
            )}
          </div>
        </div>
        
        <NotificationContent 
          title={notification.title}
          message={notification.message}
          read={notification.read}
          relatedEntityId={notification.relatedEntityId}
          relatedEntityType={notification.relatedEntityType}
        />
      </div>
    </div>
  );
};

export default NotificationItem;
