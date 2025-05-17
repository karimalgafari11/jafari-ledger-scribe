
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
  instanceId?: string; // معرف فريد للخطأ - لتجنب التكرار
}

// مصفوفة لتخزين سجلات الأخطاء - محدودة بـ 100 خطأ
let errorLog: ErrorLogEntry[] = [];

// الحد الأقصى لعدد الأخطاء المخزنة
const MAX_ERROR_LOG_SIZE = 100;

// معرف الجلسة - يتم إنشاؤه عند بدء التطبيق
const SESSION_ID = Math.random().toString(36).substring(2, 15);

/**
 * إنشاء معرف فريد للخطأ استنادًا إلى رسالة الخطأ وبعض المعلومات الإضافية
 */
const createErrorId = (error: string | Error, component?: string): string => {
  const errorMsg = typeof error === 'string' ? error : error.message;
  return `${errorMsg}_${component || 'unknown'}_${Date.now()}`;
};

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
  // إنشاء معرف فريد للخطأ
  const instanceId = createErrorId(error, options?.component);
  
  // التحقق مما إذا كان الخطأ قد تم تسجيله مسبقًا في الفترة الأخيرة
  const recentSimilarError = errorLog.find(entry => 
    entry.message === (typeof error === 'string' ? error : error.message) && 
    entry.component === options?.component && 
    Date.now() - entry.timestamp.getTime() < 5000 // في آخر 5 ثواني
  );
  
  if (recentSimilarError) {
    // تحديث معلومات الخطأ المتشابه فقط
    recentSimilarError.timestamp = new Date();
    if (options?.additionalInfo) {
      recentSimilarError.additionalInfo = {
        ...recentSimilarError.additionalInfo,
        ...options.additionalInfo,
        occurrences: (recentSimilarError.additionalInfo?.occurrences || 1) + 1
      };
    }
    
    return recentSimilarError;
  }
  
  const errorObj: ErrorLogEntry = {
    timestamp: new Date(),
    message: typeof error === 'string' ? error : error.message,
    stack: typeof error !== 'string' ? error.stack : undefined,
    component: options?.component,
    additionalInfo: options?.additionalInfo ? { ...options.additionalInfo, occurrences: 1 } : { occurrences: 1 },
    severity: options?.severity || 'error',
    instanceId
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

// منع تسجيل أخطاء متشابهة في نفس الوقت
let lastErrorMessage = '';
let lastErrorTime = 0;
const ERROR_THROTTLE_MS = 1000; // الحد الزمني بين الأخطاء المتشابهة

// تحسين استماع الأخطاء - إضافة مزيد من تفاصيل الخطأ
if (typeof window !== 'undefined') {
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
    additionalInfo: { 
      componentStack,
      sessionId: SESSION_ID,
      renderErrorCount
    },
    severity: 'critical'
  });
};

// تفعيل استقرار صفحة الديناميكي
const VISIBILITY_CHANGE_THRESHOLD = 10000; // 10 ثواني
let lastVisibilityChange = 0;
let visibilityChangeCount = 0;

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    const now = Date.now();
    
    if (document.visibilityState === 'hidden') {
      lastVisibilityChange = now;
    } else if (document.visibilityState === 'visible' && lastVisibilityChange > 0) {
      const timeDiff = now - lastVisibilityChange;
      
      // إذا عاد المستخدم خلال وقت قصير، قد يشير ذلك إلى تحديث أو إعادة تحميل
      if (timeDiff < VISIBILITY_CHANGE_THRESHOLD) {
        visibilityChangeCount++;
        
        // إذا كانت هناك تغييرات متكررة في الرؤية، قد يكون هناك مشكلة
        if (visibilityChangeCount >= 3) {
          ErrorTracker.warning('تم اكتشاف تبديلات متكررة للصفحة', {
            component: 'page-stability',
            additionalInfo: { 
              timeDiff,
              visibilityChangeCount,
              url: window.location.href
            }
          });
          
          // إعادة ضبط العداد بعد الإبلاغ
          visibilityChangeCount = 0;
        }
      } else {
        // إعادة ضبط العداد إذا كان الوقت أطول
        visibilityChangeCount = 0;
      }
    }
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
  const SESSION_ERROR_COUNT_KEY = 'app_error_count';
  const SESSION_LAST_URL_KEY = 'app_last_url';
  const SESSION_ID_KEY = 'app_session_id';
  
  try {
    // تحديث معرف الجلسة
    if (!sessionStorage.getItem(SESSION_ID_KEY)) {
      sessionStorage.setItem(SESSION_ID_KEY, SESSION_ID);
    }
    
    // التحقق من وقت إعادة التحميل
    const now = Date.now();
    const currentUrl = window.location.href;
    const lastUrl = sessionStorage.getItem(SESSION_LAST_URL_KEY) || '';
    const lastReload = parseInt(sessionStorage.getItem(SESSION_RELOAD_TIME_KEY) || '0', 10);
    const reloadCount = parseInt(sessionStorage.getItem(SESSION_RELOAD_KEY) || '0', 10);
    const errorCount = parseInt(sessionStorage.getItem(SESSION_ERROR_COUNT_KEY) || '0', 10);
    
    // تخزين الصفحة الحالية للمقارنة في المرة القادمة
    sessionStorage.setItem(SESSION_LAST_URL_KEY, currentUrl);
    
    // تحديث عداد إعادة التحميل
    if (now - lastReload < 30000) { // إذا كان آخر تحميل قبل أقل من 30 ثانية
      // فحص ما إذا كانت نفس الصفحة تُعاد تحميلها
      if (currentUrl === lastUrl) {
        sessionStorage.setItem(SESSION_RELOAD_KEY, (reloadCount + 1).toString());
        
        if (reloadCount + 1 >= 3) {
          ErrorTracker.warning('تم اكتشاف إعادة تحميل متكررة للصفحة', {
            component: 'stability-monitor',
            additionalInfo: { 
              reloadCount: reloadCount + 1, 
              timeWindow: '30s',
              url: currentUrl,
              errorCount
            },
            severity: 'warning'
          });
          
          // إعادة ضبط العداد بعد التسجيل
          sessionStorage.setItem(SESSION_RELOAD_KEY, '0');
        }
      }
    } else {
      sessionStorage.setItem(SESSION_RELOAD_KEY, '1');
    }
    
    sessionStorage.setItem(SESSION_RELOAD_TIME_KEY, now.toString());
  } catch (e) {
    // تجاهل أخطاء الوصول إلى SessionStorage (وضع خصوصية التصفح)
  }
};

// تشغيل فحص الاستقرار عند تحميل الصفحة
if (typeof window !== 'undefined') {
  window.addEventListener('load', detectStabilityIssues);
}

// مراقبة الأداء العام للتطبيق
if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
  try {
    // مراقبة طول انتظار النقرات (تأخير الاستجابة)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        // التحويل إلى أي لتجنب أخطاء TypeScript
        const interactionEntry = entry as any;
        if (interactionEntry.interactionId && interactionEntry.duration > 200) {
          ErrorTracker.info('تأخر استجابة واجهة المستخدم', {
            component: 'interaction-monitor',
            additionalInfo: { 
              duration: interactionEntry.duration,
              type: interactionEntry.name,
              target: interactionEntry.target?.nodeName || 'unknown'
            }
          });
        }
      }
    }).observe({ type: 'interaction', buffered: true });
  } catch (e) {
    // تجاهل الأخطاء - قد لا تكون بعض المراقبات مدعومة في كل المتصفحات
  }
}

// تصدير إضافي لتسهيل استخدام المكتبة
export default ErrorTracker;
