
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ErrorTracker } from '@/utils/errorTracker';

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  // استخدام حالة داخلية لتجنب التحديثات المتكررة
  const [isChecked, setIsChecked] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);

  useEffect(() => {
    // فحص حالة المستخدم مرة واحدة فقط بعد اكتمال التحميل
    if (!isLoading) {
      setIsChecked(true);
    }
    
    // مراقبة الأداء والاستقرار
    const startTime = performance.now();
    
    // إنشاء مؤقت للتأكد من عدم انتظار التحميل لفترة طويلة
    const timeoutTimer = setTimeout(() => {
      if (!isChecked) {
        setIsTimedOut(true);
        ErrorTracker.warning('انقضى وقت طويل أثناء التحقق من حالة المستخدم', {
          component: 'PublicRoute',
          additionalInfo: { 
            elapsedMs: performance.now() - startTime,
            isLoadingStatus: isLoading
          }
        });
      }
    }, 5000);
    
    return () => {
      // تسجيل إذا كان المكون قد استغرق وقتًا طويلاً للتحميل
      const elapsedTime = performance.now() - startTime;
      if (elapsedTime > 500) {
        ErrorTracker.info('استغرق مكون PublicRoute وقتًا طويلاً للتحميل', {
          component: 'PublicRoute',
          additionalInfo: { elapsedMs: elapsedTime }
        });
      }
      
      clearTimeout(timeoutTimer);
    };
  }, [isLoading, isChecked]);

  // إذا كان التطبيق لا يزال يتحقق من حالة المصادقة، نعرض شاشة تحميل
  if (isLoading && !isTimedOut) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
          <p className="text-muted-foreground animate-pulse">جاري التحقق من حالة المستخدم...</p>
        </div>
      </div>
    );
  }
  
  // في حالة انتهاء المهلة مع استمرار التحميل، نعرض خيار إعادة المحاولة
  if (isTimedOut && isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-destructive">استغرق التحقق من حالة المستخدم وقتًا طويلاً</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  // بعد اكتمال التحقق، إذا كان المستخدم مسجل الدخول بالفعل، نوجهه إلى الصفحة الرئيسية
  if ((isChecked || isTimedOut) && user) {
    return <Navigate to="/" replace />;
  }

  // إذا لم يكن المستخدم مسجل الدخول، نعرض المحتوى المطلوب
  return <>{children}</>;
};
