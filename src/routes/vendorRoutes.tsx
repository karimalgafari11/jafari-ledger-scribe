
import { RouteObject } from "react-router-dom";
import VendorsPage from "@/pages/vendors/VendorsPage";
import VendorReportsPage from "@/pages/vendors/VendorReportsPage";

export const vendorRoutes: RouteObject[] = [
  { path: "vendors", element: <VendorsPage /> },
  { path: "vendors/reports", element: <VendorReportsPage /> }
];
