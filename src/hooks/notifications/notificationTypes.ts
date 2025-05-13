
import { 
  Notification, 
  NotificationSettings,
  NotificationChannel,
  NotificationPriority,
  NotificationTemplate
} from '@/types/notifications';

export interface NotificationState {
  notifications: Notification[];
  notificationSettings: NotificationSettings[];
  templates: NotificationTemplate[];
  isLoading: boolean;
}

export interface NotificationHookReturn {
  notifications: Notification[];
  notificationSettings: NotificationSettings[];
  templates: NotificationTemplate[];
  unreadCount: number;
  isLoading: boolean;
  getNotificationSettings: (userId: string, eventType: string) => NotificationSettings | undefined;
  updateNotificationSettings: (settings: NotificationSettings) => Promise<boolean>;
  markAsRead: (notificationId: string) => Promise<boolean>;
  markAllAsRead: () => Promise<boolean>;
  deleteNotification: (notificationId: string) => Promise<boolean>;
  sendNotification: (
    userId: string,
    eventType: string,
    priority: NotificationPriority,
    data: Record<string, any>,
    channels?: NotificationChannel[]
  ) => Promise<boolean>;
  getTemplate: (templateId: string) => NotificationTemplate | undefined;
  updateTemplate: (template: NotificationTemplate) => Promise<boolean>;
  calculateDiscount: (amount: number, type: 'percentage' | 'fixed', value: number) => number;
}
