
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import NotificationItem from '@/components/notifications/NotificationItem';

interface NotificationsListProps {
  notifications: any[];
  selectedIds: string[];
  onToggleSelect: (id: string) => void;
}

const NotificationsList = ({ notifications, selectedIds, onToggleSelect }: NotificationsListProps) => {
  if (notifications.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        لا توجد إشعارات لعرضها
      </div>
    );
  }
  
  return (
    <ScrollArea className="h-[600px]">
      <div>
        {notifications.map((notification, index) => (
          <React.Fragment key={notification.id}>
            <div className="flex items-start p-0">
              <div className="p-4 flex items-start">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(notification.id)}
                  onChange={() => onToggleSelect(notification.id)}
                  className="ml-3 mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <NotificationItem 
                  notification={notification} 
                  showActions={true} 
                />
              </div>
            </div>
            {index < notifications.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </ScrollArea>
  );
};

export default NotificationsList;
