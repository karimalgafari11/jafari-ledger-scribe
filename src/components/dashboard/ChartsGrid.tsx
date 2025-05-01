
import React from "react";
import SalesExpensesChart from "./charts/SalesExpensesChart";
import ProfitMarginChart from "./charts/ProfitMarginChart";
import PieChartCard from "./charts/PieChartCard";
import { Calculator, ShoppingCart, Users } from "lucide-react";
import DailySalesChart from "./charts/DailySalesChart";
import AlertsTabs from "./AlertsTabs";
import { SystemAlert } from "@/types/ai";

interface ChartsGridProps {
  salesData: any[];
  profitData: any[];
  customerDebtData: any[];
  supplierCreditData: any[];
  costCenterData: any[];
  dailySalesData: any[];
  profitMargin: string;
  systemAlerts: SystemAlert[];
}

const ChartsGrid: React.FC<ChartsGridProps> = ({
  salesData,
  profitData,
  customerDebtData,
  supplierCreditData,
  costCenterData,
  dailySalesData,
  profitMargin,
  systemAlerts
}) => {
  return (
    <>
      {/* المخططات الرئيسية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <SalesExpensesChart data={salesData} />
        <ProfitMarginChart data={profitData} averageProfitMargin={profitMargin} />
      </div>

      {/* المزيد من البيانات - العملاء، الموردين، وتحليل مراكز التكلفة */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <PieChartCard
          title="أعلى 5 عملاء (الديون)"
          icon={<Users className="h-5 w-5" />}
          data={customerDebtData}
          reportButtonText="عرض تقرير العملاء المفصل"
        />

        <PieChartCard
          title="أعلى 5 موردين (المستحقات)"
          icon={<ShoppingCart className="h-5 w-5" />}
          data={supplierCreditData}
          reportButtonText="عرض تقرير الموردين المفصل"
        />

        <PieChartCard
          title="مراكز التكلفة"
          icon={<Calculator className="h-5 w-5" />}
          data={costCenterData}
          reportButtonText="تقرير مراكز التكلفة المفصل"
        />
      </div>

      {/* بيانات المبيعات اليومية وقسم الإشعارات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DailySalesChart data={dailySalesData} />
        <AlertsTabs alerts={systemAlerts} />
      </div>
    </>
  );
};

export default ChartsGrid;
