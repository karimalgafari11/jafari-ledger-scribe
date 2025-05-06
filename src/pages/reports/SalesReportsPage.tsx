
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { ReportDashboard } from "@/components/reports/ReportDashboard";
import { ReportTable } from "@/components/reports/ReportTable";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import { useSalesReports } from "@/hooks/useSalesReports";
import { ChartPie, Download, Filter } from "lucide-react";
import { toast } from "sonner";

const SalesReportsPage = () => {
  const {
    salesData,
    revenueData,
    customerData,
    customerCharts,
    productData,
    productCharts,
    salesByDate,
    isLoading,
    dateRange,
    setDateRange,
    period,
    setPeriod,
    branch,
    setBranch,
    exportReport
  } = useSalesReports();

  const [activeTab, setActiveTab] = useState("overview");

  const handleExport = (format: "pdf" | "excel" | "csv") => {
    exportReport(format);
    toast.success(`تم تصدير التقرير بتنسيق ${format === "pdf" ? "PDF" : format === "excel" ? "Excel" : "CSV"}`);
  };

  return (
    <div className="h-screen w-full overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="تقارير المبيعات" showBack={true}>
          <div className="flex items-center gap-4 rtl">
            <Button variant="outline" className="hidden md:flex items-center gap-1" onClick={() => handleExport("pdf")}>
              <Download className="ml-2 h-4 w-4" />
              تصدير PDF
            </Button>
            <Button variant="outline" className="hidden md:flex items-center gap-1" onClick={() => handleExport("excel")}>
              <Download className="ml-2 h-4 w-4" />
              تصدير Excel
            </Button>
            <Select
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="عرض التقرير" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">نظرة عامة</SelectItem>
                <SelectItem value="products">المبيعات حسب المنتجات</SelectItem>
                <SelectItem value="customers">المبيعات حسب العملاء</SelectItem>
                <SelectItem value="sales">قائمة المبيعات</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Header>
      </div>

      <main className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 rtl">تقارير المبيعات والإيرادات</h2>
            <p className="text-gray-600 rtl">تحليل شامل لأداء المبيعات والإيرادات في فترة محددة</p>
          </div>

          <DashboardFilters
            date={dateRange}
            onDateChange={setDateRange}
            period={period}
            onPeriodChange={setPeriod}
            branch={branch}
            onBranchChange={setBranch}
          />
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
              <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6 rtl">
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <div className="text-sm font-medium text-blue-600">إجمالي المبيعات</div>
                <div className="text-3xl font-bold mt-2">{salesData.totalSales.toLocaleString('ar-SA')}</div>
                <div className="text-xs text-blue-500 mt-1">ريال سعودي</div>
                <div className="flex items-center mt-2">
                  <div className={`text-sm ${salesData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {salesData.change >= 0 ? '↑' : '↓'} {Math.abs(salesData.change)}%
                  </div>
                  <div className="text-xs text-gray-500 mr-2">مقارنة بالفترة السابقة</div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <div className="text-sm font-medium text-green-600">عدد المعاملات</div>
                <div className="text-3xl font-bold mt-2">{salesData.transactions.toLocaleString('ar-SA')}</div>
                <div className="text-xs text-green-500 mt-1">معاملة</div>
                <div className="flex items-center mt-2">
                  <div className={`text-sm ${salesData.transactionChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {salesData.transactionChange >= 0 ? '↑' : '↓'} {Math.abs(salesData.transactionChange)}%
                  </div>
                  <div className="text-xs text-gray-500 mr-2">مقارنة بالفترة السابقة</div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
                <div className="text-sm font-medium text-amber-600">متوسط قيمة الطلب</div>
                <div className="text-3xl font-bold mt-2">{salesData.averageOrder.toLocaleString('ar-SA')}</div>
                <div className="text-xs text-amber-500 mt-1">ريال سعودي</div>
                <div className="flex items-center mt-2">
                  <div className={`text-sm ${salesData.averageOrderChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {salesData.averageOrderChange >= 0 ? '↑' : '↓'} {Math.abs(salesData.averageOrderChange)}%
                  </div>
                  <div className="text-xs text-gray-500 mr-2">مقارنة بالفترة السابقة</div>
                </div>
              </Card>

              <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
                <div className="text-sm font-medium text-red-600">صافي الأرباح</div>
                <div className="text-3xl font-bold mt-2">{salesData.netProfit.toLocaleString('ar-SA')}</div>
                <div className="text-xs text-red-500 mt-1">ريال سعودي</div>
                <div className="flex items-center mt-2">
                  <div className={`text-sm ${salesData.profitChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {salesData.profitChange >= 0 ? '↑' : '↓'} {Math.abs(salesData.profitChange)}%
                  </div>
                  <div className="text-xs text-gray-500 mr-2">مقارنة بالفترة السابقة</div>
                </div>
              </Card>
            </div>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="rtl">
              <TabsList className="mb-6 bg-white p-1 border rounded-lg">
                <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                  نظرة عامة
                </TabsTrigger>
                <TabsTrigger value="products" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                  المبيعات حسب المنتجات
                </TabsTrigger>
                <TabsTrigger value="customers" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                  المبيعات حسب العملاء
                </TabsTrigger>
                <TabsTrigger value="sales" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                  قائمة المبيعات
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <ReportDashboard
                  title="تحليل المبيعات"
                  summary="تحليل المبيعات حسب الفترة الزمنية"
                  barChartData={revenueData.barChart}
                  pieChartData={revenueData.pieChart}
                  lineChartData={revenueData.lineChart}
                />
              </TabsContent>

              <TabsContent value="products" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>المبيعات حسب المنتجات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50 border-b">
                              <th className="px-4 py-3 text-right">المنتج</th>
                              <th className="px-4 py-3 text-right">الكمية المباعة</th>
                              <th className="px-4 py-3 text-right">إجمالي المبيعات</th>
                              <th className="px-4 py-3 text-right">نسبة المساهمة</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productData.filter(product => typeof product.name === 'string').slice(0, 10).map((product, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3">{product.name}</td>
                                <td className="px-4 py-3">{product.quantity.toLocaleString('ar-SA')}</td>
                                <td className="px-4 py-3">{product.sales.toLocaleString('ar-SA')} ريال</td>
                                <td className="px-4 py-3">{product.percentage}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="h-[350px] w-full">
                      <ReportDashboard
                        title=""
                        summary=""
                        barChartData={productCharts.pieChart}
                        pieChartData={productCharts.pieChart}
                        lineChartData={productCharts.lineChart}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="customers" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>المبيعات حسب العملاء</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-50 border-b">
                              <th className="px-4 py-3 text-right">العميل</th>
                              <th className="px-4 py-3 text-right">عدد المعاملات</th>
                              <th className="px-4 py-3 text-right">إجمالي المبيعات</th>
                              <th className="px-4 py-3 text-right">نسبة المساهمة</th>
                            </tr>
                          </thead>
                          <tbody>
                            {customerData.filter(customer => typeof customer.name === 'string').slice(0, 10).map((customer, index) => (
                              <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                                <td className="px-4 py-3">{customer.name}</td>
                                <td className="px-4 py-3">{customer.transactions.toLocaleString('ar-SA')}</td>
                                <td className="px-4 py-3">{customer.sales.toLocaleString('ar-SA')} ريال</td>
                                <td className="px-4 py-3">{customer.percentage}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="h-[350px] w-full">
                      <ReportDashboard
                        title=""
                        summary=""
                        barChartData={customerCharts.pieChart}
                        pieChartData={customerCharts.pieChart}
                        lineChartData={customerCharts.lineChart}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sales" className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <CardTitle>قائمة المبيعات</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
                        <Download className="h-4 w-4 ml-2" /> تصدير Excel
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                        <Download className="h-4 w-4 ml-2" /> تصدير CSV
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="px-4 py-3 text-right">رقم الفاتورة</th>
                            <th className="px-4 py-3 text-right">التاريخ</th>
                            <th className="px-4 py-3 text-right">العميل</th>
                            <th className="px-4 py-3 text-right">المبلغ</th>
                            <th className="px-4 py-3 text-right">طريقة الدفع</th>
                            <th className="px-4 py-3 text-right">الحالة</th>
                          </tr>
                        </thead>
                        <tbody>
                          {salesByDate.map((sale, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3">{sale.invoiceNumber}</td>
                              <td className="px-4 py-3">{sale.date}</td>
                              <td className="px-4 py-3">{sale.customer}</td>
                              <td className="px-4 py-3">{sale.amount.toLocaleString('ar-SA')} ريال</td>
                              <td className="px-4 py-3">{sale.paymentMethod === "cash" ? "نقداً" : "ائتمان"}</td>
                              <td className="px-4 py-3">
                                <span 
                                  className={`px-2 py-1 rounded-full text-xs ${
                                    sale.status === 'paid' ? 'bg-green-100 text-green-800' : 
                                    sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {sale.status === 'paid' ? 'مدفوعة' : 
                                   sale.status === 'pending' ? 'معلقة' : 'متأخرة'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
    </div>
  );
};

export default SalesReportsPage;
