
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const PaymentMethodsModule = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة طرق الدفع</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12 bg-gray-100 rounded-md">
          <h3 className="text-xl font-medium mb-2">إدارة طرق الدفع</h3>
          <p className="text-gray-500">هذه الوحدة قيد التطوير</p>
        </div>
      </CardContent>
    </Card>
  );
};
