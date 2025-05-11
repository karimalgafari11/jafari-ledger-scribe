
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, BarChart3, PieChart, Users, Download as DownloadIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CustomerReportsPage = () => {
  const [reportPeriod, setReportPeriod] = useState("month");
  
  return (
    <PageContainer title="تقارير العملاء">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">تقارير العملاء</h1>
            <p className="text-muted-foreground">تحليلات وتقارير حول العملاء والمبيعات</p>
          </div>
          <Button>
            <FileText className="ml-2 h-4 w-4" /> تصدير التقارير
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <h2 className="text-xl font-semibold">لوحة الإحصائيات</h2>
            <Select value={reportPeriod} onValueChange={setReportPeriod}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="اختر الفترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">آخر أسبوع</SelectItem>
                <SelectItem value="month">آخر شهر</SelectItem>
                <SelectItem value="quarter">آخر 3 أشهر</SelectItem>
                <SelectItem value="year">آخر سنة</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                إجمالي العملاء
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline">
                <p className="text-2xl font-bold">124</p>
                <p className="text-green-500 text-xs">+8 هذا الشهر</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                إجمالي المبيعات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline">
                <p className="text-2xl font-bold">450,750 ر.س</p>
                <p className="text-green-500 text-xs">+12% عن الشهر الماضي</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                متوسط قيمة الطلب
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline">
                <p className="text-2xl font-bold">1,250 ر.س</p>
                <p className="text-green-500 text-xs">+5% عن الشهر الماضي</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                معدل الاحتفاظ بالعملاء
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-baseline">
                <p className="text-2xl font-bold">85%</p>
                <p className="text-red-500 text-xs">-2% عن الشهر الماضي</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sales">
          <TabsList className="mb-4">
            <TabsTrigger value="sales" className="flex items-center">
              <BarChart3 className="ml-2 h-4 w-4" /> تقارير المبيعات
            </TabsTrigger>
            <TabsTrigger value="demographics" className="flex items-center">
              <Users className="ml-2 h-4 w-4" /> بيانات العملاء
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center">
              <PieChart className="ml-2 h-4 w-4" /> تصنيفات العملاء
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sales">
            <Card>
              <CardHeader>
                <CardTitle>تحليل مبيعات العملاء</CardTitle>
                <CardDescription>تقرير المبيعات حسب العملاء خلال الفترة المحددة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] bg-muted/20 flex items-center justify-center rounded-md mb-6">
                  <p className="text-muted-foreground">سيتم عرض رسم بياني لتحليل المبيعات هنا</p>
                </div>

                <Card className="bg-muted/5">
                  <CardHeader>
                    <CardTitle className="text-lg">أفضل 5 عملاء من حيث المبيعات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b bg-muted/30">
                            <th className="p-2 text-right">العميل</th>
                            <th className="p-2 text-right">إجمالي المبيعات</th>
                            <th className="p-2 text-right">عدد الطلبات</th>
                            <th className="p-2 text-right">متوسط قيمة الطلب</th>
                            <th className="p-2 text-right">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-muted/25">
                            <td className="p-2">شركة الأفق للتجارة</td>
                            <td className="p-2">75,000 ر.س</td>
                            <td className="p-2">12</td>
                            <td className="p-2">6,250 ر.س</td>
                            <td className="p-2">
                              <Button variant="ghost" size="sm">
                                <DownloadIcon className="h-4 w-4 ml-1" /> تفاصيل
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-muted/25">
                            <td className="p-2">مؤسسة الرياض للمقاولات</td>
                            <td className="p-2">68,500 ر.س</td>
                            <td className="p-2">8</td>
                            <td className="p-2">8,562 ر.س</td>
                            <td className="p-2">
                              <Button variant="ghost" size="sm">
                                <DownloadIcon className="h-4 w-4 ml-1" /> تفاصيل
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b hover:bg-muted/25">
                            <td className="p-2">شركة النور للإلكترونيات</td>
                            <td className="p-2">54,200 ر.س</td>
                            <td className="p-2">15</td>
                            <td className="p-2">3,613 ر.س</td>
                            <td className="p-2">
                              <Button variant="ghost" size="sm">
                                <DownloadIcon className="h-4 w-4 ml-1" /> تفاصيل
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="demographics">
            <Card>
              <CardHeader>
                <CardTitle>بيانات وتحليلات العملاء</CardTitle>
                <CardDescription>تحليل ديموغرافي للعملاء ومناطقهم الجغرافية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">التوزيع الجغرافي للعملاء</h3>
                    <div className="h-[250px] bg-muted/20 flex items-center justify-center rounded-md">
                      <p className="text-muted-foreground">سيتم عرض خريطة توزيع العملاء هنا</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">تصنيف العملاء حسب النوع</h3>
                    <div className="h-[250px] bg-muted/20 flex items-center justify-center rounded-md">
                      <p className="text-muted-foreground">سيتم عرض رسم بياني دائري هنا</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">أعلى المناطق من حيث عدد العملاء</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b bg-muted/30">
                          <th className="p-2 text-right">المنطقة</th>
                          <th className="p-2 text-right">عدد العملاء</th>
                          <th className="p-2 text-right">النسبة المئوية</th>
                          <th className="p-2 text-right">إجمالي المبيعات</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/25">
                          <td className="p-2">الرياض</td>
                          <td className="p-2">45</td>
                          <td className="p-2">36%</td>
                          <td className="p-2">180,500 ر.س</td>
                        </tr>
                        <tr className="border-b hover:bg-muted/25">
                          <td className="p-2">جدة</td>
                          <td className="p-2">28</td>
                          <td className="p-2">22.5%</td>
                          <td className="p-2">120,750 ر.س</td>
                        </tr>
                        <tr className="border-b hover:bg-muted/25">
                          <td className="p-2">الدمام</td>
                          <td className="p-2">22</td>
                          <td className="p-2">17.7%</td>
                          <td className="p-2">95,200 ر.س</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>تصنيفات العملاء</CardTitle>
                <CardDescription>تقسيم العملاء حسب الفئات والسلوك الشرائي</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold mb-2">تقسيم العملاء حسب الحجم</h3>
                    <div className="h-[250px] bg-muted/20 flex items-center justify-center rounded-md">
                      <p className="text-muted-foreground">سيتم عرض رسم بياني دائري هنا</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">تقسيم العملاء حسب الولاء</h3>
                    <div className="h-[250px] bg-muted/20 flex items-center justify-center rounded-md">
                      <p className="text-muted-foreground">سيتم عرض رسم بياني شريطي هنا</p>
                    </div>
                  </div>
                </div>

                <Card className="bg-muted/5">
                  <CardHeader>
                    <CardTitle className="text-lg">تصنيفات العملاء</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b bg-muted/30">
                            <th className="p-2 text-right">الفئة</th>
                            <th className="p-2 text-right">عدد العملاء</th>
                            <th className="p-2 text-right">نسبة المبيعات</th>
                            <th className="p-2 text-right">متوسط قيمة الطلب</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b hover:bg-muted/25">
                            <td className="p-2">عملاء بلاتينيوم</td>
                            <td className="p-2">12</td>
                            <td className="p-2">35%</td>
                            <td className="p-2">12,500 ر.س</td>
                          </tr>
                          <tr className="border-b hover:bg-muted/25">
                            <td className="p-2">عملاء ذهبيون</td>
                            <td className="p-2">25</td>
                            <td className="p-2">30%</td>
                            <td className="p-2">5,800 ر.س</td>
                          </tr>
                          <tr className="border-b hover:bg-muted/25">
                            <td className="p-2">عملاء فضيون</td>
                            <td className="p-2">38</td>
                            <td className="p-2">20%</td>
                            <td className="p-2">2,500 ر.س</td>
                          </tr>
                          <tr className="border-b hover:bg-muted/25">
                            <td className="p-2">عملاء عاديون</td>
                            <td className="p-2">49</td>
                            <td className="p-2">15%</td>
                            <td className="p-2">1,200 ر.س</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default CustomerReportsPage;
