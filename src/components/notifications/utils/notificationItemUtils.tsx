
import React from 'react';
import { BellRing, AlertCircle, AlertTriangle, AlertOctagon } from 'lucide-react';
import { NotificationPriority } from '@/types/notifications';

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
