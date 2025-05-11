
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Percent, Tag, Clock } from "lucide-react";

const DiscountsPage = () => {
  return (
    <PageContainer title="الخصومات">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إدارة الخصومات</h1>
          <Button>
            <Plus className="ml-2 h-4 w-4" /> خصم جديد
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">خصومات نسبية</CardTitle>
              <Percent className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">الخصومات بنسب مئوية</p>
              <Button variant="link" className="p-0 mt-2 h-auto">عرض الخصومات</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">خصومات قيمية</CardTitle>
              <Tag className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">الخصومات بقيم ثابتة</p>
              <Button variant="link" className="p-0 mt-2 h-auto">عرض الخصومات</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">خصومات موسمية</CardTitle>
              <Clock className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">الخصومات المحددة بزمن</p>
              <Button variant="link" className="p-0 mt-2 h-auto">عرض الخصومات</Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>الخصومات النشطة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-xl text-gray-600">سيتم تحميل قائمة الخصومات النشطة هنا</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default DiscountsPage;
