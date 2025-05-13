
import React from 'react';
import { cn } from '@/lib/utils';

interface NotificationContentProps {
  title: string;
  message: string;
  read: boolean;
  relatedEntityId?: string;
  relatedEntityType?: string;
}

const NotificationContent = ({
  title,
  message,
  read,
  relatedEntityId,
  relatedEntityType
}: NotificationContentProps) => {
  return (
    <div className="space-y-1">
      <p className={cn("text-sm", !read ? "font-medium" : "text-muted-foreground")}>
        {message}
      </p>
      
      {relatedEntityId && relatedEntityType && (
        <div className="text-xs text-blue-600">
          عرض التفاصيل
        </div>
      )}
    </div>
  );
};

export default NotificationContent;
