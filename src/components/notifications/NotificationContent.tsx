
import React from 'react';
import { Link } from 'lucide-react';
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
    <div className="flex-1 space-y-1">
      <p className={cn("text-sm font-medium", !read && "font-semibold")}>
        {title}
      </p>
      
      <p className="text-xs text-muted-foreground">
        {message}
      </p>
      
      {relatedEntityId && relatedEntityType && (
        <div className="flex items-center text-xs text-blue-600 pt-1">
          <Link className="h-3 w-3 mr-1" />
          <span className="hover:underline">عرض التفاصيل</span>
        </div>
      )}
    </div>
  );
};

export default NotificationContent;
