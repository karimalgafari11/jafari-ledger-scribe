
import { RouteObject } from "react-router-dom";
import PurchasesPage from "@/pages/purchases/PurchasesPage";
import PurchaseInvoicePage from "@/pages/purchases/PurchaseInvoicePage";
import PurchaseInvoicesPage from "@/pages/purchases/PurchaseInvoicesPage";
import PurchaseOrdersPage from "@/pages/purchases/PurchaseOrdersPage";
import PurchaseReturnsPage from "@/pages/purchases/PurchaseReturnsPage";
import PurchaseAnalyticsPage from "@/pages/purchases/PurchaseAnalyticsPage";
import PurchaseSettingsPage from "@/pages/purchases/PurchaseSettingsPage";
import VendorManagementPage from "@/pages/purchases/VendorManagementPage";

export const purchasesRoutes: RouteObject[] = [
  {
    path: "purchases",
    element: <PurchasesPage />,
  },
  {
    path: "purchases/new",
    element: <PurchaseInvoicePage />,
  },
  {
    path: "purchases/invoices",
    element: <PurchaseInvoicesPage />,
  },
  {
    path: "purchases/orders",
    element: <PurchaseOrdersPage />,
  },
  {
    path: "purchases/returns",
    element: <PurchaseReturnsPage />,
  },
  {
    path: "purchases/analytics",
    element: <PurchaseAnalyticsPage />,
  },
  {
    path: "purchases/settings",
    element: <PurchaseSettingsPage />,
  },
  {
    path: "purchases/vendors",
    element: <VendorManagementPage />,
  },
];
