
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';
export type NotificationChannel = 'email' | 'sms' | 'in-app' | 'push' | 'slack' | 'webhook';

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  priority: NotificationPriority;
  channel: NotificationChannel;
  eventType: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  createdAt: Date;
  deliveryStatus?: 'pending' | 'delivered' | 'failed';
  userId?: string;
}

export interface NotificationSettings {
  id: string;
  eventType: string;
  muted: boolean;
  channels: Record<NotificationChannel, boolean>;
  scheduleQuiet?: {
    startTime: string;
    endTime: string;
    enabled: boolean;
  };
  userId?: string;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
  channels: NotificationChannel[];
}
