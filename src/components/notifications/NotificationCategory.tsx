
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { getNotificationIcon, getCategoryName } from '@/hooks/notifications/notificationUtils';
import { AlertTriangle, Bell, CreditCard, FileText, Package, Settings, Users } from 'lucide-react';

interface NotificationCategoryProps {
  eventType: string;
}

const NotificationCategory = ({ eventType }: NotificationCategoryProps) => {
  const categoryName = getCategoryName(eventType);
  
  const iconMap = {
    'package': <Package className="h-3 w-3" />,
    'file-text': <FileText className="h-3 w-3" />,
    'credit-card': <CreditCard className="h-3 w-3" />,
    'users': <Users className="h-3 w-3" />,
    'settings': <Settings className="h-3 w-3" />,
    'bell': <Bell className="h-3 w-3" />
  };
  
  const icon = iconMap[getNotificationIcon(eventType) as keyof typeof iconMap] || <AlertTriangle className="h-3 w-3" />;
  
  return (
    <Badge variant="outline" className="text-xs px-1 border-muted-foreground/30 text-muted-foreground flex items-center gap-1">
      {icon}
      <span>{categoryName}</span>
    </Badge>
  );
};

export default NotificationCategory;
