
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Bell, Check, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useNotifications } from "@/hooks/useNotifications";
import NotificationItem from './NotificationItem';

export const NotificationsDropdown = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  
  const handleMarkAllAsRead = async (e: React.MouseEvent) => {
    e.preventDefault();
    await markAllAsRead();
  };
  
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[380px]">
        <div className="flex items-center justify-between px-4 py-2">
          <DropdownMenuLabel className="py-1">الإشعارات</DropdownMenuLabel>
          
          <div className="flex items-center gap-2">
            <DropdownMenuItem 
              onClick={handleMarkAllAsRead}
              className="py-1 px-2 h-8 text-sm"
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 ml-2" />
              تعيين الكل كمقروء
            </DropdownMenuItem>
            <Separator orientation="vertical" className="h-6" />
            <DropdownMenuItem asChild className="py-1 px-2 h-8">
              <Link to="/settings/notifications">
                <Settings className="h-4 w-4 ml-2" />
                الإعدادات
              </Link>
            </DropdownMenuItem>
          </div>
        </div>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          {notifications.length > 0 ? (
            <ScrollArea className="h-80">
              {notifications.map(notification => (
                <div key={notification.id} onClick={() => setOpen(false)}>
                  <NotificationItem 
                    notification={notification}
                    showActions={false}
                  />
                  <DropdownMenuSeparator />
                </div>
              ))}
            </ScrollArea>
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              لا توجد إشعارات
            </div>
          )}
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild className="justify-center py-2">
          <Link to="/notifications" className="w-full text-center">
            عرض كل الإشعارات
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
