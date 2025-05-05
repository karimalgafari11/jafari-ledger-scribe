
import React from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";

interface ReceivablesStatsProps {
  totalCount: number;
  totalReceivables: number;
  averageReceivable: number;
  overDueCount: number;
}

export const ReceivablesStats: React.FC<ReceivablesStatsProps> = ({
  totalCount,
  totalReceivables,
  averageReceivable,
  overDueCount
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 rtl">
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <div className="text-sm font-medium text-blue-600">إجمالي العملاء المدينين</div>
        <div className="text-3xl font-bold mt-2">{totalCount}</div>
        <div className="text-xs text-blue-500 mt-1">عميل</div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <div className="text-sm font-medium text-amber-600">إجمالي الذمم المدينة</div>
        <div className="text-3xl font-bold mt-2">{formatCurrency(totalReceivables)}</div>
        <div className="text-xs text-amber-500 mt-1">ريال سعودي</div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <div className="text-sm font-medium text-purple-600">متوسط الذمم المدينة</div>
        <div className="text-3xl font-bold mt-2">{formatCurrency(averageReceivable)}</div>
        <div className="text-xs text-purple-500 mt-1">ريال سعودي / عميل</div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <div className="text-sm font-medium text-red-600">ذمم متأخرة السداد</div>
        <div className="text-3xl font-bold mt-2">{overDueCount}</div>
        <div className="text-xs text-red-500 mt-1">عميل</div>
      </Card>
    </div>
  );
};
