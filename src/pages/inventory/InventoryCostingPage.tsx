
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, BarChart2, Archive, Layers, Settings } from "lucide-react";

const InventoryCostingPage = () => {
  const [costMethod, setCostMethod] = useState("average");

  return (
    <PageContainer title="تكاليف المخزون">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">نظام تكاليف المخزون</h1>
            <p className="text-muted-foreground">إدارة وتقييم تكاليف المخزون بأساليب متعددة</p>
          </div>
          <Button>
            <Download className="ml-2 h-4 w-4" /> تصدير التقارير
          </Button>
        </div>

        <div className="mb-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>طريقة تقييم المخزون</CardTitle>
                <Select value={costMethod} onValueChange={setCostMethod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="اختر طريقة التكلفة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fifo">الوارد أولاً صادر أولاً (FIFO)</SelectItem>
                    <SelectItem value="lifo">الوارد أخيراً صادر أولاً (LIFO)</SelectItem>
                    <SelectItem value="average">متوسط التكلفة المرجح</SelectItem>
                    <SelectItem value="specific">تكلفة محددة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <CardDescription>اختر طريقة حساب تكلفة المخزون</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/20 p-4 rounded-md mb-4">
                <h3 className="font-medium mb-2">وصف طريقة التقييم:</h3>
                <p className="text-sm">
                  {costMethod === "fifo" && "طريقة الوارد أولاً صادر أولاً (FIFO) تفترض أن البنود المشتراة أو المنتجة أولاً يتم بيعها أولاً، وبالتالي فإن البنود المتبقية في المخزون هي آخر ما تم شراؤه أو إنتاجه."}
                  {costMethod === "lifo" && "طريقة الوارد أخيراً صادر أولاً (LIFO) تفترض أن البنود المشتراة أو المنتجة أخيراً يتم بيعها أولاً، وبالتالي فإن البنود المتبقية في المخزون هي أول ما تم شراؤه أو إنتاجه."}
                  {costMethod === "average" && "طريقة متوسط التكلفة المرجح تحدد تكلفة المخزون على أساس المتوسط المرجح لتكلفة جميع البنود المتاحة للبيع خلال الفترة."}
                  {costMethod === "specific" && "طريقة التكلفة المحددة تتطلب تحديد وتتبع التكلفة الفعلية لكل بند من بنود المخزون."}
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <Button variant="outline" className="flex items-center justify-center">
                  <Settings className="ml-2 h-4 w-4" /> إعداد التكلفة الافتراضية
                </Button>
                <Button variant="outline" className="flex items-center justify-center">
                  <Layers className="ml-2 h-4 w-4" /> عرض تاريخ تغيير الطرق
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cost-analysis">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cost-analysis" className="flex items-center">
              <BarChart2 className="ml-2 h-4 w-4" /> تحليل التكاليف
            </TabsTrigger>
            <TabsTrigger value="inventory-valuation" className="flex items-center">
              <Archive className="ml-2 h-4 w-4" /> تقييم المخزون
            </TabsTrigger>
            <TabsTrigger value="cost-categories" className="flex items-center">
              <Layers className="ml-2 h-4 w-4" /> فئات التكاليف
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cost-analysis">
            <Card>
              <CardHeader>
                <CardTitle>تحليل تكاليف المخزون</CardTitle>
                <CardDescription>
                  تحليل مفصل لتكاليف المخزون حسب المنتجات والفئات
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted/20 flex items-center justify-center rounded-md mb-4">
                  <p className="text-muted-foreground">سيتم عرض رسم بياني لتحليل التكاليف هنا</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-right">المنتج</th>
                        <th className="p-2 text-right">الكمية</th>
                        <th className="p-2 text-right">متوسط التكلفة</th>
                        <th className="p-2 text-right">إجمالي التكلفة</th>
                        <th className="p-2 text-right">تاريخ آخر تحديث</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">منتج A</td>
                        <td className="p-2">250</td>
                        <td className="p-2">120 ر.س</td>
                        <td className="p-2">30,000 ر.س</td>
                        <td className="p-2">2023/10/15</td>
                      </tr>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">منتج B</td>
                        <td className="p-2">180</td>
                        <td className="p-2">200 ر.س</td>
                        <td className="p-2">36,000 ر.س</td>
                        <td className="p-2">2023/10/18</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory-valuation">
            <Card>
              <CardHeader>
                <CardTitle>تقييم المخزون</CardTitle>
                <CardDescription>
                  تقييم المخزون باستخدام الطرق المختلفة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        تقييم FIFO
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">450,000 ر.س</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        تقييم LIFO
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">442,000 ر.س</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        متوسط التكلفة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">447,500 ر.س</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        الفروقات
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">8,000 ر.س</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="h-[250px] bg-muted/20 flex items-center justify-center rounded-md">
                  <p className="text-muted-foreground">سيتم عرض مقارنة لطرق التقييم هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cost-categories">
            <Card>
              <CardHeader>
                <CardTitle>فئات التكاليف</CardTitle>
                <CardDescription>
                  إدارة فئات التكاليف المختلفة للمخزون
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-right">الفئة</th>
                        <th className="p-2 text-right">الوصف</th>
                        <th className="p-2 text-right">مضمنة في التكلفة</th>
                        <th className="p-2 text-right">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">تكلفة الشراء</td>
                        <td className="p-2">تكلفة شراء البضائع من الموردين</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">نعم</span>
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm">تعديل</Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">تكاليف النقل</td>
                        <td className="p-2">تكاليف نقل البضائع من المورد</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">نعم</span>
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm">تعديل</Button>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/25">
                        <td className="p-2">تكاليف التخزين</td>
                        <td className="p-2">تكاليف تخزين البضائع في المستودع</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">لا</span>
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm">تعديل</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default InventoryCostingPage;
