
import { RouteObject } from "react-router-dom";
import PayablesPage from "@/pages/payables/PayablesPage";
import PayablesAccountsPage from "@/pages/payables/PayablesAccountsPage";
import PaymentPage from "@/pages/payables/PaymentPage";
import PaymentModulePage from "@/pages/payables/PaymentModulePage";

export const payablesRoutes: RouteObject[] = [
  {
    path: "payables",
    element: <PayablesPage />,
  },
  {
    path: "payables/accounts",
    element: <PayablesAccountsPage />,
  },
  {
    path: "payables/payment",
    element: <PaymentPage />,
  },
  {
    path: "payables/payment-module",
    element: <PaymentModulePage />,
  }
];
