
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

// تحسين استماع الأخطاء - إضافة مزيد من تفاصيل الخطأ
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    // Prevent duplicate error reporting for the same error
    const errorMessage = event.error ? event.error.message : event.message;
    const isDuplicate = errorLog.some(entry => 
      entry.message === errorMessage && 
      Date.now() - entry.timestamp.getTime() < 5000 // Within last 5 seconds
    );
    
    if (!isDuplicate) {
      trackError(event.error || event.message, {
        component: 'window',
        additionalInfo: {
          source: event.filename,
          lineNumber: event.lineno,
          columnNumber: event.colno,
          timestamp: new Date().toISOString(),
          url: window.location.href
        },
        severity: 'critical'
      });
    }
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
    
    // Prevent duplicate promise rejection errors
    const isDuplicate = errorLog.some(entry => 
      entry.message === message && 
      Date.now() - entry.timestamp.getTime() < 5000 // Within last 5 seconds
    );
    
    if (!isDuplicate) {
      trackError(message, {
        component: 'promise',
        additionalInfo: {
          stack,
          url: window.location.href,
          timestamp: new Date().toISOString()
        },
        severity: 'critical'
      });
    }
  });
}

// Check for React rendering errors
let lastRenderError = '';
let renderErrorCount = 0;

export const trackRenderError = (error: Error, componentStack: string) => {
  // If it's the same error repeatedly, increment counter rather than logging multiple times
  if (error.message === lastRenderError) {
    renderErrorCount++;
    if (renderErrorCount > 3) return; // Limit logging of the same error
  } else {
    lastRenderError = error.message;
    renderErrorCount = 1;
  }
  
  trackError(error, {
    component: 'react-render',
    additionalInfo: { componentStack },
    severity: 'critical'
  });
};

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
  renderError: trackRenderError,
  getLog: getErrorLog,
  getStats: getErrorStats,
  clear: clearErrorLog
};

// إضافة خاصية للكشف عن مشاكل الاستقرار
export const detectStabilityIssues = () => {
  // تتبع إعادة التحميل المتكرر
  const SESSION_RELOAD_KEY = 'app_reload_count';
  const SESSION_RELOAD_TIME_KEY = 'app_reload_timestamp';
  
  try {
    // التحقق من وقت إعادة التحميل
    const now = Date.now();
    const lastReload = parseInt(sessionStorage.getItem(SESSION_RELOAD_TIME_KEY) || '0', 10);
    const reloadCount = parseInt(sessionStorage.getItem(SESSION_RELOAD_KEY) || '0', 10);
    
    // تحديث عداد إعادة التحميل
    if (now - lastReload < 30000) { // إذا كان آخر تحميل قبل أقل من 30 ثانية
      sessionStorage.setItem(SESSION_RELOAD_KEY, (reloadCount + 1).toString());
    } else {
      sessionStorage.setItem(SESSION_RELOAD_KEY, '1');
    }
    
    sessionStorage.setItem(SESSION_RELOAD_TIME_KEY, now.toString());
    
    // تنبيه إذا كان هناك تحميل متكرر
    if (reloadCount > 3) {
      trackError('تم اكتشاف إعادة تحميل متكررة للصفحة', {
        component: 'stability-monitor',
        additionalInfo: { reloadCount, timeWindow: '30s' },
        severity: 'warning'
      });
    }
  } catch (e) {
    // تجاهل أخطاء الوصول إلى SessionStorage (وضع خصوصية التصفح)
  }
};

// تشغيل فحص الاستقرار عند تحميل الصفحة
if (typeof window !== 'undefined') {
  window.addEventListener('load', detectStabilityIssues);
}
