
/**
 * الوظائف الأساسية لنظام تتبع الأخطاء
 */

import { ErrorLogEntry, ErrorTrackingOptions } from './types';
import { showErrorNotification } from './notifications';
import { getConsoleStyleForSeverity } from './utils';

// معرف الجلسة - يتم إنشاؤه عند بدء التطبيق
export const SESSION_ID = Math.random().toString(36).substring(2, 15);

// مصفوفة لتخزين سجلات الأخطاء - محدودة بـ 100 خطأ
let errorLog: ErrorLogEntry[] = [];

// الحد الأقصى لعدد الأخطاء المخزنة
const MAX_ERROR_LOG_SIZE = 100;

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
  options?: ErrorTrackingOptions
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
      // استدعاء نظام الإشعارات
      showErrorNotification(errorObj.message);
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
