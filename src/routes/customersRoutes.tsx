
import { RouteObject } from "react-router-dom";
import CustomersPage from "@/pages/customers/CustomersPage";
import CustomersManagePage from "@/pages/customers/CustomersManagePage";
import CustomerStatementPage from "@/pages/customers/CustomerStatementPage";
import CustomerStatementListPage from "@/pages/customers/CustomerStatementListPage";
import CustomerReportsPage from "@/pages/customers/CustomerReportsPage";
import CustomersModulePage from "@/pages/customers/CustomersModulePage";

export const customersRoutes: RouteObject[] = [
  {
    path: "customers",
    element: <CustomersPage />,
  },
  {
    path: "customers/manage",
    element: <CustomersManagePage />,
  },
  {
    path: "customers/statement/:id",
    element: <CustomerStatementPage />,
  },
  {
    path: "customers/statement",
    element: <CustomerStatementListPage />,
  },
  {
    path: "customers/reports",
    element: <CustomerReportsPage />,
  },
  {
    path: "customers/module",
    element: <CustomersModulePage />,
  }
];
