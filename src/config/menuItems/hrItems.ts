
import { Users, UserPlus, Briefcase, GraduationCap, Calendar } from "lucide-react";
import { MenuItem } from "./types";

export const hrItems: MenuItem[] = [
  {
    section: "الموارد البشرية",
    icon: Users,
    children: [
      {
        label: "الموظفون",
        path: "/hr/employees",
        icon: UserPlus,
      },
      {
        label: "الوظائف والمناصب",
        path: "/hr/positions",
        icon: Briefcase,
      },
      {
        label: "التدريب والتطوير",
        path: "/hr/training",
        icon: GraduationCap,
      },
      {
        label: "الإجازات والغياب",
        path: "/hr/attendance",
        icon: Calendar,
      },
    ],
  },
];
