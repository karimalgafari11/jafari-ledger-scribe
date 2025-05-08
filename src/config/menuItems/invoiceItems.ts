
import { Receipt, Percent, ShoppingBag, FileText, FileBarChart2, ArrowLeftRight } from "lucide-react";
import { MenuItem } from "./types";

export const invoiceItems: MenuItem[] = [
  {
    section: "الفواتير",
    icon: Receipt,
    children: [
      {
        label: "فواتير المبيعات",
        path: "/invoices/outgoing",
        icon: Receipt,
      },
      {
        label: "عروض الأسعار",
        path: "/invoices/quotes-module",
        icon: Percent,
      },
      {
        label: "أوامر البيع",
        path: "/invoices/sales-orders",
        icon: ShoppingBag,
      },
      {
        label: "المرتجعات",
        path: "/invoices/returns",
        icon: ArrowLeftRight,
      },
      {
        label: "إحصائيات المبيعات",
        path: "/invoices/sales-stats",
        icon: FileBarChart2,
      },
    ],
  },
];
