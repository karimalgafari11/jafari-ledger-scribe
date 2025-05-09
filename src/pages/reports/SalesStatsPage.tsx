import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { useTranslation } from "@/hooks/useTranslation";
import { useSalesReports } from "@/hooks/useSalesReports";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, BarChart3, PieChart, LineChart as LineChartIcon, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Import dashboard chart components
import { BarChart, PieChart as PieChartComponent, LineChart } from "@/components/ui/charts";

const SalesStatsPage: React.FC = () => {
  const { t, language } = useTranslation();
  const {
    salesData: reportSalesData,
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
    try {
      exportReport(format);
      toast.success(language === 'ar' 
        ? `تم تصدير التقرير بتنسيق ${format === "pdf" ? "PDF" : format === "excel" ? "Excel" : "CSV"}`
        : `Report exported as ${format.toUpperCase()} successfully`
      );
    } catch (error) {
      console.error("Export error:", error);
      toast.error(language === 'ar'
        ? `حدث خطأ أثناء تصدير التقرير`
        : `Error exporting report`
      );
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-screen w-full overflow-hidden">
        <Header title={language === 'ar' ? "إحصائيات المبيعات" : "Sales Statistics"} showBack={true}>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => handleExport("pdf")}>
              <Download className="h-4 w-4 mr-1" />
              {language === 'ar' ? "تصدير PDF" : "Export PDF"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
              <Download className="h-4 w-4 mr-1" />
              {language === 'ar' ? "تصدير Excel" : "Export Excel"}
            </Button>
          </div>
        </Header>

        <div className="flex-1 overflow-y-auto p-4">
          {/* Filters and Period Selection */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                {language === 'ar' ? "أداء المبيعات والإيرادات" : "Sales and Revenue Performance"}
              </h1>
              <p className="text-muted-foreground">
                {language === 'ar' ? "نظرة شاملة على أداء المبيعات والإيرادات" : "Comprehensive overview of sales and revenue performance"}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <DateRangePicker
                value={dateRange}
                onChange={setDateRange}
                className="w-[260px]"
              />
              <Select value={period} onValueChange={(value: "daily" | "weekly" | "monthly" | "quarterly" | "yearly") => setPeriod(value)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={language === 'ar' ? "الفترة" : "Period"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">{language === 'ar' ? "يومي" : "Daily"}</SelectItem>
                  <SelectItem value="weekly">{language === 'ar' ? "أسبوعي" : "Weekly"}</SelectItem>
                  <SelectItem value="monthly">{language === 'ar' ? "شهري" : "Monthly"}</SelectItem>
                  <SelectItem value="quarterly">{language === 'ar' ? "ربع سنوي" : "Quarterly"}</SelectItem>
                  <SelectItem value="yearly">{language === 'ar' ? "سنوي" : "Yearly"}</SelectItem>
                </SelectContent>
              </Select>
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={language === 'ar' ? "الفرع" : "Branch"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{language === 'ar' ? "جميع الفروع" : "All Branches"}</SelectItem>
                  <SelectItem value="main">{language === 'ar' ? "الفرع الرئيسي" : "Main Branch"}</SelectItem>
                  <SelectItem value="branch1">{language === 'ar' ? "الفرع الأول" : "Branch 1"}</SelectItem>
                  <SelectItem value="branch2">{language === 'ar' ? "الفرع الثاني" : "Branch 2"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* KPI Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
              <div className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {language === 'ar' ? "إجمالي المبيعات" : "Total Sales"}
              </div>
              <div className="text-3xl font-bold mt-2">
                {reportSalesData.totalSales.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
              </div>
              <div className="text-xs text-blue-500 dark:text-blue-400 mt-1">
                {language === 'ar' ? "ريال سعودي" : "SAR"}
              </div>
              <div className="flex items-center mt-2">
                <div className={`text-sm ${reportSalesData.change >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {reportSalesData.change >= 0 ? '↑' : '↓'} {Math.abs(reportSalesData.change)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                  {language === 'ar' ? "مقارنة بالفترة السابقة" : "vs previous period"}
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
              <div className="text-sm font-medium text-green-600 dark:text-green-400">
                {language === 'ar' ? "عدد المعاملات" : "Transactions"}
              </div>
              <div className="text-3xl font-bold mt-2">
                {reportSalesData.transactions.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
              </div>
              <div className="text-xs text-green-500 dark:text-green-400 mt-1">
                {language === 'ar' ? "معاملة" : "transactions"}
              </div>
              <div className="flex items-center mt-2">
                <div className={`text-sm ${reportSalesData.transactionChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {reportSalesData.transactionChange >= 0 ? '↑' : '↓'} {Math.abs(reportSalesData.transactionChange)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                  {language === 'ar' ? "مقارنة بالفترة السابقة" : "vs previous period"}
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800">
              <div className="text-sm font-medium text-amber-600 dark:text-amber-400">
                {language === 'ar' ? "متوسط قيمة الطلب" : "Average Order"}
              </div>
              <div className="text-3xl font-bold mt-2">
                {reportSalesData.averageOrder.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
              </div>
              <div className="text-xs text-amber-500 dark:text-amber-400 mt-1">
                {language === 'ar' ? "ريال سعودي" : "SAR"}
              </div>
              <div className="flex items-center mt-2">
                <div className={`text-sm ${reportSalesData.averageOrderChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {reportSalesData.averageOrderChange >= 0 ? '↑' : '↓'} {Math.abs(reportSalesData.averageOrderChange)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                  {language === 'ar' ? "مقارنة بالفترة السابقة" : "vs previous period"}
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
              <div className="text-sm font-medium text-red-600 dark:text-red-400">
                {language === 'ar' ? "صافي الأرباح" : "Net Profit"}
              </div>
              <div className="text-3xl font-bold mt-2">
                {reportSalesData.netProfit.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
              </div>
              <div className="text-xs text-red-500 dark:text-red-400 mt-1">
                {language === 'ar' ? "ريال سعودي" : "SAR"}
              </div>
              <div className="flex items-center mt-2">
                <div className={`text-sm ${reportSalesData.profitChange >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {reportSalesData.profitChange >= 0 ? '↑' : '↓'} {Math.abs(reportSalesData.profitChange)}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mr-2">
                  {language === 'ar' ? "مقارنة بالفترة السابقة" : "vs previous period"}
                </div>
              </div>
            </Card>
          </div>

          {/* Chart Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white dark:bg-gray-800 p-1 border rounded-lg">
              <TabsTrigger value="overview" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-200">
                {language === 'ar' ? "نظرة عامة" : "Overview"}
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-200">
                {language === 'ar' ? "المنتجات" : "Products"}
              </TabsTrigger>
              <TabsTrigger value="customers" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-200">
                {language === 'ar' ? "العملاء" : "Customers"}
              </TabsTrigger>
              <TabsTrigger value="sales" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 dark:data-[state=active]:bg-blue-900 dark:data-[state=active]:text-blue-200">
                {language === 'ar' ? "المبيعات" : "Sales"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'ar' ? "المبيعات والمصروفات" : "Sales & Expenses"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <BarChart data={revenueData.barChart} />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>{language === 'ar' ? "توزيع المبيعات" : "Sales Distribution"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <PieChartComponent data={revenueData.pieChart} />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ar' ? "أداء المبيعات على مدار العام" : "Sales Performance Over Time"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <LineChart data={revenueData.lineChart} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="products" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ar' ? "المبيعات حسب المنتجات" : "Sales by Products"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800 border-b">
                            <th className="px-4 py-3 text-right">{language === 'ar' ? "المنتج" : "Product"}</th>
                            <th className="px-4 py-3 text-right">{language === 'ar' ? "الكمية المباعة" : "Quantity Sold"}</th>
                            <th className="px-4 py-3 text-right">{language === 'ar' ? "إجمالي المبيعات" : "Total Sales"}</th>
                            <th className="px-4 py-3 text-right">{language === 'ar' ? "نسبة المساهمة" : "Contribution %"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productData.slice(0, 10).map((product, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <td className="px-4 py-3">{product.name}</td>
                              <td className="px-4 py-3">{product.quantity.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}</td>
                              <td className="px-4 py-3">
                                {product.sales.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
                                {language === 'ar' ? " ريال" : " SAR"}
                              </td>
                              <td className="px-4 py-3">{product.percentage}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="h-80">
                    <Tabs defaultValue="pie" className="w-full">
                      <TabsList className="mb-4">
                        <TabsTrigger value="pie">
                          <PieChart className="h-4 w-4 mr-2" />
                          {language === 'ar' ? "رسم بياني دائري" : "Pie Chart"}
                        </TabsTrigger>
                        <TabsTrigger value="line">
                          <LineChartIcon className="h-4 w-4 mr-2" />
                          {language === 'ar' ? "رسم بياني خطي" : "Line Chart"}
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="pie" className="h-full">
                        <div className="h-full">
                          <PieChartComponent data={productCharts.pieChart} />
                        </div>
                      </TabsContent>
                      <TabsContent value="line" className="h-full">
                        <div className="h-full">
                          <LineChart data={productCharts.lineChart} />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="customers" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{language === 'ar' ? "المبيعات حسب العملاء" : "Sales by Customers"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-50 dark:bg-gray-800 border-b">
                            <th className="px-4 py-3 text-right">{language === 'ar' ? "العميل" : "Customer"}</th>
                            <th className="px-4 py-3 text-right">{language === 'ar' ? "عدد المعاملات" : "Transactions"}</th>
                            <th className="px-4 py-3 text-right">{language === 'ar' ? "إجمالي المبيعات" : "Total Sales"}</th>
                            <th className="px-4 py-3 text-right">{language === 'ar' ? "نسبة المساهمة" : "Contribution %"}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customerData.slice(0, 10).map((customer, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                              <td className="px-4 py-3">{customer.name}</td>
                              <td className="px-4 py-3">{customer.transactions.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}</td>
                              <td className="px-4 py-3">
                                {customer.sales.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
                                {language === 'ar' ? " ريال" : " SAR"}
                              </td>
                              <td className="px-4 py-3">{customer.percentage}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="h-80">
                    <Tabs defaultValue="pie" className="w-full">
                      <TabsList className="mb-4">
                        <TabsTrigger value="pie">
                          <PieChart className="h-4 w-4 mr-2" />
                          {language === 'ar' ? "رسم بياني دائري" : "Pie Chart"}
                        </TabsTrigger>
                        <TabsTrigger value="line">
                          <LineChartIcon className="h-4 w-4 mr-2" />
                          {language === 'ar' ? "رسم بياني خطي" : "Line Chart"}
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="pie" className="h-full">
                        <div className="h-full">
                          <PieChartComponent data={customerCharts.pieChart} />
                        </div>
                      </TabsContent>
                      <TabsContent value="line" className="h-full">
                        <div className="h-full">
                          <LineChart data={customerCharts.lineChart} />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sales" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>{language === 'ar' ? "قائمة المبيعات" : "Sales Transactions"}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleExport("excel")}>
                      <Download className="h-4 w-4 mr-2" /> 
                      {language === 'ar' ? "تصدير Excel" : "Export Excel"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleExport("csv")}>
                      <Download className="h-4 w-4 mr-2" /> 
                      {language === 'ar' ? "تصدير CSV" : "Export CSV"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-800 border-b">
                          <th className="px-4 py-3 text-right">{language === 'ar' ? "رقم الفاتورة" : "Invoice #"}</th>
                          <th className="px-4 py-3 text-right">{language === 'ar' ? "التاريخ" : "Date"}</th>
                          <th className="px-4 py-3 text-right">{language === 'ar' ? "العميل" : "Customer"}</th>
                          <th className="px-4 py-3 text-right">{language === 'ar' ? "المبلغ" : "Amount"}</th>
                          <th className="px-4 py-3 text-right">{language === 'ar' ? "طريقة الدفع" : "Payment Method"}</th>
                          <th className="px-4 py-3 text-right">{language === 'ar' ? "الحالة" : "Status"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesByDate.map((sale, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                            <td className="px-4 py-3">{sale.invoiceNumber}</td>
                            <td className="px-4 py-3">{sale.date}</td>
                            <td className="px-4 py-3">{sale.customer}</td>
                            <td className="px-4 py-3">
                              {sale.amount.toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
                              {language === 'ar' ? " ريال" : " SAR"}
                            </td>
                            <td className="px-4 py-3">
                              {language === 'ar' 
                                ? (sale.paymentMethod === "cash" ? "نقداً" : "ائتمان") 
                                : (sale.paymentMethod === "cash" ? "Cash" : "Credit")}
                            </td>
                            <td className="px-4 py-3">
                              <Badge 
                                className={`
                                  ${sale.status === 'paid' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                                  sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}
                                `}
                              >
                                {language === 'ar' 
                                  ? (sale.status === 'paid' ? 'مدفوعة' : 
                                     sale.status === 'pending' ? 'معلقة' : 'متأخرة')
                                  : (sale.status === 'paid' ? 'Paid' : 
                                     sale.status === 'pending' ? 'Pending' : 'Overdue')}
                              </Badge>
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
        </div>
      </div>
    </Layout>
  );
};

export default SalesStatsPage;
