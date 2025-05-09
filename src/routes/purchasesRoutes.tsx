
import { RouteObject } from "react-router-dom";
import PurchasesPage from "@/pages/purchases/PurchasesPage";
import PurchaseInvoicePage from "@/pages/purchases/PurchaseInvoicePage";
import PurchaseInvoicesPage from "@/pages/purchases/PurchaseInvoicesPage";
import PurchasesOrdersPage from "@/pages/purchases/PurchasesOrdersPage";
import PurchasesReturnsPage from "@/pages/purchases/PurchasesReturnsPage";

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
    element: <PurchasesOrdersPage />,
  },
  {
    path: "purchases/returns",
    element: <PurchasesReturnsPage />,
  },
  // Temporarily commenting out missing pages until they are implemented
  // {
  //   path: "purchases/analytics",
  //   element: <PurchaseAnalyticsPage />,
  // },
  // {
  //   path: "purchases/settings",
  //   element: <PurchaseSettingsPage />,
  // },
  // {
  //   path: "purchases/vendors",
  //   element: <VendorManagementPage />,
  // },
];
