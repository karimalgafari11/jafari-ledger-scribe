
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { ZoomProvider } from "@/components/interactive/ZoomControl";
import ZoomControl from "@/components/interactive/ZoomControl";
import { Button } from "@/components/ui/button";
import { DashboardSettings } from "@/components/dashboard/DashboardSettings";
import DashboardShortcuts from "@/components/dashboard/DashboardShortcuts";
import ShortcutsSettings from "@/components/dashboard/ShortcutsSettings";
import { FileText, Receipt, FileDown, FileUp, Database, Users, Truck, Calculator, CreditCard, BarChart, Package, ArrowLeftRight, Zap } from "lucide-react";
import { useAiAssistant } from "@/hooks/useAiAssistant";

const Dashboard = () => {
  // استدعاء بيانات المساعد الذكي للحصول على التنبيهات النظامية
  const { systemAlerts } = useAiAssistant();
  
  // استدعاء بيانات لوحة التحكم
  const { 
    totalSales, 
    totalExpenses, 
    netProfit, 
    profitMargin, 
    overdueInvoices, 
    overdueTotalAmount,
    kpis,
    salesData,
    profitData,
    customerDebtData,
    supplierCreditData,
    costCenterData,
    dailySalesData,
  } = useDashboardMetrics();

  // حالة التاريخ والفترة والفرع
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('weekly');
  const [branch, setBranch] = useState<string>("all");
  const [interactiveMode, setInteractiveMode] = useState<boolean>(false);
  
  // إعدادات لوحة التحكم
  const [displayOptions, setDisplayOptions] = useState({
    showStats: true,
    showKpis: true,
    showCharts: true,
    showAiWidget: true
  });
  
  // اختصارات لوحة التحكم
  const [shortcuts, setShortcuts] = useState([
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
  const handleDisplayOptionsChange = (newOptions: typeof displayOptions) => {
    setDisplayOptions(newOptions);
    try {
      localStorage.setItem('dashboardDisplayOptions', JSON.stringify(newOptions));
    } catch (error) {
      console.error('Error saving display options:', error);
    }
  };
  
  const handleShortcutsChange = (newShortcuts: typeof shortcuts) => {
    setShortcuts(newShortcuts);
    try {
      localStorage.setItem('dashboardShortcuts', JSON.stringify(newShortcuts));
    } catch (error) {
      console.error('Error saving shortcuts:', error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="flex flex-col md:flex-row items-center justify-between bg-blue-500">
          <DashboardWelcome 
            date={date} 
            onDateChange={setDate} 
            period={period} 
            onPeriodChange={setPeriod} 
            branch={branch} 
            onBranchChange={setBranch}
          >
            <ShortcutsSettings 
              shortcuts={shortcuts}
              onShortcutsChange={handleShortcutsChange}
            />
            
            <DashboardSettings 
              displayOptions={displayOptions}
              onDisplayOptionsChange={handleDisplayOptionsChange}
              shortcuts={shortcuts}
              onShortcutsChange={handleShortcutsChange}
            />
            
            <Button 
              variant="outline" 
              onClick={() => setInteractiveMode(!interactiveMode)}
              className="mr-2 bg-white/90 text-blue-600 hover:bg-white hover:text-blue-700"
            >
              {interactiveMode ? "العرض العادي" : "العرض التفاعلي"}
            </Button>
            
            {interactiveMode && (
              <ZoomControl compact />
            )}
          </DashboardWelcome>
        </div>
        
        <div className="container p-4 mx-auto">
          <DashboardShortcuts shortcuts={shortcuts.filter(shortcut => shortcut.enabled)} />
        </div>

        {interactiveMode ? (
          <ZoomProvider>
            <div className="flex-1 overflow-auto">
              <DashboardContent
                totalSales={totalSales}
                totalExpenses={totalExpenses}
                netProfit={netProfit}
                profitMargin={profitMargin}
                overdueInvoices={overdueInvoices}
                overdueTotalAmount={overdueTotalAmount}
                kpis={kpis}
                salesData={salesData}
                profitData={profitData}
                customerDebtData={customerDebtData}
                supplierCreditData={supplierCreditData}
                costCenterData={costCenterData}
                dailySalesData={dailySalesData}
                systemAlerts={systemAlerts}
                interactiveMode={interactiveMode}
                displayOptions={displayOptions}
                shortcuts={shortcuts}
              />
            </div>
          </ZoomProvider>
        ) : (
          <DashboardContent
            totalSales={totalSales}
            totalExpenses={totalExpenses}
            netProfit={netProfit}
            profitMargin={profitMargin}
            overdueInvoices={overdueInvoices}
            overdueTotalAmount={overdueTotalAmount}
            kpis={kpis}
            salesData={salesData}
            profitData={profitData}
            customerDebtData={customerDebtData}
            supplierCreditData={supplierCreditData}
            costCenterData={costCenterData}
            dailySalesData={dailySalesData}
            systemAlerts={systemAlerts}
            interactiveMode={interactiveMode}
            displayOptions={displayOptions}
            shortcuts={shortcuts}
          />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
