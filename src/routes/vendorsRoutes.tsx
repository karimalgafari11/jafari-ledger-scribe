
import { RouteObject } from "react-router-dom";
import VendorsPage from "@/pages/vendors/VendorsPage";
import VendorsManagePage from "@/pages/vendors/VendorsManagePage";
import VendorStatementPage from "@/pages/vendors/VendorStatementPage";
import VendorStatementListPage from "@/pages/vendors/VendorStatementListPage";
import VendorReportsPage from "@/pages/vendors/VendorReportsPage";
import VendorsModulePage from "@/pages/vendors/VendorsModulePage";

export const vendorRoutes: RouteObject[] = [
  {
    path: "vendors",
    element: <VendorsPage />,
  },
  {
    path: "vendors/manage",
    element: <VendorsManagePage />,
  },
  {
    path: "vendors/statement/:id",
    element: <VendorStatementPage />,
  },
  {
    path: "vendors/statements",
    element: <VendorStatementListPage />,
  },
  {
    path: "vendors/reports",
    element: <VendorReportsPage />,
  },
  {
    path: "vendors/module",
    element: <VendorsModulePage />,
  }
];
