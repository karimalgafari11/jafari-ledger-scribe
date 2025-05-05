
import { RouteObject } from "react-router-dom";
import ReceivablesPage from "@/pages/receivables/ReceivablesPage";
import CollectionPage from "@/pages/receivables/CollectionPage";
import PayablesPage from "@/pages/payables/PayablesPage";
import PaymentPage from "@/pages/payables/PaymentPage";

export const receivablesPayablesRoutes: RouteObject[] = [
  { path: "receivables", element: <ReceivablesPage /> },
  { path: "receivables/collection", element: <CollectionPage /> },
  { path: "payables", element: <PayablesPage /> },
  { path: "payables/payment", element: <PaymentPage /> }
];
