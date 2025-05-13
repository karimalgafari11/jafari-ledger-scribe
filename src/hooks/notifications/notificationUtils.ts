
export const calculateDiscount = (amount: number, type: 'percentage' | 'fixed', value: number): number => {
  if (type === 'percentage') {
    return amount * (value / 100);
  } else {
    return Math.min(value, amount);
  }
};

export const getTranslatedChannelName = (channel: string): string => {
  switch (channel) {
    case "email":
      return "البريد الإلكتروني";
    case "sms":
      return "الرسائل النصية";
    case "in-app":
      return "داخل التطبيق";
    case "push":
      return "إشعارات الجوال";
    case "slack":
      return "سلاك";
    case "webhook":
      return "ويب هوك";
    default:
      return channel;
  }
};

export const getPriorityTranslation = (priority: string): string => {
  switch (priority) {
    case "low":
      return "منخفضة";
    case "medium":
      return "متوسطة";
    case "high":
      return "عالية";
    case "critical":
      return "حرجة";
    default:
      return priority;
  }
};

// Add the missing functions
export const formatDateForDisplay = (date: Date): string => {
  // Check if less than a minute ago
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return "الآن";
  }
  
  // Check if less than an hour ago
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `منذ ${diffInMinutes} دقيقة`;
  }
  
  // Check if less than a day ago
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `منذ ${diffInHours} ساعة`;
  }
  
  // Check if less than a week ago
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `منذ ${diffInDays} يوم`;
  }
  
  // Format the date
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
};

export const getCategoryName = (eventType: string): string => {
  if (eventType.startsWith('inventory')) {
    return 'المخزون';
  } else if (eventType.startsWith('expenses')) {
    return 'المصروفات';
  } else if (eventType.startsWith('invoices')) {
    return 'الفواتير';
  } else if (eventType.startsWith('customer')) {
    return 'العملاء';
  } else if (eventType.startsWith('system')) {
    return 'النظام';
  } else {
    return 'أخرى';
  }
};

export const getNotificationIcon = (eventType: string): string => {
  if (eventType.startsWith('inventory')) {
    return 'package';
  } else if (eventType.startsWith('expenses')) {
    return 'credit-card';
  } else if (eventType.startsWith('invoices')) {
    return 'file-text';
  } else if (eventType.startsWith('customer')) {
    return 'users';
  } else if (eventType.startsWith('system')) {
    return 'settings';
  } else {
    return 'bell';
  }
};
