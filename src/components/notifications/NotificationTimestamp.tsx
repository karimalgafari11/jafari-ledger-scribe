
import React from 'react';
import { formatDateForDisplay } from '@/hooks/notifications/notificationUtils';

interface NotificationTimestampProps {
  createdAt: Date;
}

const NotificationTimestamp = ({ createdAt }: NotificationTimestampProps) => {
  const formattedDate = formatDateForDisplay(createdAt);
  
  return (
    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
      {formattedDate}
    </span>
  );
};

export default NotificationTimestamp;
