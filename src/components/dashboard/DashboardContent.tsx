
import React from "react";
import { SystemAlert } from "@/types/ai";
import StatsCards from "@/components/dashboard/StatsCards";
import KpiMetricsGrid from "@/components/dashboard/KpiMetricsGrid";
import ChartsGrid from "@/components/dashboard/ChartsGrid";
import FinancialDecisionsWidget from "@/components/ai/FinancialDecisionsWidget";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardContentProps {
  totalSales: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: string;
  overdueInvoices: number;
  overdueTotalAmount: number;
  kpis: Array<{
    title: string;
    value: string;
    status: "up" | "down" | "neutral";
    description: string;
  }>;
  salesData: any[];
  profitData: any[];
  customerDebtData: any[];
  supplierCreditData: any[];
  costCenterData: any[];
  dailySalesData: any[];
  systemAlerts: SystemAlert[];
}

const DashboardContent: React.FC<DashboardContentProps> = ({
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
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`flex-1 overflow-auto w-full ${isMobile ? 'px-2' : ''}`}>
      {/* بطاقات الإحصائيات الرئيسية */}
      <StatsCards 
        totalSales={totalSales} 
        totalExpenses={totalExpenses} 
        netProfit={netProfit} 
        profitMargin={profitMargin} 
        overdueInvoices={overdueInvoices} 
        overdueTotalAmount={overdueTotalAmount} 
      />

      {/* مؤشرات الأداء الرئيسية */}
      <KpiMetricsGrid metrics={kpis} />

      {/* المخططات والرسوم البيانية */}
      <ChartsGrid 
        salesData={salesData} 
        profitData={profitData} 
        customerDebtData={customerDebtData} 
        supplierCreditData={supplierCreditData} 
        costCenterData={costCenterData} 
        dailySalesData={dailySalesData} 
        profitMargin={profitMargin} 
        systemAlerts={systemAlerts} 
      />
      
      {/* FinancialDecisionsWidget من النظام الذكي */}
      <div className="mt-6 mb-6">
        <FinancialDecisionsWidget />
      </div>
    </div>
  );
};

export default DashboardContent;
