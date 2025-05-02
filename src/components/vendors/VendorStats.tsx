
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Tag, FileText, Phone } from "lucide-react";

interface VendorStatsProps {
  totalVendors: number;
  activeVendors: number;
  inactiveVendors: number;
}

export const VendorStats: React.FC<VendorStatsProps> = ({
  totalVendors,
  activeVendors,
  inactiveVendors
}) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>الاحصائيات</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-700">إجمالي الموردين</h3>
              <Building className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-700">{totalVendors}</p>
            <p className="text-xs text-blue-600 mt-1">
              نشط: {activeVendors} | 
              غير نشط: {inactiveVendors}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-green-700">إجمالي المشتريات</h3>
              <Tag className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-700">152,750.00 ريال</p>
            <p className="text-xs text-green-600 mt-1">من 65 فاتورة شراء</p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-amber-700">مستحقات للموردين</h3>
              <FileText className="h-5 w-5 text-amber-600" />
            </div>
            <p className="text-2xl font-bold text-amber-700">52,000.75 ريال</p>
            <p className="text-xs text-amber-600 mt-1">من 18 فاتورة غير مسددة</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-purple-700">متوسط مدة السداد</h3>
              <Phone className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-purple-700">28 يوم</p>
            <p className="text-xs text-purple-600 mt-1">متوسط الوقت لسداد الفواتير</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
