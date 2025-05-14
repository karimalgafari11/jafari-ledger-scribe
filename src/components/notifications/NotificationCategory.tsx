
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { getCategoryLabel, getCategoryColor } from './utils/notificationItemUtils';

interface NotificationCategoryProps {
  eventType: string;
}

const NotificationCategory = ({ eventType }: NotificationCategoryProps) => {
  const categoryLabel = getCategoryLabel(eventType);
  const categoryColor = getCategoryColor(eventType);
  
  return (
    <Badge 
      variant="secondary" 
      className={`text-xs ${categoryColor}`}
    >
      {categoryLabel}
    </Badge>
  );
};

export default NotificationCategory;
