
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus, FileText, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const QuotesPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer title="عروض الأسعار">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة عروض الأسعار</h1>
          <Button onClick={() => navigate("/invoices/quotes/new")}>
            <FilePlus className="ml-2 h-4 w-4" /> عرض سعر جديد
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <Button variant="outline">
            <FileText className="ml-2 h-4 w-4" /> كل العروض
          </Button>
          <Button variant="outline">
            <FileCheck className="ml-2 h-4 w-4" /> العروض المقبولة
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>قائمة عروض الأسعار</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-xl text-gray-600">سيتم تحميل عروض الأسعار هنا</p>
              <Button variant="outline" className="mt-4" onClick={() => navigate("/invoices/quotes-module")}>
                <FileText className="ml-2 h-4 w-4" /> الذهاب إلى وحدة عروض الأسعار
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default QuotesPage;
