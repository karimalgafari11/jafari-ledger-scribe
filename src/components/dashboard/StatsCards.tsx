
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import KpiCard from "./KpiCard";
import { AlertTriangle, BarChart3, DollarSign, ShoppingCart } from "lucide-react";

interface StatsCardsProps {
  totalSales: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: string;
  overdueInvoices: number;
  overdueTotalAmount: number;
}

const StatsCards: React.FC<StatsCardsProps> = ({
  totalSales,
  totalExpenses,
  netProfit,
  profitMargin,
  overdueInvoices,
  overdueTotalAmount,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <KpiCard
        title="الإيرادات"
        value={`${totalSales.toLocaleString()} ريال`}
        status="up"
        description="إجمالي إيرادات الفترة"
        icon={<DollarSign className="h-6 w-6 text-primary" />}
      />
      
      <KpiCard
        title="المصروفات"
        value={`${totalExpenses.toLocaleString()} ريال`}
        status="down"
        description="إجمالي تكاليف الفترة"
        icon={<ShoppingCart className="h-6 w-6 text-amber-600" />}
        iconBackground="bg-amber-50"
      />
      
      <KpiCard
        title="الربح الصافي"
        value={`${netProfit.toLocaleString()} ريال`}
        status="neutral"
        description="صافي الربح بعد المصروفات"
        icon={<BarChart3 className="h-6 w-6 text-green-600" />}
        iconBackground="bg-green-50"
      />
      
      <KpiCard
        title="فواتير متأخرة"
        value={`${overdueInvoices} فاتورة`}
        status="neutral"
        description="الفواتير المتأخرة عن السداد"
        icon={<AlertTriangle className="h-6 w-6 text-red-600" />}
        iconBackground="bg-red-50"
      />
    </div>
  );
};

export default StatsCards;
