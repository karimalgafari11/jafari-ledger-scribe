
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Download, PieChart, BarChart, LineChart, Calendar } from "lucide-react";

const FinancialForecastPage = () => {
  const [forecastPeriod, setForecastPeriod] = useState("quarter");

  return (
    <PageContainer title="التوقعات المالية">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">التوقعات المالية المستقبلية</h1>
            <p className="text-muted-foreground">تحليل وتوقع الأداء المالي باستخدام الذكاء الاصطناعي</p>
          </div>
          <Button>
            <Download className="ml-2 h-4 w-4" /> تصدير التقرير
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                الإيرادات المتوقعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <p className="text-2xl font-bold">1,245,600 ر.س</p>
                <p className="text-green-500 text-sm flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +12.5%
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                المصروفات المتوقعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <p className="text-2xl font-bold">845,200 ر.س</p>
                <p className="text-red-500 text-sm flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +5.2%
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                صافي الربح المتوقع
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <p className="text-2xl font-bold">400,400 ر.س</p>
                <p className="text-green-500 text-sm flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +15.8%
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                السيولة النقدية المتوقعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <p className="text-2xl font-bold">620,500 ر.س</p>
                <p className="text-green-500 text-sm flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" /> +8.3%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>التوقعات المالية</CardTitle>
                <div className="flex items-center gap-2">
                  <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="اختر الفترة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">شهر</SelectItem>
                      <SelectItem value="quarter">ربع سنوي</SelectItem>
                      <SelectItem value="year">سنة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-muted/20 flex items-center justify-center rounded-md">
                <p className="text-muted-foreground">سيتم عرض رسم بياني للتوقعات المالية هنا</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6">
          <Tabs defaultValue="revenue">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="revenue" className="flex items-center">
                <LineChart className="ml-2 h-4 w-4" /> الإيرادات
              </TabsTrigger>
              <TabsTrigger value="expenses" className="flex items-center">
                <BarChart className="ml-2 h-4 w-4" /> المصروفات
              </TabsTrigger>
              <TabsTrigger value="profits" className="flex items-center">
                <PieChart className="ml-2 h-4 w-4" /> الأرباح
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="revenue">
              <Card>
                <CardHeader>
                  <CardTitle>توقعات الإيرادات</CardTitle>
                  <CardDescription>
                    تحليل وتوقع الإيرادات للفترة القادمة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] bg-muted/20 flex items-center justify-center rounded-md">
                    <p className="text-muted-foreground">سيتم عرض رسم بياني لتوقعات الإيرادات هنا</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="expenses">
              <Card>
                <CardHeader>
                  <CardTitle>توقعات المصروفات</CardTitle>
                  <CardDescription>
                    تحليل وتوقع المصروفات للفترة القادمة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] bg-muted/20 flex items-center justify-center rounded-md">
                    <p className="text-muted-foreground">سيتم عرض رسم بياني لتوقعات المصروفات هنا</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profits">
              <Card>
                <CardHeader>
                  <CardTitle>توقعات الأرباح</CardTitle>
                  <CardDescription>
                    تحليل وتوقع الأرباح للفترة القادمة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] bg-muted/20 flex items-center justify-center rounded-md">
                    <p className="text-muted-foreground">سيتم عرض رسم بياني لتوقعات الأرباح هنا</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>توصيات مالية ذكية</CardTitle>
              <CardDescription>
                توصيات مبنية على التحليل المالي باستخدام الذكاء الاصطناعي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="bg-muted/20 p-4 rounded-md">
                  <p className="font-medium">توصية بزيادة الاستثمار في قطاع المبيعات</p>
                  <p className="text-sm text-muted-foreground">
                    بناءً على تحليل الأداء المالي، يوصى بزيادة الاستثمار في قطاع المبيعات بنسبة 15% لتحقيق نمو أعلى في الإيرادات.
                  </p>
                </li>
                <li className="bg-muted/20 p-4 rounded-md">
                  <p className="font-medium">توصية بخفض تكاليف التشغيل في الإدارة</p>
                  <p className="text-sm text-muted-foreground">
                    التحليل المالي يشير إلى إمكانية خفض التكاليف الإدارية بنسبة 8% دون التأثير على الأداء التشغيلي.
                  </p>
                </li>
                <li className="bg-muted/20 p-4 rounded-md">
                  <p className="font-medium">فرصة استثمارية مقترحة</p>
                  <p className="text-sm text-muted-foreground">
                    هناك فرصة استثمارية واعدة في مجال التكنولوجيا المالية مع عائد متوقع بنسبة 12% خلال العام القادم.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default FinancialForecastPage;
