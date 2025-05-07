
import React from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatters";
import { ArrowDownRight, ArrowUpRight, CreditCard, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentStatsProps {
  stats: {
    totalPaid: number;
    pendingPayments: number;
    thisMonthPayments: number;
    overdueAmount: number;
    previousMonthChange?: number;
  };
}

export const PaymentStats: React.FC<PaymentStatsProps> = ({ stats }) => {
  // حساب نسبة التغيير عن الشهر السابق
  const percentChange = stats.previousMonthChange 
    ? (((stats.thisMonthPayments - stats.previousMonthChange) / stats.previousMonthChange) * 100).toFixed(1)
    : null;
    
  const isPositiveChange = stats.previousMonthChange && stats.thisMonthPayments > stats.previousMonthChange;
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 rtl">
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 overflow-hidden relative">
        <div className="absolute left-0 bottom-0 opacity-10">
          <CreditCard size={80} className="text-blue-400" />
        </div>
        <div className="text-sm font-medium text-blue-600">إجمالي المدفوعات</div>
        <div className="text-3xl font-bold mt-2">{formatCurrency(stats.totalPaid)}</div>
        <div className="text-xs text-blue-500 mt-1">ريال سعودي</div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200 overflow-hidden relative">
        <div className="absolute left-0 bottom-0 opacity-10">
          <Calendar size={80} className="text-green-400" />
        </div>
        <div className="text-sm font-medium text-green-600">مدفوعات الشهر الحالي</div>
        <div className="text-3xl font-bold mt-2">
          {formatCurrency(stats.thisMonthPayments)}
        </div>
        <div className="flex items-center text-xs mt-1">
          <span className={cn(
            "flex items-center",
            isPositiveChange ? "text-green-600" : "text-red-600"
          )}>
            {stats.previousMonthChange && (
              <>
                {isPositiveChange ? (
                  <ArrowUpRight size={14} className="mr-1" />
                ) : (
                  <ArrowDownRight size={14} className="mr-1" />
                )}
                {percentChange}% 
              </>
            )}
          </span>
          <span className="text-green-500 mr-1">
            {stats.previousMonthChange ? "عن الشهر السابق" : "ريال سعودي"}
          </span>
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 overflow-hidden relative">
        <div className="absolute left-0 bottom-0 opacity-10">
          <CreditCard size={80} className="text-amber-400" />
        </div>
        <div className="text-sm font-medium text-amber-600">مدفوعات قيد المعالجة</div>
        <div className="text-3xl font-bold mt-2">{formatCurrency(stats.pendingPayments)}</div>
        <div className="text-xs text-amber-500 mt-1">ريال سعودي</div>
        <div className="bg-amber-200 text-amber-800 text-xs rounded px-2 py-1 absolute top-4 left-4 rtl:left-auto rtl:right-4">
          {Math.round((stats.pendingPayments / (stats.totalPaid + stats.pendingPayments)) * 100)}%
        </div>
      </Card>

      <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200 overflow-hidden relative">
        <div className="absolute left-0 bottom-0 opacity-10">
          <Calendar size={80} className="text-red-400" />
        </div>
        <div className="text-sm font-medium text-red-600">مستحقات متأخرة</div>
        <div className="text-3xl font-bold mt-2">{formatCurrency(stats.overdueAmount)}</div>
        <div className="text-xs text-red-500 mt-1">ريال سعودي</div>
        {stats.totalPaid > 0 && (
          <div className="bg-red-200 text-red-800 text-xs rounded px-2 py-1 absolute top-4 left-4 rtl:left-auto rtl:right-4">
            {Math.round((stats.overdueAmount / stats.totalPaid) * 100)}%
          </div>
        )}
      </Card>
    </div>
  );
};
