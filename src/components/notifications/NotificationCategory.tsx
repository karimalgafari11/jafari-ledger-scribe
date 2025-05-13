
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getNotificationIcon, getCategoryName } from '@/hooks/notifications/notificationUtils';

interface NotificationCategoryProps {
  eventType: string;
}

const NotificationCategory: React.FC<NotificationCategoryProps> = ({ eventType }) => {
  const icon = getNotificationIcon(eventType);
  const name = getCategoryName(eventType);
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="flex items-center gap-1 py-1">
            <span className="text-sm">{icon}</span>
            <span className="text-xs font-medium">{name}</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{`تصنيف: ${name}`}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NotificationCategory;
