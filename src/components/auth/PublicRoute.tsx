
import React, { ReactNode, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PublicRouteProps {
  children: ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();

  // إذا كان التطبيق لا يزال يتحقق من حالة المصادقة، نعرض شاشة تحميل
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // إذا كان المستخدم مسجل الدخول بالفعل، نوجهه إلى الصفحة الرئيسية
  if (user) {
    return <Navigate to="/" replace />;
  }

  // إذا لم يكن المستخدم مسجل الدخول، نعرض المحتوى المطلوب
  return <>{children}</>;
};
