
import { RouteObject } from "react-router-dom";
import CustomersPage from "@/pages/customers/CustomersPage";
import CustomerStatementPage from "@/pages/customers/CustomerStatementPage";
import CustomerReportsPage from "@/pages/customers/CustomerReportsPage";
import CustomersManagePage from "@/pages/customers/CustomersManagePage";
import CustomerStatementListPage from "@/pages/customers/CustomerStatementListPage";
import CustomersModulePage from "@/pages/customers/CustomersModulePage";

export const customerRoutes: RouteObject[] = [
  { path: "customers", element: <CustomersPage /> },
  { path: "customers/manage", element: <CustomersManagePage /> },
  { path: "customers/statement", element: <CustomerStatementListPage /> },
  { path: "customers/statement/:id", element: <CustomerStatementPage /> },
  { path: "customers/reports", element: <CustomerReportsPage /> },
  { path: "customers/module", element: <CustomersModulePage /> }
];
