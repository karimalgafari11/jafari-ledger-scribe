
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { Layout } from "@/components/Layout";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { useDashboardMetrics } from "@/hooks/useDashboardMetrics";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";

const Dashboard = () => {
  const { systemAlerts } = useAiAssistant();
  const { products } = useInventoryProducts();
  const { entries } = useJournalEntries();
  const metrics = useDashboardMetrics();
  const isMobile = useIsMobile();
  
  // State for filters
  const [date, setDate] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [branch, setBranch] = useState<string>('all');
  const [department, setDepartment] = useState<string>('all');

  // حساب معلومات التقارير
  const lowStockItems = products.filter(p => p.quantity <= p.reorderLevel);
  const activeProducts = products.filter(p => p.isActive);

  return (
    <Layout>
      <div className={`flex flex-col w-full h-full ${isMobile ? 'px-0 py-0' : 'p-6'}`}>
        <DashboardWelcome
          date={date}
          onDateChange={setDate}
          period={period}
          onPeriodChange={setPeriod}
          branch={branch}
          onBranchChange={setBranch}
        />
        
        <DashboardContent
          totalSales={metrics.totalSales}
          totalExpenses={metrics.totalExpenses}
          netProfit={metrics.netProfit}
          profitMargin={metrics.profitMargin}
          overdueInvoices={metrics.overdueInvoices}
          overdueTotalAmount={metrics.overdueTotalAmount}
          kpis={metrics.kpis}
          salesData={metrics.salesData}
          profitData={metrics.profitData}
          customerDebtData={metrics.customerDebtData}
          supplierCreditData={metrics.supplierCreditData}
          costCenterData={metrics.costCenterData}
          dailySalesData={metrics.dailySalesData}
          systemAlerts={systemAlerts}
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
