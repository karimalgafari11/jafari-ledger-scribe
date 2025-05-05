
import { RouteObject } from "react-router-dom";
import ExpenseReportsPage from "@/pages/expenses/ExpenseReportsPage";
import ExpenseCategoriesPage from "@/pages/expenses/ExpenseCategoriesPage";
import NewExpensePage from "@/pages/expenses/NewExpensePage";

export const expensesRoutes: RouteObject[] = [
  { path: "expenses/reports", element: <ExpenseReportsPage /> },
  { path: "expenses/categories", element: <ExpenseCategoriesPage /> },
  { path: "expenses/new", element: <NewExpensePage /> }
];
