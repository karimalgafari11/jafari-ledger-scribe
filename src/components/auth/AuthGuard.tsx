
import React, { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  // استخدام حالة داخلية لتجنب التحديثات المتكررة
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // فحص حالة المستخدم مرة واحدة فقط بعد اكتمال التحميل
    if (!isLoading) {
      setIsChecked(true);
    }
  }, [isLoading]);

  // إذا كان التطبيق لا يزال يتحقق من حالة المصادقة، نعرض شاشة تحميل
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // بعد اكتمال التحقق، إذا لم يكن المستخدم مسجل الدخول، نقوم بتوجيهه إلى صفحة تسجيل الدخول
  if (isChecked && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // إذا كان المستخدم مسجل الدخول، نعرض المحتوى المطلوب
  return <>{children}</>;
};
