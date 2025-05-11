
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, CreditCard, AlertTriangle } from "lucide-react";

interface VendorStatementStatsProps {
  totalVendors: number;
  totalBalance: number;
  overDueVendors: number;
}

export const VendorStatementStats: React.FC<VendorStatementStatsProps> = ({
  totalVendors,
  totalBalance,
  overDueVendors
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-blue-200 h-12 w-12 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-700" />
          </div>
          <div className="mr-4 rtl:ml-4 rtl:mr-0">
            <p className="text-sm font-medium text-blue-600">إجمالي الموردين</p>
            <p className="text-2xl font-bold mt-1">{totalVendors}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-amber-200 h-12 w-12 rounded-lg flex items-center justify-center">
            <CreditCard className="h-6 w-6 text-amber-700" />
          </div>
          <div className="mr-4 rtl:ml-4 rtl:mr-0">
            <p className="text-sm font-medium text-amber-600">إجمالي المستحقات</p>
            <p className="text-2xl font-bold mt-1">{totalBalance.toLocaleString()} ريال</p>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
        <CardContent className="p-4 flex items-center">
          <div className="bg-red-200 h-12 w-12 rounded-lg flex items-center justify-center">
            <AlertTriangle className="h-6 w-6 text-red-700" />
          </div>
          <div className="mr-4 rtl:ml-4 rtl:mr-0">
            <p className="text-sm font-medium text-red-600">حسابات متأخرة</p>
            <p className="text-2xl font-bold mt-1">{overDueVendors}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
