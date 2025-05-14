
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, BarChart } from "lucide-react";

const ExpenseReportsPage = () => {
  return (
    <PageContainer title="تقارير المصروفات">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">تقارير المصروفات</h1>
          <Button>
            <Download className="ml-2 h-4 w-4" /> تصدير التقارير
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">تقارير شهرية</CardTitle>
              <FileText className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">تقارير المصروفات الشهرية</p>
              <Button variant="link" className="p-0 mt-2 h-auto">عرض التقارير</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">تقارير الفئات</CardTitle>
              <BarChart className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">تقارير المصروفات حسب الفئات</p>
              <Button variant="link" className="p-0 mt-2 h-auto">عرض التقارير</Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>التقارير المتاحة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-xl text-gray-600">سيتم تطوير هذه الصفحة قريباً</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default ExpenseReportsPage;
