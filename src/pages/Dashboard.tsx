
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import DashboardContent from "@/components/dashboard/DashboardContent";
import { ZoomProvider } from "@/components/interactive/ZoomControl";
import ZoomControl from "@/components/interactive/ZoomControl";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
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
    systemAlerts
  } = useDashboardMetrics();

  // حالة التاريخ والفترة والفرع
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), -7),
    to: new Date(),
  });

  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('weekly');
  const [branch, setBranch] = useState<string>("all");
  const [interactiveMode, setInteractiveMode] = useState<boolean>(false);

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
          />
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
