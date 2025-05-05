
import { RouteObject } from "react-router-dom";
import InvoicesPage from "@/pages/invoices/InvoicesPage";
import SalesInvoicePage from "@/pages/invoices/SalesInvoicePage";
import QuotesPage from "@/pages/invoices/QuotesPage";
import SalesOrdersPage from "@/pages/invoices/SalesOrdersPage";
import ReturnsPage from "@/pages/invoices/ReturnsPage";

export const invoicesRoutes: RouteObject[] = [
  { path: "invoices", element: <InvoicesPage /> },
  { path: "invoices/new", element: <SalesInvoicePage /> },
  { path: "invoices/quotes", element: <QuotesPage /> },
  { path: "invoices/orders", element: <SalesOrdersPage /> },
  { path: "invoices/returns", element: <ReturnsPage /> }
];
