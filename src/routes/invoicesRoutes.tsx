
import { RouteObject } from "react-router-dom";
import InvoicesPage from "@/pages/invoices/InvoicesPage";
import OutgoingInvoicesPage from "@/pages/invoices/OutgoingInvoicesPage";
import SalesInvoicePage from "@/pages/invoices/SalesInvoicePage";
import QuotesPage from "@/pages/invoices/QuotesPage";
import ReturnsPage from "@/pages/invoices/ReturnsPage";
import SalesOrdersPage from "@/pages/invoices/SalesOrdersPage";
import OutgoingInvoicePage from "@/pages/invoices/OutgoingInvoicePage";
import PriceQuotesPage from "@/pages/invoices/PriceQuotesPage";
import QuoteToInvoicePage from "@/pages/invoices/QuoteToInvoicePage";
import InvoiceTemplatesPage from "@/pages/invoices/InvoiceTemplatesPage";
import SalesReturnFormPage from "@/pages/invoices/SalesReturnFormPage";

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
    path: "invoices/new",
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
    path: "invoices/quotes/new",
    element: <QuotesPage />,
  },
  {
    path: "invoices/quotes/convert/:id",
    element: <QuoteToInvoicePage />,
  },
  {
    path: "invoices/returns",
    element: <ReturnsPage />,
  },
  {
    path: "invoices/returns/new",
    element: <SalesReturnFormPage />,
  },
  {
    path: "invoices/sales-orders",
    element: <SalesOrdersPage />,
  },
  {
    path: "invoices/templates",
    element: <InvoiceTemplatesPage />,
  },
];
