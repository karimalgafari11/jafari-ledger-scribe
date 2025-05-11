
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PurchasesOrdersPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer title="أوامر الشراء">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة أوامر الشراء</h1>
          <Button onClick={() => navigate("/purchases/orders/new")}>
            <FilePlus className="ml-2 h-4 w-4" /> أمر شراء جديد
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>قائمة أوامر الشراء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-xl text-gray-600">سيتم تحميل أوامر الشراء هنا</p>
              <Button variant="outline" className="mt-4">
                <FileText className="ml-2 h-4 w-4" /> استعراض الأرشيف
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default PurchasesOrdersPage;
