
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Transaction } from "@/types/transactions";

interface VendorStatementSummaryProps {
  balance: number;
  transactions: Array<{
    id: string;
    date: Date;
    description: string;
    type: string;
    amount: number;
    balance: number;
  }>;
}

export const VendorStatementSummary: React.FC<VendorStatementSummaryProps> = ({
  balance,
  transactions
}) => {
  const totalPurchases = transactions
    .filter(t => t.type === 'purchase')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalPayments = Math.abs(
    transactions
      .filter(t => t.type === 'payment')
      .reduce((sum, t) => sum + t.amount, 0)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rtl">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-blue-600">الرصيد الحالي</p>
          <p className="text-3xl font-bold mt-2">{balance.toLocaleString()} ريال</p>
          <p className="text-xs text-blue-500 mt-1">آخر تحديث: اليوم</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-amber-600">إجمالي المشتريات</p>
          <p className="text-3xl font-bold mt-2">{totalPurchases.toLocaleString()} ريال</p>
          <p className="text-xs text-amber-500 mt-1">في الفترة المحددة</p>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4">
          <p className="text-sm font-medium text-green-600">إجمالي المدفوعات</p>
          <p className="text-3xl font-bold mt-2">{totalPayments.toLocaleString()} ريال</p>
          <p className="text-xs text-green-500 mt-1">في الفترة المحددة</p>
        </CardContent>
      </Card>
    </div>
  );
};
