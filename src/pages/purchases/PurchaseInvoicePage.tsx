
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, FilePlus, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PurchaseInvoicePage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer title="فواتير الشراء">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة فواتير الشراء</h1>
          <Button onClick={() => navigate("/purchases/invoice/new")}>
            <FilePlus className="ml-2 h-4 w-4" /> فاتورة شراء جديدة
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-6">
          <Button variant="outline">
            <FileText className="ml-2 h-4 w-4" /> عرض الكل
          </Button>
          <Button variant="outline">
            <Download className="ml-2 h-4 w-4" /> تصدير
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>قائمة فواتير الشراء</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-xl text-gray-600">سيتم تحميل فواتير الشراء هنا</p>
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

export default PurchaseInvoicePage;
