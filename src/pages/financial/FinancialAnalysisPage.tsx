import React from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { useFinancialAnalysis, AnalysisPeriod } from "@/hooks/financial/useFinancialAnalysis";

const FinancialAnalysisPage = () => {
  const {
    financialMetrics,
    financialRatios,
    insights,
    recommendations,
    dateRange,
    setDateRange,
    isLoading
  } = useFinancialAnalysis();
  
  // Handle the DateRange compatibility issue
  const handleDateRangeChange = (range: any) => {
    if (range && range.from) {
      setDateRange({
        from: range.from,
        to: range.to || new Date()
      });
    }
  };

  // Create a string to enum converter for AnalysisPeriod
  const handlePeriodChange = (value: string) => {
    const periodValue = value as AnalysisPeriod;
    setSelectedPeriod(periodValue);
  };

  // Create a mock selectedPeriod state setter since we're not using it in this component
  const setSelectedPeriod = (value: AnalysisPeriod) => {
    console.log("Setting period to:", value);
    // This is just a mock function since the original code expects it but doesn't use it
  };

  return (
    <div className="container mx-auto p-4">
      <Header title="تحليل الأداء المالي" showBack={true} />
      
      <Card>
        <CardHeader>
          <CardTitle>خيارات التحليل</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 grid-cols-3">
          <div className="col-span-1">
            <Select defaultValue={AnalysisPeriod.MONTH_3} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="اختر الفترة الزمنية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={AnalysisPeriod.MONTH_3}>آخر 3 أشهر</SelectItem>
                <SelectItem value={AnalysisPeriod.MONTH_6}>آخر 6 أشهر</SelectItem>
                <SelectItem value={AnalysisPeriod.YEAR_1}>آخر سنة</SelectItem>
                <SelectItem value={AnalysisPeriod.YEAR_2}>آخر سنتين</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2">
            <DateRangePicker value={dateRange} onChange={handleDateRangeChange} />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="mt-4">
        <TabsList>
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="metrics">المقاييس المالية</TabsTrigger>
          <TabsTrigger value="ratios">النسب المالية</TabsTrigger>
          <TabsTrigger value="insights">الرؤى والتوصيات</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>ملخص الأداء المالي</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div>جاري تحميل البيانات...</div>
              ) : (
                <>
                  <p>
                    {insights && insights.length > 0
                      ? insights[0]
                      : "لا توجد رؤى متاحة حاليًا."}
                  </p>
                  <Button variant="outline" className="mt-4">
                    عرض التقرير الكامل
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="metrics">
          <Card>
            <CardHeader>
              <CardTitle>المقاييس المالية</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div>جاري تحميل البيانات...</div>
              ) : (
                <div className="grid gap-4 grid-cols-2">
                  {financialMetrics.map((metric) => (
                    <div key={metric.name}>
                      <p className="text-sm font-bold">{metric.name}</p>
                      <p className="text-xl">{metric.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="ratios">
          <Card>
            <CardHeader>
              <CardTitle>النسب المالية</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div>جاري تحميل البيانات...</div>
              ) : (
                <div className="grid gap-4 grid-cols-2">
                  {financialRatios.map((ratio) => (
                    <div key={ratio.name}>
                      <p className="text-sm font-bold">{ratio.name}</p>
                      <p className="text-xl">{ratio.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>الرؤى والتوصيات</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div>جاري تحميل البيانات...</div>
              ) : (
                <ul>
                  {recommendations.map((recommendation, index) => (
                    <li key={index}>{recommendation}</li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialAnalysisPage;
