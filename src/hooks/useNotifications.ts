
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
      
      // Transform dates from strings to Date objects
      const processedNotifications = notifData.map((n: any) => ({
        ...n,
        createdAt: new Date(n.created_at)
      }));
      
      setNotifications(processedNotifications);
      setSettings(settingsData);
      setTemplates(templatesData);
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
          const newNotification = {
            ...payload.new,
            createdAt: new Date(payload.new.created_at)
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
              ? { ...n, ...payload.new, createdAt: n.createdAt } 
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
