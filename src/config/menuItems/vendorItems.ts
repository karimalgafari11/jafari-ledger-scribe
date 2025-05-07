
import { Network, User, FileText } from "lucide-react";
import { MenuItem } from "./types";

export const vendorItems: MenuItem[] = [
  {
    section: "الموردين",
    icon: Network,
    children: [
      {
        label: "إدارة الموردين",
        path: "/vendors/manage",
        icon: User,
      },
      {
        label: "كشوفات الحسابات",
        path: "/vendors/statement",
        icon: FileText,
      },
      {
        label: "تقارير الموردين",
        path: "/vendors/reports",
        icon: FileText,
      },
    ],
  },
];
