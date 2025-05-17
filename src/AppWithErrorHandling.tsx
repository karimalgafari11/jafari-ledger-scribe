
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
    // تحميل التطبيق وقياس أدائه 
    const trackAppPerformance = () => {
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
      
      // قياس FCP (First Contentful Paint)
      if ('PerformanceObserver' in window) {
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            const fcp = entry as PerformanceEntry; // typecast needed for TS
            if (fcp.entryType === 'paint' && fcp.name === 'first-contentful-paint') {
              const fcpTime = fcp.startTime;
              if (fcpTime > 2000) {
                ErrorTracker.info('العرض الأول للمحتوى استغرق وقتًا طويلاً', {
                  component: 'performance-monitor',
                  additionalInfo: { fcpTime }
                });
              }
              break;
            }
          }
        }).observe({ type: 'paint', buffered: true });
      }
      
      // تتبع CLS (Cumulative Layout Shift)
      if ('PerformanceObserver' in window) {
        let clsValue = 0;
        let clsEntries: any[] = [];
        
        new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            // Avoid using properties for type safety
            const clsEntry = entry as any;
            if (!clsEntry.hadRecentInput) {
              const clsShift = clsEntry.value;
              clsValue += clsShift;
              clsEntries.push(clsEntry);
              
              if (clsValue > 0.25) {
                ErrorTracker.warning('تم اكتشاف تغيير كبير في تخطيط الصفحة', {
                  component: 'layout-stability',
                  additionalInfo: { cls: clsValue }
                });
              }
            }
          }
        }).observe({ type: 'layout-shift', buffered: true });
      }
    };
    
    // إضافة مستمع لأحداث التحميل لتتبع الأداء
    if (document.readyState === 'complete') {
      trackAppPerformance();
    } else {
      window.addEventListener('load', trackAppPerformance);
      return () => window.removeEventListener('load', trackAppPerformance);
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
    
    // مراقبة AJAX errors
    const originalFetch = window.fetch;
    window.fetch = async function(...args) {
      try {
        const response = await originalFetch.apply(window, args);
        if (!response.ok) {
          ErrorTracker.info(`فشل طلب الشبكة: ${response.status} ${response.statusText}`, {
            component: 'network-monitor',
            additionalInfo: { 
              url: typeof args[0] === 'string' ? args[0] : 'unknown',
              status: response.status
            }
          });
        }
        return response;
      } catch (error) {
        ErrorTracker.error(`خطأ في طلب الشبكة`, {
          component: 'network-monitor',
          additionalInfo: { 
            url: typeof args[0] === 'string' ? args[0] : 'unknown',
            error: error instanceof Error ? error.message : String(error)
          }
        });
        throw error;
      }
    };
    
    // تسجيل عدد إعادات التحميل المتكررة
    ErrorTracker.detectStabilityIssues();
    
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
