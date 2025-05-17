
/**
 * مراقبة طلبات الشبكة
 */

import { ErrorTracker } from './index';

/**
 * تفعيل مراقبة طلبات الشبكة
 */
export const setupNetworkMonitoring = (): void => {
  if (typeof window === 'undefined' || !window.fetch) return;
  
  // مراقبة AJAX errors
  const originalFetch = window.fetch;
  window.fetch = async function(...args) {
    try {
      const response = await originalFetch.apply(window, args);
      if (!response.ok) {
        ErrorTracker.info(`فشل طلب الشبكة: ${response.status} ${response.statusText}`, {
          component: 'network-monitor',
          additionalInfo: { 
            url: typeof args[0] === 'string' ? args[0] : 'unknown',
            status: response.status
          }
        });
      }
      return response;
    } catch (error) {
      ErrorTracker.error(`خطأ في طلب الشبكة`, {
        component: 'network-monitor',
        additionalInfo: { 
          url: typeof args[0] === 'string' ? args[0] : 'unknown',
          error: error instanceof Error ? error.message : String(error)
        }
      });
      throw error;
    }
  };
};

// تفعيل مراقبة طلبات الشبكة عند استيراد الوحدة
if (typeof window !== 'undefined') {
  setupNetworkMonitoring();
}
