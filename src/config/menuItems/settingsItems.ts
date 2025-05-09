
import { 
  Settings, 
  CalendarClock, 
  Calendar, 
  SlidersHorizontal, 
  Users, 
  SquareKanban, 
  Building2, 
  File, 
  CheckCircle2,
  Globe,
  Bell,
  Send,
  Paintbrush
} from "lucide-react";
import { MenuItem } from "./types";

export const settingsItems: MenuItem[] = [
  {
    section: "الإعدادات",
    icon: Settings,
    children: [
      {
        label: "سجل النشاطات",
        path: "/settings/activity-log",
        icon: CalendarClock,
      },
      {
        label: "الإشعارات",
        path: "/notifications",
        icon: Bell,
      },
      {
        label: "إرسال إشعار",
        path: "/settings/send-notification",
        icon: Send,
      },
      {
        label: "إعدادات الإشعارات",
        path: "/settings/notification-settings",
        icon: SlidersHorizontal,
      },
      {
        label: "تخصيص المظهر",
        path: "/settings/theme",
        icon: Paintbrush,
      },
      {
        label: "محرك الذكاء الاصطناعي",
        path: "/settings/ai-engine",
        icon: SlidersHorizontal,
      },
      {
        label: "صلاحيات المستخدمين",
        path: "/settings/roles",
        icon: Users,
      },
      {
        label: "إعدادات النظام",
        path: "/settings/system",
        icon: SlidersHorizontal,
      },
      {
        label: "إدارة الصفحات",
        path: "/settings/page-management",
        icon: SquareKanban,
      },
      {
        label: "الفروع",
        path: "/settings/branches",
        icon: Building2,
      },
      {
        label: "المستخدمين",
        path: "/settings/users",
        icon: Users,
      },
      {
        label: "النسخ الاحتياطي",
        path: "/settings/backup",
        icon: File,
      },
      {
        label: "فحص النسخ الاحتياطي",
        path: "/settings/backup-test",
        icon: CheckCircle2,
      },
      {
        label: "الربط مع الأنظمة الخارجية",
        path: "/settings/integrations",
        icon: Globe
      },
    ],
  },
];
