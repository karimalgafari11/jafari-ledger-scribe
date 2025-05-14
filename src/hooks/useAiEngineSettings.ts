
import { useState, useEffect } from 'react';
import { AIEngineSettings } from '@/types/ai-finance';
import { ErrorTracker } from '@/utils/errorTracker';

/**
 * Default AI engine settings
 * These settings define the initial configuration for AI features
 */
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

/**
 * Hook to manage AI engine settings
 * Handles loading, saving, and resetting settings
 */
export const useAiEngineSettings = () => {
  const [settings, setSettings] = useState<AIEngineSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Load saved settings from localStorage on initial mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('ai-engine-settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      ErrorTracker.error('Failed to load AI engine settings', { 
        component: 'useAiEngineSettings',
        additionalInfo: error
      });
      setSettings(defaultSettings);
    }
  }, []);

  /**
   * Update AI engine settings
   * @param newSettings Updated settings object
   */
  const updateSettings = (newSettings: AIEngineSettings) => {
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      try {
        setSettings(newSettings);
        localStorage.setItem('ai-engine-settings', JSON.stringify(newSettings));
      } catch (error) {
        ErrorTracker.error('Failed to save AI engine settings', {
          component: 'useAiEngineSettings',
          additionalInfo: error
        });
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  /**
   * Reset settings to default values
   */
  const resetSettings = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      try {
        setSettings(defaultSettings);
        localStorage.setItem('ai-engine-settings', JSON.stringify(defaultSettings));
      } catch (error) {
        ErrorTracker.error('Failed to reset AI engine settings', {
          component: 'useAiEngineSettings',
          additionalInfo: error
        });
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  return {
    settings,
    updateSettings,
    resetSettings,
    isLoading,
  };
};
