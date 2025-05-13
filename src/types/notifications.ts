
export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';
export type NotificationChannel = 'email' | 'sms' | 'in-app' | 'push' | 'slack' | 'webhook';
export type NotificationEvent = string;

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

export interface ChannelConfig {
  enabled: boolean;
  threshold?: NotificationPriority;
}

export interface NotificationSettings {
  id: string;
  eventType: string;
  muted: boolean;
  channels: Record<NotificationChannel, ChannelConfig>;
  scheduleQuiet?: {
    startTime: string;
    endTime: string;
    enabled: boolean;
    timezone?: string;
  };
  userId?: string;
  updatedAt?: Date;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
  channels: NotificationChannel[];
  createdAt?: Date;
  updatedAt?: Date;
}
