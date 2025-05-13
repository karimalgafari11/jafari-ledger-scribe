
import { useState } from 'react';
import { toast } from 'sonner';
import { NotificationTemplate } from '@/types/notifications';

export function useNotificationTemplates(
  initialTemplates: NotificationTemplate[]
) {
  const [templates, setTemplates] = useState<NotificationTemplate[]>(initialTemplates);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get a template by ID
  const getTemplate = (templateId: string): NotificationTemplate | undefined => {
    return templates.find(template => template.id === templateId);
  };
  
  // Update a template
  const updateTemplate = async (template: NotificationTemplate): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
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
  
  // Create a new template
  const createTemplate = async (template: Omit<NotificationTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newTemplate: NotificationTemplate = {
        id: `template${templates.length + 1}`,
        ...template,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      setTemplates(prev => [...prev, newTemplate]);
      
      toast.success('تم إنشاء قالب الإشعار بنجاح');
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء إنشاء قالب الإشعار');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete a template
  const deleteTemplate = async (templateId: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setTemplates(prev => prev.filter(t => t.id !== templateId));
      
      toast.success('تم حذف قالب الإشعار بنجاح');
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء حذف قالب الإشعار');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    templates,
    getTemplate,
    updateTemplate,
    createTemplate,
    deleteTemplate,
    isTemplatesLoading: isLoading
  };
}
