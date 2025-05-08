import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { DateRange } from "react-day-picker";
import { BarChart, LineChart, PieChart } from "@/components/ui/charts";
import { useFinancialAnalysis, AnalysisPeriod } from "@/hooks/financial/useFinancialAnalysis";

const FinancialAnalysisPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [analysisPeriod, setAnalysisPeriod] = useState<AnalysisPeriod>("monthly");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth() - 5),
    to: new Date()
  });
  
  const {
    profitabilityData,
    cashflowData,
    liquidityData,
    debtRatios,
    efficiencyRatios,
    profitabilityRatios,
    valuationRatios,
    loadingData
  } = useFinancialAnalysis(dateRange, analysisPeriod);
  
  const handlePeriodChange = (value: string) => {
    setAnalysisPeriod(value as AnalysisPeriod);
  };

  const handleDateRangeChange = (range: DateRange) => {
    if (range?.from) {
      setDateRange({
        from: range.from,
        to: range.to || range.from
      });
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Header title="التحليل المالي" />
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <Select value={analysisPeriod} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الفترة" />
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
            onValueChange={handleDateRangeChange}
            className="w-auto" 
          />
        </div>
        
        <div>
          <Button variant="outline" size="sm">تصدير البيانات</Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="profitability">الربحية</TabsTrigger>
          <TabsTrigger value="liquidity">السيولة</TabsTrigger>
          <TabsTrigger value="efficiency">الكفاءة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">الربحية</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={profitabilityData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">التدفق النقدي</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart data={cashflowData} />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">نسب السيولة</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={liquidityData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">نسب الديون</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={debtRatios} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">نسب الكفاءة</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={efficiencyRatios} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="profitability">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">هامش الربح الإجمالي</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={profitabilityRatios.grossMargin} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">هامش الربح التشغيلي</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={profitabilityRatios.operatingMargin} />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">هامش صافي الربح</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={profitabilityRatios.netMargin} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">العائد على الأصول</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={profitabilityRatios.roa} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="liquidity">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">نسبة التداول</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={liquidityData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">النسبة السريعة</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={liquidityData} />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">نسبة النقدية</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={liquidityData} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">رأس المال العامل</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart data={liquidityData} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="efficiency">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">معدل دوران المخزون</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={efficiencyRatios.inventoryTurnover} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">معدل دوران الذمم المدينة</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={efficiencyRatios.receivablesTurnover} />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">معدل دوران الأصول</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={efficiencyRatios.assetTurnover} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">دورة التحويل النقدي</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={efficiencyRatios.cashConversionCycle} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialAnalysisPage;
