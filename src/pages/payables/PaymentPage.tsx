
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PaymentPage = () => {
  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-6">سداد المستحقات</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>سداد المستحقات للموردين</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">إدارة عمليات سداد المستحقات للموردين</p>
          
          {/* محتوى الصفحة سيتم تطويره لاحقاً */}
          <div className="bg-gray-100 p-6 rounded-md text-center">
            <p className="text-xl text-gray-600">سيتم تطوير هذه الصفحة قريباً</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;
