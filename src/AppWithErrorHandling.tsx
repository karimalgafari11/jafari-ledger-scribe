
import React, { useEffect } from 'react';
import { ErrorProvider } from '@/contexts/ErrorContext';
import { ErrorBoundary } from '@/components/ui/error-boundary/ErrorBoundary';
import { GlobalErrorDisplay } from '@/components/GlobalErrorDisplay';
import { Toaster } from '@/components/ui/sonner';
import { ErrorTracker, detectStabilityIssues, trackPagePerformance, monitorMemoryUsage } from '@/utils/error-tracker';

interface AppWithErrorHandlingProps {
  children: React.ReactNode;
}

export function AppWithErrorHandling({ children }: AppWithErrorHandlingProps) {
  // معالجة الأخطاء العامة على مستوى التطبيق
  const handleAppError = (error: Error, errorInfo: React.ErrorInfo) => {
    // هنا يمكن إرسال الخطأ إلى خدمة تتبع الأخطاء مثل Sentry أو LogRocket
    console.error('Application Error:', error);
    console.error('Error Info:', errorInfo);
    
    // تسجيل الخطأ في نظام تتبع الأخطاء المحلي
    ErrorTracker.renderError(error, errorInfo.componentStack || '');
  };
  
  // تتبع الأخطاء المتعلقة بالاستقرار
  useEffect(() => {
    // تحميل التطبيق وقياس أدائه 
    trackPagePerformance();
    
    // تسجيل عدد إعادات التحميل المتكررة
    detectStabilityIssues();
    
    // مراقبة تسريبات الذاكرة المحتملة
    const clearMemoryMonitor = monitorMemoryUsage();
    
    return () => {
      clearMemoryMonitor();
    };
  }, []);

  return (
    <ErrorBoundary onError={handleAppError}>
      <ErrorProvider>
        {/* محتوى التطبيق */}
        {children}
        
        {/* عرض الأخطاء العامة */}
        <GlobalErrorDisplay />
        
        {/* عنصر Toaster لعرض الإشعارات */}
        <Toaster richColors position="bottom-left" />
      </ErrorProvider>
    </ErrorBoundary>
  );
}
