
import { RouteObject } from "react-router-dom";
import AccountChartPage from "@/pages/accounting/AccountChartPage";
import JournalEntriesPage from "@/pages/accounting/JournalEntriesPage";
import LedgerPage from "@/pages/accounting/LedgerPage";
import CostCentersPage from "@/pages/accounting/CostCentersPage";
import BudgetsPage from "@/pages/accounting/BudgetsPage";
import AccountingSettingsPage from "@/pages/accounting/AccountingSettingsPage";
import BankAccountsPage from "@/pages/accounting/BankAccountsPage";
import CommercialPapersPage from "@/pages/accounting/CommercialPapersPage";
import AccountingRulesPage from "@/pages/accounting/AccountingRulesPage";
import CashRegisterPage from "@/pages/accounting/CashRegisterPage";
import CashRegisterModulePage from "@/pages/accounting/CashRegisterModulePage";

export const accountingRoutes: RouteObject[] = [
  {
    path: "accounting/chart",
    element: <AccountChartPage />,
  },
  {
    path: "accounting/journals",
    element: <JournalEntriesPage />,
  },
  {
    path: "accounting/ledger",
    element: <LedgerPage />,
  },
  {
    path: "accounting/ledger-module",
    element: <LedgerPage />,
  },
  {
    path: "accounting/journals/new",
    element: <JournalEntriesPage />,
  },
  {
    path: "accounting/cost-centers",
    element: <CostCentersPage />,
  },
  {
    path: "accounting/budgets",
    element: <BudgetsPage />,
  },
  {
    path: "accounting/settings",
    element: <AccountingSettingsPage />,
  },
  {
    path: "accounting/bank-accounts",
    element: <BankAccountsPage />,
  },
  {
    path: "accounting/commercial-papers",
    element: <CommercialPapersPage />,
  },
  {
    path: "accounting/rules",
    element: <AccountingRulesPage />,
  },
  {
    path: "accounting/cashregister",
    element: <CashRegisterPage />,
  },
  {
    path: "accounting/cashregister-module",
    element: <CashRegisterModulePage />,
  }
];
