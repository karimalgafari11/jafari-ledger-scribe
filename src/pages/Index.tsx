
import { useState } from "react";
import { cn } from "@/lib/utils";
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

const Index = () => {
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "reports":
        return <Reports />;
      case "reports-templates":
        return <ReportTemplatesPage />;
      case "expenses-new":
        return <NewExpensePage />;
      case "expenses-categories":
        return <ExpenseCategoriesPage />;
      case "expenses-reports":
        return <ExpenseReportsPage />;
      case "invoices-outgoing":
        return <InvoicesPage />;
      case "invoices-quotes":
        return <QuotesPage />;
      case "invoices-sales-orders":
        return <SalesOrdersPage />;
      case "invoices-returns":
        return <ReturnsPage />;
      case "accounting-chart":
        return <AccountChartPage />;
      case "accounting-journals":
        return <JournalEntriesPage />;
      case "accounting-cashregister":
        return <CashRegisterPage />;
      case "accounting-commercialpapers":
        return <CommercialPapersPage />;
      case "accounting-cost-centers":
        return <CostCentersPage />;
      case "customers-manage":
        return <CustomersPage />;
      case "customers-statement":
        return <CustomerStatementPage />;
      case "ai-assistant":
        return <AiAssistantPage />;
      case "basic-definitions":
      case "definitions":
        return <BasicDefinitionsPage />;
      case "definitions-currencies":
        return <CurrenciesPage />;
      case "definitions-discounts":
        return <DiscountsPage />;
      default:
        return (
          <div className="h-screen flex items-center justify-center bg-gray-100 rtl">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-teal mb-2">قريباً</h1>
              <p className="text-gray-600">هذه الصفحة قيد التطوير</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AccountingSidebar autoClose={true} />
      <div className={cn("flex-1 overflow-auto")}>
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
