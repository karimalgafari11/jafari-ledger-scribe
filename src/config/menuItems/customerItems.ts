
import { Users, User, FileText, CreditCard } from "lucide-react";
import { MenuItem } from "./types";

export const customerItems: MenuItem[] = [
  {
    section: "العملاء",
    icon: Users,
    children: [
      {
        label: "إدارة العملاء",
        path: "/customers/module",
        icon: User,
      },
      {
        label: "قائمة العملاء",
        path: "/customers/manage",
        icon: Users,
      },
      {
        label: "كشوف الحسابات",
        path: "/customers/statement",
        icon: FileText,
      },
      {
        label: "المستحقات المالية",
        path: "/receivables/accounts",
        icon: CreditCard,
      }
    ],
  },
];
