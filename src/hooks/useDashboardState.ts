
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { ShortcutItem, DisplayOptions } from "@/types/dashboard";
import { 
  FileText, Receipt, FileDown, FileUp, Database, 
  Users, Truck, Calculator, CreditCard, BarChart, 
  Package, ArrowLeftRight, Zap
} from "lucide-react";

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
      icon: Receipt,
      route: "/purchases/invoices",
      enabled: true,
      description: "إنشاء وتنظيم فواتير المشتريات مع إمكانية تتبع المنتجات والخصومات وتحديد الموردين والدفعات بسهولة"
    },
    {
      id: "sales-invoice",
      name: "فاتورة بيع",
      icon: FileText,
      route: "/invoices/outgoing",
      enabled: true,
      badge: {
        text: "جديد",
        variant: "success" as const
      },
      description: "إدارة مبيعاتك مع إمكانية إضافة العملاء والمنتجات وتطبيق الخصومات وطباعة الفواتير وتتبع الدفعات"
    },
    {
      id: "payment-voucher",
      name: "سند دفع",
      icon: FileDown,
      route: "/payables/payment",
      enabled: true,
      description: "إنشاء وإدارة سندات الدفع للموردين مع خيارات متعددة لطرق الدفع وربطها مع الفواتير والحسابات المالية"
    },
    {
      id: "receipt-voucher",
      name: "سند قبض",
      icon: FileUp,
      route: "/receivables/collection",
      enabled: true,
      description: "إدارة المبالغ المقبوضة من العملاء مع إمكانية ربطها بالفواتير وتسوية الحسابات وطباعة إيصالات الاستلام"
    },
    {
      id: "general-ledger",
      name: "دفتر الأستاذ",
      icon: Database,
      route: "/accounting/ledger",
      enabled: true,
      description: "عرض وتحليل كافة الحركات المالية في النظام مع إمكانية التصفية حسب الحسابات والتواريخ واستخراج التقارير"
    },
    {
      id: "cash-register",
      name: "الصندوق",
      icon: CreditCard,
      route: "/accounting/cashregister",
      enabled: true,
      description: "إدارة عمليات النقد وتسجيل عمليات الإيداع والسحب وتتبع أرصدة الصناديق والطباعة الفورية لإيصالات العمليات"
    },
    {
      id: "price-offers",
      name: "عروض الأسعار",
      icon: BarChart,
      route: "/invoices/quotes",
      enabled: true,
      description: "إنشاء وإدارة عروض الأسعار للعملاء مع إمكانية تحويلها لفواتير مبيعات وتتبع حالة الموافقة والطباعة"
    },
    {
      id: "customer-management",
      name: "إدارة العملاء",
      icon: Users,
      route: "/customers",
      enabled: true,
      description: "إدارة قاعدة بيانات العملاء وتتبع المبيعات والديون ومعلومات التواصل مع إمكانية تصنيفهم وإضافة ملاحظات خاصة"
    },
    {
      id: "vendor-management",
      name: "إدارة الموردين",
      icon: Truck,
      route: "/vendors",
      enabled: true,
      description: "تسجيل وإدارة بيانات الموردين وتتبع المشتريات والمدفوعات وإنشاء تقارير تفصيلية عن التعاملات"
    },
    {
      id: "vendor-reports",
      name: "تقارير الموردين",
      icon: FileText,
      route: "/vendors/reports",
      enabled: true,
      description: "استخراج تقارير متنوعة عن الموردين تشمل المشتريات والدفعات والديون المستحقة مع خيارات التصفية والتصدير"
    },
    {
      id: "reorder-inventory",
      name: "إعادة الطلب",
      icon: Package,
      route: "/inventory/reorder",
      enabled: true,
      description: "متابعة مستويات المخزون وتنبيهات إعادة الطلب مع إمكانية إنشاء طلبات شراء تلقائية للمنتجات التي وصلت للحد الأدنى"
    },
    {
      id: "inventory-transfer",
      name: "التحويل",
      icon: ArrowLeftRight,
      route: "/inventory-control/transfer",
      enabled: true,
      description: "إدارة عمليات تحويل المخزون بين المستودعات مع تتبع حركة البضائع وتوثيق عمليات النقل وطباعة مستندات التحويل"
    },
    {
      id: "ai-assistant",
      name: "مساعد الذكاء",
      icon: Zap,
      route: "/ai/assistant",
      enabled: true,
      badge: {
        text: "جديد",
        variant: "secondary" as const
      },
      description: "مساعد ذكاء اصطناعي متطور يقدم تحليلات للبيانات المالية ويساعد في اتخاذ القرارات واقتراح إجراءات لتحسين الأداء"
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
