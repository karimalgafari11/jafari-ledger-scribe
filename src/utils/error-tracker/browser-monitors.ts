
/**
 * مراقبة وتتبع الأخطاء على مستوى المتصفح
 */

import { trackError } from './core';
import { lastErrorMessage, lastErrorTime, ERROR_THROTTLE_MS } from './utils';
import { SESSION_ID } from './core';

/**
 * تفعيل مراقبة الأخطاء في المتصفح
 */
export const setupBrowserMonitors = (): void => {
  if (typeof window === 'undefined') return;
  
  // تحسين استماع الأخطاء - إضافة مزيد من تفاصيل الخطأ
  window.addEventListener('error', (event) => {
    const errorMessage = event.error ? event.error.message : event.message;
    const now = Date.now();
    
    // منع التكرار السريع للأخطاء المتشابهة
    if (errorMessage === lastErrorMessage && now - lastErrorTime < ERROR_THROTTLE_MS) {
      return;
    }
    
    lastErrorMessage = errorMessage;
    lastErrorTime = now;
    
    trackError(event.error || event.message, {
      component: 'window',
      additionalInfo: {
        source: event.filename,
        lineNumber: event.lineno,
        columnNumber: event.colno,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        sessionId: SESSION_ID
      },
      severity: 'critical'
    });
  });
  
  // تحسين التقاط أخطاء الوعود غير المعالجة
  window.addEventListener('unhandledrejection', (event) => {
    let message = 'وعد غير معالج';
    let stack = '';
    
    if (event.reason instanceof Error) {
      message = event.reason.message;
      stack = event.reason.stack || '';
    } else if (typeof event.reason === 'string') {
      message = event.reason;
    } else if (typeof event.reason === 'object' && event.reason !== null) {
      message = event.reason.message || JSON.stringify(event.reason);
    }
    
    const now = Date.now();
    
    // منع التكرار السريع للأخطاء المتشابهة
    if (message === lastErrorMessage && now - lastErrorTime < ERROR_THROTTLE_MS) {
      return;
    }
    
    lastErrorMessage = message;
    lastErrorTime = now;
    
    trackError(message, {
      component: 'promise',
      additionalInfo: {
        stack,
        url: window.location.href,
        timestamp: new Date().toISOString(),
        sessionId: SESSION_ID
      },
      severity: 'critical'
    });
  });
  
  // مراقبة حالة الشبكة
  window.addEventListener('online', () => {
    trackError('تم استعادة الاتصال بالإنترنت', {
      component: 'connectivity',
      severity: 'info'
    });
  });
  
  window.addEventListener('offline', () => {
    trackError('فقدان الاتصال بالإنترنت', {
      component: 'connectivity',
      severity: 'warning'
    });
  });
};

// تشغيل مراقبات المتصفح عند استيراد الوحدة
if (typeof window !== 'undefined') {
  setupBrowserMonitors();
}
