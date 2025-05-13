
import { Settings, Users, ShieldAlert, Database, Activity, Building, Bell, Palette, LayoutDashboard, Braces, Download } from "lucide-react";
import { MenuItem } from "./types";

export const settingsItems: MenuItem[] = [
  {
    section: "الإعدادات",
    icon: Settings,
    children: [
      {
        label: "إعدادات النظام",
        path: "/settings/system",
        icon: Settings,
      },
      {
        label: "صلاحيات المستخدمين",
        path: "/settings/roles",
        icon: ShieldAlert,
      },
      {
        label: "المستخدمون",
        path: "/settings/users",
        icon: Users,
      },
      {
        label: "النسخ الاحتياطي",
        path: "/settings/backup",
        icon: Database,
      },
      {
        label: "سجل النشاط",
        path: "/settings/activity-log",
        icon: Activity,
      },
      {
        label: "إدارة الفروع",
        path: "/settings/branches",
        icon: Building,
      },
      {
        label: "إعدادات الإشعارات",
        path: "/settings/notifications",
        icon: Bell,
      },
      {
        label: "تخصيص المظهر",
        path: "/settings/theme",
        icon: Palette,
      },
      {
        label: "إدارة الصفحات",
        path: "/settings/page-management",
        icon: LayoutDashboard,
      },
      {
        label: "إعدادات الذكاء الاصطناعي",
        path: "/settings/ai-engine",
        icon: Braces,
      },
      {
        label: "التحديثات والإصدارات",
        path: "/settings/updates",
        icon: Download,
      },
    ],
  },
];

export default settingsItems;
