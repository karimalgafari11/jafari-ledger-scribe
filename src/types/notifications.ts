
export type NotificationChannel = 'email' | 'sms' | 'in-app' | 'push' | 'slack' | 'webhook';

export type NotificationPriority = 'low' | 'medium' | 'high' | 'critical';

export interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  channels: NotificationChannel[];
  variables: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface NotificationSettings {
  id: string;
  userId: string;
  eventType: string;
  channels: {
    [key in NotificationChannel]?: {
      enabled: boolean;
      threshold?: NotificationPriority;
    }
  };
  scheduleQuiet?: {
    enabled: boolean;
    start: string; // Format: "HH:MM"
    end: string; // Format: "HH:MM"
    timezone: string;
  };
  muted: boolean;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  priority: NotificationPriority;
  channel: NotificationChannel;
  eventType: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  read: boolean;
  createdAt: Date;
  deliveryStatus?: 'pending' | 'sent' | 'delivered' | 'failed';
  retryCount?: number;
}

export interface NotificationBatch {
  id: string;
  notifications: Notification[];
  createdAt: Date;
  processedAt?: Date;
  status: 'pending' | 'processing' | 'complete' | 'failed';
}

export type NotificationEvent = 
  | 'inventory.low_stock'
  | 'inventory.out_of_stock'
  | 'expenses.pending_approval'
  | 'expenses.approved'
  | 'expenses.rejected'
  | 'invoices.created'
  | 'invoices.paid'
  | 'invoices.overdue'
  | 'customer.payment_received'
  | 'customer.credit_limit_reached'
  | 'system.backup_complete'
  | 'system.backup_failed'
  | 'system.login_failed'
  | 'system.suspicious_activity';
