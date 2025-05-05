
import { Coins, CircleDollarSign, ListChecks, FileText } from "lucide-react";
import { MenuItem } from "./types";

export const expenseItems: MenuItem[] = [
  {
    section: "المصروفات",
    icon: Coins,
    children: [
      {
        label: "مصروف جديد",
        path: "/expenses/new",
        icon: CircleDollarSign,
      },
      {
        label: "فئات المصروفات",
        path: "/expenses/categories",
        icon: ListChecks,
      },
      {
        label: "تقارير المصروفات",
        path: "/expenses/reports",
        icon: FileText,
      },
    ],
  },
];
