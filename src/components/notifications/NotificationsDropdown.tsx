
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import NotificationItem from './NotificationItem';
import { useNotifications } from '@/hooks/useNotifications';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';

const NotificationsDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAsRead, deleteNotification } = useNotifications();
  const navigate = useNavigate();
  
  const handleViewAll = () => {
    setOpen(false);
    navigate('/notifications');
  };
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between py-2 px-4 bg-muted/50">
          <h5 className="font-medium">الإشعارات</h5>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={() => markAllAsRead()}>
              تعيين الكل كمقروء
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[min(calc(80vh-100px),400px)]">
          <div className="py-2">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                لا توجد إشعارات
              </div>
            ) : (
              notifications.slice(0, 5).map((notification) => (
                <NotificationItem 
                  key={notification.id} 
                  notification={notification} 
                  onMarkRead={markAsRead}
                  onDelete={deleteNotification}
                />
              ))
            )}
          </div>
        </ScrollArea>
        
        <Separator />
        
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full" onClick={handleViewAll}>
            عرض كل الإشعارات
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsDropdown;
