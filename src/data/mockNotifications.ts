
import { 
  Notification, 
  NotificationSettings, 
  NotificationTemplate,
  NotificationEvent 
} from '@/types/notifications';

// Mock notification templates
export const mockNotificationTemplates: NotificationTemplate[] = [
  {
    id: 'template-1',
    name: 'مخزون منخفض',
    subject: 'تنبيه: مخزون منخفض لمنتج {{productName}}',
    content: 'عزيزي {{userName}}،\n\nنود إعلامك أن مخزون المنتج {{productName}} قد وصل إلى مستوى منخفض ({{currentQuantity}} وحدة). الحد الأدنى المطلوب هو {{reorderLevel}} وحدة.\n\nيرجى إعادة طلب هذا المنتج في أقرب وقت ممكن.\n\nشكراً،\nنظام إدارة المخزون',
    channels: ['email', 'in-app', 'sms'],
    variables: ['userName', 'productName', 'currentQuantity', 'reorderLevel'],
    createdAt: new Date('2023-06-15'),
    updatedAt: new Date('2023-06-15'),
  },
  {
    id: 'template-2',
    name: 'فاتورة متأخرة',
    subject: 'تذكير: فاتورة متأخرة #{{invoiceNumber}}',
    content: 'عزيزي {{userName}}،\n\nنود تذكيرك بأن الفاتورة رقم {{invoiceNumber}} بقيمة {{amount}} ريال مستحقة منذ {{dueDate}} ومتأخرة الآن بـ {{daysOverdue}} يوم.\n\nيرجى سداد المبلغ في أقرب وقت ممكن.\n\nشكراً،\nقسم المحاسبة',
    channels: ['email', 'in-app', 'sms'],
    variables: ['userName', 'invoiceNumber', 'amount', 'dueDate', 'daysOverdue'],
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2023-07-05'),
  },
  {
    id: 'template-3',
    name: 'تنبيه أمان',
    subject: 'تنبيه أمان: {{alertType}}',
    content: 'عزيزي {{userName}}،\n\nتم تسجيل نشاط مشبوه في حسابك: {{alertDetails}}\n\nوقت النشاط: {{timestamp}}\n\nالمكان: {{location}}\n\nعنوان IP: {{ipAddress}}\n\nإذا لم تكن أنت من قام بهذا النشاط، يرجى تغيير كلمة المرور الخاصة بك فوراً والاتصال بمسؤول النظام.\n\nشكراً،\nفريق الأمان',
    channels: ['email', 'in-app', 'sms', 'push'],
    variables: ['userName', 'alertType', 'alertDetails', 'timestamp', 'location', 'ipAddress'],
    createdAt: new Date('2023-07-10'),
    updatedAt: new Date('2023-07-10'),
  },
];

// Mock notification settings
export const mockNotificationSettings: NotificationSettings[] = [
  {
    id: 'settings-1',
    userId: 'user1',
    eventType: 'inventory.low_stock',
    channels: {
      'email': { enabled: true, threshold: 'medium' },
      'in-app': { enabled: true, threshold: 'low' },
      'sms': { enabled: false },
      'push': { enabled: true, threshold: 'high' },
    },
    scheduleQuiet: {
      enabled: true,
      start: '22:00',
      end: '08:00',
      timezone: 'Asia/Riyadh',
    },
    muted: false,
    updatedAt: new Date(),
  },
  {
    id: 'settings-2',
    userId: 'user1',
    eventType: 'expenses.pending_approval',
    channels: {
      'email': { enabled: true, threshold: 'low' },
      'in-app': { enabled: true, threshold: 'low' },
      'sms': { enabled: false },
      'push': { enabled: false },
    },
    muted: false,
    updatedAt: new Date(),
  },
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user1',
    title: 'مخزون منخفض',
    message: 'المنتج "قميص قطني" وصل إلى مستوى منخفض (5 وحدات)',
    priority: 'medium',
    channel: 'in-app',
    eventType: 'inventory.low_stock',
    relatedEntityId: 'product-123',
    relatedEntityType: 'product',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    deliveryStatus: 'delivered',
  },
  {
    id: 'notif-2',
    userId: 'user1',
    title: 'مصروف ينتظر الموافقة',
    message: 'هناك مصروف جديد بقيمة 1,500 ريال ينتظر موافقتك',
    priority: 'low',
    channel: 'in-app',
    eventType: 'expenses.pending_approval',
    relatedEntityId: 'expense-456',
    relatedEntityType: 'expense',
    read: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    deliveryStatus: 'delivered',
  },
  {
    id: 'notif-3',
    userId: 'user1',
    title: 'تنبيه أمان',
    message: 'تم تسجيل دخول غير معتاد من موقع جديد',
    priority: 'high',
    channel: 'in-app',
    eventType: 'system.suspicious_activity',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    deliveryStatus: 'delivered',
  },
  {
    id: 'notif-4',
    userId: 'user1',
    title: 'فاتورة متأخرة',
    message: 'الفاتورة رقم INV-2023-054 متأخرة منذ 15 يوم',
    priority: 'medium',
    channel: 'in-app',
    eventType: 'invoices.overdue',
    relatedEntityId: 'invoice-789',
    relatedEntityType: 'invoice',
    read: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    deliveryStatus: 'delivered',
  },
];

// Event to template mapping
export const eventTemplateMapping: Record<NotificationEvent, string> = {
  'inventory.low_stock': 'template-1',
  'inventory.out_of_stock': 'template-1',
  'expenses.pending_approval': 'template-2',
  'expenses.approved': 'template-2',
  'expenses.rejected': 'template-2',
  'invoices.created': 'template-2',
  'invoices.paid': 'template-2',
  'invoices.overdue': 'template-2',
  'customer.payment_received': 'template-2',
  'customer.credit_limit_reached': 'template-2',
  'system.backup_complete': 'template-3',
  'system.backup_failed': 'template-3',
  'system.login_failed': 'template-3',
  'system.suspicious_activity': 'template-3',
};
