import {
  BarChart3,
  Building2,
  Calendar,
  CalendarClock,
  CaseSensitive,
  CheckCircle2,
  CircleDollarSign,
  ClipboardList,
  Coins,
  CreditCard,
  File,
  FileBarChart,
  FileText,
  FolderKanban,
  Gauge,
  Globe,
  ListChecks,
  LucideIcon,
  Network,
  Package,
  Percent,
  Receipt,
  ReceiptTax,
  Scale,
  Settings,
  ShoppingBag,
  SlidersHorizontal,
  SquareKanban,
  Store,
  User,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

type MenuItem = {
  section: string;
  icon: LucideIcon;
  path?: string;
  children?: {
    label: string;
    path: string;
    icon: LucideIcon;
  }[];
};

export const menuItems: MenuItem[] = [
  {
    section: "لوحة التحكم",
    icon: Gauge,
    path: "/dashboard",
  },
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
  {
    section: "الفواتير",
    icon: Receipt,
    children: [
      {
        label: "الفواتير الصادرة",
        path: "/invoices/outgoing",
        icon: Receipt,
      },
      {
        label: "عروض الأسعار",
        path: "/invoices/quotes",
        icon: Percent,
      },
      {
        label: "أوامر البيع",
        path: "/invoices/sales-orders",
        icon: ShoppingBag,
      },
      {
        label: "المرتجعات",
        path: "/invoices/returns",
        icon: FileText,
      },
    ],
  },
  {
    section: "المحاسبة",
    icon: Scale,
    children: [
      {
        label: "دليل الحسابات",
        path: "/accounting/chart",
        icon: ClipboardList,
      },
      {
        label: "القيود اليومية",
        path: "/accounting/journals",
        icon: FileText,
      },
      {
        label: "دفتر الأستاذ",
        path: "/accounting/ledger",
        icon: FileText,
      },
      {
        label: "الصندوق",
        path: "/accounting/cashregister",
        icon: Wallet,
      },
      {
        label: "الأوراق التجارية",
        path: "/accounting/commercialpapers",
        icon: CreditCard,
      },
      {
        label: "مراكز التكلفة",
        path: "/accounting/cost-centers",
        icon: Building2,
      },
      {
        label: "الإعدادات المحاسبية",
        path: "/accounting/settings",
        icon: SlidersHorizontal,
      },
    ],
  },
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
  {
    section: "الموردين",
    icon: Network,
    children: [
      {
        label: "إدارة الموردين",
        path: "/vendors/manage",
        icon: User,
      },
    ],
  },
  {
    section: "المشتريات",
    icon: ShoppingBag,
    children: [
      {
        label: "فاتورة شراء جديدة",
        path: "/purchases/new",
        icon: ReceiptTax,
      },
      {
        label: "فواتير الشراء",
        path: "/purchases/invoices",
        icon: Receipt,
      },
      {
        label: "أوامر الشراء",
        path: "/purchases/orders",
        icon: ShoppingBag,
      },
      {
        label: "مرتجعات المشتريات",
        path: "/purchases/returns",
        icon: FileText,
      },
    ],
  },
  {
    section: "المدفوعات",
    icon: CreditCard,
    children: [
      {
        label: "الحسابات المستحقة",
        path: "/payables/accounts",
        icon: CreditCard,
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
        icon: CreditCard,
      },
      {
        label: "تسجيل قبض",
        path: "/receivables/collection",
        icon: CircleDollarSign,
      },
    ],
  },
  {
    section: "المخزون",
    icon: Package,
    children: [
      {
        label: "المنتجات",
        path: "/inventory/products",
        icon: Package,
      },
      {
        label: "حركة المخزون",
        path: "/inventory/movements",
        icon: CalendarClock,
      },
      {
        label: "الجرد",
        path: "/inventory/counting",
        icon: CheckCircle2,
      },
      {
        label: "إعادة الطلب",
        path: "/inventory/reorder",
        icon: CaseSensitive,
      },
    ],
  },
  {
    section: "التحكم بالمخزون",
    icon: FolderKanban,
    children: [
      {
        label: "التحويل",
        path: "/inventory-control/transfer",
        icon: Zap,
      },
      {
        label: "المواقع",
        path: "/inventory-control/locations",
        icon: Store,
      },
      {
        label: "الأصناف التالفة",
        path: "/inventory-control/damaged",
        icon: AlertTriangle,
      },
    ],
  },
  {
    section: "الذكاء الاصطناعي",
    icon: Zap,
    children: [
      {
        label: "مساعد الذكاء الاصطناعي",
        path: "/ai-assistant",
        icon: Zap,
      },
      {
        label: "قرارات مالية",
        path: "/ai-financial-decisions",
        icon: Zap,
      },
    ],
  },
  {
    section: "التعاريف",
    icon: Settings,
    children: [
      {
        label: "التعاريف الأساسية",
        path: "/definitions",
        icon: CaseSensitive,
      },
      {
        label: "العملات",
        path: "/definitions/currencies",
        icon: Coins,
      },
      {
        label: "الخصومات",
        path: "/definitions/discounts",
        icon: Percent,
      },
    ],
  },
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
        icon: Calendar,
      },
      {
        label: "إعدادات الإشعارات",
        path: "/settings/notification-settings",
        icon: SlidersHorizontal,
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
  {
    section: "حول",
    icon: Info,
    path: "/about",
  },
];
