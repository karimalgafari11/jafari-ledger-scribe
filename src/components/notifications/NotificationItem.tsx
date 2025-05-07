
import React from 'react';
import { Notification, NotificationPriority } from '@/types/notifications';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  Link, 
  MoreVertical, 
  Star, 
  Trash, 
  Archive,
  Clock
} from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from 'sonner';

interface NotificationItemProps {
  notification: Notification;
  showActions?: boolean;
}

const NotificationItem = ({ notification, showActions = false }: NotificationItemProps) => {
  const { markAsRead, deleteNotification } = useNotifications();
  
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
  
  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    
    // Handle click based on notification type/entity
    if (notification.relatedEntityId && notification.relatedEntityType) {
      console.log(`Navigate to: ${notification.relatedEntityType}/${notification.relatedEntityId}`);
      // Navigate to related entity - would use router here
    }
  };
  
  // Get icon based on priority
  const getIcon = (priority: NotificationPriority) => {
    switch (priority) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'high':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'medium':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'low':
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  // توليد رسالة للوقت باللغة العربية
  const timeAgo = formatDistanceToNow(notification.createdAt, { 
    addSuffix: true, 
    locale: ar 
  });
  
  // تصنيف الإشعار حسب نوعه
  const getCategoryLabel = () => {
    const category = notification.eventType.split('.')[0];
    
    switch (category) {
      case 'inventory':
        return 'المخزون';
      case 'invoices':
        return 'الفواتير';
      case 'expenses':
        return 'المصروفات';
      case 'customer':
        return 'العملاء';
      case 'system':
        return 'النظام';
      default:
        return 'عام';
    }
  };
  
  // لون البادج حسب نوع الإشعار
  const getCategoryColor = () => {
    const category = notification.eventType.split('.')[0];
    
    switch (category) {
      case 'inventory':
        return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
      case 'invoices':
        return 'bg-sky-100 text-sky-800 hover:bg-sky-200';
      case 'expenses':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      case 'customer':
        return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'system':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  return (
    <div
      className={cn(
        "flex items-start gap-3 p-4 cursor-pointer hover:bg-muted/20 transition-colors",
        !notification.read && "bg-muted/30"
      )}
      onClick={handleClick}
    >
      <div className="mt-0.5 flex-shrink-0">
        {getIcon(notification.priority)}
      </div>
      
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className={cn("text-sm font-medium", !notification.read && "font-semibold")}>
              {notification.title}
            </p>
            
            <Badge 
              variant="secondary" 
              className={`text-xs ${getCategoryColor()}`}
            >
              {getCategoryLabel()}
            </Badge>
          </div>
          
          <div className="flex items-center">
            <span className="text-xs text-muted-foreground flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {timeAgo}
            </span>
            
            {showActions && (
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
            )}
          </div>
        </div>
        
        <p className="text-xs text-muted-foreground">
          {notification.message}
        </p>
        
        {notification.relatedEntityId && notification.relatedEntityType && (
          <div className="flex items-center text-xs text-blue-600 pt-1">
            <Link className="h-3 w-3 mr-1" />
            <span className="hover:underline">عرض التفاصيل</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
