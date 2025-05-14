
import React from 'react';
import { MoreVertical, Star, Trash, Archive } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { Notification } from '@/types/notifications';

interface NotificationItemActionsProps {
  notification: Notification;
  markAsRead: (id: string) => Promise<boolean>;
  deleteNotification: (id: string) => Promise<boolean>;
}

const NotificationItemActions = ({ notification, markAsRead, deleteNotification }: NotificationItemActionsProps) => {
  const handleMarkAsRead = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!notification.read) {
      const success = await markAsRead(notification.id);
      if (success) {
        toast.success('تم تعيين الإشعار كمقروء');
      }
    }
  };
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const success = await deleteNotification(notification.id);
    if (success) {
      toast.success('تم حذف الإشعار');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 ml-1" onClick={(e) => e.stopPropagation()}>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {!notification.read && (
          <DropdownMenuItem onClick={handleMarkAsRead}>
            <Archive className="h-4 w-4 ml-2" />
            <span>تعيين كمقروء</span>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <Star className="h-4 w-4 ml-2" />
          <span>تمييز بنجمة</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
          <Trash className="h-4 w-4 ml-2" />
          <span>حذف</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationItemActions;
