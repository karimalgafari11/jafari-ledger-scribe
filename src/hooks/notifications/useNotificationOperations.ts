
import { useState } from 'react';
import { toast } from 'sonner';
import { Notification, NotificationChannel, NotificationEvent, NotificationPriority } from '@/types/notifications';
import { supabase } from '@/integrations/supabase/client';

export function useNotificationOperations(
  initialNotifications: Notification[]
) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get unread notifications count
  const unreadCount = notifications.filter(n => !n.read).length;
  
  // Mark a notification as read
  const markAsRead = async (notificationId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', notificationId);
      
      if (error) throw error;
      
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );
      
      return true;
    } catch (error) {
      console.error('Error marking notification as read:', error);
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
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('read', false);
      
      if (error) throw error;
      
      setNotifications(prev => 
        prev.map(n => ({ ...n, read: true }))
      );
      
      return true;
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
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
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', notificationId);
      
      if (error) throw error;
      
      setNotifications(prev => 
        prev.filter(n => n.id !== notificationId)
      );
      
      return true;
    } catch (error) {
      console.error('Error deleting notification:', error);
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
      // Instead of using protected supabaseUrl and supabaseKey properties, 
      // we'll use the supabase functions.invoke method
      const { data: result, error } = await supabase.functions.invoke('send-notification', {
        body: {
          userId,
          eventType,
          title: data.title,
          message: data.message,
          priority,
          channels,
          relatedEntityId: data.entityId,
          relatedEntityType: data.entityType,
        }
      });
      
      if (error) {
        throw new Error(error.message || 'Failed to send notification');
      }
      
      // If this is an in-app notification, add it to the state
      const newInAppNotifications = result?.notifications
        ?.filter((n: any) => n && n.channel === 'in-app')
        ?.map((n: any) => ({
          ...n,
          created_at: new Date(n.created_at),
        })) || [];
      
      if (newInAppNotifications.length > 0) {
        setNotifications(prev => [...newInAppNotifications, ...prev]);
      }
      
      return true;
    } catch (error) {
      console.error('Error sending notification:', error);
      toast.error('حدث خطأ أثناء إرسال الإشعار');
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
