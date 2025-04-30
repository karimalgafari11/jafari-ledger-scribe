
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
  PercentCircle
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
    section: "التعاريف الأساسية",
    icon: Building,
    path: "/definitions",
    children: []
  },
  {
    section: "المخزون",
    icon: Box,
    children: [
      { label: "إدارة الأصناف", path: "/inventory/products", icon: Box },
      { label: "متابعة حركات المخزون", path: "/inventory/movements", icon: Box },
      { label: "الجرد الفعلي", path: "/inventory/counting", icon: ListChecks },
      { label: "مستويات إعادة الطلب", path: "/inventory/reorder", icon: Box }
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
    section: "الفواتير والطلبات",
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
    section: "التحكم بالمخزن",
    icon: Wrench,
    children: [
      { label: "نقل داخلي بين المستودعات", path: "/inventory-control/transfer", icon: Box },
      { label: "إدارة مواقع التخزين", path: "/inventory-control/locations", icon: Wrench },
      { label: "تسجيل المخزون التالف", path: "/inventory-control/damaged", icon: Box }
    ]
  },
  {
    section: "المحاسبة",
    icon: ChartBar,
    children: [
      { label: "شجرة الحسابات", path: "/accounting/chart", icon: ChartBar },
      { label: "القيود اليومية", path: "/accounting/journals", icon: FileText },
      { label: "صناديق النقدية", path: "/accounting/cashregister", icon: WalletCards },
      { label: "الأوراق التجارية", path: "/accounting/commercialpapers", icon: Receipt },
      { label: "العملات وأسعار الصرف", path: "/definitions/currencies", icon: Coins },
      { label: "مراكز الكلفة", path: "/accounting/cost-centers", icon: ChartBar },
      { label: "الإعدادات المحاسبية", path: "/accounting/settings", icon: Settings }
    ]
  },
  {
    section: "العملاء",
    icon: Users,
    children: [
      { label: "إدارة العملاء", path: "/customers/manage", icon: Users }
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
      { label: "إدارة الفروع", path: "/settings/branch", icon: Settings },
      { label: "إدارة المستخدمين", path: "/settings/users", icon: Users },
      { label: "النسخ الاحتياطي", path: "/settings/backup", icon: Settings }
    ]
  }
];
