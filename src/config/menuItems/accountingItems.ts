
import { 
  Scale, 
  ClipboardList, 
  FileText, 
  Wallet, 
  CreditCard, 
  Building2, 
  SlidersHorizontal 
} from "lucide-react";
import { MenuItem } from "./types";

export const accountingItems: MenuItem[] = [
  {
    section: "المحاسبة",
    icon: Scale,
    children: [
      {
        label: "دليل الحسابات",
        path: "/accounting/accounts",
        icon: ClipboardList,
      },
      {
        label: "القيود اليومية",
        path: "/accounting/journals",
        icon: FileText,
      },
      {
        label: "دفتر الأستاذ",
        path: "/accounting/ledger",
        icon: FileText,
      },
      {
        label: "الصندوق",
        path: "/accounting/cashregister",
        icon: Wallet,
      },
      {
        label: "الأوراق التجارية",
        path: "/accounting/commercial-papers",
        icon: CreditCard,
      },
      {
        label: "مراكز التكلفة",
        path: "/accounting/cost-centers",
        icon: Building2,
      },
      {
        label: "الإعدادات المحاسبية",
        path: "/accounting/settings",
        icon: SlidersHorizontal,
      },
    ],
  },
];
