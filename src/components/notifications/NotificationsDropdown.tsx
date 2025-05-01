
import React from 'react';
import { Bell } from 'lucide-react';
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
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import NotificationItem from './NotificationItem';

interface NotificationsDropdownProps {
  maxItems?: number;
}

const NotificationsDropdown = ({ maxItems = 5 }: NotificationsDropdownProps) => {
  const { 
    notifications, 
    unreadCount, 
    markAllAsRead, 
    isLoading 
  } = useNotifications();

  // Sort notifications by date (newest first) and limit to maxItems
  const recentNotifications = [...notifications]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, maxItems);

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
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>الإشعارات</span>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => markAllAsRead()}
              disabled={isLoading}
              className="text-xs h-7 px-2"
            >
              تعيين الكل كمقروء
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {recentNotifications.length === 0 ? (
          <div className="py-6 text-center text-muted-foreground">
            لا توجد إشعارات جديدة
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
          <a href="/notifications">عرض جميع الإشعارات</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
