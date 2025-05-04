
import {
  LayoutDashboard,
  Box,
  ListChecks,
  ShoppingCart,
  FileText,
  ChartBar,
  Users,
  Settings,
  DollarSign,
  Wrench,
  Bot,
  Building,
  Receipt,
  Coins,
  BadgeDollarSign,
  PiggyBank,
  Banknote,
  WalletCards,
  PercentCircle,
  Shield,
  FileStack,
  UserCog,
  List,
  Warehouse,
  Bell,
  AlertCircle,
  BarChart,
  ClipboardList,
  Send,
  ArrowRight,
  ArrowLeft,
  PieChart,
  Landmark,
  Calculator,
  Layers,
  TrendingUp,
  UserCheck,
  Ambulance,
  Lightbulb,
  RefreshCw,
  Link,
  Activity
} from "lucide-react";
import { MenuItem } from "@/types/sidebar";

export const menuItems: MenuItem[] = [
  // 1. لوحة التحكم
  {
    section: "لوحة التحكم",
    icon: LayoutDashboard,
    path: "/dashboard",
    children: [
      { label: "نظرة عامة على الأداء", path: "/dashboard", icon: Activity },
      { label: "تنبيهات ذكية", path: "/dashboard/alerts", icon: AlertCircle },
      { label: "تقارير مختصرة", path: "/dashboard/quick-reports", icon: BarChart }
    ]
  },
  
  // 2. المبيعات
  {
    section: "المبيعات",
    icon: FileText,
    children: [
      { label: "الفواتير الصادرة", path: "/invoices/outgoing", icon: FileText },
      { label: "عروض الأسعار", path: "/invoices/quotes", icon: ClipboardList },
      { label: "أوامر البيع", path: "/invoices/sales-orders", icon: ShoppingCart },
      { label: "مرتجعات المبيعات", path: "/invoices/returns", icon: ArrowLeft },
      { label: "إدارة الخصومات", path: "/definitions/discounts", icon: PercentCircle }
    ]
  },
  
  // 3. المشتريات
  {
    section: "المشتريات",
    icon: ShoppingCart,
    children: [
      { label: "فواتير الشراء", path: "/purchases/invoices", icon: Receipt },
      { label: "فاتورة شراء جديدة", path: "/purchases/new", icon: FileText },
      { label: "أوامر الشراء", path: "/purchases/orders", icon: ShoppingCart },
      { label: "مرتجعات المشتريات", path: "/purchases/returns", icon: ArrowRight }
    ]
  },
  
  // 4. العملاء والموردين
  {
    section: "العملاء والموردين",
    icon: Users,
    children: [
      { label: "إدارة العملاء", path: "/customers/manage", icon: UserCheck },
      { label: "إدارة الموردين", path: "/vendors/manage", icon: Users },
      { label: "الذمم المدينة (العملاء)", path: "/receivables/accounts", icon: PiggyBank },
      { label: "الذمم الدائنة (الموردين)", path: "/payables/accounts", icon: BadgeDollarSign },
      { label: "تحصيل الديون", path: "/receivables/collection", icon: Coins },
      { label: "سداد المستحقات", path: "/payables/payment", icon: DollarSign }
    ]
  },
  
  // 5. المخزون
  {
    section: "المخزون",
    icon: Warehouse,
    children: [
      { label: "إدارة الأصناف", path: "/inventory/products", icon: Box },
      { label: "متابعة الحركات", path: "/inventory/movements", icon: RefreshCw },
      { label: "الجرد الفعلي", path: "/inventory/counting", icon: ListChecks },
      { label: "مستويات إعادة الطلب", path: "/inventory/reorder", icon: AlertCircle },
      { label: "النقل الداخلي", path: "/inventory-control/transfer", icon: Send },
      { label: "إدارة مواقع التخزين", path: "/inventory-control/locations", icon: Wrench },
      { label: "تسجيل المخزون التالف", path: "/inventory-control/damaged", icon: Ambulance }
    ]
  },
  
  // 6. المحاسبة
  {
    section: "المحاسبة",
    icon: ChartBar,
    children: [
      { label: "شجرة الحسابات", path: "/accounting/chart", icon: Layers },
      { label: "القيود اليومية", path: "/accounting/journals", icon: FileText },
      { label: "دفتر الأستاذ العام", path: "/accounting/ledger", icon: FileStack },
      { label: "المصروفات", path: "/expenses", icon: DollarSign },
      { label: "تسجيل مصروف", path: "/expenses/new", icon: DollarSign },
      { label: "تصنيفات المصروفات", path: "/expenses/categories", icon: List },
      { label: "مراكز الكلفة", path: "/accounting/cost-centers", icon: PieChart },
      { label: "الموازنات التقديرية", path: "/accounting/budgets", icon: Calculator },
      { label: "العملات وأسعار الصرف", path: "/definitions/currencies", icon: Coins },
      { label: "الضرائب والزكاة", path: "/accounting/taxes", icon: Calculator },
      { label: "الإهلاكات", path: "/accounting/depreciation", icon: TrendingUp }
    ]
  },
  
  // 7. الخزينة والبنوك
  {
    section: "الخزينة والبنوك",
    icon: Landmark,
    children: [
      { label: "صناديق النقدية", path: "/accounting/cashregister", icon: WalletCards },
      { label: "الحسابات البنكية", path: "/accounting/banks", icon: Building },
      { label: "الأوراق التجارية", path: "/accounting/commercialpapers", icon: Receipt }
    ]
  },
  
  // 8. التقارير
  {
    section: "التقارير",
    icon: ChartBar,
    children: [
      { label: "تقارير المبيعات", path: "/reports/sales", icon: ChartBar },
      { label: "تقارير المشتريات", path: "/reports/purchases", icon: ChartBar },
      { label: "تقارير العملاء والموردين", path: "/reports/customers-vendors", icon: ChartBar },
      { label: "تقارير المخزون", path: "/reports/inventory", icon: ChartBar },
      { label: "تقارير المحاسبة", path: "/reports/accounting", icon: ChartBar },
      { label: "تقارير الذمم", path: "/reports/receivables", icon: ChartBar },
      { label: "تقارير المصروفات", path: "/reports/expenses", icon: ChartBar },
      { label: "تقارير مراكز الكلفة", path: "/reports/cost-centers", icon: ChartBar }
    ]
  },
  
  // 9. المساعد الذكي
  {
    section: "المساعد الذكي",
    icon: Bot,
    children: [
      { label: "مساعد محادثة ذكي", path: "/ai-assistant", icon: Bot },
      { label: "تحليل البيانات", path: "/ai/data-analysis", icon: PieChart },
      { label: "اقتراحات مالية", path: "/ai-financial-decisions", icon: Lightbulb }
    ]
  },
  
  // 10. الإعدادات
  {
    section: "الإعدادات",
    icon: Settings,
    children: [
      { label: "إعدادات النظام", path: "/settings/system", icon: Settings },
      { label: "إعدادات الإشعارات", path: "/settings/notifications", icon: Bell },
      { label: "إدارة الفروع", path: "/settings/branches", icon: Building },
      { label: "إدارة المستخدمين", path: "/settings/users", icon: Users },
      { label: "الصلاحيات والأمان", path: "/settings/roles", icon: Shield },
      { label: "سجل الأحداث", path: "/settings/activity-log", icon: FileStack },
      { label: "النسخ الاحتياطي", path: "/settings/backup", icon: RefreshCw },
      { label: "الربط مع الأنظمة الخارجية", path: "/settings/integrations", icon: Link }
    ]
  }
];
