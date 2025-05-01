
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Route, Routes } from "react-router-dom";
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

const Index = () => {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="flex h-screen overflow-hidden">
      <AccountingSidebar autoClose={true} />
      <div className={cn("flex-1 overflow-auto")}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
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
          <Route path="*" element={
            <div className="h-screen flex items-center justify-center bg-gray-100 rtl">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-teal mb-2">قريباً</h1>
                <p className="text-gray-600">هذه الصفحة قيد التطوير</p>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
};

export default Index;
