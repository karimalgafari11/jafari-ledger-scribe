
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AiSystemPerformance: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">أداء النظام</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>استخدام وحدة المعالجة المركزية</span>
              <span className="font-medium">24%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: '24%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>استخدام الذاكرة</span>
              <span className="font-medium">42%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: '42%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>وقت استجابة API</span>
              <span className="font-medium">230ms</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '18%' }}></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>دقة التوقعات</span>
              <span className="font-medium">91%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div className="h-2 bg-purple-500 rounded-full" style={{ width: '91%' }}></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
