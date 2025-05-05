
import { RouteObject } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import Reports from "@/pages/Reports";
import NotFound from "@/pages/NotFound";
import LoginPage from "@/pages/auth/LoginPage";

// Import route modules
import { settingsRoutes } from "./settingsRoutes";
import { accountingRoutes } from "./accountingRoutes";
import { aiRoutes } from "./aiRoutes";
import { customerRoutes } from "./customerRoutes";
import { vendorRoutes } from "./vendorRoutes";
import { inventoryRoutes } from "./inventoryRoutes";
import { inventoryControlRoutes } from "./inventoryControlRoutes";
import { definitionsRoutes } from "./definitionsRoutes";
import { invoicesRoutes } from "./invoicesRoutes";
import { reportsRoutes } from "./reportsRoutes";
import { expensesRoutes } from "./expensesRoutes";
import { integrationsRoutes } from "./integrationsRoutes";
import { receivablesPayablesRoutes } from "./receivablesPayablesRoutes";
import { purchasesRoutes } from "./purchasesRoutes";
import { aboutRoutes } from "./aboutRoutes";

export const appRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/",
    element: <Index />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "reports", element: <Reports /> },
      
      // Sub-route modules
      ...settingsRoutes,
      ...accountingRoutes,
      ...aiRoutes,
      ...customerRoutes,
      ...vendorRoutes,
      ...inventoryRoutes,
      ...inventoryControlRoutes,
      ...definitionsRoutes,
      ...invoicesRoutes,
      ...reportsRoutes,
      ...expensesRoutes,
      ...integrationsRoutes,
      ...receivablesPayablesRoutes,
      ...purchasesRoutes,
      ...aboutRoutes,
      
      // Catch-all route
      { path: "*", element: <NotFound /> }
    ]
  }
];
