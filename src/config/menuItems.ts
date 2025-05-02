
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
  Bell
} from "lucide-react";
import { MenuItem } from "@/types/sidebar";

export const menuItems: MenuItem[] = [
  {
    section: "لوحة التحكم",
    icon: LayoutDashboard,
    path: "/dashboard",
    children: []
  },
  {
    section: "التقارير",
    icon: ChartBar,
    path: "/reports",
    children: []
  },
  {
    section: "المخزون",
    icon: Warehouse,
    children: [
      { label: "إدارة الأصناف", path: "/inventory/products", icon: Box },
      { label: "متابعة حركات المخزون", path: "/inventory/movements", icon: Box },
      { label: "الجرد الفعلي", path: "/inventory/counting", icon: ListChecks },
      { label: "مستويات إعادة الطلب", path: "/inventory/reorder", icon: Box },
      { label: "نقل داخلي بين المستودعات", path: "/inventory-control/transfer", icon: Box },
      { label: "إدارة مواقع التخزين", path: "/inventory-control/locations", icon: Wrench },
      { label: "تسجيل المخزون التالف", path: "/inventory-control/damaged", icon: Box }
    ]
  },
  {
    section: "المصروفات",
    icon: DollarSign,
    children: [
      { label: "تسجيل مصروف جديد", path: "/expenses/new", icon: DollarSign },
      { label: "تصنيف المصروفات", path: "/expenses/categories", icon: DollarSign },
      { label: "تقارير المصروفات", path: "/expenses/reports", icon: ChartBar }
    ]
  },
  {
    section: "المشتريات",
    icon: ShoppingCart,
    children: [
      { label: "فاتورة شراء جديدة", path: "/purchases/new", icon: Receipt },
      { label: "فواتير الشراء", path: "/purchases/invoices", icon: FileText },
      { label: "مرتجعات الشراء", path: "/purchases/returns", icon: FileText },
      { label: "أوامر الشراء", path: "/purchases/orders", icon: ShoppingCart }
    ]
  },
  {
    section: "المبيعات والفواتير",
    icon: FileText,
    children: [
      { label: "الفواتير الصادرة", path: "/invoices/outgoing", icon: FileText },
      { label: "عروض الأسعار", path: "/invoices/quotes", icon: FileText },
      { label: "أوامر البيع", path: "/invoices/sales-orders", icon: ShoppingCart },
      { label: "مرتجعات المبيعات", path: "/invoices/returns", icon: FileText },
      { label: "إدارة الخصومات", path: "/definitions/discounts", icon: PercentCircle }
    ]
  },
  {
    section: "الذمم والمستحقات",
    icon: BadgeDollarSign,
    children: [
      { label: "الذمم المدينة", path: "/receivables/accounts", icon: PiggyBank },
      { label: "الذمم الدائنة", path: "/payables/accounts", icon: Banknote },
      { label: "تحصيل الديون", path: "/receivables/collection", icon: Coins },
      { label: "سداد المستحقات", path: "/payables/payment", icon: DollarSign }
    ]
  },
  {
    section: "المحاسبة",
    icon: ChartBar,
    children: [
      { label: "شجرة الحسابات", path: "/accounting/chart", icon: ChartBar },
      { label: "القيود اليومية", path: "/accounting/journals", icon: FileText },
      { label: "دفتر الأستاذ العام", path: "/accounting/ledger", icon: FileStack },
      { label: "صناديق النقدية", path: "/accounting/cashregister", icon: WalletCards },
      { label: "الحسابات البنكية", path: "/accounting/banks", icon: Building },
      { label: "الأوراق التجارية", path: "/accounting/commercialpapers", icon: Receipt },
      { label: "العملات وأسعار الصرف", path: "/definitions/currencies", icon: Coins },
      { label: "مراكز الكلفة", path: "/accounting/cost-centers", icon: ChartBar },
      { label: "الموازنات التقديرية", path: "/accounting/budgets", icon: PiggyBank },
      { label: "الإعدادات المحاسبية", path: "/accounting/settings", icon: Settings }
    ]
  },
  {
    section: "العملاء والموردين",
    icon: Users,
    children: [
      { label: "إدارة العملاء", path: "/customers/manage", icon: Users },
      { label: "إدارة الموردين", path: "/vendors/manage", icon: Users },
      { label: "تقارير العملاء", path: "/customers/reports", icon: FileText },
      { label: "تقارير الموردين", path: "/vendors/reports", icon: FileText }
    ]
  },
  {
    section: "المساعد الذكي",
    icon: Bot,
    path: "/ai-assistant",
    children: []
  },
  {
    section: "الإعدادات",
    icon: Settings,
    children: [
      { label: "إعدادات النظام", path: "/settings/system", icon: Settings },
      { label: "إدارة الفروع", path: "/settings/branches", icon: Building },
      { label: "إدارة المستخدمين", path: "/settings/users", icon: Users },
      { label: "الصلاحيات والأمان", path: "/settings/roles", icon: Shield },
      { label: "سجل الأحداث", path: "/settings/activity-log", icon: FileStack },
      { label: "إعدادات الإشعارات", path: "/settings/notifications", icon: Bell },
      { label: "النسخ الاحتياطي", path: "/settings/backup", icon: Settings }
    ]
  }
];
