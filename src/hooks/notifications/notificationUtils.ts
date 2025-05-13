
import { Notification, NotificationTemplate, NotificationPriority } from '@/types/notifications';

export const findTemplateById = (
  templates: NotificationTemplate[], 
  templateId: string
): NotificationTemplate | undefined => {
  return templates.find(template => template.id === templateId);
};

export const calculateDiscount = (
  amount: number, 
  type: 'percentage' | 'fixed', 
  value: number
): number => {
  if (type === 'percentage') {
    return (amount * value) / 100;
  }
  return value;
};

export const formatDateForDisplay = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  // Less than a minute
  if (diff < 60000) {
    return 'الآن';
  }
  
  // Less than an hour
  if (diff < 3600000) {
    const minutes = Math.floor(diff / 60000);
    return `منذ ${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`;
  }
  
  // Less than a day
  if (diff < 86400000) {
    const hours = Math.floor(diff / 3600000);
    return `منذ ${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
  }
  
  // Less than a week
  if (diff < 604800000) {
    const days = Math.floor(diff / 86400000);
    return `منذ ${days} ${days === 1 ? 'يوم' : 'أيام'}`;
  }
  
  // Format as date
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getPriorityClass = (priority: NotificationPriority): string => {
  switch (priority) {
    case 'critical':
      return 'text-red-600 bg-red-100';
    case 'high':
      return 'text-amber-600 bg-amber-100';
    case 'medium':
      return 'text-blue-600 bg-blue-100';
    case 'low':
    default:
      return 'text-green-600 bg-green-100';
  }
};

export const getNotificationIcon = (type: string): string => {
  if (type.startsWith('inventory')) {
    return 'package';
  } else if (type.startsWith('invoices')) {
    return 'file-text';
  } else if (type.startsWith('expenses')) {
    return 'credit-card';
  } else if (type.startsWith('customer')) {
    return 'users';
  } else if (type.startsWith('system')) {
    return 'settings';
  }
  return 'bell';
};

export const getCategoryName = (eventType: string): string => {
  if (eventType.startsWith('inventory')) {
    return 'المخزون';
  } else if (eventType.startsWith('invoices')) {
    return 'الفواتير';
  } else if (eventType.startsWith('expenses')) {
    return 'المصروفات';
  } else if (eventType.startsWith('customer')) {
    return 'العملاء';
  } else if (eventType.startsWith('system')) {
    return 'النظام';
  }
  return 'تنبيه';
};
