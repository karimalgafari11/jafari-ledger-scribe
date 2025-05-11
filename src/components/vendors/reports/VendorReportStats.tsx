
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CreditCard, ShoppingBag } from "lucide-react";
import { formatCurrency, formatNumber } from "@/utils/formatters";

interface VendorReportStatsProps {
  totalPurchases: number;
  avgPurchaseValue: number;
  activeVendorsCount: number;
}

export const VendorReportStats: React.FC<VendorReportStatsProps> = ({
  totalPurchases,
  avgPurchaseValue,
  activeVendorsCount
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-blue-200 h-12 w-12 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-700" />
          </div>
          <div className="mr-4 rtl:ml-4 rtl:mr-0">
            <p className="text-sm font-medium text-blue-600">موردين نشطين</p>
            <p className="text-2xl font-bold mt-1">{formatNumber(activeVendorsCount)}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-amber-200 h-12 w-12 rounded-lg flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-amber-700" />
          </div>
          <div className="mr-4 rtl:ml-4 rtl:mr-0">
            <p className="text-sm font-medium text-amber-600">إجمالي المشتريات</p>
            <p className="text-2xl font-bold mt-1">{formatCurrency(totalPurchases)} ريال</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-green-200 h-12 w-12 rounded-lg flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-green-700" />
          </div>
          <div className="mr-4 rtl:ml-4 rtl:mr-0">
            <p className="text-sm font-medium text-green-600">متوسط قيمة الشراء</p>
            <p className="text-2xl font-bold mt-1">{formatCurrency(avgPurchaseValue)} ريال</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
