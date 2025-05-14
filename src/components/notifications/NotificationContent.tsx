
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

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
  const getEntityUrl = () => {
    if (!relatedEntityId || !relatedEntityType) return null;
    
    switch (relatedEntityType) {
      case 'invoice':
        return `/invoices/${relatedEntityId}`;
      case 'product':
        return `/inventory/products/${relatedEntityId}`;
      case 'expense':
        return `/expenses/${relatedEntityId}`;
      default:
        return null;
    }
  };
  
  const entityUrl = getEntityUrl();
  
  return (
    <div>
      <p className={cn(
        "text-sm",
        read ? "text-muted-foreground" : "text-foreground"
      )}>
        {message}
      </p>
      
      {entityUrl && (
        <div className="mt-1">
          <Link 
            to={entityUrl}
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            عرض التفاصيل
          </Link>
        </div>
      )}
    </div>
  );
};

export default NotificationContent;
