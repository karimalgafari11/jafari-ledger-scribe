
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
      // Simulate API call with a delay
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
      console.error('Error updating notification settings:', error);
      toast.error('حدث خطأ أثناء تحديث إعدادات الإشعارات');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Toggle notification channel for all events
  const toggleChannelForAllEvents = async (userId: string, channel: string, enabled: boolean): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setNotificationSettings(prev => 
        prev.map(s => s.userId === userId ? {
          ...s,
          channels: {
            ...s.channels,
            [channel]: {
              ...s.channels[channel],
              enabled
            }
          },
          updatedAt: new Date()
        } : s)
      );
      
      toast.success(`تم ${enabled ? 'تفعيل' : 'تعطيل'} قناة ${channel} لجميع الإشعارات`);
      return true;
    } catch (error) {
      console.error('Error toggling channel for all events:', error);
      toast.error('حدث خطأ أثناء تحديث إعدادات الإشعارات');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update threshold for all channels for an event
  const updateThresholdForAllChannels = async (
    userId: string, 
    eventType: string, 
    threshold: string
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call with a delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setNotificationSettings(prev => 
        prev.map(s => {
          if (s.userId === userId && s.eventType === eventType) {
            const updatedChannels = { ...s.channels };
            
            // Update threshold for all channels
            Object.keys(updatedChannels).forEach(channel => {
              if (updatedChannels[channel]) {
                updatedChannels[channel] = {
                  ...updatedChannels[channel],
                  threshold: threshold as any
                };
              }
            });
            
            return {
              ...s,
              channels: updatedChannels,
              updatedAt: new Date()
            };
          }
          return s;
        })
      );
      
      toast.success(`تم تحديث أولوية جميع القنوات للحدث ${eventType}`);
      return true;
    } catch (error) {
      console.error('Error updating threshold for all channels:', error);
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
    toggleChannelForAllEvents,
    updateThresholdForAllChannels,
    isSettingsLoading: isLoading
  };
}
