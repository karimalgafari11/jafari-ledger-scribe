
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AccountChartPage from "./pages/accounting/AccountChartPage";
import JournalEntriesPage from "./pages/accounting/JournalEntriesPage";
import CostCentersPage from "./pages/accounting/CostCentersPage";
import AccountingSettingsPage from "./pages/accounting/AccountingSettingsPage";
import ProductsPage from "./pages/inventory/ProductsPage";
import StockMovementsPage from "./pages/inventory/StockMovementsPage";
import CountingPage from "./pages/inventory/CountingPage";
import ReorderPage from "./pages/inventory/ReorderPage";
import TransferPage from "./pages/inventory-control/TransferPage";
import LocationsPage from "./pages/inventory-control/LocationsPage";
import DamagedItemsPage from "./pages/inventory-control/DamagedItemsPage";
import CustomersPage from "./pages/customers/CustomersPage";
import CustomerStatementPage from "./pages/customers/CustomerStatementPage";
import InvoicesPage from "./pages/invoices/InvoicesPage";
import QuotesPage from "./pages/invoices/QuotesPage";
import SalesOrdersPage from "./pages/invoices/SalesOrdersPage";
import ReturnsPage from "./pages/invoices/ReturnsPage";
import NewExpensePage from "./pages/expenses/NewExpensePage";
import ExpenseCategoriesPage from "./pages/expenses/ExpenseCategoriesPage";
import ExpenseReportsPage from "./pages/expenses/ExpenseReportsPage";
import Reports from "./pages/Reports";
import ReportTemplatesPage from "./pages/reports/ReportTemplatesPage";
import BasicDefinitionsPage from "./pages/definitions/BasicDefinitionsPage";
import BranchesPage from "./pages/settings/BranchesPage";
import UsersPage from "./pages/settings/UsersPage";
import BackupPage from "./pages/settings/BackupPage";
import SystemSettingsPage from "./pages/settings/SystemSettingsPage";
import AiAssistantPage from "./pages/ai/AiAssistantPage";
import NotFound from "./pages/NotFound";

// استيراد الصفحة الجديدة للعملات
import CurrenciesPage from "./pages/definitions/CurrenciesPage";
// استيراد الصفحات الجديدة
import CashRegisterPage from "./pages/accounting/CashRegisterPage";
import DiscountsPage from "./pages/definitions/DiscountsPage";
import CommercialPapersPage from "./pages/accounting/CommercialPapersPage";

// استيراد صفحات الأمان والصلاحيات الجديدة
import UserRolesPage from "./pages/settings/UserRolesPage";
import ActivityLogPage from "./pages/settings/ActivityLogPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* المحاسبة */}
        <Route path="/accounting/chart" element={<AccountChartPage />} />
        <Route path="/accounting/journals" element={<JournalEntriesPage />} />
        <Route path="/accounting/costcenters" element={<CostCentersPage />} />
        <Route path="/accounting/settings" element={<AccountingSettingsPage />} />
        <Route path="/accounting/cashregister" element={<CashRegisterPage />} />
        <Route path="/accounting/commercialpapers" element={<CommercialPapersPage />} />
        
        {/* المخزون */}
        <Route path="/inventory/products" element={<ProductsPage />} />
        <Route path="/inventory/movements" element={<StockMovementsPage />} />
        <Route path="/inventory/counting" element={<CountingPage />} />
        <Route path="/inventory/reorder" element={<ReorderPage />} />
        
        {/* التحكم بالمخزون */}
        <Route path="/inventory-control/transfer" element={<TransferPage />} />
        <Route path="/inventory-control/locations" element={<LocationsPage />} />
        <Route path="/inventory-control/damaged" element={<DamagedItemsPage />} />
        
        {/* العملاء */}
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/customers/manage" element={<CustomersPage />} />
        <Route path="/customers/:id/statement" element={<CustomerStatementPage />} />
        
        {/* الفواتير */}
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/invoices/outgoing" element={<InvoicesPage />} />
        <Route path="/invoices/quotes" element={<QuotesPage />} />
        <Route path="/invoices/sales-orders" element={<SalesOrdersPage />} />
        <Route path="/invoices/returns" element={<ReturnsPage />} />
        
        {/* المصاريف */}
        <Route path="/expenses/new" element={<NewExpensePage />} />
        <Route path="/expenses/categories" element={<ExpenseCategoriesPage />} />
        <Route path="/expenses/reports" element={<ExpenseReportsPage />} />
        
        {/* التقارير */}
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/templates" element={<ReportTemplatesPage />} />
        
        {/* التعاريف والإعدادات */}
        <Route path="/definitions" element={<BasicDefinitionsPage />} />
        <Route path="/basic-definitions" element={<Navigate to="/definitions" replace />} />
        <Route path="/definitions/currencies" element={<CurrenciesPage />} />
        <Route path="/definitions/discounts" element={<DiscountsPage />} />
        <Route path="/settings/branches" element={<BranchesPage />} />
        <Route path="/settings/users" element={<UsersPage />} />
        <Route path="/settings/roles" element={<UserRolesPage />} />
        <Route path="/settings/activity-log" element={<ActivityLogPage />} />
        <Route path="/settings/backup" element={<BackupPage />} />
        <Route path="/settings/system" element={<SystemSettingsPage />} />
        
        {/* مساعد الذكاء الاصطناعي */}
        <Route path="/ai-assistant" element={<AiAssistantPage />} />
        <Route path="/ai/assistant" element={<AiAssistantPage />} />
        
        {/* صفحة 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
