
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PurchaseInvoicePage = () => {
  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-6">فاتورة شراء جديدة</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>إنشاء فاتورة شراء جديدة</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">إنشاء وتحرير فاتورة شراء جديدة</p>
          
          {/* محتوى الصفحة سيتم تطويره لاحقاً */}
          <div className="bg-gray-100 p-6 rounded-md text-center">
            <p className="text-xl text-gray-600">سيتم تطوير هذه الصفحة قريباً</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PurchaseInvoicePage;
