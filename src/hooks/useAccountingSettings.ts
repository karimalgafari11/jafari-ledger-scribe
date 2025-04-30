
import { useState } from 'react';
import { AccountingSettings, TaxSettings, ClosingMethod, SettingsTabType } from '@/types/accountingSettings';
import { toast } from 'sonner';

// Mock data for initial settings
const initialAccountingSettings: AccountingSettings = {
  id: '1',
  fiscalYearStart: new Date(new Date().getFullYear(), 0, 1), // January 1st of current year
  fiscalYearEnd: new Date(new Date().getFullYear(), 11, 31), // December 31st of current year
  defaultCurrency: 'SAR',
  autoGenerateEntries: true,
  journalNamingFormat: 'JE-{YEAR}{MONTH}{DAY}-{NUMBER}',
  allowBackdatedEntries: false,
  requireApproval: true,
  defaultApprover: 'مدير المالية',
  autoCloseAccounts: true,
  retainDataYears: 5,
  taxSettings: {
    enableTax: true,
    defaultTaxRate: 15,
    taxNumber: '123456789',
    taxAuthority: 'الهيئة العامة للزكاة والدخل'
  },
  closingMethods: [
    {
      id: '1',
      name: 'إقفال تلقائي',
      description: 'إقفال الحسابات تلقائياً بناءً على نهاية السنة المالية',
      isActive: true
    },
    {
      id: '2',
      name: 'إقفال يدوي',
      description: 'إقفال الحسابات يدوياً من قبل المستخدم',
      isActive: false
    },
    {
      id: '3',
      name: 'إقفال شهري',
      description: 'إقفال الحسابات بشكل شهري',
      isActive: false
    }
  ]
};

export function useAccountingSettings() {
  const [settings, setSettings] = useState<AccountingSettings>(initialAccountingSettings);
  const [activeTab, setActiveTab] = useState<SettingsTabType>('general');
  const [isLoading, setIsLoading] = useState(false);

  // Update general settings
  const updateGeneralSettings = (updatedSettings: Partial<AccountingSettings>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSettings(prev => ({
        ...prev,
        ...updatedSettings
      }));
      setIsLoading(false);
      toast.success('تم تحديث الإعدادات العامة بنجاح');
    }, 500);
  };

  // Update tax settings
  const updateTaxSettings = (taxSettings: TaxSettings) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSettings(prev => ({
        ...prev,
        taxSettings
      }));
      setIsLoading(false);
      toast.success('تم تحديث إعدادات الضرائب بنجاح');
    }, 500);
  };

  // Toggle closing method active status
  const toggleClosingMethod = (id: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSettings(prev => {
        const updatedMethods = prev.closingMethods.map(method => 
          method.id === id ? { ...method, isActive: !method.isActive } : method
        );
        
        return {
          ...prev,
          closingMethods: updatedMethods
        };
      });
      setIsLoading(false);
      toast.success('تم تحديث طرق الإقفال بنجاح');
    }, 500);
  };

  // Add new closing method
  const addClosingMethod = (method: Omit<ClosingMethod, 'id'>) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newMethod: ClosingMethod = {
        ...method,
        id: Math.random().toString(36).substring(2, 9)
      };
      
      setSettings(prev => ({
        ...prev,
        closingMethods: [...prev.closingMethods, newMethod]
      }));
      
      setIsLoading(false);
      toast.success('تمت إضافة طريقة الإقفال بنجاح');
    }, 500);
  };

  // Reset all settings to defaults
  const resetToDefaults = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSettings(initialAccountingSettings);
      setIsLoading(false);
      toast.success('تمت إعادة تعيين الإعدادات إلى القيم الافتراضية');
    }, 500);
  };

  return {
    settings,
    activeTab,
    setActiveTab,
    isLoading,
    updateGeneralSettings,
    updateTaxSettings,
    toggleClosingMethod,
    addClosingMethod,
    resetToDefaults
  };
}
