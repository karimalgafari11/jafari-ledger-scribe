
import { mockNotifications, mockNotificationSettings, mockNotificationTemplates } from '@/data/mockNotifications';
import { useNotificationSettings } from './notifications/useNotificationSettings';
import { useNotificationTemplates } from './notifications/useNotificationTemplates';
import { useNotificationOperations } from './notifications/useNotificationOperations';
import { calculateDiscount } from './notifications/notificationUtils';
import { NotificationHookReturn } from './notifications/notificationTypes';

export function useNotifications(): NotificationHookReturn {
  // Use the individual hooks
  const { notificationSettings, getNotificationSettings, updateNotificationSettings } = 
    useNotificationSettings(mockNotificationSettings);
  
  const { templates, getTemplate, updateTemplate } = 
    useNotificationTemplates(mockNotificationTemplates);
  
  const { 
    notifications, 
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    sendNotification, 
    isOperationsLoading 
  } = useNotificationOperations(mockNotifications);

  // Combine everything
  return {
    notifications,
    notificationSettings,
    templates,
    unreadCount,
    isLoading: isOperationsLoading,
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
