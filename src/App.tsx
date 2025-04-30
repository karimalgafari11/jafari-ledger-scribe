
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
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
import JournalEntriesPage from "./pages/accounting/JournalEntriesPage";
import CostCentersPage from "./pages/accounting/CostCentersPage";
import AccountingSettingsPage from "./pages/accounting/AccountingSettingsPage";
import CustomersPage from "./pages/customers/CustomersPage";
import CustomerStatementPage from "./pages/customers/CustomerStatementPage";
import TransferPage from "./pages/inventory-control/TransferPage";
import LocationsPage from "./pages/inventory-control/LocationsPage";
import DamagedItemsPage from "./pages/inventory-control/DamagedItemsPage";
import AiAssistantPage from "./pages/ai/AiAssistantPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
        <Route path="/accounting/journals" element={<JournalEntriesPage />} />
        <Route path="/accounting/cost-centers" element={<CostCentersPage />} />
        <Route path="/accounting/settings" element={<AccountingSettingsPage />} />
        
        {/* Inventory Control Routes */}
        <Route path="/inventory-control/transfer" element={<TransferPage />} />
        <Route path="/inventory-control/locations" element={<LocationsPage />} />
        <Route path="/inventory-control/damaged" element={<DamagedItemsPage />} />
        
        {/* Customer Routes */}
        <Route path="/customers/manage" element={<CustomersPage />} />
        <Route path="/customers/statement/:id" element={<CustomerStatementPage />} />
        
        {/* Settings Routes */}
        <Route path="/settings/system" element={<SystemSettingsPage />} />
        <Route path="/settings/branch" element={<BranchesPage />} />
        <Route path="/settings/users" element={<UsersPage />} />
        <Route path="/settings/backup" element={<BackupPage />} />
        
        {/* AI Assistant Route */}
        <Route path="/ai/assistant" element={<AiAssistantPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
