
import { NotificationPriority } from '@/types/notifications';
import { CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

// Generate priority icon based on notification priority
export const getPriorityIcon = (priority: NotificationPriority) => {
  switch (priority) {
    case 'critical':
      return <AlertCircle className="h-5 w-5 text-red-500" />;
    case 'high':
      return <AlertTriangle className="h-5 w-5 text-amber-500" />;
    case 'medium':
      return <Info className="h-5 w-5 text-blue-500" />;
    case 'low':
    default:
      return <CheckCircle className="h-5 w-5 text-green-500" />;
  }
};

// Format time to Arabic locale
export const formatTimeAgo = (date: Date) => {
  return formatDistanceToNow(date, { 
    addSuffix: true, 
    locale: ar 
  });
};

// Get category label for notification
export const getCategoryLabel = (eventType: string) => {
  const category = eventType.split('.')[0];
  
  switch (category) {
    case 'inventory':
      return 'المخزون';
    case 'invoices':
      return 'الفواتير';
    case 'expenses':
      return 'المصروفات';
    case 'customer':
      return 'العملاء';
    case 'system':
      return 'النظام';
    default:
      return 'عام';
  }
};

// Get color for category badge
export const getCategoryColor = (eventType: string) => {
  const category = eventType.split('.')[0];
  
  switch (category) {
    case 'inventory':
      return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200';
    case 'invoices':
      return 'bg-sky-100 text-sky-800 hover:bg-sky-200';
    case 'expenses':
      return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    case 'customer':
      return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
    case 'system':
      return 'bg-red-100 text-red-800 hover:bg-red-200';
    default:
      return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};
