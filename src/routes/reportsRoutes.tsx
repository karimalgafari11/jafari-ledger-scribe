
import { RouteObject } from "react-router-dom";
import SalesReportsPage from "@/pages/reports/SalesReportsPage";
import ReportTemplatesPage from "@/pages/reports/ReportTemplatesPage";

export const reportsRoutes: RouteObject[] = [
  { path: "reports/sales", element: <SalesReportsPage /> },
  { path: "reports/templates", element: <ReportTemplatesPage /> }
];
