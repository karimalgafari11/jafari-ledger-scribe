
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '@/pages/Dashboard';
import { Toaster } from 'sonner';
import NotFound from '@/pages/NotFound';
import ReportsPage from '@/pages/Reports';
import InvoicesPage from '@/pages/invoices/InvoicesPage';
import SalesOrdersPage from '@/pages/invoices/SalesOrdersPage';
import SalesInvoicePage from '@/pages/invoices/SalesInvoicePage';
import DiscountsPage from '@/pages/definitions/DiscountsPage';
import { SidebarProvider } from '@/components/ui/sidebar';
import AccountingSidebar from '@/components/AccountingSidebar';
// import BasicDefinitionsPage from '@/pages/definitions/BasicDefinitionsPage';

// Inventory Pages
import ProductsPage from '@/pages/inventory/ProductsPage';
import StockMovementsPage from '@/pages/inventory/StockMovementsPage';
import CountingPage from '@/pages/inventory/CountingPage';
import ReorderPage from '@/pages/inventory/ReorderPage';

// Expenses Pages
import NewExpensePage from '@/pages/expenses/NewExpensePage';
import ExpenseCategoriesPage from '@/pages/expenses/ExpenseCategoriesPage';
import ExpenseReportsPage from '@/pages/expenses/ExpenseReportsPage';

// Inventory Control Pages
import TransferPage from '@/pages/inventory-control/TransferPage';
import LocationsPage from '@/pages/inventory-control/LocationsPage';
import DamagedItemsPage from '@/pages/inventory-control/DamagedItemsPage';

// Accounting Pages
import AccountChartPage from '@/pages/accounting/AccountChartPage';
import JournalEntriesPage from '@/pages/accounting/JournalEntriesPage';
import CashRegisterPage from '@/pages/accounting/CashRegisterPage';
import CommercialPapersPage from '@/pages/accounting/CommercialPapersPage';
import CostCentersPage from '@/pages/accounting/CostCentersPage';
import AccountingSettingsPage from '@/pages/accounting/AccountingSettingsPage';
import AccountingRulesPage from '@/pages/accounting/AccountingRulesPage';
import LedgerPage from '@/pages/accounting/LedgerPage';
import BankAccountsPage from '@/pages/accounting/BankAccountsPage';
import BudgetsPage from '@/pages/accounting/BudgetsPage';

// Customers Pages
import CustomersPage from '@/pages/customers/CustomersPage';
import CustomerReportsPage from '@/pages/customers/CustomerReportsPage';

// Vendors Pages
import VendorsPage from '@/pages/vendors/VendorsPage';
import VendorReportsPage from '@/pages/vendors/VendorReportsPage';

// Purchases Pages
import PurchaseInvoicePage from '@/pages/purchases/PurchaseInvoicePage';
import PurchasesInvoicesPage from '@/pages/purchases/PurchasesInvoicesPage';
import PurchasesOrdersPage from '@/pages/purchases/PurchasesOrdersPage';
import PurchasesReturnsPage from '@/pages/purchases/PurchasesReturnsPage';

// Receivables and Payables Pages
import ReceivablesPage from '@/pages/receivables/ReceivablesPage';
import ReceivablesCollectionPage from '@/pages/receivables/CollectionPage';
import PayablesPage from '@/pages/payables/PayablesPage';
import PayablesPaymentPage from '@/pages/payables/PaymentPage';

// Settings Pages
import UserRolesPage from '@/pages/settings/UserRolesPage';
import ActivityLogPage from '@/pages/settings/ActivityLogPage';
import SystemSettingsPage from '@/pages/settings/SystemSettingsPage';
import PageManagementPage from '@/pages/settings/PageManagementPage';
import BranchesPage from '@/pages/settings/BranchesPage';
import UsersPage from '@/pages/settings/UsersPage';
import BackupPage from '@/pages/settings/BackupPage';
import NotificationSettingsPage from '@/pages/settings/NotificationSettingsPage';

// Definitions Pages
import CurrenciesPage from '@/pages/definitions/CurrenciesPage';

// AI Assistant Pages
import AiAssistantPage from '@/pages/ai/AiAssistantPage';

// Invoices Pages
import QuotesPage from '@/pages/invoices/QuotesPage';
import ReturnsPage from '@/pages/invoices/ReturnsPage';

function App() {
  return (
    <Router>
      <div className="App h-screen w-full">
        <Toaster position="top-center" richColors />
        <SidebarProvider>
          <div className="flex h-screen w-full overflow-hidden">
            <AccountingSidebar />
            <div className="flex-1 overflow-auto w-full">
              <Routes>
                {/* Dashboard */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Reports */}
                <Route path="/reports" element={<ReportsPage />} />
                
                {/* Invoices and Orders */}
                <Route path="/invoices/outgoing" element={<InvoicesPage />} />
                <Route path="/invoices/new" element={<SalesInvoicePage />} />
                <Route path="/invoices/orders" element={<SalesOrdersPage />} />
                <Route path="/invoices/quotes" element={<QuotesPage />} />
                <Route path="/invoices/returns" element={<ReturnsPage />} />
                <Route path="/invoices/sales-orders" element={<SalesOrdersPage />} />
                
                {/* Purchases */}
                <Route path="/purchases/new" element={<PurchaseInvoicePage />} />
                <Route path="/purchases/invoices" element={<PurchasesInvoicesPage />} />
                <Route path="/purchases/returns" element={<PurchasesReturnsPage />} />
                <Route path="/purchases/orders" element={<PurchasesOrdersPage />} />
                
                {/* Receivables and Payables */}
                <Route path="/receivables/accounts" element={<ReceivablesPage />} />
                <Route path="/receivables/collection" element={<ReceivablesCollectionPage />} />
                <Route path="/payables/accounts" element={<PayablesPage />} />
                <Route path="/payables/payment" element={<PayablesPaymentPage />} />
                
                {/* Definitions - Redirect to settings */}
                <Route path="/definitions" element={<Navigate to="/settings/system" replace />} />
                <Route path="/definitions/discounts" element={<DiscountsPage />} />
                <Route path="/definitions/currencies" element={<CurrenciesPage />} />
                
                {/* Inventory Management */}
                <Route path="/inventory/products" element={<ProductsPage />} />
                <Route path="/inventory/movements" element={<StockMovementsPage />} />
                <Route path="/inventory/counting" element={<CountingPage />} />
                <Route path="/inventory/reorder" element={<ReorderPage />} />
                
                {/* Expenses */}
                <Route path="/expenses/new" element={<NewExpensePage />} />
                <Route path="/expenses/categories" element={<ExpenseCategoriesPage />} />
                <Route path="/expenses/reports" element={<ExpenseReportsPage />} />
                
                {/* Inventory Control */}
                <Route path="/inventory-control/transfer" element={<TransferPage />} />
                <Route path="/inventory-control/locations" element={<LocationsPage />} />
                <Route path="/inventory-control/damaged" element={<DamagedItemsPage />} />
                
                {/* Accounting */}
                <Route path="/accounting/chart" element={<AccountChartPage />} />
                <Route path="/accounting/journals" element={<JournalEntriesPage />} />
                <Route path="/accounting/ledger" element={<LedgerPage />} />
                <Route path="/accounting/cashregister" element={<CashRegisterPage />} />
                <Route path="/accounting/banks" element={<BankAccountsPage />} />
                <Route path="/accounting/commercialpapers" element={<CommercialPapersPage />} />
                <Route path="/accounting/cost-centers" element={<CostCentersPage />} />
                <Route path="/accounting/budgets" element={<BudgetsPage />} />
                <Route path="/accounting/settings" element={<AccountingSettingsPage />} />
                <Route path="/accounting/rules" element={<AccountingRulesPage />} />
                
                {/* Customers and Vendors */}
                <Route path="/customers/manage" element={<CustomersPage />} />
                <Route path="/customers/reports" element={<CustomerReportsPage />} />
                <Route path="/vendors/manage" element={<VendorsPage />} />
                <Route path="/vendors/reports" element={<VendorReportsPage />} />
                
                {/* Settings */}
                <Route path="/settings/roles" element={<UserRolesPage />} />
                <Route path="/settings/activity-log" element={<ActivityLogPage />} />
                <Route path="/settings/system" element={<SystemSettingsPage />} />
                <Route path="/settings/page-management" element={<PageManagementPage />} />
                <Route path="/settings/branches" element={<BranchesPage />} />
                <Route path="/settings/users" element={<UsersPage />} />
                <Route path="/settings/backup" element={<BackupPage />} />
                <Route path="/settings/notifications" element={<NotificationSettingsPage />} />
                
                {/* AI Assistant */}
                <Route path="/ai-assistant" element={<AiAssistantPage />} />
                
                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </SidebarProvider>
      </div>
    </Router>
  );
}

export default App;
