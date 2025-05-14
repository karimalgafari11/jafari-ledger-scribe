
/**
 * نظام متكامل لتتبع وإدارة الأخطاء في التطبيق
 */

// نوع خاص بسجل الخطأ
export interface ErrorLogEntry {
  timestamp: Date;
  message: string;
  stack?: string;
  component?: string;
  additionalInfo?: any;
  severity: 'critical' | 'error' | 'warning' | 'info';
}

// مصفوفة لتخزين سجلات الأخطاء - محدودة بـ 100 خطأ
let errorLog: ErrorLogEntry[] = [];

// الحد الأقصى لعدد الأخطاء المخزنة
const MAX_ERROR_LOG_SIZE = 100;

/**
 * تسجيل خطأ جديد في النظام
 */
export const trackError = (
  error: Error | string, 
  options?: { 
    component?: string; 
    additionalInfo?: any;
    severity?: 'critical' | 'error' | 'warning' | 'info';
  }
) => {
  const errorObj: ErrorLogEntry = {
    timestamp: new Date(),
    message: typeof error === 'string' ? error : error.message,
    stack: typeof error !== 'string' ? error.stack : undefined,
    component: options?.component,
    additionalInfo: options?.additionalInfo,
    severity: options?.severity || 'error'
  };
  
  // إضافة الخطأ إلى السجل
  errorLog.unshift(errorObj); // إضافة في البداية للحصول على الأخطاء الأحدث أولاً
  
  // تسجيل في وحدة التحكم بلون مناسب حسب درجة الخطورة
  const consoleStyle = getConsoleStyleForSeverity(errorObj.severity);
  console.error(
    `%c[${errorObj.severity.toUpperCase()}]%c ${errorObj.message}`,
    consoleStyle, 
    'color: inherit'
  );
  
  // اقتصاص السجل عند الوصول للحد الأقصى
  if (errorLog.length > MAX_ERROR_LOG_SIZE) {
    errorLog = errorLog.slice(0, MAX_ERROR_LOG_SIZE);
  }
  
  // إذا كان الخطأ حرجاً، ارسل تنبيه للمستخدم
  if (errorObj.severity === 'critical') {
    try {
      // يمكن استدعاء نظام الإشعارات هنا 
      // عبر window.showNotification أو ما يشابهه
      if (typeof window !== 'undefined' && 'showErrorNotification' in window) {
        (window as any).showErrorNotification(errorObj.message);
      }
    } catch (e) {
      console.error('فشل في عرض إشعار الخطأ:', e);
    }
  }
  
  return errorObj;
};

/**
 * الحصول على قائمة الأخطاء المسجلة
 */
export const getErrorLog = (options?: {
  severity?: 'critical' | 'error' | 'warning' | 'info';
  component?: string;
  limit?: number;
}): ErrorLogEntry[] => {
  let filteredLog = [...errorLog];
  
  // تصفية حسب درجة الخطورة
  if (options?.severity) {
    filteredLog = filteredLog.filter(entry => entry.severity === options.severity);
  }
  
  // تصفية حسب المكون
  if (options?.component) {
    filteredLog = filteredLog.filter(entry => entry.component === options.component);
  }
  
  // تحديد العدد
  if (options?.limit && options.limit > 0) {
    filteredLog = filteredLog.slice(0, options.limit);
  }
  
  return filteredLog;
};

/**
 * مسح سجل الأخطاء
 */
export const clearErrorLog = (): void => {
  errorLog = [];
};

/**
 * الحصول على عدد الأخطاء المسجلة من كل درجة خطورة
 */
export const getErrorStats = (): { critical: number; error: number; warning: number; info: number } => {
  return {
    critical: errorLog.filter(entry => entry.severity === 'critical').length,
    error: errorLog.filter(entry => entry.severity === 'error').length,
    warning: errorLog.filter(entry => entry.severity === 'warning').length,
    info: errorLog.filter(entry => entry.severity === 'info').length,
  };
};

/**
 * دالة مساعدة للحصول على أسلوب الكونسول المناسب لدرجة الخطورة
 */
const getConsoleStyleForSeverity = (severity: 'critical' | 'error' | 'warning' | 'info'): string => {
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

// استماع لأخطاء غير معالجة على مستوى النافذة
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    trackError(event.error || event.message, {
      component: 'window',
      additionalInfo: {
        source: event.filename,
        lineNumber: event.lineno,
        columnNumber: event.colno
      },
      severity: 'critical'
    });
  });
  
  // التقاط أخطاء الوعود غير المعالجة
  window.addEventListener('unhandledrejection', (event) => {
    let message = 'وعد غير معالج';
    if (event.reason instanceof Error) {
      message = event.reason.message;
    } else if (typeof event.reason === 'string') {
      message = event.reason;
    }
    
    trackError(message, {
      component: 'promise',
      additionalInfo: event.reason,
      severity: 'critical'
    });
  });
}

// واجهة برمجية مبسطة للاستخدام السريع
export const ErrorTracker = {
  error: (message: string, options?: { component?: string; additionalInfo?: any }) => 
    trackError(message, { ...options, severity: 'error' }),
  warning: (message: string, options?: { component?: string; additionalInfo?: any }) => 
    trackError(message, { ...options, severity: 'warning' }),
  info: (message: string, options?: { component?: string; additionalInfo?: any }) => 
    trackError(message, { ...options, severity: 'info' }),
  critical: (message: string, options?: { component?: string; additionalInfo?: any }) => 
    trackError(message, { ...options, severity: 'critical' }),
  getLog: getErrorLog,
  getStats: getErrorStats,
  clear: clearErrorLog
};
