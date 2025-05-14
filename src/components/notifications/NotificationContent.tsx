
import React from 'react';

export interface NotificationContentProps {
  message: string;
  title?: string;
  read?: boolean;
}

const NotificationContent: React.FC<NotificationContentProps> = ({ message, title, read }) => {
  return (
    <div className="text-sm">
      {title && (
        <h3 className={`font-medium ${!read ? 'font-semibold' : ''}`}>
          {title}
        </h3>
      )}
      <p className="text-muted-foreground line-clamp-2">{message}</p>
    </div>
  );
};

export default NotificationContent;
