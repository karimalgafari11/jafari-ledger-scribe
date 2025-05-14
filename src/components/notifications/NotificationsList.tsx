
import React, { useState } from 'react';
import { Notification } from '@/types/notifications';
import NotificationItem from './NotificationItem';
import { useNotifications } from '@/hooks/useNotifications';
import { Checkbox } from '@/components/ui/checkbox';
import NotificationBulkActions from './NotificationBulkActions';

interface NotificationsListProps {
  notifications: Notification[];
  showActions?: boolean;
  selectedIds?: string[];
  onToggleSelect?: (id: string) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({ 
  notifications,
  showActions = true,
  selectedIds: externalSelectedIds,
  onToggleSelect: externalToggleSelect
}) => {
  const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([]);
  const { markAsRead, deleteNotification } = useNotifications();
  
  // Use either external or internal state based on what's provided
  const selectedIds = externalSelectedIds !== undefined ? externalSelectedIds : internalSelectedIds;
  
  const handleToggleSelect = (id: string) => {
    if (externalToggleSelect) {
      externalToggleSelect(id);
    } else {
      setInternalSelectedIds(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id) 
          : [...prev, id]
      );
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (externalToggleSelect) {
      // If using external management, we need to notify for each ID
      notifications.forEach(notification => {
        if (checked && !externalSelectedIds.includes(notification.id)) {
          externalToggleSelect(notification.id);
        } else if (!checked && externalSelectedIds.includes(notification.id)) {
          externalToggleSelect(notification.id);
        }
      });
    } else {
      if (checked) {
        setInternalSelectedIds(notifications.map(n => n.id));
      } else {
        setInternalSelectedIds([]);
      }
    }
  };

  const handleSelectionClear = () => {
    if (externalToggleSelect && externalSelectedIds) {
      // Clear each selected ID individually through the external handler
      [...externalSelectedIds].forEach(id => externalToggleSelect(id));
    } else {
      setInternalSelectedIds([]);
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
              // Don't use indeterminate prop as it's not in the type
              // Instead, use aria-checked="mixed" for visual indeterminacy
              aria-checked={selectedIds.length > 0 && selectedIds.length < notifications.length ? "mixed" : undefined}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm">
              تحديد الكل
            </label>
          </div>
          
          {selectedIds.length > 0 && (
            <NotificationBulkActions 
              selectedIds={selectedIds} 
              onSelectionClear={handleSelectionClear}
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
