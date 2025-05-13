import { useState, useEffect } from 'react';
import { mockNotifications } from '@/data/mockNotifications';
import { Notification, NotificationSettings, NotificationTemplate } from '@/types/notifications';
import { toast } from 'sonner';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications || []);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Mock notification settings with channels for each event type
  const defaultSettings: NotificationSettings[] = [
    {
      id: '1',
      userId: 'current-user',
      eventType: 'inventory.low_stock',
      channels: {
        'email': { enabled: true, threshold: 'medium' },
        'in-app': { enabled: true, threshold: 'low' },
        'push': { enabled: false },
        'sms': { enabled: false },
        'slack': { enabled: false },
        'webhook': { enabled: false }
      },
      muted: false,
      updatedAt: new Date()
    },
    {
      id: '2',
      userId: 'current-user',
      eventType: 'invoices.overdue',
      channels: {
        'email': { enabled: true, threshold: 'high' },
        'in-app': { enabled: true, threshold: 'medium' },
        'push': { enabled: true, threshold: 'high' },
        'sms': { enabled: false },
        'slack': { enabled: false },
        'webhook': { enabled: false }
      },
      muted: false,
      updatedAt: new Date()
    },
    {
      id: '3',
      userId: 'current-user',
      eventType: 'system.backup_failed',
      channels: {
        'email': { enabled: true, threshold: 'critical' },
        'in-app': { enabled: true, threshold: 'critical' },
        'push': { enabled: true, threshold: 'critical' },
        'sms': { enabled: true, threshold: 'critical' },
        'slack': { enabled: false },
        'webhook': { enabled: false }
      },
      scheduleQuiet: {
        enabled: true,
        start: '22:00',
        end: '08:00',
        timezone: 'Asia/Riyadh'
      },
      muted: false,
      updatedAt: new Date()
    }
  ];

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings[]>(defaultSettings);

  // Mock notification templates
  const defaultTemplates: NotificationTemplate[] = [
    {
      id: '1',
      name: 'قالب المخزون المنخفض',
      subject: 'تنبيه: المخزون المنخفض لـ {{product_name}}',
      content: 'عزيزي {{user_name}},\n\nالمنتج {{product_name}} وصل إلى مستوى مخزون منخفض ({{current_stock}} متبقي). الرجاء إعادة الطلب قريبًا.\n\nشكراً لك',
      channels: ['email', 'in-app'],
      variables: ['user_name', 'product_name', 'current_stock'],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      name: 'قالب الفواتير المستحقة',
      subject: 'تذكير: الفاتورة {{invoice_number}} مستحقة الآن',
      content: 'عزيزي {{customer_name}},\n\nالفاتورة رقم {{invoice_number}} بقيمة {{amount}} ريال مستحقة الدفع منذ {{due_date}}.\n\nالرجاء سداد المبلغ في أقرب وقت ممكن.',
      channels: ['email', 'sms', 'in-app'],
      variables: ['customer_name', 'invoice_number', 'amount', 'due_date'],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  const [templates, setTemplates] = useState<NotificationTemplate[]>(defaultTemplates);

  // Fetch notification data
  useEffect(() => {
    // Simulate API fetch
    const loadNotifications = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setNotifications(mockNotifications);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load notifications');
        setIsLoading(false);
      }
    };

    loadNotifications();
  }, []);

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    toast.success('تم تحديد الإشعار كمقروء');
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prevNotifications => 
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
    toast.success('تم تحديد جميع الإشعارات كمقروءة');
  };

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => notification.id !== id)
    );
    toast.success('تم حذف الإشعار');
  };

  // Delete multiple notifications
  const deleteNotifications = (ids: string[]) => {
    setNotifications(prevNotifications => 
      prevNotifications.filter(notification => !ids.includes(notification.id))
    );
    toast.success(`تم حذف ${ids.length} إشعارات`);
  };

  // Update notification settings
  const updateNotificationSettings = (updatedSetting: NotificationSettings) => {
    setNotificationSettings(prevSettings => 
      prevSettings.map(setting => 
        setting.id === updatedSetting.id ? updatedSetting : setting
      )
    );
  };

  // Update notification template
  const updateTemplate = (updatedTemplate: NotificationTemplate) => {
    setTemplates(prevTemplates => 
      prevTemplates.map(template => 
        template.id === updatedTemplate.id ? updatedTemplate : template
      )
    );
    toast.success('تم تحديث قالب الإشعار');
  };

  // Send notification (mock implementation)
  const sendNotification = (title: string, message: string, recipients: string[], priority: any) => {
    toast.success('تم إرسال الإشعار بنجاح');
    return true;
  };

  return {
    notifications,
    isLoading,
    error,
    notificationSettings,
    templates,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    deleteNotifications,
    updateNotificationSettings,
    updateTemplate,
    sendNotification
  };
};
