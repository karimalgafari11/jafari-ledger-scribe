
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, AlertCircle, CreditCard } from "lucide-react";

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
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="rounded-full p-2 bg-blue-100 mr-4">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">إجمالي الموردين</p>
            <h4 className="text-2xl font-bold">{totalVendors}</h4>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="rounded-full p-2 bg-green-100 mr-4">
            <CreditCard className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">إجمالي المستحقات</p>
            <h4 className="text-2xl font-bold">{totalBalance.toLocaleString('ar-SA')} ريال</h4>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex items-center">
          <div className="rounded-full p-2 bg-red-100 mr-4">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">حسابات متأخرة</p>
            <h4 className="text-2xl font-bold">{overDueVendors}</h4>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
