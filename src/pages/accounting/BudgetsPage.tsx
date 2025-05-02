
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BudgetsPage = () => {
  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-6">الموازنات التقديرية</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>إدارة الموازنات التقديرية</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">إعداد وتحليل ومتابعة الموازنات التقديرية</p>
          
          {/* محتوى الصفحة سيتم تطويره لاحقاً */}
          <div className="bg-gray-100 p-6 rounded-md text-center">
            <p className="text-xl text-gray-600">سيتم تطوير هذه الصفحة قريباً</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetsPage;
