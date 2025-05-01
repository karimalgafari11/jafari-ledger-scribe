
import { useState } from 'react';
import { 
  Notification, 
  NotificationSettings,
  NotificationChannel,
  NotificationPriority,
  NotificationTemplate,
  NotificationEvent
} from '@/types/notifications';
import { mockNotifications, mockNotificationSettings, mockNotificationTemplates } from '@/data/mockNotifications';
import { toast } from 'sonner';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings[]>(mockNotificationSettings);
  const [templates, setTemplates] = useState<NotificationTemplate[]>(mockNotificationTemplates);
  const [isLoading, setIsLoading] = useState(false);
  
  // إحصاء الإشعارات غير المقروءة
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // الحصول على إعدادات الإشعارات لمستخدم وحدث معين
  const getNotificationSettings = (
    userId: string, 
    eventType: string
  ): NotificationSettings | undefined => {
    return notificationSettings.find(
      settings => settings.userId === userId && settings.eventType === eventType
    );
  };
  
  // تحديث إعدادات الإشعارات
  const updateNotificationSettings = async (settings: NotificationSettings): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setNotificationSettings(prev => 
        prev.map(s => s.id === settings.id ? {
          ...settings,
          updatedAt: new Date()
        } : s)
      );
      
      toast.success('تم تحديث إعدادات الإشعارات بنجاح');
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث إعدادات الإشعارات');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // تعيين الإشعار كمقروء
  const markAsRead = async (notificationId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء تعيين الإشعار كمقروء');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // تعيين جميع الإشعارات كمقروءة
  const markAllAsRead = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
      
      toast.success('تم تعيين جميع الإشعارات كمقروءة');
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء تعيين جميع الإشعارات كمقروءة');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // حذف إشعار
  const deleteNotification = async (notificationId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setNotifications(prev => 
        prev.filter(n => n.id !== notificationId)
      );
      
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء حذف الإشعار');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // إرسال إشعار
  const sendNotification = async (
    userId: string,
    eventType: NotificationEvent,
    priority: NotificationPriority,
    data: Record<string, any>,
    channels?: NotificationChannel[]
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // إنشاء إشعار جديد
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        userId,
        title: data.title || eventType.split('.').join(' '),
        message: data.message || JSON.stringify(data),
        priority,
        channel: 'in-app', // نبدأ بإشعارات داخل التطبيق فقط
        eventType,
        relatedEntityId: data.entityId,
        relatedEntityType: data.entityType,
        read: false,
        createdAt: new Date(),
        deliveryStatus: 'delivered',
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      
      // عرض الإشعار في toast
      const toastType = priority === 'high' || priority === 'critical' ? 
        toast.error : priority === 'medium' ? 
        toast.warning : toast.info;
      
      toastType(`${newNotification.title}: ${newNotification.message}`);
      
      return true;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // إدارة قوالب الإشعارات
  const getTemplate = (templateId: string): NotificationTemplate | undefined => {
    return templates.find(t => t.id === templateId);
  };
  
  // تحديث قالب الإشعار
  const updateTemplate = async (template: NotificationTemplate): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // محاكاة استدعاء API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setTemplates(prev => 
        prev.map(t => t.id === template.id ? {
          ...template,
          updatedAt: new Date()
        } : t)
      );
      
      toast.success('تم تحديث قالب الإشعار بنجاح');
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء تحديث قالب الإشعار');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    notifications,
    notificationSettings,
    templates,
    unreadCount,
    isLoading,
    getNotificationSettings,
    updateNotificationSettings,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    sendNotification,
    getTemplate,
    updateTemplate
  };
}
