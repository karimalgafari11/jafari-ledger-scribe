
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
import { FileText, Receipt, FileDown, FileUp } from "lucide-react";
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
      id: "sales-invoice",
      name: "فاتورة مبيعات",
      icon: <FileText size={20} />,
      route: "/invoices/outgoing",
      enabled: true,
      badge: {
        text: "جديد",
        variant: "success"
      },
      description: "إنشاء وإدارة فواتير المبيعات للعملاء"
    },
    {
      id: "purchase-invoice",
      name: "فاتورة مشتريات",
      icon: <Receipt size={20} />,
      route: "/purchases",
      enabled: true,
      description: "إنشاء وإدارة فواتير المشتريات من الموردين"
    },
    {
      id: "payment-voucher",
      name: "سند دفع",
      icon: <FileDown size={20} />,
      route: "/payment-vouchers",
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
