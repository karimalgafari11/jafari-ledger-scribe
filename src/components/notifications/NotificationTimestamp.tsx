
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

interface NotificationTimestampProps {
  date: Date;
}

const NotificationTimestamp = ({ date }: NotificationTimestampProps) => {
  const formattedDate = formatDistanceToNow(new Date(date), { addSuffix: true, locale: ar });
  
  return (
    <span className="text-xs text-muted-foreground ml-2">
      {formattedDate}
    </span>
  );
};

export default NotificationTimestamp;
