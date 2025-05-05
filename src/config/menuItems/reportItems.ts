
import { BarChart3, File, FileBarChart } from "lucide-react";
import { MenuItem } from "./types";

export const reportItems: MenuItem[] = [
  {
    section: "التقارير",
    icon: FileBarChart,
    children: [
      {
        label: "نماذج التقارير",
        path: "/reports/templates",
        icon: File,
      },
      {
        label: "تقارير المبيعات",
        path: "/reports/sales",
        icon: BarChart3,
      },
    ],
  },
];
