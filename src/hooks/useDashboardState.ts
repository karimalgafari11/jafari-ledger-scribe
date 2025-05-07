
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { ShortcutItem, DisplayOptions } from "@/types/dashboard";
import { FileText, Receipt, FileDown, FileUp, Database, Users, Truck, Calculator, CreditCard, BarChart, Package, ArrowLeftRight, Zap } from "lucide-react";

export function useDashboardState() {
  // حالة التاريخ والفترة والفرع
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('weekly');
  const [branch, setBranch] = useState<string>("all");
  const [interactiveMode, setInteractiveMode] = useState<boolean>(false);
  
  // إعدادات لوحة التحكم
  const [displayOptions, setDisplayOptions] = useState<DisplayOptions>({
    showStats: true,
    showKpis: true,
    showCharts: true,
    showAiWidget: true
  });
  
  // اختصارات لوحة التحكم
  const [shortcuts, setShortcuts] = useState<ShortcutItem[]>([
    {
      id: "purchase-invoice",
      name: "فاتورة شراء",
      icon: <Receipt size={20} />,
      route: "/purchases",
      enabled: true,
      description: "إنشاء وإدارة فواتير المشتريات من الموردين"
    },
    {
      id: "sales-invoice",
      name: "فاتورة بيع",
      icon: <FileText size={20} />,
      route: "/invoices/outgoing",
      enabled: true,
      badge: {
        text: "جديد",
        variant: "success" as const
      },
      description: "إنشاء وإدارة فواتير المبيعات للعملاء"
    },
    {
      id: "payment-voucher",
      name: "سند دفع",
      icon: <FileDown size={20} />,
      route: "/payables/payment",
      enabled: true,
      description: "إنشاء وإدارة سندات الدفع للموردين"
    },
    {
      id: "receipt-voucher",
      name: "سند قبض",
      icon: <FileUp size={20} />,
      route: "/receipt-vouchers",
      enabled: true,
      description: "إنشاء وإدارة سندات القبض من العملاء"
    },
    {
      id: "general-ledger",
      name: "دفتر الأستاذ",
      icon: <Database size={20} />,
      route: "/accounting/general-ledger",
      enabled: true,
      description: "الاطلاع على الحسابات وحركات دفتر الأستاذ"
    },
    {
      id: "cash-register",
      name: "الصندوق",
      icon: <CreditCard size={20} />,
      route: "/accounting/cash-registers",
      enabled: true,
      description: "إدارة عمليات الصندوق والإيداع والسحب"
    },
    {
      id: "price-offers",
      name: "عروض الأسعار",
      icon: <BarChart size={20} />,
      route: "/invoices/quotes",
      enabled: false,
      description: "إنشاء وإدارة عروض الأسعار للعملاء"
    },
    {
      id: "customer-management",
      name: "إدارة العملاء",
      icon: <Users size={20} />,
      route: "/customers",
      enabled: true,
      description: "إدارة بيانات العملاء وحساباتهم"
    },
    {
      id: "vendor-management",
      name: "إدارة الموردين",
      icon: <Truck size={20} />,
      route: "/vendors",
      enabled: true,
      description: "إدارة بيانات الموردين وحساباتهم"
    },
    {
      id: "vendor-reports",
      name: "تقارير الموردين",
      icon: <FileText size={20} />,
      route: "/reports/vendors",
      enabled: false,
      description: "عرض وتحليل تقارير الموردين"
    },
    {
      id: "reorder-inventory",
      name: "إعادة الطلب",
      icon: <Package size={20} />,
      route: "/inventory/reorder",
      enabled: false,
      description: "إدارة الطلبيات وإعادة طلب المنتجات"
    },
    {
      id: "inventory-transfer",
      name: "التحويل",
      icon: <ArrowLeftRight size={20} />,
      route: "/inventory-control/transfers",
      enabled: false,
      description: "تحويل المخزون بين المستودعات"
    },
    {
      id: "ai-assistant",
      name: "مساعد الذكاء",
      icon: <Zap size={20} />,
      route: "/ai/assistant",
      enabled: true,
      badge: {
        text: "جديد",
        variant: "secondary" as const
      },
      description: "الاستفادة من مساعد الذكاء الاصطناعي"
    }
  ]);
  
  // استرجاع الإعدادات من التخزين المحلي عند التحميل
  useEffect(() => {
    try {
      const savedDisplayOptions = localStorage.getItem('dashboardDisplayOptions');
      const savedShortcuts = localStorage.getItem('dashboardShortcuts');
      
      if (savedDisplayOptions) {
        setDisplayOptions(JSON.parse(savedDisplayOptions));
      }
      
      if (savedShortcuts) {
        setShortcuts(JSON.parse(savedShortcuts));
      }
    } catch (error) {
      console.error('Error loading dashboard settings:', error);
    }
  }, []);
  
  // حفظ الإعدادات في التخزين المحلي عند التغيير
  const handleDisplayOptionsChange = (newOptions: DisplayOptions) => {
    setDisplayOptions(newOptions);
    try {
      localStorage.setItem('dashboardDisplayOptions', JSON.stringify(newOptions));
    } catch (error) {
      console.error('Error saving display options:', error);
    }
  };
  
  const handleShortcutsChange = (newShortcuts: ShortcutItem[]) => {
    setShortcuts(newShortcuts);
    try {
      localStorage.setItem('dashboardShortcuts', JSON.stringify(newShortcuts));
    } catch (error) {
      console.error('Error saving shortcuts:', error);
    }
  };

  return {
    date,
    setDate,
    period,
    setPeriod,
    branch,
    setBranch,
    interactiveMode,
    setInteractiveMode,
    displayOptions,
    handleDisplayOptionsChange,
    shortcuts,
    handleShortcutsChange
  };
}
