
import React from 'react';
import { format } from 'date-fns';
import { CheckIcon, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Notification } from '@/types/notifications';
import { getPriorityColor, getIconForNotification } from './utils/notificationItemUtils';
import NotificationContent from './NotificationContent';

interface NotificationItemProps {
  notification: Notification;
  onMarkRead: (id: string) => Promise<boolean>;
  onDelete: (id: string) => Promise<boolean>;
  showActions?: boolean;
  isSelected?: boolean;
  onToggleSelect?: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkRead,
  onDelete,
  showActions = true,
  isSelected = false,
  onToggleSelect
}) => {
  const {
    id,
    title,
    message,
    priority,
    eventType,
    read,
    createdAt,
  } = notification;

  const priorityColor = getPriorityColor(priority);
  const NotificationIcon = getIconForNotification(eventType);

  const handleMarkAsRead = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await onMarkRead(id);
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await onDelete(id);
  };

  const formattedDate = createdAt ? format(new Date(createdAt), 'yyyy-MM-dd HH:mm') : '';

  return (
    <div 
      className={`
        p-3 border-b last:border-b-0 transition-colors
        ${read ? 'bg-background hover:bg-muted/20' : 'bg-muted/30 hover:bg-muted/40'} 
        ${isSelected ? 'bg-primary/10' : ''}
      `}
      onClick={() => onToggleSelect && onToggleSelect(id)}
    >
      <div className="flex items-start gap-3">
        {onToggleSelect && (
          <div className="pt-1">
            <input 
              type="checkbox" 
              checked={isSelected}
              onChange={() => onToggleSelect(id)}
              className="h-4 w-4"
            />
          </div>
        )}
        
        <div 
          className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${priorityColor}`}
          title={`أولوية ${priority}`}
        />
        
        <div className="flex-shrink-0 mt-1">
          <NotificationIcon className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-1">
            <h4 className={`text-sm font-medium ${!read ? 'font-semibold' : ''}`}>
              {title}
            </h4>
            {showActions && !read && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleMarkAsRead}
                title="تعيين كمقروء"
              >
                <CheckIcon className="h-3.5 w-3.5" />
              </Button>
            )}
            {showActions && (
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-muted-foreground"
                onClick={handleDelete}
                title="حذف"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          
          <NotificationContent message={message} />
          
          <div className="text-[11px] text-muted-foreground mt-1">
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
