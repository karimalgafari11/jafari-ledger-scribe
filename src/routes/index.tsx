
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import StabilityWrapper from '@/components/StabilityWrapper';
import { AppWithErrorHandling } from '@/AppWithErrorHandling';

// Import your components/pages here
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard'; 
import NotFound from '@/pages/NotFound'; // Import the NotFound page for 404 handling

// Import specific pages for settings section
import AiEngineSettingsPage from '@/pages/settings/AiEngineSettingsPage';
import PageManagementPage from '@/pages/settings/PageManagementPage';
import BranchesPage from '@/pages/settings/BranchesPage';
import ActivityLogPage from '@/pages/settings/ActivityLogPage';
import NotificationSettingsPage from '@/pages/settings/NotificationSettingsPage';

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
import { authRoutes } from './authRoutes';

// Example of a PublicRoute component
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <StabilityWrapper componentName="المسار العام">{children}</StabilityWrapper>;
};

// Example of a PrivateRoute component
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return user ? <StabilityWrapper componentName="المسار المحمي">{children}</StabilityWrapper> : <Navigate to="/auth/login" />;
};

// Combine all route children
const routeChildren = [
  {
    path: "/dashboard",
    element: <StabilityWrapper componentName="لوحة التحكم" showToastOnError><Dashboard /></StabilityWrapper>,
  },
  // إضافة المسارات المتاحة فقط
  {
    path: "settings/activity-log",
    element: <StabilityWrapper componentName="سجل النشاطات"><ActivityLogPage /></StabilityWrapper>,
  },
  {
    path: "settings/branches",
    element: <StabilityWrapper componentName="الفروع"><BranchesPage /></StabilityWrapper>,
  },
  {
    path: "settings/notification-settings",
    element: <StabilityWrapper componentName="إعدادات الإشعارات"><NotificationSettingsPage /></StabilityWrapper>,
  },
  {
    path: "settings/ai-engine",
    element: <StabilityWrapper componentName="محرك الذكاء الاصطناعي"><AiEngineSettingsPage /></StabilityWrapper>,
  },
  {
    path: "settings/page-management",
    element: <StabilityWrapper componentName="إدارة الصفحات"><PageManagementPage /></StabilityWrapper>,
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

const wrapRouteChildren = (routes: any[]): any[] => {
  return routes.map(route => {
    // If the route has children, recursively wrap them
    if (route.children) {
      return {
        ...route,
        children: wrapRouteChildren(route.children)
      };
    }

    // If there's already an element, wrap it with StabilityWrapper
    if (route.element) {
      return {
        ...route,
        element: (
          <StabilityWrapper componentName={`صفحة ${route.path || 'غير معروفة'}`}>
            {route.element}
          </StabilityWrapper>
        ),
      };
    }

    return route;
  });
};

// Apply wrapper to all routes
const wrappedRouteChildren = wrapRouteChildren(routeChildren);

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppWithErrorHandling>
        <PrivateRoute>
          <StabilityWrapper componentName="الصفحة الرئيسية" showToastOnError>
            <Index />
          </StabilityWrapper>
        </PrivateRoute>
      </AppWithErrorHandling>
    ),
    errorElement: (
      <AppWithErrorHandling>
        <StabilityWrapper componentName="صفحة الخطأ" showToastOnError>
          <NotFound />
        </StabilityWrapper>
      </AppWithErrorHandling>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" />,
      },
      ...wrappedRouteChildren,
    ]
  },
  ...authRoutes,
]);
