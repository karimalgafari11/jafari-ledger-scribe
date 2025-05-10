
import React, { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface AuthGuardProps {
  children: ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // إذا كان التطبيق لا يزال يتحقق من حالة المصادقة، نعرض شاشة تحميل
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // إذا لم يكن المستخدم مسجل الدخول، نقوم بتوجيهه إلى صفحة تسجيل الدخول
  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // إذا كان المستخدم مسجل الدخول، نعرض المحتوى المطلوب
  return <>{children}</>;
};
