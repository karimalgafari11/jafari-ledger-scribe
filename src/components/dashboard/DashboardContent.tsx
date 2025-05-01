
import React from "react";
import { SystemAlert } from "@/types/ai";
import StatsCards from "@/components/dashboard/StatsCards";
import KpiMetricsGrid from "@/components/dashboard/KpiMetricsGrid";
import ChartsGrid from "@/components/dashboard/ChartsGrid";
import FinancialDecisionsWidget from "@/components/ai/FinancialDecisionsWidget";
import { useIsMobile } from "@/hooks/use-mobile";
import InteractiveLayout from "@/components/interactive/InteractiveLayout";

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
  interactiveMode?: boolean;
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
  systemAlerts,
  interactiveMode = false
}) => {
  const isMobile = useIsMobile();

  const dashboardContent = (
    <>
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
        interactiveMode={interactiveMode}
      />
      
      {/* FinancialDecisionsWidget من النظام الذكي */}
      <div className="mt-6 mb-6">
        <FinancialDecisionsWidget />
      </div>
    </>
  );

  return (
    <div className={`flex-1 overflow-auto w-full ${isMobile ? 'px-2' : ''}`}>
      {interactiveMode ? (
        <InteractiveLayout 
          enableDrag={true} 
          enableZoom={true}
          showControls={false}
          className="h-full w-full"
        >
          {dashboardContent}
        </InteractiveLayout>
      ) : (
        dashboardContent
      )}
    </div>
  );
};

export default DashboardContent;
