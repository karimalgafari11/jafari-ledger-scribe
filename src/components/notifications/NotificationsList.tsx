
import React, { useState } from 'react';
import { Notification } from '@/types/notifications';
import NotificationItem from './NotificationItem';
import { useNotifications } from '@/hooks/useNotifications';
import { Checkbox } from '@/components/ui/checkbox';
import NotificationBulkActions from './NotificationBulkActions';

interface NotificationsListProps {
  notifications: Notification[];
  showActions?: boolean;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ 
  notifications,
  showActions = true
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { markAsRead, deleteNotification } = useNotifications();
  
  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(notifications.map(n => n.id));
    } else {
      setSelectedIds([]);
    }
  };

  return (
    <div className="space-y-1">
      {notifications.length > 0 && (
        <div className="flex justify-between items-center px-3 py-2">
          <div className="flex items-center gap-2">
            <Checkbox 
              id="select-all" 
              checked={selectedIds.length === notifications.length && notifications.length > 0}
              indeterminate={selectedIds.length > 0 && selectedIds.length < notifications.length}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm">
              تحديد الكل
            </label>
          </div>
          
          {selectedIds.length > 0 && (
            <NotificationBulkActions 
              selectedIds={selectedIds} 
              onSelectionChange={setSelectedIds}
            />
          )}
        </div>
      )}
      
      <div className="divide-y">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            لا توجد إشعارات
          </div>
        ) : (
          notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={markAsRead}
              onDelete={deleteNotification}
              showActions={showActions}
              isSelected={selectedIds.includes(notification.id)}
              onToggleSelect={handleToggleSelect}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsList;
