
import { Users, User, FileText } from "lucide-react";
import { MenuItem } from "./types";

export const customerItems: MenuItem[] = [
  {
    section: "الزبائن",
    icon: Users,
    children: [
      {
        label: "إدارة الزبائن",
        path: "/customers/manage",
        icon: User,
      },
      {
        label: "كشف حساب",
        path: "/customers/statement",
        icon: FileText,
      },
    ],
  },
];
