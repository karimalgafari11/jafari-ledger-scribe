
import React from 'react';
import { BellRing, AlertCircle, AlertTriangle, AlertOctagon, Bell, FileWarning, DollarSign, Package, ShoppingCart, Info } from 'lucide-react';
import { NotificationPriority } from '@/types/notifications';

// Get icon based on priority level
export const getPriorityIcon = (priority: NotificationPriority): React.ReactNode => {
  switch (priority) {
    case 'low':
      return <BellRing className="h-5 w-5 text-gray-400" />;
    case 'medium':
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    case 'high':
      return <AlertTriangle className="h-5 w-5 text-orange-600" />;
    case 'critical':
      return <AlertOctagon className="h-5 w-5 text-red-600" />;
    default:
      return <BellRing className="h-5 w-5 text-gray-400" />;
  }
};

// Get color for priority level
export const getPriorityColor = (priority: NotificationPriority): string => {
  switch (priority) {
    case 'low':
      return 'bg-blue-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'high':
      return 'bg-orange-500';
    case 'critical':
      return 'bg-red-500';
    default:
      return 'bg-blue-500';
  }
};

// Get icon based on notification type
export const getIconForNotification = (eventType: string): React.FC<{ className?: string }> => {
  const iconProps = { className: 'h-5 w-5 text-muted-foreground' };

  if (eventType.startsWith('inventory')) {
    return (props) => <Package {...iconProps} {...props} />;
  } else if (eventType.startsWith('expenses')) {
    return (props) => <DollarSign {...iconProps} {...props} />;
  } else if (eventType.startsWith('invoices')) {
    return (props) => <FileWarning {...iconProps} {...props} />;
  } else if (eventType.startsWith('customer')) {
    return (props) => <ShoppingCart {...iconProps} {...props} />;
  } else if (eventType.startsWith('system')) {
    return (props) => <Info {...iconProps} {...props} />;
  }

  return (props) => <Bell {...iconProps} {...props} />;
};
