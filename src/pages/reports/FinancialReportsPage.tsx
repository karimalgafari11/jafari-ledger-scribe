
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ReportDashboard } from "@/components/reports/ReportDashboard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReportExportOptions } from "@/components/reports/ReportExportOptions";
import { FileText, Download, Filter, Share2 } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { toast } from "sonner";

const FinancialReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("balance-sheet");
  const [period, setPeriod] = useState("this-month");
  const [showFilters, setShowFilters] = useState(false);

  // بيانات نموذجية للرسوم البيانية
  const balanceSheetData = {
    pieChartData: {
      labels: ['الأصول المتداولة', 'الأصول الثابتة', 'الخصوم المتداولة', 'الخصوم طويلة الأجل', 'حقوق الملكية'],
      datasets: [
        {
          label: 'الميزانية',
          data: [35000, 65000, 25000, 15000, 60000],
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ]
        }
      ]
    },
    barChartData: {
      labels: ['الأصول المتداولة', 'الأصول الثابتة', 'الخصوم المتداولة', 'الخصوم طويلة الأجل', 'حقوق الملكية'],
      datasets: [
        {
          label: 'الميزانية',
          data: [35000, 65000, 25000, 15000, 60000],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)'
        }
      ]
    },
    lineChartData: {
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
      datasets: [
        {
          label: 'الأصول',
          data: [95000, 96000, 100000, 105000, 110000, 120000],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.1)'
        },
        {
          label: 'الخصوم',
          data: [45000, 43000, 47000, 44000, 45000, 48000],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)'
        }
      ]
    }
  };

  const incomeStatementData = {
    pieChartData: {
      labels: ['الإيرادات', 'تكلفة المبيعات', 'المصروفات التشغيلية', 'المصروفات الأخرى', 'الضرائب'],
      datasets: [
        {
          label: 'قائمة الدخل',
          data: [120000, 70000, 30000, 5000, 3000],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(54, 162, 235, 0.6)'
          ]
        }
      ]
    },
    barChartData: {
      labels: ['الإيرادات', 'تكلفة المبيعات', 'المصروفات التشغيلية', 'المصروفات الأخرى', 'صافي الربح'],
      datasets: [
        {
          label: 'قائمة الدخل',
          data: [120000, 70000, 30000, 5000, 15000],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)'
        }
      ]
    },
    lineChartData: {
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
      datasets: [
        {
          label: 'الإيرادات',
          data: [18000, 20000, 22000, 21000, 25000, 28000],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.1)'
        },
        {
          label: 'المصروفات',
          data: [15000, 16000, 17000, 16500, 18000, 21000],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.1)'
        }
      ]
    }
  };

  const cashFlowData = {
    pieChartData: {
      labels: ['التدفقات من الأنشطة التشغيلية', 'التدفقات من الأنشطة الاستثمارية', 'التدفقات من الأنشطة التمويلية'],
      datasets: [
        {
          label: 'التدفقات النقدية',
          data: [25000, -15000, 5000],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)'
          ]
        }
      ]
    },
    barChartData: {
      labels: ['التدفقات التشغيلية', 'التدفقات الاستثمارية', 'التدفقات التمويلية', 'صافي التغير في النقد'],
      datasets: [
        {
          label: 'التدفقات النقدية',
          data: [25000, -15000, 5000, 15000],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)'
        }
      ]
    },
    lineChartData: {
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
      datasets: [
        {
          label: 'التدفقات النقدية',
          data: [5000, 3000, 4000, 6000, 8000, 7000],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.1)'
        }
      ]
    }
  };

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    toast.success('تم تغيير الفترة المالية');
  };

  const handleExportReport = () => {
    toast.info('جاري تصدير التقرير...');
    setTimeout(() => {
      toast.success('تم تصدير التقرير بنجاح');
    }, 1500);
  };

  const handlePrintReport = () => {
    toast.info('جاري إعداد التقرير للطباعة...');
    setTimeout(() => {
      toast.success('تم إرسال التقرير إلى الطابعة');
    }, 1500);
  };

  const handleShareReport = () => {
    toast.info('جاري تحضير التقرير للمشاركة...');
    setTimeout(() => {
      toast.success('تم نسخ رابط التقرير');
    }, 1500);
  };

  return (
    <Layout>
      <Header title="التقارير المالية" showBack={true}>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <span className="text-sm text-gray-300">تحليل البيانات المالية واستخراج التقارير</span>
        </div>
      </Header>

      <div className="container mx-auto p-4">
        {/* شريط الأدوات */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex gap-2">
            <Select value={period} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="اختر الفترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">اليوم</SelectItem>
                <SelectItem value="this-week">هذا الأسبوع</SelectItem>
                <SelectItem value="this-month">هذا الشهر</SelectItem>
                <SelectItem value="this-quarter">هذا الربع</SelectItem>
                <SelectItem value="this-year">هذه السنة</SelectItem>
                <SelectItem value="custom">فترة مخصصة</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrintReport}>
              طباعة
            </Button>
            <Button variant="outline" onClick={handleShareReport}>
              <Share2 className="mr-2 h-4 w-4" />
              مشاركة
            </Button>
            <Button onClick={handleExportReport}>
              <Download className="mr-2 h-4 w-4" />
              تصدير
            </Button>
          </div>
        </div>

        {/* فلاتر متقدمة */}
        {showFilters && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">الحساب</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحساب" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الحسابات</SelectItem>
                      <SelectItem value="assets">الأصول</SelectItem>
                      <SelectItem value="liabilities">الخصوم</SelectItem>
                      <SelectItem value="equity">حقوق الملكية</SelectItem>
                      <SelectItem value="revenue">الإيرادات</SelectItem>
                      <SelectItem value="expenses">المصروفات</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">مركز التكلفة</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر مركز التكلفة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع المراكز</SelectItem>
                      <SelectItem value="main">المركز الرئيسي</SelectItem>
                      <SelectItem value="branch1">الفرع الأول</SelectItem>
                      <SelectItem value="branch2">الفرع الثاني</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-1 block">مقارنة مع</label>
                  <Select defaultValue="none">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر للمقارنة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">بدون مقارنة</SelectItem>
                      <SelectItem value="previous-period">الفترة السابقة</SelectItem>
                      <SelectItem value="previous-year">العام السابق</SelectItem>
                      <SelectItem value="budget">الميزانية التقديرية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button variant="outline" className="mr-2">إعادة ضبط</Button>
                <Button>تطبيق الفلاتر</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* علامات التبويب للتقارير المختلفة */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="balance-sheet" className="text-base">الميزانية العمومية</TabsTrigger>
            <TabsTrigger value="income-statement" className="text-base">قائمة الدخل</TabsTrigger>
            <TabsTrigger value="cash-flow" className="text-base">التدفقات النقدية</TabsTrigger>
          </TabsList>

          <TabsContent value="balance-sheet" className="mt-4">
            <ReportDashboard
              title="الميزانية العمومية"
              summary="تقرير يوضح الأصول والخصوم وحقوق الملكية للفترة المحددة"
              pieChartData={balanceSheetData.pieChartData}
              barChartData={balanceSheetData.barChartData}
              lineChartData={balanceSheetData.lineChartData}
            />

            <Card>
              <CardHeader>
                <CardTitle>تفاصيل الميزانية العمومية</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>البند</TableHead>
                      <TableHead>القيمة</TableHead>
                      <TableHead>النسبة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="font-medium bg-blue-50">
                      <TableCell colSpan={3}>الأصول</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">النقد وما في حكمه</TableCell>
                      <TableCell>15,000.00 ريال</TableCell>
                      <TableCell>15%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">الذمم المدينة</TableCell>
                      <TableCell>20,000.00 ريال</TableCell>
                      <TableCell>20%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">المخزون</TableCell>
                      <TableCell>25,000.00 ريال</TableCell>
                      <TableCell>25%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">الأصول الثابتة</TableCell>
                      <TableCell>40,000.00 ريال</TableCell>
                      <TableCell>40%</TableCell>
                    </TableRow>
                    <TableRow className="font-medium bg-blue-50">
                      <TableCell>إجمالي الأصول</TableCell>
                      <TableCell>100,000.00 ريال</TableCell>
                      <TableCell>100%</TableCell>
                    </TableRow>
                    
                    <TableRow className="font-medium bg-red-50">
                      <TableCell colSpan={3}>الخصوم وحقوق الملكية</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">الذمم الدائنة</TableCell>
                      <TableCell>10,000.00 ريال</TableCell>
                      <TableCell>10%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">القروض قصيرة الأجل</TableCell>
                      <TableCell>15,000.00 ريال</TableCell>
                      <TableCell>15%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">القروض طويلة الأجل</TableCell>
                      <TableCell>15,000.00 ريال</TableCell>
                      <TableCell>15%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">رأس المال</TableCell>
                      <TableCell>40,000.00 ريال</TableCell>
                      <TableCell>40%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">الأرباح المحتجزة</TableCell>
                      <TableCell>20,000.00 ريال</TableCell>
                      <TableCell>20%</TableCell>
                    </TableRow>
                    <TableRow className="font-medium bg-red-50">
                      <TableCell>إجمالي الخصوم وحقوق الملكية</TableCell>
                      <TableCell>100,000.00 ريال</TableCell>
                      <TableCell>100%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="income-statement" className="mt-4">
            <ReportDashboard
              title="قائمة الدخل"
              summary="تقرير يوضح الإيرادات والمصروفات وصافي الربح أو الخسارة للفترة المحددة"
              pieChartData={incomeStatementData.pieChartData}
              barChartData={incomeStatementData.barChartData}
              lineChartData={incomeStatementData.lineChartData}
            />

            <Card>
              <CardHeader>
                <CardTitle>تفاصيل قائمة الدخل</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>البند</TableHead>
                      <TableHead>القيمة</TableHead>
                      <TableHead>النسبة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="font-medium bg-green-50">
                      <TableCell>الإيرادات</TableCell>
                      <TableCell>120,000.00 ريال</TableCell>
                      <TableCell>100%</TableCell>
                    </TableRow>
                    <TableRow className="font-medium bg-red-50">
                      <TableCell>تكلفة المبيعات</TableCell>
                      <TableCell>70,000.00 ريال</TableCell>
                      <TableCell>58.33%</TableCell>
                    </TableRow>
                    <TableRow className="font-medium bg-blue-50">
                      <TableCell>مجمل الربح</TableCell>
                      <TableCell>50,000.00 ريال</TableCell>
                      <TableCell>41.67%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">مصاريف تشغيلية</TableCell>
                      <TableCell>20,000.00 ريال</TableCell>
                      <TableCell>16.67%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">مصاريف إدارية</TableCell>
                      <TableCell>10,000.00 ريال</TableCell>
                      <TableCell>8.33%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">مصاريف أخرى</TableCell>
                      <TableCell>5,000.00 ريال</TableCell>
                      <TableCell>4.17%</TableCell>
                    </TableRow>
                    <TableRow className="font-medium bg-blue-50">
                      <TableCell>الربح قبل الضرائب</TableCell>
                      <TableCell>15,000.00 ريال</TableCell>
                      <TableCell>12.5%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">الضرائب</TableCell>
                      <TableCell>3,000.00 ريال</TableCell>
                      <TableCell>2.5%</TableCell>
                    </TableRow>
                    <TableRow className="font-medium bg-green-50">
                      <TableCell>صافي الربح</TableCell>
                      <TableCell>12,000.00 ريال</TableCell>
                      <TableCell>10%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cash-flow" className="mt-4">
            <ReportDashboard
              title="قائمة التدفقات النقدية"
              summary="تقرير يوضح حركة النقدية الداخلة والخارجة للفترة المحددة"
              pieChartData={cashFlowData.pieChartData}
              barChartData={cashFlowData.barChartData}
              lineChartData={cashFlowData.lineChartData}
            />

            <Card>
              <CardHeader>
                <CardTitle>تفاصيل التدفقات النقدية</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>البند</TableHead>
                      <TableHead>القيمة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="font-medium bg-blue-50">
                      <TableCell colSpan={2}>التدفقات النقدية من الأنشطة التشغيلية</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">صافي الربح</TableCell>
                      <TableCell>12,000.00 ريال</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">الإهلاك والاستهلاك</TableCell>
                      <TableCell>5,000.00 ريال</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">التغير في المخزون</TableCell>
                      <TableCell>-2,000.00 ريال</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">التغير في الذمم المدينة</TableCell>
                      <TableCell>3,000.00 ريال</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">التغير في الذمم الدائنة</TableCell>
                      <TableCell>7,000.00 ريال</TableCell>
                    </TableRow>
                    <TableRow className="font-medium">
                      <TableCell>صافي النقد من الأنشطة التشغيلية</TableCell>
                      <TableCell>25,000.00 ريال</TableCell>
                    </TableRow>
                    
                    <TableRow className="font-medium bg-blue-50">
                      <TableCell colSpan={2}>التدفقات النقدية من الأنشطة الاستثمارية</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">شراء أصول ثابتة</TableCell>
                      <TableCell>-15,000.00 ريال</TableCell>
                    </TableRow>
                    <TableRow className="font-medium">
                      <TableCell>صافي النقد من الأنشطة الاستثمارية</TableCell>
                      <TableCell>-15,000.00 ريال</TableCell>
                    </TableRow>
                    
                    <TableRow className="font-medium bg-blue-50">
                      <TableCell colSpan={2}>التدفقات النقدية من الأنشطة التمويلية</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">توزيعات أرباح</TableCell>
                      <TableCell>-5,000.00 ريال</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">قروض جديدة</TableCell>
                      <TableCell>10,000.00 ريال</TableCell>
                    </TableRow>
                    <TableRow className="font-medium">
                      <TableCell>صافي النقد من الأنشطة التمويلية</TableCell>
                      <TableCell>5,000.00 ريال</TableCell>
                    </TableRow>
                    
                    <TableRow className="font-medium bg-green-50">
                      <TableCell>صافي التغير في النقدية</TableCell>
                      <TableCell>15,000.00 ريال</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="pr-8">النقدية في بداية الفترة</TableCell>
                      <TableCell>10,000.00 ريال</TableCell>
                    </TableRow>
                    <TableRow className="font-medium bg-green-50">
                      <TableCell>النقدية في نهاية الفترة</TableCell>
                      <TableCell>25,000.00 ريال</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default FinancialReportsPage;
