
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
