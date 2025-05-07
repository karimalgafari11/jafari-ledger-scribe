
import React from 'react';
import { Bell, BellOff, CheckCheck, Trash } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications } from '@/hooks/useNotifications';
import NotificationItem from './NotificationItem';
import { toast } from 'sonner';

interface NotificationsDropdownProps {
  maxItems?: number;
}

const NotificationsDropdown = ({ maxItems = 5 }: NotificationsDropdownProps) => {
  const { 
    notifications, 
    unreadCount, 
    markAllAsRead, 
    deleteNotification,
    isLoading 
  } = useNotifications();

  // Sort notifications by date (newest first) and limit to maxItems
  const recentNotifications = [...notifications]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, maxItems);

  const handleMarkAllAsRead = async () => {
    const success = await markAllAsRead();
    if (success) {
      toast.success("تم تعيين جميع الإشعارات كمقروءة");
    } else {
      toast.error("حدث خطأ أثناء تعيين الإشعارات");
    }
  };

  const handleDeleteAll = async () => {
    try {
      let success = true;
      for (const notification of recentNotifications) {
        const result = await deleteNotification(notification.id);
        if (!result) success = false;
      }
      
      if (success) {
        toast.success("تم حذف جميع الإشعارات");
      } else {
        toast.error("حدث خطأ أثناء حذف بعض الإشعارات");
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] flex items-center justify-center bg-red-500 text-white text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-2 py-1.5">
          <DropdownMenuLabel className="py-1 px-0">الإشعارات</DropdownMenuLabel>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleMarkAllAsRead}
                disabled={isLoading}
                title="تعيين الكل كمقروء"
                className="h-8 w-8"
              >
                <CheckCheck className="h-4 w-4" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleDeleteAll}
              disabled={isLoading || notifications.length === 0}
              title="حذف الكل"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DropdownMenuSeparator />
        
        {recentNotifications.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">
            <BellOff className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p>لا توجد إشعارات جديدة</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            {recentNotifications.map((notification) => (
              <NotificationItem 
                key={notification.id} 
                notification={notification}
              />
            ))}
          </ScrollArea>
        )}
        
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer justify-center font-medium">
          <a href="/notifications">إدارة جميع الإشعارات</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
