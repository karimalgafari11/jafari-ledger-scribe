
import { CreditCard, CircleDollarSign, FileText } from "lucide-react";
import { MenuItem } from "./types";

export const paymentItems: MenuItem[] = [
  {
    section: "المدفوعات",
    icon: CreditCard,
    children: [
      {
        label: "الحسابات المستحقة",
        path: "/payables/accounts",
        icon: FileText,
      },
      {
        label: "تسجيل دفعة",
        path: "/payables/payment",
        icon: CircleDollarSign,
      },
    ],
  },
  {
    section: "المقبوضات",
    icon: CreditCard,
    children: [
      {
        label: "الحسابات المستحقة",
        path: "/receivables/accounts",
        icon: FileText,
      },
      {
        label: "تسجيل قبض",
        path: "/receivables/collection",
        icon: CircleDollarSign,
      },
    ],
  },
];
