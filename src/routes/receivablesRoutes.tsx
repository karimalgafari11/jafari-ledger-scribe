
import { RouteObject } from "react-router-dom";
import ReceivablesPage from "@/pages/receivables/ReceivablesPage";
import ReceivablesAccountsPage from "@/pages/receivables/ReceivablesAccountsPage";
import CollectionPage from "@/pages/receivables/CollectionPage";
import ReceiptModulePage from "@/pages/receivables/ReceiptModulePage";

export const receivablesRoutes: RouteObject[] = [
  {
    path: "receivables",
    element: <ReceivablesPage />,
  },
  {
    path: "receivables/accounts",
    element: <ReceivablesAccountsPage />,
  },
  {
    path: "receivables/collection",
    element: <CollectionPage />,
  },
  {
    path: "receivables/receipt-module",
    element: <ReceiptModulePage />,
  }
];
