
import { RouteObject } from "react-router-dom";
import SalesReportsPage from "@/pages/reports/SalesReportsPage";
import ReportTemplatesPage from "@/pages/reports/ReportTemplatesPage";
import FinancialReportsPage from "@/pages/reports/FinancialReportsPage";

export const reportsRoutes: RouteObject[] = [
  { path: "reports/sales", element: <SalesReportsPage /> },
  { path: "reports/templates", element: <ReportTemplatesPage /> },
  { path: "reports/financial", element: <FinancialReportsPage /> }
];
