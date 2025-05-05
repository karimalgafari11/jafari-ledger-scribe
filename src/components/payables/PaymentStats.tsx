
import React from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";

interface PaymentStatsProps {
  stats: {
    totalPaid: number;
    pendingPayments: number;
    thisMonthPayments: number;
    overdueAmount: number;
  };
}

export const PaymentStats: React.FC<PaymentStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 rtl">
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <div className="text-sm font-medium text-blue-600">إجمالي المدفوعات</div>
        <div className="text-3xl font-bold mt-2">{formatCurrency(stats.totalPaid)}</div>
        <div className="text-xs text-blue-500 mt-1">ريال سعودي</div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <div className="text-sm font-medium text-green-600">مدفوعات الشهر الحالي</div>
        <div className="text-3xl font-bold mt-2">{formatCurrency(stats.thisMonthPayments)}</div>
        <div className="text-xs text-green-500 mt-1">ريال سعودي</div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <div className="text-sm font-medium text-amber-600">مدفوعات قيد المعالجة</div>
        <div className="text-3xl font-bold mt-2">{formatCurrency(stats.pendingPayments)}</div>
        <div className="text-xs text-amber-500 mt-1">ريال سعودي</div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <div className="text-sm font-medium text-red-600">مستحقات متأخرة</div>
        <div className="text-3xl font-bold mt-2">{formatCurrency(stats.overdueAmount)}</div>
        <div className="text-xs text-red-500 mt-1">ريال سعودي</div>
      </Card>
    </div>
  );
};
