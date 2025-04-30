
import { useState } from 'react';
import { SystemSettings } from '@/types/settings';
import { mockSystemSettings } from '@/data/mockSettings';
import { toast } from 'sonner';

export function useSystemSettings() {
  const [settings, setSettings] = useState<SystemSettings>(mockSystemSettings);
  const [isLoading, setIsLoading] = useState(false);
  
  // Update specific setting field
  const updateSetting = <K extends keyof SystemSettings>(
    key: K, 
    value: SystemSettings[K]
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Update multiple settings at once
  const updateSettings = (updatedSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...updatedSettings
    }));
  };
  
  // Save all settings
  const saveSettings = async () => {
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success('تم حفظ الإعدادات بنجاح');
      return true;
    } catch (error) {
      toast.error('حدث خطأ أثناء حفظ الإعدادات');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Reset settings to defaults
  const resetToDefaults = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSettings(mockSystemSettings);
      setIsLoading(false);
      toast.success('تم إعادة ضبط الإعدادات إلى القيم الافتراضية');
    }, 500);
  };
  
  return {
    settings,
    isLoading,
    updateSetting,
    updateSettings,
    saveSettings,
    resetToDefaults
  };
}
