
import { useState } from 'react';
import { toast } from 'sonner';
import { NotificationSettings } from '@/types/notifications';

export function useNotificationSettings(
  initialSettings: NotificationSettings[]
) {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings[]>(initialSettings);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get notification settings for a user and event type
  const getNotificationSettings = (
    userId: string, 
    eventType: string
  ): NotificationSettings | undefined => {
    return notificationSettings.find(
      settings => settings.userId === userId && settings.eventType === eventType
    );
  };
  
  // Update notification settings
  const updateNotificationSettings = async (settings: NotificationSettings): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulating API call
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
  
  return {
    notificationSettings,
    getNotificationSettings,
    updateNotificationSettings,
    isSettingsLoading: isLoading
  };
}
