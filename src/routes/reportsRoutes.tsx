
import { RouteObject } from "react-router-dom";
import Reports from "@/pages/Reports";
import SalesReportsPage from "@/pages/reports/SalesReportsPage";
import SalesStatsPage from "@/pages/reports/SalesStatsPage";
import ReportTemplatesPage from "@/pages/reports/ReportTemplatesPage";
import CustomReportsPage from "@/pages/reports/CustomReportsPage";

export const reportsRoutes: RouteObject[] = [
  {
    path: "reports",
    element: <Reports />,
  },
  {
    path: "reports/sales",
    element: <SalesReportsPage />,
  },
  {
    path: "reports/templates",
    element: <ReportTemplatesPage />,
  },
  {
    path: "reports/custom",
    element: <CustomReportsPage />,
  }
];
