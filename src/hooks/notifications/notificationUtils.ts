
import { Bell, FileWarning, DollarSign, Package, ShoppingCart, Info, AlertTriangle, CheckCircle, Mail, MessageSquare, BellRing, MessageCircle, Webhook } from "lucide-react";
import { NotificationPriority, NotificationChannel } from "@/types/notifications";

export const getNotificationIcon = (eventType: string) => {
  if (eventType.startsWith("inventory")) return <Package size={18} />;
  if (eventType.startsWith("expenses")) return <DollarSign size={18} />;
  if (eventType.startsWith("invoices")) return <FileWarning size={18} />;
  if (eventType.startsWith("customer")) return <ShoppingCart size={18} />;
  if (eventType.startsWith("system")) return <Info size={18} />;
  return <Bell size={18} />;
};

export const getCategoryName = (eventType: string) => {
  if (eventType.startsWith("inventory")) return "المخزون";
  if (eventType.startsWith("expenses")) return "المصروفات";
  if (eventType.startsWith("invoices")) return "الفواتير";
  if (eventType.startsWith("customer")) return "العملاء";
  if (eventType.startsWith("system")) return "النظام";
  return "عام";
};

export const formatDateForDisplay = (date: Date) => {
  // Format date for Arabic locale and handle time difference
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffMinutes < 60) {
    return `منذ ${diffMinutes} دقيقة`;
  } else if (diffHours < 24) {
    return `منذ ${diffHours} ساعة`;
  } else if (diffDays < 7) {
    return `منذ ${diffDays} يوم`;
  } else {
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

export const getTranslatedChannelName = (channelName: string): string => {
  const channelTranslations: Record<string, string> = {
    'email': 'البريد الإلكتروني',
    'sms': 'رسائل SMS',
    'in-app': 'داخل التطبيق',
    'push': 'إشعارات الجوال',
    'slack': 'سلاك',
    'webhook': 'ويب هوك'
  };

  return channelTranslations[channelName] || channelName;
};

export const getPriorityTranslation = (priority: string): string => {
  const priorityTranslations: Record<string, string> = {
    'low': 'منخفضة',
    'medium': 'متوسطة',
    'high': 'عالية',
    'critical': 'حرجة'
  };

  return priorityTranslations[priority] || priority;
};

export const getPriorityColor = (priority: NotificationPriority): string => {
  const priorityColors: Record<NotificationPriority, string> = {
    'low': 'bg-blue-100 text-blue-800 border-blue-200',
    'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'high': 'bg-orange-100 text-orange-800 border-orange-200',
    'critical': 'bg-red-100 text-red-800 border-red-200'
  };

  return priorityColors[priority] || 'bg-gray-100 text-gray-800';
};

export const getChannelIcon = (channel: NotificationChannel) => {
  const channelIcons: Record<string, JSX.Element> = {
    'email': <Mail size={16} />,
    'sms': <MessageSquare size={16} />,
    'in-app': <Bell size={16} />,
    'push': <BellRing size={16} />,
    'slack': <MessageCircle size={16} />,
    'webhook': <Webhook size={16} />
  };

  return channelIcons[channel] || <Bell size={16} />;
};
