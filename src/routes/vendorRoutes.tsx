
import { RouteObject } from "react-router-dom";
import VendorsPage from "@/pages/vendors/VendorsPage";
import VendorReportsPage from "@/pages/vendors/VendorReportsPage";
import VendorsManagePage from "@/pages/vendors/VendorsManagePage";
import VendorStatementPage from "@/pages/vendors/VendorStatementPage";
import VendorStatementListPage from "@/pages/vendors/VendorStatementListPage";

export const vendorRoutes: RouteObject[] = [
  { path: "vendors", element: <VendorsPage /> },
  { path: "vendors/manage", element: <VendorsManagePage /> },
  { path: "vendors/reports", element: <VendorReportsPage /> },
  { path: "vendors/statement", element: <VendorStatementListPage /> },
  { path: "vendors/statement/:id", element: <VendorStatementPage /> }
];
