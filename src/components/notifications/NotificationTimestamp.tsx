
import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { formatDateForDisplay } from '@/hooks/notifications/notificationUtils';

interface NotificationTimestampProps {
  date: Date;
}

const NotificationTimestamp: React.FC<NotificationTimestampProps> = ({ date }) => {
  const formattedDate = formatDateForDisplay(date);
  const fullDate = date.toLocaleString('ar-SA', {
    dateStyle: 'full',
    timeStyle: 'medium'
  });
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <time dateTime={date.toISOString()} className="text-xs text-muted-foreground">
            {formattedDate}
          </time>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{fullDate}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default NotificationTimestamp;
