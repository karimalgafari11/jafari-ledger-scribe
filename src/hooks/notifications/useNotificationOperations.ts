
import { useState } from 'react';
import { toast } from 'sonner';
import { 
  Notification, 
  NotificationChannel,
  NotificationEvent,
  NotificationPriority
} from '@/types/notifications';

export function useNotificationOperations(
  initialNotifications: Notification[]
) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isLoading, setIsLoading] = useState(false);
  
  // Count of unread notifications
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Mark a notification as read
  const markAsRead = async (notificationId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulating API call
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
  
  // Mark all notifications as read
  const markAllAsRead = async (): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulating API call
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
  
  // Delete a notification
  const deleteNotification = async (notificationId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulating API call
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
  
  // Send a new notification
  const sendNotification = async (
    userId: string,
    eventType: NotificationEvent,
    priority: NotificationPriority,
    data: Record<string, any>,
    channels?: NotificationChannel[]
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create a new notification
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        userId,
        title: data.title || eventType.split('.').join(' '),
        message: data.message || JSON.stringify(data),
        priority,
        channel: 'in-app', // Start with in-app notifications only
        eventType,
        relatedEntityId: data.entityId,
        relatedEntityType: data.entityType,
        read: false,
        createdAt: new Date(),
        deliveryStatus: 'delivered',
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      
      // Show a toast notification
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
  
  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    sendNotification,
    isOperationsLoading: isLoading
  };
}
