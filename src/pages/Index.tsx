import { useState } from "react";
import { cn } from "@/lib/utils";
import { Route, Routes } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { SidebarProvider } from "@/components/ui/sidebar";
import AccountingSidebar from "@/components/AccountingSidebar";
import Dashboard from "./Dashboard";
import Reports from "./Reports";
import NewExpensePage from "./expenses/NewExpensePage";
import ExpenseCategoriesPage from "./expenses/ExpenseCategoriesPage";
import ExpenseReportsPage from "./expenses/ExpenseReportsPage";
import InvoicesPage from "./invoices/InvoicesPage";
import QuotesPage from "./invoices/QuotesPage";
import SalesOrdersPage from "./invoices/SalesOrdersPage";
import ReturnsPage from "./invoices/ReturnsPage";
import AccountChartPage from "./accounting/AccountChartPage";
import JournalEntriesPage from "./accounting/JournalEntriesPage";
import CostCentersPage from "./accounting/CostCentersPage";
import CustomersPage from "./customers/CustomersPage";
import CustomerStatementPage from "./customers/CustomerStatementPage";
import AiAssistantPage from "./ai/AiAssistantPage";
import BasicDefinitionsPage from "./definitions/BasicDefinitionsPage";
import CashRegisterPage from "./accounting/CashRegisterPage";
import CommercialPapersPage from "./accounting/CommercialPapersPage";
import CurrenciesPage from "./definitions/CurrenciesPage";
import DiscountsPage from "./definitions/DiscountsPage";
import ReportTemplatesPage from "./reports/ReportTemplatesPage";
import ActivityLogPage from "./settings/ActivityLogPage";
import NotificationsPage from "./settings/NotificationsPage";
import NotificationSettingsPage from "./settings/NotificationSettingsPage";
import AiEngineSettingsPage from "./settings/AiEngineSettingsPage";
import FinancialDecisionsPage from "./ai/FinancialDecisionsPage";
import LoginPage from "./auth/LoginPage";
import AboutPage from "./about/AboutPage";
import ProductsPage from "./inventory/ProductsPage";
import StockMovementsPage from "./inventory/StockMovementsPage";
import CountingPage from "./inventory/CountingPage";
import ReorderPage from "./inventory/ReorderPage";
import TransferPage from "./inventory-control/TransferPage";
import LocationsPage from "./inventory-control/LocationsPage";
import DamagedItemsPage from "./inventory-control/DamagedItemsPage";
import AccountingSettingsPage from "./accounting/AccountingSettingsPage";
import UserRolesPage from "./settings/UserRolesPage";
import SystemSettingsPage from "./settings/SystemSettingsPage";
import PageManagementPage from "./settings/PageManagementPage";
import BranchesPage from "./settings/BranchesPage";
import UsersPage from "./settings/UsersPage";
import BackupPage from "./settings/BackupPage";
import BackupTestPage from "./settings/BackupTestPage";
import NotFound from "./NotFound";

const Index = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const isMobile = useIsMobile();

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="flex h-screen w-full overflow-hidden">
        <AccountingSidebar />
        <div className={cn("flex-1 overflow-auto w-full")}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/templates" element={<ReportTemplatesPage />} />
            <Route path="/expenses/new" element={<NewExpensePage />} />
            <Route path="/expenses/categories" element={<ExpenseCategoriesPage />} />
            <Route path="/expenses/reports" element={<ExpenseReportsPage />} />
            <Route path="/invoices/outgoing" element={<InvoicesPage />} />
            <Route path="/invoices/quotes" element={<QuotesPage />} />
            <Route path="/invoices/sales-orders" element={<SalesOrdersPage />} />
            <Route path="/invoices/returns" element={<ReturnsPage />} />
            <Route path="/accounting/chart" element={<AccountChartPage />} />
            <Route path="/accounting/journals" element={<JournalEntriesPage />} />
            <Route path="/accounting/cashregister" element={<CashRegisterPage />} />
            <Route path="/accounting/commercialpapers" element={<CommercialPapersPage />} />
            <Route path="/accounting/cost-centers" element={<CostCentersPage />} />
            <Route path="/accounting/settings" element={<AccountingSettingsPage />} />
            <Route path="/customers/manage" element={<CustomersPage />} />
            <Route path="/customers/statement" element={<CustomerStatementPage />} />
            <Route path="/ai-assistant" element={<AiAssistantPage />} />
            <Route path="/ai-financial-decisions" element={<FinancialDecisionsPage />} />
            <Route path="/definitions" element={<BasicDefinitionsPage />} />
            <Route path="/definitions/currencies" element={<CurrenciesPage />} />
            <Route path="/definitions/discounts" element={<DiscountsPage />} />
            <Route path="/settings/activity-log" element={<ActivityLogPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings/notification-settings" element={<NotificationSettingsPage />} />
            <Route path="/settings/ai-engine" element={<AiEngineSettingsPage />} />
            <Route path="/settings/roles" element={<UserRolesPage />} />
            <Route path="/settings/system" element={<SystemSettingsPage />} />
            <Route path="/settings/page-management" element={<PageManagementPage />} />
            <Route path="/settings/branches" element={<BranchesPage />} />
            <Route path="/settings/users" element={<UsersPage />} />
            <Route path="/settings/backup" element={<BackupPage />} />
            <Route path="/settings/backup-test" element={<BackupTestPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/inventory/products" element={<ProductsPage />} />
            <Route path="/inventory/movements" element={<StockMovementsPage />} />
            <Route path="/inventory/counting" element={<CountingPage />} />
            <Route path="/inventory/reorder" element={<ReorderPage />} />
            <Route path="/inventory-control/transfer" element={<TransferPage />} />
            <Route path="/inventory-control/locations" element={<LocationsPage />} />
            <Route path="/inventory-control/damaged" element={<DamagedItemsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
