
/**
 * مراقبة أداء التطبيق
 */

import { ErrorTracker } from './index';

/**
 * إعداد مراقبة الأداء
 */
export const setupPerformanceMonitoring = (): void => {
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
};

// تشغيل مراقبة الأداء عند استيراد الوحدة
if (typeof window !== 'undefined') {
  setupPerformanceMonitoring();
}

/**
 * تتبع أداء تحميل الصفحة
 */
export const trackPagePerformance = (): void => {
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
        const fcp = entry as PerformanceEntry;
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

/**
 * مراقبة استخدام الذاكرة بحثًا عن تسريبات
 */
export const monitorMemoryUsage = (): (() => void) => {
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
  
  return () => clearInterval(memoryChecker);
};
