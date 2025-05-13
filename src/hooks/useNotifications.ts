
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNotificationSettings } from './notifications/useNotificationSettings';
import { useNotificationTemplates } from './notifications/useNotificationTemplates';
import { useNotificationOperations } from './notifications/useNotificationOperations';
import { calculateDiscount } from './notifications/notificationUtils';
import { NotificationHookReturn } from './notifications/notificationTypes';
import { Notification, NotificationSettings, NotificationTemplate } from '@/types/notifications';

export function useNotifications(): NotificationHookReturn {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [settings, setSettings] = useState<NotificationSettings[]>([]);
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch notifications, settings, and templates from Supabase
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Fetch notifications
      const { data: notifData, error: notifError } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (notifError) throw notifError;
      
      // Fetch notification settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('notification_settings')
        .select('*');
      
      if (settingsError) throw settingsError;
      
      // Fetch notification templates
      const { data: templatesData, error: templatesError } = await supabase
        .from('notification_templates')
        .select('*');
      
      if (templatesError) throw templatesError;
      
      // Transform Supabase data to match our TypeScript interfaces
      const processedNotifications: Notification[] = notifData.map((n: any) => ({
        id: n.id,
        userId: n.user_id,
        title: n.title,
        message: n.message,
        priority: n.priority,
        channel: n.channel,
        eventType: n.event_type,
        relatedEntityId: n.related_entity_id,
        relatedEntityType: n.related_entity_type,
        read: n.read,
        createdAt: new Date(n.created_at),
        deliveryStatus: n.delivery_status,
        retryCount: n.retry_count
      }));
      
      const processedSettings: NotificationSettings[] = settingsData.map((s: any) => ({
        id: s.id,
        userId: s.user_id,
        eventType: s.event_type,
        channels: s.channels,
        scheduleQuiet: s.schedule_quiet,
        muted: s.muted,
        updatedAt: new Date(s.updated_at)
      }));
      
      const processedTemplates: NotificationTemplate[] = templatesData.map((t: any) => ({
        id: t.id,
        name: t.name,
        subject: t.subject,
        content: t.content,
        channels: t.channels,
        variables: t.variables || [],
        createdAt: new Date(t.created_at),
        updatedAt: new Date(t.updated_at)
      }));
      
      setNotifications(processedNotifications);
      setSettings(processedSettings);
      setTemplates(processedTemplates);
    } catch (error) {
      console.error('Error fetching notification data:', error);
      
      // Fall back to mock data if there's an error
      import('./notifications/notificationTypes').then(module => {
        import('../data/mockNotifications').then(mockData => {
          setNotifications(mockData.mockNotifications);
          setSettings(mockData.mockNotificationSettings);
          setTemplates(mockData.mockNotificationTemplates);
        });
      });
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Set up real-time subscription for new notifications
  useEffect(() => {
    fetchData();
    
    // Subscribe to changes in the notifications table
    const channel = supabase
      .channel('notifications-changes')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications' 
        },
        (payload) => {
          // Transform the incoming payload to match our Notification type
          const newNotification: Notification = {
            id: payload.new.id,
            userId: payload.new.user_id,
            title: payload.new.title,
            message: payload.new.message,
            priority: payload.new.priority as NotificationPriority,
            channel: payload.new.channel as NotificationChannel,
            eventType: payload.new.event_type,
            relatedEntityId: payload.new.related_entity_id,
            relatedEntityType: payload.new.related_entity_type,
            read: payload.new.read,
            createdAt: new Date(payload.new.created_at),
            deliveryStatus: payload.new.delivery_status,
            retryCount: payload.new.retry_count
          };
          
          setNotifications(prev => [newNotification, ...prev]);
        }
      )
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          setNotifications(prev => 
            prev.map(n => n.id === payload.new.id 
              ? { 
                  ...n, 
                  read: payload.new.read,
                  deliveryStatus: payload.new.delivery_status,
                  retryCount: payload.new.retry_count
                }
              : n
            )
          );
        }
      )
      .on('postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          setNotifications(prev => 
            prev.filter(n => n.id !== payload.old.id)
          );
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchData]);

  // Use individual hooks with our data
  const { 
    getNotificationSettings, 
    updateNotificationSettings 
  } = useNotificationSettings(settings);
  
  const { 
    getTemplate, 
    updateTemplate 
  } = useNotificationTemplates(templates);
  
  const { 
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    sendNotification
  } = useNotificationOperations(notifications);

  // Combine everything
  return {
    notifications,
    notificationSettings: settings,
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
    updateTemplate,
    calculateDiscount
  };
}
