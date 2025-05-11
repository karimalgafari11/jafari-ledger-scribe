
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const CustomerReportsPage = () => {
  return (
    <PageContainer title="تقارير العملاء">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">تقارير العملاء</h1>
          <Button>
            <FileText className="ml-2 h-4 w-4" /> تصدير التقارير
          </Button>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>تقارير العملاء</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 mb-4">تقارير تحليلية عن المبيعات والعملاء</p>
            
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-xl text-gray-600">سيتم تطوير هذه الصفحة قريباً</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default CustomerReportsPage;
