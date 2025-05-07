import React from "react";
import { Layout } from "@/components/Layout";
import { ZoomProvider } from "@/components/interactive/ZoomControl";
import ZoomControl from "@/components/interactive/ZoomControl";
import { Button } from "@/components/ui/button";
import { DashboardSettings } from "@/components/dashboard/DashboardSettings";
import DashboardShortcuts from "@/components/dashboard/DashboardShortcuts";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { useDashboardState } from "@/hooks/useDashboardState";
import { ShortcutItem, DisplayOptions } from "@/types/dashboard";
import { CreditCard, Database, Users } from "lucide-react";

// إضافة اختصار جديد لصفحة تسجيل الدفعات
const paymentShortcut: ShortcutItem = {
  id: "payment-shortcut",
  name: "تسجيل دفعة جديدة",
  description: "إضافة عملية دفع جديدة للموردين",
  route: "/payables/payment",
  icon: CreditCard,
  enabled: true,
  badge: {
    text: "جديد",
    variant: "outline"
  }
};

// إضافة اختصار جديد لصفحة دفتر الأستاذ
const ledgerShortcut: ShortcutItem = {
  id: "ledger-shortcut",
  name: "دفتر الأستاذ",
  description: "عرض وإدارة دفتر الأستاذ العام والقيود المحاسبية",
  route: "/accounting/ledger",
  icon: Database,
  enabled: true,
  badge: {
    text: "محاسبة",
    variant: "success"
  }
};

// إضافة اختصار جديد لصفحة إدارة العملاء
const customersShortcut: ShortcutItem = {
  id: "customers-shortcut",
  name: "إدارة العملاء",
  description: "عرض وإدارة حسابات وبيانات العملاء",
  route: "/customers/module",
  icon: Users,
  enabled: true,
  badge: {
    text: "مبيعات",
    variant: "success"
  }
};

const Dashboard = () => {
  // استدعاء بيانات المساعد الذكي للحصول على التنبيهات النظامية
  const { systemAlerts } = useAiAssistant();
  
  // استدعاء حالة لوحة التحكم
  const {
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
  } = useDashboardState();
  
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

  // إضافة اختصارات جديدة إلى قائمة الاختصارات إذا لم تكن موجودة بالفعل
  React.useEffect(() => {
    let updatedShortcuts = [...shortcuts];
    let hasChanges = false;
    
    // التحقق من وجود اختصار المدفوعات
    const hasPaymentShortcut = shortcuts.some(shortcut => shortcut.id === paymentShortcut.id);
    if (!hasPaymentShortcut) {
      updatedShortcuts.push(paymentShortcut);
      hasChanges = true;
    }
    
    // التحقق من وجود اختصار دفتر الأستاذ
    const hasLedgerShortcut = shortcuts.some(shortcut => shortcut.id === ledgerShortcut.id);
    if (!hasLedgerShortcut) {
      updatedShortcuts.push(ledgerShortcut);
      hasChanges = true;
    }
    
    // التحقق من وجود اختصار إدارة العملاء
    const hasCustomersShortcut = shortcuts.some(shortcut => shortcut.id === customersShortcut.id);
    if (!hasCustomersShortcut) {
      updatedShortcuts.push(customersShortcut);
      hasChanges = true;
    }
    
    // تحديث الاختصارات إذا كان هناك تغييرات
    if (hasChanges) {
      handleShortcutsChange(updatedShortcuts);
    }
  }, [shortcuts, handleShortcutsChange]);

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
        
        <div className="container p-4 mx-auto">
          <DashboardShortcuts shortcuts={shortcuts} />
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
