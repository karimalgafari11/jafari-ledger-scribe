import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

// Common Components
import { Layout } from "./components/Layout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";

// Settings Pages
import SystemSettingsPage from "./pages/settings/SystemSettingsPage";
import UserRolesPage from "./pages/settings/UserRolesPage";
import UsersPage from "./pages/settings/UsersPage";
import BackupPage from "./pages/settings/BackupPage";
import BackupTestPage from "./pages/settings/BackupTestPage";
import ActivityLogPage from "./pages/settings/ActivityLogPage";
import BranchesPage from "./pages/settings/BranchesPage";
import NotificationsPage from "./pages/settings/NotificationsPage";
import NotificationSettingsPage from "./pages/settings/NotificationSettingsPage";
import AiEngineSettingsPage from "./pages/settings/AiEngineSettingsPage";
import PageManagementPage from "./pages/settings/PageManagementPage";

// Accounting Pages
import AccountChartPage from "./pages/accounting/AccountChartPage";
import LedgerPage from "./pages/accounting/LedgerPage";
import JournalEntriesPage from "./pages/accounting/JournalEntriesPage";
import CostCentersPage from "./pages/accounting/CostCentersPage";
import AccountingSettingsPage from "./pages/accounting/AccountingSettingsPage";
import CashRegisterPage from "./pages/accounting/CashRegisterPage";
import BudgetsPage from "./pages/accounting/BudgetsPage";
import BankAccountsPage from "./pages/accounting/BankAccountsPage";
import CommercialPapersPage from "./pages/accounting/CommercialPapersPage";
import AccountingRulesPage from "./pages/accounting/AccountingRulesPage";

// AI Pages
import AiAssistantPage from "./pages/ai/AiAssistantPage";
import FinancialDecisionsPage from "./pages/ai/FinancialDecisionsPage";

// Customers Pages
import CustomersPage from "./pages/customers/CustomersPage";
import CustomerStatementPage from "./pages/customers/CustomerStatementPage";
import CustomerReportsPage from "./pages/customers/CustomerReportsPage";

// Vendors Pages
import VendorsPage from "./pages/vendors/VendorsPage";
import VendorReportsPage from "./pages/vendors/VendorReportsPage";

// Inventory Pages
import ProductsPage from "./pages/inventory/ProductsPage";
import ReorderPage from "./pages/inventory/ReorderPage";
import CountingPage from "./pages/inventory/CountingPage";
import StockMovementsPage from "./pages/inventory/StockMovementsPage";

// Inventory Control Pages
import DamagedItemsPage from "./pages/inventory-control/DamagedItemsPage";
import LocationsPage from "./pages/inventory-control/LocationsPage";
import TransferPage from "./pages/inventory-control/TransferPage";

// Definitions Pages
import BasicDefinitionsPage from "./pages/definitions/BasicDefinitionsPage";
import CurrenciesPage from "./pages/definitions/CurrenciesPage";
import DiscountsPage from "./pages/definitions/DiscountsPage";

// Invoices Pages
import InvoicesPage from "./pages/invoices/InvoicesPage";
import SalesInvoicePage from "./pages/invoices/SalesInvoicePage";
import QuotesPage from "./pages/invoices/QuotesPage";
import SalesOrdersPage from "./pages/invoices/SalesOrdersPage";
import ReturnsPage from "./pages/invoices/ReturnsPage";

// Reports Pages
import SalesReportsPage from "./pages/reports/SalesReportsPage";
import ReportTemplatesPage from "./pages/reports/ReportTemplatesPage";

// Expenses Pages
import ExpenseReportsPage from "./pages/expenses/ExpenseReportsPage";
import ExpenseCategoriesPage from "./pages/expenses/ExpenseCategoriesPage";
import NewExpensePage from "./pages/expenses/NewExpensePage";

// Integrations Pages
import ExternalSystemsPage from "./pages/integrations/ExternalSystemsPage";

// Receivables & Payables Pages
import ReceivablesPage from "./pages/receivables/ReceivablesPage";
import CollectionPage from "./pages/receivables/CollectionPage";
import PayablesPage from "./pages/payables/PayablesPage";
import PaymentPage from "./pages/payables/PaymentPage";

// About Page
import AboutPage from "./pages/about/AboutPage";

// Purchases Pages
import PurchaseInvoicePage from "./pages/purchases/PurchaseInvoicePage";
import PurchasesInvoicesPage from "./pages/purchases/PurchasesInvoicesPage";
import PurchasesReturnsPage from "./pages/purchases/PurchasesReturnsPage";
import PurchasesOrdersPage from "./pages/purchases/PurchasesOrdersPage";
import NewPurchaseOrderPage from "./pages/purchases/NewPurchaseOrderPage";

// Auth Pages
import LoginPage from "./pages/auth/LoginPage";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route path="index" element={<Index />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="reports" element={<Reports />} />

            {/* Settings */}
            <Route path="settings/system" element={<SystemSettingsPage />} />
            <Route path="settings/roles" element={<UserRolesPage />} />
            <Route path="settings/users" element={<UsersPage />} />
            <Route path="settings/backup" element={<BackupPage />} />
            <Route path="settings/backup-test" element={<BackupTestPage />} />
            <Route path="settings/activity-log" element={<ActivityLogPage />} />
            <Route path="settings/branches" element={<BranchesPage />} />
            <Route path="settings/notifications" element={<NotificationsPage />} />
            <Route path="settings/notification-settings" element={<NotificationSettingsPage />} />
            <Route path="settings/ai-engine" element={<AiEngineSettingsPage />} />
            <Route path="settings/page-management" element={<PageManagementPage />} />

            {/* Accounting */}
            <Route path="accounting/accounts" element={<AccountChartPage />} />
            <Route path="accounting/ledger" element={<LedgerPage />} />
            <Route path="accounting/journals" element={<JournalEntriesPage />} />
            <Route path="accounting/cost-centers" element={<CostCentersPage />} />
            <Route path="accounting/settings" element={<AccountingSettingsPage />} />
            <Route path="accounting/cash-register" element={<CashRegisterPage />} />
            <Route path="accounting/budgets" element={<BudgetsPage />} />
            <Route path="accounting/bank-accounts" element={<BankAccountsPage />} />
            <Route path="accounting/commercial-papers" element={<CommercialPapersPage />} />
            <Route path="accounting/rules" element={<AccountingRulesPage />} />

            {/* AI */}
            <Route path="ai/assistant" element={<AiAssistantPage />} />
            <Route path="ai/financial-decisions" element={<FinancialDecisionsPage />} />

            {/* Customers */}
            <Route path="customers" element={<CustomersPage />} />
            <Route path="customers/statement/:id" element={<CustomerStatementPage />} />
            <Route path="customers/reports" element={<CustomerReportsPage />} />

            {/* Vendors */}
            <Route path="vendors" element={<VendorsPage />} />
            <Route path="vendors/reports" element={<VendorReportsPage />} />

            {/* Inventory */}
            <Route path="inventory/products" element={<ProductsPage />} />
            <Route path="inventory/reorder" element={<ReorderPage />} />
            <Route path="inventory/counting" element={<CountingPage />} />
            <Route path="inventory/movements" element={<StockMovementsPage />} />

            {/* Inventory Control */}
            <Route path="inventory-control/damaged" element={<DamagedItemsPage />} />
            <Route path="inventory-control/locations" element={<LocationsPage />} />
            <Route path="inventory-control/transfer" element={<TransferPage />} />

            {/* Definitions */}
            <Route path="definitions/basic" element={<BasicDefinitionsPage />} />
            <Route path="definitions/currencies" element={<CurrenciesPage />} />
            <Route path="definitions/discounts" element={<DiscountsPage />} />

            {/* Invoices */}
            <Route path="invoices" element={<InvoicesPage />} />
            <Route path="invoices/new" element={<SalesInvoicePage />} />
            <Route path="invoices/quotes" element={<QuotesPage />} />
            <Route path="invoices/orders" element={<SalesOrdersPage />} />
            <Route path="invoices/returns" element={<ReturnsPage />} />

            {/* Purchases */}
            <Route path="purchases/new" element={<PurchaseInvoicePage />} />
            <Route path="purchases/invoices" element={<PurchasesInvoicesPage />} />
            <Route path="purchases/orders" element={<PurchasesOrdersPage />} />
            <Route path="purchases/orders/new" element={<NewPurchaseOrderPage />} />
            <Route path="purchases/returns" element={<PurchasesReturnsPage />} />

            {/* Reports */}
            <Route path="reports/sales" element={<SalesReportsPage />} />
            <Route path="reports/templates" element={<ReportTemplatesPage />} />

            {/* Expenses */}
            <Route path="expenses/reports" element={<ExpenseReportsPage />} />
            <Route path="expenses/categories" element={<ExpenseCategoriesPage />} />
            <Route path="expenses/new" element={<NewExpensePage />} />

            {/* Integrations */}
            <Route path="integrations/external" element={<ExternalSystemsPage />} />

            {/* Receivables & Payables */}
            <Route path="receivables" element={<ReceivablesPage />} />
            <Route path="receivables/collection" element={<CollectionPage />} />
            <Route path="payables" element={<PayablesPage />} />
            <Route path="payables/payment" element={<PaymentPage />} />

            {/* About */}
            <Route path="about" element={<AboutPage />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
        <Toaster position="top-center" closeButton richColors />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
