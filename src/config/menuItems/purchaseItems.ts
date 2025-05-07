
import { ShoppingBag, Receipt, FileText } from "lucide-react";
import { MenuItem } from "./types";

export const purchaseItems: MenuItem[] = [
  {
    section: "المشتريات",
    icon: ShoppingBag,
    children: [
      {
        label: "نظام المشتريات",
        path: "/purchases",
        icon: ShoppingBag,
      },
      {
        label: "فاتورة شراء جديدة",
        path: "/purchases/new",
        icon: Receipt,
      },
      {
        label: "فواتير الشراء",
        path: "/purchases/invoices",
        icon: Receipt,
      },
      {
        label: "أوامر الشراء",
        path: "/purchases/orders",
        icon: ShoppingBag,
      },
      {
        label: "مرتجعات المشتريات",
        path: "/purchases/returns",
        icon: FileText,
      },
    ],
  },
];
