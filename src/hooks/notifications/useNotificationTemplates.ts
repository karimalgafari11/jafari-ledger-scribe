
import { useState } from 'react';
import { toast } from 'sonner';
import { NotificationTemplate } from '@/types/notifications';
import { findTemplateById } from './notificationUtils';

export function useNotificationTemplates(
  initialTemplates: NotificationTemplate[]
) {
  const [templates, setTemplates] = useState<NotificationTemplate[]>(initialTemplates);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get a template by ID
  const getTemplate = (templateId: string): NotificationTemplate | undefined => {
    return findTemplateById(templates, templateId);
  };
  
  // Update a notification template
  const updateTemplate = async (template: NotificationTemplate): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulating API call
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
    templates,
    getTemplate,
    updateTemplate,
    isTemplatesLoading: isLoading
  };
}
