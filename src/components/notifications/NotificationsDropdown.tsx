
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNotifications } from '@/hooks/useNotifications';
import NotificationItem from './NotificationItem';
import { useNavigate } from 'react-router-dom';

export function NotificationsDropdown() {
  const { 
    notifications, 
    markAsRead,
    markAllAsRead,
    deleteNotification
  } = useNotifications();
  const navigate = useNavigate();

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Filter for the most recent 5 notifications
  const recentNotifications = [...notifications]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleViewAll = () => {
    navigate('/notifications');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] mr-4" align="end">
        <div className="flex items-center justify-between p-2">
          <h3 className="text-sm font-medium">الإشعارات</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" className="text-xs" onClick={handleMarkAllAsRead}>
              تعيين الكل كمقروء
            </Button>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
          {recentNotifications.length === 0 ? (
            <div className="py-6 text-center text-muted-foreground">
              لا توجد إشعارات
            </div>
          ) : (
            recentNotifications.map(notification => (
              <DropdownMenuItem key={notification.id} className="p-0 focus:bg-transparent">
                <NotificationItem 
                  notification={notification} 
                  onMarkRead={markAsRead}
                  onDelete={deleteNotification}
                  showActions={true}
                />
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="p-2 justify-center" onClick={handleViewAll}>
          <span className="text-primary text-sm">عرض كل الإشعارات</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
