
import { Receipt, Percent, ShoppingBag, FileText } from "lucide-react";
import { MenuItem } from "./types";

export const invoiceItems: MenuItem[] = [
  {
    section: "الفواتير",
    icon: Receipt,
    children: [
      {
        label: "الفواتير الصادرة",
        path: "/invoices/outgoing",
        icon: Receipt,
      },
      {
        label: "عروض الأسعار",
        path: "/invoices/quotes",
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
        icon: FileText,
      },
    ],
  },
];
