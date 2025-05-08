
import { Users, UserPlus, Briefcase, GraduationCap, Calendar, Award, Clipboard, HelpCircle, FileCheck } from "lucide-react";
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
        description: "إدارة بيانات الموظفين وملفاتهم الشخصية"
      },
      {
        label: "الوظائف والمناصب",
        path: "/hr/positions",
        icon: Briefcase,
        description: "تعريف الوظائف والمناصب وهيكلها التنظيمي"
      },
      {
        label: "التدريب والتطوير",
        path: "/hr/training",
        icon: GraduationCap,
        description: "إدارة برامج التدريب وتطوير المهارات"
      },
      {
        label: "الإجازات والغياب",
        path: "/hr/attendance",
        icon: Calendar,
        description: "إدارة الحضور والغياب والإجازات"
      },
      {
        label: "المكافآت والحوافز",
        path: "/hr/rewards",
        icon: Award,
        description: "إدارة المكافآت والحوافز للموظفين"
      },
      {
        label: "التقييم الوظيفي",
        path: "/hr/evaluation",
        icon: FileCheck,
        description: "إدارة عمليات تقييم أداء الموظفين"
      },
      {
        label: "الاستقطاب والتوظيف",
        path: "/hr/recruitment",
        icon: Clipboard,
        description: "إدارة عمليات التوظيف والمقابلات"
      },
      {
        label: "الدعم والمساعدة",
        path: "/hr/support",
        icon: HelpCircle,
        description: "دعم ومساعدة فريق الموارد البشرية"
      },
    ],
  },
];
