
import { RouteObject } from "react-router-dom";
import ReceivablesPage from "@/pages/receivables/ReceivablesPage";
import CollectionPage from "@/pages/receivables/CollectionPage";
import ReceivablesAccountsPage from "@/pages/receivables/ReceivablesAccountsPage";
import PayablesPage from "@/pages/payables/PayablesPage";
import PaymentPage from "@/pages/payables/PaymentPage";
import PayablesAccountsPage from "@/pages/payables/PayablesAccountsPage";

export const receivablesPayablesRoutes: RouteObject[] = [
  { path: "receivables", element: <ReceivablesPage /> },
  { path: "receivables/collection", element: <CollectionPage /> },
  { path: "receivables/accounts", element: <ReceivablesAccountsPage /> },
  { path: "payables", element: <PayablesPage /> },
  { path: "payables/payment", element: <PaymentPage /> },
  { path: "payables/accounts", element: <PayablesAccountsPage /> }
];
