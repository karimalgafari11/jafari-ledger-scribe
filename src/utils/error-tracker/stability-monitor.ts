
/**
 * مراقبة استقرار التطبيق والصفحة
 */

import { trackError } from './core';
import { ErrorTracker } from './index';
import { SESSION_ID } from './core';

// تفعيل استقرار صفحة الديناميكي
const VISIBILITY_CHANGE_THRESHOLD = 10000; // 10 ثواني
let lastVisibilityChange = 0;
let visibilityChangeCount = 0;

/**
 * إعداد مراقبة استقرار الصفحة
 */
export const setupStabilityMonitoring = (): void => {
  if (typeof document === 'undefined') return;
  
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
};

// إضافة خاصية للكشف عن مشاكل الاستقرار
export const detectStabilityIssues = (): void => {
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
  setupStabilityMonitoring();
}
