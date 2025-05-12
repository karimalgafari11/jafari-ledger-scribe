
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

// Import your components/pages here
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard'; 
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import ActivityLogPage from '@/pages/settings/ActivityLogPage'; 
import ResetPasswordPage from '@/pages/auth/ResetPasswordPage';
import UpdatePasswordPage from '@/pages/auth/UpdatePasswordPage';

// Example of a PublicRoute component
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <>{children}</>;
};

// Example of a PrivateRoute component
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  return user ? <>{children}</> : <Navigate to="/auth/login" />;
};


export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Index /></PrivateRoute>,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "settings/activity-log",
        element: <ActivityLogPage />,
      },
      // يمكن إضافة المزيد من المسارات الفرعية هنا
    ]
  },
  {
    path: "/auth/login",
    element: <PublicRoute><LoginPage /></PublicRoute>
  },
  {
    path: "/auth/register",
    element: <PublicRoute><RegisterPage /></PublicRoute>
  },
  {
    path: "/auth/reset-password",
    element: <PublicRoute><ResetPasswordPage /></PublicRoute>
  },
  {
    path: "/auth/update-password",
    element: <PublicRoute><UpdatePasswordPage /></PublicRoute>
  },
]);
