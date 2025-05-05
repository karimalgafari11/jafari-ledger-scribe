
import { RouteObject } from "react-router-dom";
import CustomersPage from "@/pages/customers/CustomersPage";
import CustomerStatementPage from "@/pages/customers/CustomerStatementPage";
import CustomerReportsPage from "@/pages/customers/CustomerReportsPage";

export const customerRoutes: RouteObject[] = [
  { path: "customers", element: <CustomersPage /> },
  { path: "customers/statement/:id", element: <CustomerStatementPage /> },
  { path: "customers/reports", element: <CustomerReportsPage /> }
];
