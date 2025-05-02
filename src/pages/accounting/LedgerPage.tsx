
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LedgerPage = () => {
  return (
    <div className="container p-6 mx-auto">
      <h1 className="text-2xl font-bold mb-6">دفتر الأستاذ العام</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>دفتر الأستاذ العام</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 mb-4">عرض وإدارة حسابات دفتر الأستاذ العام</p>
          
          {/* محتوى الصفحة سيتم تطويره لاحقاً */}
          <div className="bg-gray-100 p-6 rounded-md text-center">
            <p className="text-xl text-gray-600">سيتم تطوير هذه الصفحة قريباً</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LedgerPage;
