
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

const LedgerPage = () => {
  return (
    <PageContainer title="دفتر الأستاذ">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">دفتر الأستاذ</h1>
          <Button>
            <FileText className="ml-2 h-4 w-4" /> تصدير البيانات
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>الحسابات والأرصدة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-xl text-gray-600">سيتم تحميل بيانات دفتر الأستاذ هنا</p>
              <Button variant="outline" className="mt-4">
                <FileText className="ml-2 h-4 w-4" /> تصفية البيانات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default LedgerPage;
