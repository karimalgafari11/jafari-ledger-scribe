
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

export type ErrorSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface ErrorDetails {
  message: string;
  code?: string;
  source?: string;
  severity?: ErrorSeverity;
  timestamp?: Date;
  data?: Record<string, any>;
}

export interface ErrorHandlerOptions {
  logToConsole?: boolean;
  showToast?: boolean;
  captureStack?: boolean;
  autoResolveAfterMs?: number | null;
}

const defaultOptions: ErrorHandlerOptions = {
  logToConsole: true,
  showToast: true,
  captureStack: true,
  autoResolveAfterMs: null
};

/**
 * كلاس أنيق للتعامل مع الأخطاء في التطبيق
 */
export function useErrorHandler(customOptions?: ErrorHandlerOptions) {
  const options = { ...defaultOptions, ...customOptions };
  const [errors, setErrors] = useState<ErrorDetails[]>([]);
  const [hasUnresolvedErrors, setHasUnresolvedErrors] = useState(false);

  // تحديث حالة الأخطاء الغير محلولة
  useEffect(() => {
    setHasUnresolvedErrors(errors.length > 0);
  }, [errors]);

  // إضافة خطأ جديد
  const handleError = useCallback((error: Error | string | ErrorDetails) => {
    let errorDetails: ErrorDetails;

    if (typeof error === 'string') {
      errorDetails = { message: error, severity: 'medium', timestamp: new Date() };
    } else if (error instanceof Error) {
      errorDetails = { 
        message: error.message, 
        severity: 'medium', 
        timestamp: new Date(),
        // إضافة معلومات Stack Trace عند الطلب
        ...(options.captureStack && { data: { stack: error.stack } })
      };
    } else {
      errorDetails = { 
        ...error,
        timestamp: error.timestamp || new Date()
      };
    }

    // تسجيل الخطأ في وحدة التحكم
    if (options.logToConsole) {
      const severity = errorDetails.severity || 'medium';
      const method = severity === 'critical' || severity === 'high' ? console.error : console.warn;
      method(`[${severity.toUpperCase()}] ${errorDetails.message}`, errorDetails);
    }

    // عرض Notification Toast
    if (options.showToast) {
      const severity = errorDetails.severity || 'medium';
      if (severity === 'critical' || severity === 'high') {
        toast.error(errorDetails.message, { 
          duration: severity === 'critical' ? 10000 : 5000,
          description: errorDetails.code ? `رمز الخطأ: ${errorDetails.code}` : undefined
        });
      } else if (severity === 'medium') {
        toast.warning(errorDetails.message);
      } else {
        toast.info(errorDetails.message);
      }
    }

    // حفظ الخطأ في الحالة
    setErrors(prev => [...prev, errorDetails]);

    // التنظيف التلقائي إذا تم تحديده
    if (options.autoResolveAfterMs) {
      const timestamp = errorDetails.timestamp?.getTime() || Date.now();
      setTimeout(() => {
        setErrors(prev => prev.filter(e => 
          e.timestamp?.getTime() !== timestamp || e.message !== errorDetails.message
        ));
      }, options.autoResolveAfterMs);
    }

    // إرجاع تفاصيل الخطأ للاستخدام اللاحق
    return errorDetails;
  }, [options]);

  // مسح جميع الأخطاء
  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  // مسح خطأ محدد
  const clearError = useCallback((errorToRemove: ErrorDetails) => {
    setErrors(prev => prev.filter(error => error !== errorToRemove));
  }, []);

  return {
    errors,
    hasUnresolvedErrors,
    handleError,
    clearErrors,
    clearError
  };
}
