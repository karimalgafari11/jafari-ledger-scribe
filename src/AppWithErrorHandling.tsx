
import React, { useEffect } from 'react';
import { ErrorProvider } from '@/contexts/ErrorContext';
import { ErrorBoundary } from '@/components/ui/error-boundary/ErrorBoundary';
import { GlobalErrorDisplay } from '@/components/GlobalErrorDisplay';
import { Toaster } from '@/components/ui/sonner';
import { ErrorTracker } from '@/utils/errorTracker';

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
    // تتبع وقت التحميل
    const pageLoadTime = window.performance && window.performance.timing 
      ? window.performance.timing.loadEventEnd - window.performance.timing.navigationStart
      : null;
    
    if (pageLoadTime && pageLoadTime > 5000) {
      ErrorTracker.warning('تحميل الصفحة استغرق وقتًا طويلاً', {
        component: 'performance-monitor',
        additionalInfo: { loadTime: pageLoadTime }
      });
    }
    
    // تتبع تسريبات الذاكرة المحتملة
    let lastMemory: any;
    let memoryIncreaseCount = 0;
    
    const memoryChecker = setInterval(() => {
      if (window.performance && (window.performance as any).memory) {
        const memUsage = (window.performance as any).memory.usedJSHeapSize;
        
        if (lastMemory && memUsage > lastMemory * 1.5 && memUsage > 50 * 1024 * 1024) {
          memoryIncreaseCount++;
          
          if (memoryIncreaseCount >= 3) {
            ErrorTracker.warning('زيادة استخدام الذاكرة بشكل كبير', {
              component: 'memory-monitor',
              additionalInfo: { currentUsage: memUsage, previousUsage: lastMemory }
            });
          }
        } else {
          memoryIncreaseCount = 0;
        }
        
        lastMemory = memUsage;
      }
    }, 60000); // فحص كل دقيقة
    
    return () => {
      clearInterval(memoryChecker);
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
