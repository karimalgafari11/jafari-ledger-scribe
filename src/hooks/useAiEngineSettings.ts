
import { useState, useEffect } from 'react';
import { AIEngineSettings } from '@/types/ai-finance';

// إعدادات افتراضية للمحرك الذكي
const defaultSettings: AIEngineSettings = {
  journalEntrySuggestions: {
    enabled: true,
    threshold: 75,
    autoCreate: false,
  },
  dynamicPricing: {
    enabled: true,
    maxAdjustmentPercentage: 10,
    frequencyDays: 7,
    considerDemand: true,
    considerCost: true,
    considerCompetition: false,
  },
  behavioralAlerts: {
    enabled: true,
    learningPeriodDays: 14,
    maxDailyAlerts: 5,
  },
  varianceAnalysis: {
    enabled: true,
    thresholdPercentage: 10,
    analysisPeriod: 'weekly',
  },
};

export const useAiEngineSettings = () => {
  const [settings, setSettings] = useState<AIEngineSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // محاولة استرجاع الإعدادات المحفوظة من localStorage
    const savedSettings = localStorage.getItem('ai-engine-settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('خطأ في قراءة الإعدادات المحفوظة:', error);
        setSettings(defaultSettings);
      }
    }
  }, []);

  const updateSettings = (newSettings: AIEngineSettings) => {
    setIsLoading(true);
    
    // محاكاة طلب API
    setTimeout(() => {
      setSettings(newSettings);
      
      // حفظ الإعدادات في localStorage للعرض التوضيحي
      localStorage.setItem('ai-engine-settings', JSON.stringify(newSettings));
      
      setIsLoading(false);
    }, 500);
  };

  const resetSettings = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setSettings(defaultSettings);
      localStorage.setItem('ai-engine-settings', JSON.stringify(defaultSettings));
      setIsLoading(false);
    }, 500);
  };

  return {
    settings,
    updateSettings,
    resetSettings,
    isLoading,
  };
};
