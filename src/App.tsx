
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import ProductsPage from "./pages/inventory/ProductsPage";
import StockMovementsPage from "./pages/inventory/StockMovementsPage";
import CountingPage from "./pages/inventory/CountingPage";
import ReorderPage from "./pages/inventory/ReorderPage";
import SystemSettingsPage from "./pages/settings/SystemSettingsPage";
import BranchesPage from "./pages/settings/BranchesPage";
import UsersPage from "./pages/settings/UsersPage";
import BackupPage from "./pages/settings/BackupPage";
import NewExpensePage from "./pages/expenses/NewExpensePage";
import ExpenseCategoriesPage from "./pages/expenses/ExpenseCategoriesPage";
import ExpenseReportsPage from "./pages/expenses/ExpenseReportsPage";
import InvoicesPage from "./pages/invoices/InvoicesPage";
import QuotesPage from "./pages/invoices/QuotesPage";
import SalesOrdersPage from "./pages/invoices/SalesOrdersPage";
import ReturnsPage from "./pages/invoices/ReturnsPage";
import AccountChartPage from "./pages/accounting/AccountChartPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          
          {/* Inventory Routes */}
          <Route path="/inventory/products" element={<ProductsPage />} />
          <Route path="/inventory/movements" element={<StockMovementsPage />} />
          <Route path="/inventory/counting" element={<CountingPage />} />
          <Route path="/inventory/reorder" element={<ReorderPage />} />
          
          {/* Expenses Routes */}
          <Route path="/expenses/new" element={<NewExpensePage />} />
          <Route path="/expenses/categories" element={<ExpenseCategoriesPage />} />
          <Route path="/expenses/reports" element={<ExpenseReportsPage />} />
          
          {/* Invoices Routes */}
          <Route path="/invoices/outgoing" element={<InvoicesPage />} />
          <Route path="/invoices/quotes" element={<QuotesPage />} />
          <Route path="/invoices/sales-orders" element={<SalesOrdersPage />} />
          <Route path="/invoices/returns" element={<ReturnsPage />} />
          
          {/* Accounting Routes */}
          <Route path="/accounting/chart" element={<AccountChartPage />} />
          <Route path="/accounting/journals" element={<NotFound />} />
          <Route path="/accounting/cost-centers" element={<NotFound />} />
          <Route path="/accounting/settings" element={<NotFound />} />
          
          {/* Inventory Control Routes */}
          <Route path="/inventory-control/transfer" element={<NotFound />} />
          <Route path="/inventory-control/locations" element={<NotFound />} />
          <Route path="/inventory-control/damaged" element={<NotFound />} />
          
          {/* Customer Routes */}
          <Route path="/customers/manage" element={<NotFound />} />
          <Route path="/customers/statement" element={<NotFound />} />
          
          {/* Settings Routes */}
          <Route path="/settings/system" element={<SystemSettingsPage />} />
          <Route path="/settings/branch" element={<BranchesPage />} />
          <Route path="/settings/users" element={<UsersPage />} />
          <Route path="/settings/backup" element={<BackupPage />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
