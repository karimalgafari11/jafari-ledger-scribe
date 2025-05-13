
import React from 'react';
import { NotificationPriority } from '@/types/notifications';
import { AlertOctagon, AlertTriangle, Bell, Info } from 'lucide-react';

export const getPriorityIcon = (priority: NotificationPriority) => {
  switch (priority) {
    case 'critical':
      return (
        <div className="p-1 rounded-full bg-red-100">
          <AlertOctagon className="h-4 w-4 text-red-600" />
        </div>
      );
    case 'high':
      return (
        <div className="p-1 rounded-full bg-amber-100">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
        </div>
      );
    case 'medium':
      return (
        <div className="p-1 rounded-full bg-blue-100">
          <Info className="h-4 w-4 text-blue-600" />
        </div>
      );
    case 'low':
    default:
      return (
        <div className="p-1 rounded-full bg-green-100">
          <Bell className="h-4 w-4 text-green-600" />
        </div>
      );
  }
};

export const getPriorityText = (priority: NotificationPriority): string => {
  switch (priority) {
    case 'critical':
      return 'حرجة';
    case 'high':
      return 'عالية';
    case 'medium':
      return 'متوسطة';
    case 'low':
    default:
      return 'منخفضة';
  }
};
