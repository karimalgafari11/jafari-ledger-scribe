
/**
 * وظائف مساعدة لنظام تتبع الأخطاء
 */

// منع تسجيل أخطاء متشابهة في نفس الوقت
export let lastErrorMessage = '';
export let lastErrorTime = 0;
export const ERROR_THROTTLE_MS = 1000; // الحد الزمني بين الأخطاء المتشابهة

/**
 * دالة مساعدة للحصول على أسلوب الكونسول المناسب لدرجة الخطورة
 */
export const getConsoleStyleForSeverity = (severity: 'critical' | 'error' | 'warning' | 'info'): string => {
  switch (severity) {
    case 'critical':
      return 'background: #ff5252; color: white; font-weight: bold; padding: 2px 4px; border-radius: 2px;';
    case 'error':
      return 'background: #ff9800; color: black; font-weight: bold; padding: 2px 4px; border-radius: 2px;';
    case 'warning':
      return 'background: #ffd740; color: black; padding: 2px 4px; border-radius: 2px;';
    case 'info':
      return 'background: #8bc34a; color: black; padding: 2px 4px; border-radius: 2px;';
    default:
      return 'color: inherit';
  }
};

/**
 * استدعاء وظيفة عرض الإشعار إذا كانت متوفرة
 */
export const showErrorNotification = (message: string): void => {
  if (typeof window !== 'undefined' && 'showErrorNotification' in window) {
    (window as any).showErrorNotification(message);
  }
};
