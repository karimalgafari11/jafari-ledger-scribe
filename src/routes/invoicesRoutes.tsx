
import { RouteObject } from "react-router-dom";
import InvoicesPage from "@/pages/invoices/InvoicesPage";
import OutgoingInvoicesPage from "@/pages/invoices/OutgoingInvoicesPage";
import SalesInvoicePage from "@/pages/invoices/SalesInvoicePage";
import QuotesPage from "@/pages/invoices/QuotesPage";
import ReturnsPage from "@/pages/invoices/ReturnsPage";
import SalesOrdersPage from "@/pages/invoices/SalesOrdersPage";
import OutgoingInvoicePage from "@/pages/invoices/OutgoingInvoicePage";
import PriceQuotesPage from "@/pages/invoices/PriceQuotesPage";

export const invoicesRoutes: RouteObject[] = [
  {
    path: "invoices",
    element: <InvoicesPage />,
  },
  {
    path: "invoices/outgoing",
    element: <OutgoingInvoicesPage />,
  },
  {
    path: "invoices/outgoing-module",
    element: <OutgoingInvoicePage />,
  },
  {
    path: "invoices/sales",
    element: <SalesInvoicePage />,
  },
  {
    path: "invoices/quotes",
    element: <QuotesPage />,
  },
  {
    path: "invoices/quotes-module",
    element: <PriceQuotesPage />,
  },
  {
    path: "invoices/returns",
    element: <ReturnsPage />,
  },
  {
    path: "invoices/sales-orders",
    element: <SalesOrdersPage />,
  },
];
