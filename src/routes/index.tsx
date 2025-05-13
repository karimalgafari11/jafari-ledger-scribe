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
import NotFound from '@/pages/NotFound'; // Import the NotFound page for 404 handling

// Import the notifications page
import NotificationsPage from '@/pages/notifications/NotificationsPage';

// Import settings pages
import SystemSettingsPage from '@/pages/settings/SystemSettingsPage';
import UserRolesPage from '@/pages/settings/UserRolesPage';
import UsersPage from '@/pages/settings/UsersPage';
import BackupPage from '@/pages/settings/BackupPage';
import BackupTestPage from '@/pages/settings/BackupTestPage';
import BranchesPage from '@/pages/settings/BranchesPage';
import NotificationsSettingsPage from '@/pages/settings/NotificationsPage';
import NotificationSettingsPage from '@/pages/settings/NotificationSettingsPage';
import SendNotificationPage from '@/pages/settings/SendNotificationPage';
import AiEngineSettingsPage from '@/pages/settings/AiEngineSettingsPage';
import PageManagementPage from '@/pages/settings/PageManagementPage';
import ThemeCustomizationPage from '@/pages/settings/ThemeCustomizationPage';

// Import all route modules
import { accountingRoutes } from './accountingRoutes';
import { customersRoutes } from './customersRoutes';
import { vendorRoutes } from './vendorsRoutes';
import { inventoryRoutes } from './inventoryRoutes';
import { inventoryControlRoutes } from './inventoryControlRoutes';
import { purchasesRoutes } from './purchasesRoutes';
import { invoicesRoutes } from './invoicesRoutes';
import { receivablesPayablesRoutes } from './receivablesPayablesRoutes';
import { expensesRoutes } from './expensesRoutes';
import { reportsRoutes } from './reportsRoutes';
import { definitionsRoutes } from './definitionsRoutes';
import { settingsRoutes } from './settingsRoutes';
import { integrationsRoutes } from './integrationsRoutes';
import { aboutRoutes } from './aboutRoutes';
import { aiRoutes } from './aiRoutes';
import { hrRoutes } from './hrRoutes';

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

// Combine all route children
const routeChildren = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/notifications",
    element: <NotificationsPage />,
  },
  {
    path: "settings/activity-log",
    element: <ActivityLogPage />,
  },
  // إضافة مسارات الإعدادات
  {
    path: "settings/system",
    element: <SystemSettingsPage />,
  },
  {
    path: "settings/roles",
    element: <UserRolesPage />,
  },
  {
    path: "settings/users",
    element: <UsersPage />,
  },
  {
    path: "settings/backup",
    element: <BackupPage />,
  },
  {
    path: "settings/backup-test",
    element: <BackupTestPage />,
  },
  {
    path: "settings/branches",
    element: <BranchesPage />,
  },
  {
    path: "settings/notifications",
    element: <NotificationsSettingsPage />,
  },
  {
    path: "settings/notification-settings",
    element: <NotificationSettingsPage />,
  },
  {
    path: "settings/send-notification",
    element: <SendNotificationPage />,
  },
  {
    path: "settings/ai-engine",
    element: <AiEngineSettingsPage />,
  },
  {
    path: "settings/page-management",
    element: <PageManagementPage />,
  },
  {
    path: "settings/theme",
    element: <ThemeCustomizationPage />,
  },
  // Spread all other route modules
  ...accountingRoutes,
  ...inventoryRoutes,
  ...inventoryControlRoutes,
  ...purchasesRoutes,
  ...invoicesRoutes,
  ...customersRoutes,
  ...vendorRoutes,
  ...receivablesPayablesRoutes,
  ...expensesRoutes,
  ...reportsRoutes,
  ...definitionsRoutes,
  ...aiRoutes,
  ...hrRoutes,
  ...integrationsRoutes,
  ...aboutRoutes,
];

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Index /></PrivateRoute>,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" />,
      },
      ...routeChildren,
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
