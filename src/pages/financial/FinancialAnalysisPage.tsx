import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { BarChart, LineChart, PieChart } from "@/components/ui/charts";
import { useFinancialAnalysis } from "@/hooks/financial/useFinancialAnalysis";
import { Badge } from "@/components/ui/badge";
import { Download, Filter, PlusCircle, RefreshCw } from "lucide-react";
import { AnalysisPeriod } from "@/types/financial-analysis";
import { DateRange } from "react-day-picker";

const FinancialAnalysisPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
    to: new Date()
  });
  
  const handleDateRangeChange = (range: DateRange) => {
    if (range?.from) {
      setDateRange({
        from: range.from,
        to: range.to || range.from
      });
    }
  };

  const { 
    financialMetrics, 
    financialRatios, 
    insights, 
    recommendations,
    period,
    setPeriod,
    refreshData,
    exportAnalysis,
    chartData,
    isLoading
  } = useFinancialAnalysis();

  // Type-safe handler for Select component
  const handlePeriodChange = (newValue: string) => {
    setPeriod(newValue as AnalysisPeriod);
  };

  return (
    <div className="container mx-auto p-6">
      <Header title="التحليل المالي" showBack={true}>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportAnalysis}>
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
          <Button variant="outline" size="sm" onClick={refreshData}>
            <RefreshCw className="h-4 w-4 ml-1" />
            تحديث
          </Button>
          <Button size="sm">
            <PlusCircle className="h-4 w-4 ml-1" />
            تحليل جديد
          </Button>
        </div>
      </Header>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="اختر الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">يومي</SelectItem>
              <SelectItem value="weekly">أسبوعي</SelectItem>
              <SelectItem value="monthly">شهري</SelectItem>
              <SelectItem value="quarterly">ربع سنوي</SelectItem>
              <SelectItem value="yearly">سنوي</SelectItem>
            </SelectContent>
          </Select>

          <DateRangePicker 
            value={dateRange} 
            onChange={handleDateRangeChange}
            align="start"
            className="w-auto" 
          />

          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="metrics">المؤشرات</TabsTrigger>
          <TabsTrigger value="ratios">النسب المالية</TabsTrigger>
          <TabsTrigger value="forecast">التوقعات</TabsTrigger>
          <TabsTrigger value="insights">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">المبيعات وهامش الربح</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={chartData.salesAndMargin} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">الإيرادات حسب المصدر</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart data={chartData.revenueBySource} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">المصروفات حسب الفئة</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart data={chartData.expensesByCategory} />
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">توصيات التحسين</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="flex gap-2">
                      <Badge variant="outline" className="h-6 shrink-0">
                        {index + 1}
                      </Badge>
                      <p>{rec}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">ملخص الرؤى</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {insights.map((insight, index) => (
                    <li key={index} className="text-sm border-b pb-2 last:border-0">
                      {insight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metrics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {financialMetrics.map((metric) => (
              <Card key={metric.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">{metric.name}</CardTitle>
                    <Badge 
                      variant={metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'destructive' : 'outline'}
                    >
                      {metric.percentChange ? `${metric.percentChange > 0 ? '+' : ''}${metric.percentChange}%` : '0%'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value} {metric.unit}</div>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ratios">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {financialRatios.map((ratio) => (
              <Card key={ratio.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-base">{ratio.name}</CardTitle>
                    <Badge 
                      variant={ratio.trend === 'up' ? 'success' : ratio.trend === 'down' ? 'destructive' : 'outline'}
                    >
                      {ratio.lastPeriod ? `${((ratio.value - ratio.lastPeriod) / ratio.lastPeriod * 100).toFixed(1)}%` : ''}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-2xl font-bold">{ratio.value.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">
                      المعيار: {ratio.industry.toFixed(2)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{ratio.description}</p>
                  <div className="mt-2 text-xs bg-muted p-1 rounded">
                    {ratio.formula}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forecast">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">التوقعات المالية</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <LineChart data={chartData.forecast} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">التحليلات والرؤى</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {insights.map((insight, index) => (
                  <li key={index} className="border-b pb-4 last:border-0">
                    <h3 className="font-medium mb-1">رؤية #{index + 1}</h3>
                    <p>{insight}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialAnalysisPage;
