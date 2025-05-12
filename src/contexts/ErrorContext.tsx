
import React, { createContext, useContext, useCallback, ReactNode } from 'react';
import { useErrorHandler, ErrorDetails, ErrorSeverity } from '@/hooks/useErrorHandler';

interface ErrorContextProps {
  errors: ErrorDetails[];
  hasUnresolvedErrors: boolean;
  reportError: (error: Error | string | ErrorDetails) => void;
  clearErrors: () => void;
  clearError: (error: ErrorDetails) => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

interface ErrorProviderProps {
  children: ReactNode;
}

export function ErrorProvider({ children }: ErrorProviderProps) {
  const {
    errors,
    hasUnresolvedErrors,
    handleError,
    clearErrors,
    clearError
  } = useErrorHandler({
    logToConsole: true,
    showToast: true,
    captureStack: true
  });

  // تمرير الدالة مع تعديل بسيط لتسهيل الاستخدام
  const reportError = useCallback((error: Error | string | ErrorDetails) => {
    return handleError(error);
  }, [handleError]);

  // تعيين مستمع للأخطاء غير المعالجة على مستوى النافذة
  React.useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      reportError({
        message: `خطأ غير معالج: ${event.message}`,
        severity: 'high',
        source: event.filename,
        data: {
          lineNumber: event.lineno,
          colNumber: event.colno,
          stack: event.error?.stack
        }
      });
      event.preventDefault();
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      reportError({
        message: `وعد مرفوض غير معالج: ${event.reason?.message || 'خطأ غير معروف'}`,
        severity: 'high',
        data: {
          reason: event.reason
        }
      });
      event.preventDefault();
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [reportError]);

  const value = {
    errors,
    hasUnresolvedErrors,
    reportError,
    clearErrors,
    clearError
  };

  return (
    <ErrorContext.Provider value={value}>
      {children}
    </ErrorContext.Provider>
  );
}

// هوك مساعد للوصول إلى سياق الأخطاء
export function useErrorContext() {
  const context = useContext(ErrorContext);
  
  if (context === undefined) {
    throw new Error('useErrorContext must be used within an ErrorProvider');
  }
  
  return context;
}
