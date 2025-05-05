
import { RouteObject } from "react-router-dom";
import AccountChartPage from "@/pages/accounting/AccountChartPage";
import LedgerPage from "@/pages/accounting/LedgerPage";
import JournalEntriesPage from "@/pages/accounting/JournalEntriesPage";
import CostCentersPage from "@/pages/accounting/CostCentersPage";
import AccountingSettingsPage from "@/pages/accounting/AccountingSettingsPage";
import CashRegisterPage from "@/pages/accounting/CashRegisterPage";
import BudgetsPage from "@/pages/accounting/BudgetsPage";
import BankAccountsPage from "@/pages/accounting/BankAccountsPage";
import CommercialPapersPage from "@/pages/accounting/CommercialPapersPage";
import AccountingRulesPage from "@/pages/accounting/AccountingRulesPage";

export const accountingRoutes: RouteObject[] = [
  { path: "accounting/accounts", element: <AccountChartPage /> },
  { path: "accounting/ledger", element: <LedgerPage /> },
  { path: "accounting/journals", element: <JournalEntriesPage /> },
  { path: "accounting/cost-centers", element: <CostCentersPage /> },
  { path: "accounting/settings", element: <AccountingSettingsPage /> },
  { path: "accounting/cash-register", element: <CashRegisterPage /> },
  { path: "accounting/budgets", element: <BudgetsPage /> },
  { path: "accounting/bank-accounts", element: <BankAccountsPage /> },
  { path: "accounting/commercial-papers", element: <CommercialPapersPage /> },
  { path: "accounting/rules", element: <AccountingRulesPage /> }
];
