
import React from "react";
import { SystemAlert } from "@/types/ai";
import { ShortcutItem, DisplayOptions } from "@/types/dashboard";
import StatsCards from "@/components/dashboard/StatsCards";
import KpiMetricsGrid from "@/components/dashboard/KpiMetricsGrid";
import ChartsGrid from "@/components/dashboard/ChartsGrid";
import FinancialDecisionsWidget from "@/components/ai/FinancialDecisionsWidget";
import { useIsMobile } from "@/hooks/use-mobile";
import InteractiveLayout from "@/components/interactive/InteractiveLayout";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { ChartData } from "@/types/custom-reports";
import DashboardShortcuts from "@/components/dashboard/DashboardShortcuts";

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
  salesData: ChartData;
  profitData: ChartData;
  customerDebtData: ChartData;
  supplierCreditData: ChartData;
  costCenterData: ChartData;
  dailySalesData: ChartData;
  systemAlerts: SystemAlert[];
  interactiveMode?: boolean;
  displayOptions: DisplayOptions;
  shortcuts: ShortcutItem[];
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
  interactiveMode = false,
  displayOptions,
  shortcuts
}) => {
  const isMobile = useIsMobile();
  const { analyzePerformance } = useAiAssistant();
  const performance = analyzePerformance();

  const dashboardContent = (
    <div className="w-full">
      {/* عرض الاختصارات إذا كان هناك اختصارات مفعلة */}
      {shortcuts && shortcuts.length > 0 && (
        <div className="mb-6">
          <DashboardShortcuts shortcuts={shortcuts} />
        </div>
      )}

      {/* بطاقات الإحصائيات الرئيسية */}
      {displayOptions.showStats && (
        <StatsCards 
          totalSales={totalSales} 
          totalExpenses={totalExpenses} 
          netProfit={netProfit} 
          profitMargin={profitMargin} 
          overdueInvoices={overdueInvoices} 
          overdueTotalAmount={overdueTotalAmount} 
        />
      )}

      {/* مؤشرات الأداء الرئيسية */}
      {displayOptions.showKpis && (
        <KpiMetricsGrid metrics={kpis} />
      )}

      {/* المخططات والرسوم البيانية */}
      {displayOptions.showCharts && (
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
      )}
      
      {/* FinancialDecisionsWidget من النظام الذكي */}
      {displayOptions.showAiWidget && performance && (
        <div className="mt-6 mb-6">
          <FinancialDecisionsWidget performance={performance} />
        </div>
      )}
    </div>
  );

  return (
    <div className="w-full flex-1 overflow-auto">
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
