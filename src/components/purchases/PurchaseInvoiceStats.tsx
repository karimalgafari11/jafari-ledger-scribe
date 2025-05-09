
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface PurchaseInvoiceStatsProps {
  statistics: {
    total: number;
    paid: number;
    pending: number;
    overdue: number;
    totalAmount: number;
  };
}

export const PurchaseInvoiceStats: React.FC<PurchaseInvoiceStatsProps> = ({ statistics }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR'
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      <Card className="bg-blue-50">
        <CardContent className="p-4 flex flex-col">
          <span className="text-xs font-medium text-blue-700">إجمالي الفواتير</span>
          <span className="text-2xl font-bold mt-1">{statistics.total}</span>
        </CardContent>
      </Card>
      
      <Card className="bg-green-50">
        <CardContent className="p-4 flex flex-col">
          <span className="text-xs font-medium text-green-700">الفواتير المدفوعة</span>
          <span className="text-2xl font-bold mt-1">{statistics.paid}</span>
        </CardContent>
      </Card>
      
      <Card className="bg-amber-50">
        <CardContent className="p-4 flex flex-col">
          <span className="text-xs font-medium text-amber-700">الفواتير المعلقة</span>
          <span className="text-2xl font-bold mt-1">{statistics.pending}</span>
        </CardContent>
      </Card>
      
      <Card className="bg-red-50">
        <CardContent className="p-4 flex flex-col">
          <span className="text-xs font-medium text-red-700">الفواتير المتأخرة</span>
          <span className="text-2xl font-bold mt-1">{statistics.overdue}</span>
        </CardContent>
      </Card>
      
      <Card className="bg-purple-50">
        <CardContent className="p-4 flex flex-col">
          <span className="text-xs font-medium text-purple-700">إجمالي المشتريات</span>
          <span className="text-2xl font-bold mt-1">{formatCurrency(statistics.totalAmount)}</span>
        </CardContent>
      </Card>
    </div>
  );
};
