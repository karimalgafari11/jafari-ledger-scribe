
import { Notification, NotificationSettings, NotificationTemplate, ChannelConfig } from '@/types/notifications';

// Sample notification events
export const notificationEvents: { id: string, name: string, description: string }[] = [
  { id: 'inventory.low_stock', name: 'مخزون منخفض', description: 'عند وصول مخزون منتج إلى مستوى منخفض' },
  { id: 'inventory.out_of_stock', name: 'نفاد المخزون', description: 'عند نفاد مخزون منتج' },
  { id: 'expenses.pending_approval', name: 'مصروف ينتظر الموافقة', description: 'عند إنشاء مصروف جديد يحتاج موافقة' },
  { id: 'expenses.approved', name: 'تمت الموافقة على المصروف', description: 'عند الموافقة على مصروف' },
  { id: 'expenses.rejected', name: 'تم رفض المصروف', description: 'عند رفض مصروف' },
  { id: 'invoices.created', name: 'تم إنشاء فاتورة جديدة', description: 'عند إنشاء فاتورة جديدة' },
  { id: 'invoices.paid', name: 'تم دفع فاتورة', description: 'عند دفع قيمة فاتورة' },
  { id: 'invoices.overdue', name: 'فاتورة متأخرة', description: 'عند تأخر سداد فاتورة عن موعدها' },
  { id: 'customer.payment_received', name: 'تم استلام دفعة من العميل', description: 'عند استلام دفعة من العميل' },
  { id: 'customer.credit_limit_reached', name: 'تم الوصول للحد الائتماني', description: 'عند وصول عميل إلى حد الائتمان المسموح' },
  { id: 'system.backup_complete', name: 'اكتمال النسخ الاحتياطي', description: 'عند اكتمال النسخ الاحتياطي للنظام بنجاح' },
  { id: 'system.backup_failed', name: 'فشل النسخ الاحتياطي', description: 'عند فشل النسخ الاحتياطي للنظام' },
  { id: 'system.login_failed', name: 'فشل تسجيل الدخول', description: 'عند تسجيل محاولة دخول فاشلة للنظام' },
  { id: 'system.suspicious_activity', name: 'نشاط مشبوه', description: 'عند اكتشاف نشاط مشبوه في الحساب' },
];

// Sample notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    userId: 'user1',
    title: 'مخزون منخفض',
    message: 'المنتج "طابعة HP" وصل إلى مستوى المخزون المنخفض (5 وحدات)',
    priority: 'medium',
    channel: 'in-app',
    eventType: 'inventory.low_stock',
    relatedEntityId: 'product123',
    relatedEntityType: 'product',
    read: false,
    createdAt: new Date(new Date().getTime() - 30 * 60000), // 30 minutes ago
  },
  {
    id: '2',
    userId: 'user1',
    title: 'فاتورة متأخرة',
    message: 'الفاتورة رقم #INV-2023-042 متأخرة عن موعد السداد بـ 3 أيام',
    priority: 'high',
    channel: 'in-app',
    eventType: 'invoices.overdue',
    relatedEntityId: 'invoice042',
    relatedEntityType: 'invoice',
    read: true,
    createdAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60000), // 2 days ago
  },
  {
    id: '3',
    userId: 'user1',
    title: 'مصروف ينتظر الموافقة',
    message: 'هناك مصروف جديد بقيمة 1500 ريال ينتظر موافقتك',
    priority: 'low',
    channel: 'in-app',
    eventType: 'expenses.pending_approval',
    relatedEntityId: 'expense085',
    relatedEntityType: 'expense',
    read: false,
    createdAt: new Date(new Date().getTime() - 6 * 60 * 60000), // 6 hours ago
  },
  {
    id: '4',
    userId: 'user1',
    title: 'نفاد المخزون',
    message: 'المنتج "قلم حبر أزرق" نفد من المخزون',
    priority: 'critical',
    channel: 'in-app',
    eventType: 'inventory.out_of_stock',
    relatedEntityId: 'product456',
    relatedEntityType: 'product',
    read: false,
    createdAt: new Date(new Date().getTime() - 45 * 60000), // 45 minutes ago
  },
  {
    id: '5',
    userId: 'user1',
    title: 'تم اكتمال النسخ الاحتياطي',
    message: 'تم اكتمال النسخ الاحتياطي للنظام بنجاح',
    priority: 'low',
    channel: 'in-app',
    eventType: 'system.backup_complete',
    read: true,
    createdAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60000), // 5 days ago
  },
];

// Sample notification settings
export const mockNotificationSettings: NotificationSettings[] = notificationEvents.map((event, index) => {
  const emailEnabled = ['inventory.out_of_stock', 'invoices.overdue', 'system.backup_failed'].includes(event.id);
  const smsEnabled = ['inventory.out_of_stock', 'system.suspicious_activity'].includes(event.id);
  const pushEnabled = ['inventory.low_stock', 'inventory.out_of_stock', 'invoices.overdue'].includes(event.id);
  
  const channels: Record<string, ChannelConfig> = {
    'email': { enabled: emailEnabled, threshold: emailEnabled ? ('high' as const) : undefined },
    'sms': { enabled: smsEnabled, threshold: smsEnabled ? ('critical' as const) : undefined },
    'in-app': { enabled: true, threshold: 'low' as const },
    'push': { enabled: pushEnabled, threshold: pushEnabled ? ('medium' as const) : undefined },
    'slack': { enabled: false },
    'webhook': { enabled: false },
  };
  
  const scheduleQuiet = index % 3 === 0 ? {
    enabled: true,
    startTime: '22:00',
    endTime: '07:00',
    timezone: 'Asia/Riyadh'
  } : undefined;
  
  return {
    id: `setting${index + 1}`,
    userId: 'user1',
    eventType: event.id,
    channels: channels as Record<string, ChannelConfig>,
    scheduleQuiet,
    muted: index === notificationEvents.length - 1, // Mute the last one
    updatedAt: new Date(),
  };
});

// Sample notification templates
export const mockNotificationTemplates: NotificationTemplate[] = [
  {
    id: 'template1',
    name: 'قالب مخزون منخفض',
    subject: 'تنبيه: مخزون منخفض لمنتج {{productName}}',
    content: `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>تنبيه مخزون منخفض</h2>
        <p>عزيزي {{userName}}،</p>
        <p>نود إعلامك بأن المنتج <strong>{{productName}}</strong> قد وصل إلى مستوى المخزون المنخفض ({{currentStock}} وحدة).</p>
        <p>الحد الأدنى للمخزون المحدد: <strong>{{minStock}} وحدة</strong></p>
        <p>يرجى النظر في إعادة تعبئة المخزون في أقرب وقت ممكن.</p>
        <div style="margin-top: 20px;">
          <a href="{{productLink}}" style="background-color: #3498db; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">عرض تفاصيل المنتج</a>
        </div>
        <p style="margin-top: 20px;">شكراً لك،<br>فريق نظام المحاسبة</p>
      </div>
    `,
    channels: ['email', 'in-app'],
    variables: ['productName', 'userName', 'currentStock', 'minStock', 'productLink'],
    updatedAt: new Date()
  },
  {
    id: 'template2',
    name: 'قالب فاتورة متأخرة',
    subject: 'تنبيه: فاتورة متأخرة #{{invoiceNumber}}',
    content: `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>تذكير بفاتورة متأخرة</h2>
        <p>عزيزي {{userName}}،</p>
        <p>نود تذكيرك بأن الفاتورة رقم <strong>#{{invoiceNumber}}</strong> المستحقة بتاريخ <strong>{{dueDate}}</strong> لا تزال غير مدفوعة.</p>
        <p>تفاصيل الفاتورة:</p>
        <ul>
          <li>رقم الفاتورة: <strong>#{{invoiceNumber}}</strong></li>
          <li>تاريخ الإصدار: <strong>{{issueDate}}</strong></li>
          <li>تاريخ الاستحقاق: <strong>{{dueDate}}</strong></li>
          <li>المبلغ المستحق: <strong>{{amount}} {{currency}}</strong></li>
          <li>تأخير الدفع: <strong>{{daysOverdue}} أيام</strong></li>
        </ul>
        <div style="margin-top: 20px;">
          <a href="{{invoiceLink}}" style="background-color: #3498db; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">عرض الفاتورة</a>
        </div>
        <p style="margin-top: 20px;">شكراً لك،<br>فريق نظام المحاسبة</p>
      </div>
    `,
    channels: ['email', 'sms', 'in-app'],
    variables: ['invoiceNumber', 'userName', 'dueDate', 'issueDate', 'amount', 'currency', 'daysOverdue', 'invoiceLink'],
    updatedAt: new Date()
  },
  {
    id: 'template3',
    name: 'قالب مصروف ينتظر الموافقة',
    subject: 'مصروف بقيمة {{amount}} {{currency}} ينتظر موافقتك',
    content: `
      <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>مصروف ينتظر الموافقة</h2>
        <p>عزيزي {{approverName}}،</p>
        <p>هناك مصروف جديد بقيمة <strong>{{amount}} {{currency}}</strong> ينتظر موافقتك.</p>
        <p>تفاصيل المصروف:</p>
        <ul>
          <li>وصف: <strong>{{description}}</strong></li>
          <li>المبلغ: <strong>{{amount}} {{currency}}</strong></li>
          <li>التاريخ: <strong>{{date}}</strong></li>
          <li>مقدم الطلب: <strong>{{requesterName}}</strong></li>
          <li>القسم: <strong>{{department}}</strong></li>
        </ul>
        <div style="margin-top: 20px;">
          <a href="{{approvalLink}}" style="background-color: #2ecc71; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; margin-right: 10px;">موافقة</a>
          <a href="{{rejectLink}}" style="background-color: #e74c3c; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">رفض</a>
        </div>
        <p style="margin-top: 20px;">شكراً لك،<br>فريق نظام المحاسبة</p>
      </div>
    `,
    channels: ['email', 'in-app'],
    variables: ['approverName', 'amount', 'currency', 'description', 'date', 'requesterName', 'department', 'approvalLink', 'rejectLink'],
    updatedAt: new Date()
  },
];
