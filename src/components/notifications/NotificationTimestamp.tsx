
import React from 'react';
import { Clock } from 'lucide-react';
import { formatTimeAgo } from './utils/notificationItemUtils';

interface NotificationTimestampProps {
  createdAt: Date;
}

const NotificationTimestamp = ({ createdAt }: NotificationTimestampProps) => {
  const timeAgo = formatTimeAgo(createdAt);
  
  return (
    <span className="text-xs text-muted-foreground flex items-center">
      <Clock className="h-3 w-3 mr-1" />
      {timeAgo}
    </span>
  );
};

export default NotificationTimestamp;
