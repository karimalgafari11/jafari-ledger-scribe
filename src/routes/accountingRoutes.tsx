
import { RouteObject } from "react-router-dom";
import AccountingDashboardPage from "@/pages/accounting/AccountingDashboardPage";
import AccountsPage from "@/pages/accounting/AccountsPage";
import JournalEntriesPage from "@/pages/accounting/JournalEntriesPage";
import LedgerPage from "@/pages/accounting/LedgerPage";
import AccountingSettingsPage from "@/pages/accounting/AccountingSettingsPage";
import CostCentersPage from "@/pages/accounting/CostCentersPage";
import CashRegistersPage from "@/pages/accounting/CashRegistersPage";
import CashTransactionsPage from "@/pages/accounting/CashTransactionsPage";
import CommercialPapersPage from "@/pages/accounting/CommercialPapersPage";
import DueNotificationsPage from "@/pages/accounting/DueNotificationsPage";
import AccountingRulesPage from "@/pages/accounting/AccountingRulesPage";
import AutomaticEntriesPage from "@/pages/accounting/AutomaticEntriesPage";
import ValidationRulesPage from "@/pages/accounting/ValidationRulesPage";
import PDFInvoiceProcessorPage from "@/pages/accounting/PDFInvoiceProcessorPage";

export const accountingRoutes: RouteObject[] = [
  {
    path: "accounting",
    element: <AccountingDashboardPage />,
  },
  {
    path: "accounting/accounts",
    element: <AccountsPage />,
  },
  {
    path: "accounting/journal-entries",
    element: <JournalEntriesPage />,
  },
  {
    path: "accounting/pdf-invoice-processor",
    element: <PDFInvoiceProcessorPage />,
  },
  {
    path: "accounting/ledger",
    element: <LedgerPage />,
  },
  {
    path: "accounting/settings",
    element: <AccountingSettingsPage />,
  },
  {
    path: "accounting/cost-centers",
    element: <CostCentersPage />,
  },
  {
    path: "accounting/cash-registers",
    element: <CashRegistersPage />,
  },
  {
    path: "accounting/cash-transactions",
    element: <CashTransactionsPage />,
  },
  {
    path: "accounting/commercial-papers",
    element: <CommercialPapersPage />,
  },
  {
    path: "accounting/due-notifications",
    element: <DueNotificationsPage />,
  },
  {
    path: "accounting/accounting-rules",
    element: <AccountingRulesPage />,
  },
  {
    path: "accounting/automatic-entries",
    element: <AutomaticEntriesPage />,
  },
  {
    path: "accounting/validation-rules",
    element: <ValidationRulesPage />,
  },
];
