
import React from "react";
import SalesExpensesChart from "./charts/SalesExpensesChart";
import ProfitMarginChart from "./charts/ProfitMarginChart";
import PieChartCard from "./charts/PieChartCard";
import { Calculator, ShoppingCart, Users } from "lucide-react";
import DailySalesChart from "./charts/DailySalesChart";
import AlertsTabs from "./AlertsTabs";
import { SystemAlert } from "@/types/ai";
import DraggableComponent from "@/components/interactive/DraggableComponent";
import ResizableComponent from "@/components/interactive/ResizableComponent";
import ZoomableContent from "@/components/interactive/ZoomableContent";

interface ChartsGridProps {
  salesData: any[];
  profitData: any[];
  customerDebtData: any[];
  supplierCreditData: any[];
  costCenterData: any[];
  dailySalesData: any[];
  profitMargin: string;
  systemAlerts: SystemAlert[];
  interactiveMode?: boolean;
}

const ChartsGrid: React.FC<ChartsGridProps> = ({
  salesData,
  profitData,
  customerDebtData,
  supplierCreditData,
  costCenterData,
  dailySalesData,
  profitMargin,
  systemAlerts,
  interactiveMode = false
}) => {
  const renderChart = (chart: React.ReactNode, id: string) => {
    if (interactiveMode) {
      return (
        <DraggableComponent 
          key={id}
          defaultPosition={{ x: 0, y: 0 }}
          className="z-10 mb-6"
        >
          <ResizableComponent 
            direction="horizontal" 
            defaultSize={100} 
            minSize={30} 
            maxSize={100}
            id={id}
          >
            <ZoomableContent>
              {chart}
            </ZoomableContent>
          </ResizableComponent>
        </DraggableComponent>
      );
    }
    return chart;
  };

  return (
    <>
      {/* المخططات الرئيسية */}
      <div className={interactiveMode ? "" : "grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"}>
        {renderChart(
          <SalesExpensesChart data={salesData} />, 
          "sales-expenses-chart"
        )}
        
        {renderChart(
          <ProfitMarginChart data={profitData} averageProfitMargin={profitMargin} />,
          "profit-margin-chart"
        )}
      </div>

      {/* المزيد من البيانات - العملاء، الموردين، وتحليل مراكز التكلفة */}
      <div className={interactiveMode ? "" : "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"}>
        {renderChart(
          <PieChartCard
            title="أعلى 5 عملاء (الديون)"
            icon={<Users className="h-5 w-5" />}
            data={customerDebtData}
            reportButtonText="عرض تقرير العملاء المفصل"
          />,
          "customer-debt-chart"
        )}

        {renderChart(
          <PieChartCard
            title="أعلى 5 موردين (المستحقات)"
            icon={<ShoppingCart className="h-5 w-5" />}
            data={supplierCreditData}
            reportButtonText="عرض تقرير الموردين المفصل"
          />,
          "supplier-credit-chart"
        )}

        {renderChart(
          <PieChartCard
            title="مراكز التكلفة"
            icon={<Calculator className="h-5 w-5" />}
            data={costCenterData}
            reportButtonText="تقرير مراكز التكلفة المفصل"
          />,
          "cost-center-chart"
        )}
      </div>

      {/* بيانات المبيعات اليومية وقسم الإشعارات */}
      <div className={interactiveMode ? "" : "grid grid-cols-1 lg:grid-cols-2 gap-6"}>
        {renderChart(
          <DailySalesChart data={dailySalesData} />,
          "daily-sales-chart"
        )}
        
        {renderChart(
          <AlertsTabs alerts={systemAlerts} />,
          "alerts-tabs"
        )}
      </div>
    </>
  );
};

export default ChartsGrid;
