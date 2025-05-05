
import { RouteObject } from "react-router-dom";
import PurchaseInvoicePage from "@/pages/purchases/PurchaseInvoicePage";
import PurchasesInvoicesPage from "@/pages/purchases/PurchasesInvoicesPage";
import PurchasesOrdersPage from "@/pages/purchases/PurchasesOrdersPage";
import NewPurchaseOrderPage from "@/pages/purchases/NewPurchaseOrderPage";
import PurchasesReturnsPage from "@/pages/purchases/PurchasesReturnsPage";

export const purchasesRoutes: RouteObject[] = [
  { path: "purchases/new", element: <PurchaseInvoicePage /> },
  { path: "purchases/invoices", element: <PurchasesInvoicesPage /> },
  { path: "purchases/orders", element: <PurchasesOrdersPage /> },
  { path: "purchases/orders/new", element: <NewPurchaseOrderPage /> },
  { path: "purchases/returns", element: <PurchasesReturnsPage /> }
];
