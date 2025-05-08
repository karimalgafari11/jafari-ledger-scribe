import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BarChart, LineChart, PieChart } from "@/components/ui/charts";
import { KpiCard } from "@/components/executive/KpiCard";
import { ExecutiveSummaryCard } from "@/components/executive/ExecutiveSummaryCard";
import { ProjectStatusCard } from "@/components/executive/ProjectStatusCard";
import { FinancialRatiosCard } from "@/components/executive/FinancialRatiosCard";
import { AlertsPanel } from "@/components/executive/AlertsPanel";
import { useExecutiveDashboard } from "@/hooks/executive/useExecutiveDashboard";
import { DateRange } from "react-day-picker";
import { 
  AlertTriangle, 
  Download, 
  Filter, 
  LayoutDashboard, 
  Mail, 
  Settings, 
  Sliders 
} from "lucide-react";

const ExecutiveDashboardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  
  const {
    kpis,
    financialMetrics,
    financialRatios,
    executiveSummary,
    alerts,
    projectStats,
    salesTrends,
    cashflow,
    profitability,
    refreshDashboard,
    shareDashboard,
    exportDashboard
  } = useExecutiveDashboard();

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

  return (
    <div className="container mx-auto p-6">
      <Header title="لوحة معلومات الإدارة التنفيذية" showBack={true}>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => shareDashboard("email")}>
            <Mail className="h-4 w-4 ml-1" />
            مشاركة
          </Button>
          <Button variant="outline" size="sm" onClick={exportDashboard}>
            <Download className="h-4 w-4 ml-1" />
            تصدير
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 ml-1" />
            إعدادات
          </Button>
          <Button size="sm">
            <LayoutDashboard className="h-4 w-4 ml-1" />
            تخصيص
          </Button>
        </div>
      </Header>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          <Select defaultValue="current">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="الفترة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">الفترة الحالية</SelectItem>
              <SelectItem value="previous">الفترة السابقة</SelectItem>
              <SelectItem value="ytd">منذ بداية العام</SelectItem>
              <SelectItem value="custom">مخصص</SelectItem>
            </SelectContent>
          </Select>

          <DateRangePicker 
            value={dateRange} 
            onChange={handleDateRangeChange}
            align="start"
            className="w-auto" 
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 ml-1" />
            فلترة
          </Button>
          <Button variant="outline" size="sm" onClick={refreshDashboard}>
            <Sliders className="h-4 w-4 ml-1" />
            خيارات
          </Button>
        </div>
      </div>

      {alerts && alerts.some(alert => alert.severity === 'high') && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>تنبيهات هامة</AlertTitle>
          <AlertDescription>
            هناك {alerts.filter(alert => alert.severity === 'high').length} تنبيهات ذات أولوية عالية تتطلب انتباهك العاجل.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="financial">المالية</TabsTrigger>
          <TabsTrigger value="sales">المبيعات</TabsTrigger>
          <TabsTrigger value="projects">المشاريع</TabsTrigger>
          <TabsTrigger value="alerts">التنبيهات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* ملخص تنفيذي */}
          <ExecutiveSummaryCard summary={executiveSummary} className="mb-6" />

          {/* بطاقات مؤشرات الأداء الرئيسية */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {kpis.map((kpi) => (
              <KpiCard key={kpi.id} data={kpi} />
            ))}
          </div>

          {/* المخططات البيانية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">اتجاهات المبيعات</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={salesTrends} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">التدفق النقدي</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart data={cashflow} />
              </CardContent>
            </Card>
          </div>

          {/* حالة المشاريع والمعدلات المالية */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">الربحية حسب خط الإنتاج</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart data={profitability} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-medium">حالة المشاريع</span>
                  <Badge>{projectStats.totalProjects} مشروع</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProjectStatusCard stats={projectStats} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">المؤشرات المالية الرئيسية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {financialMetrics.map((metric) => (
                    <div key={metric.id} className="bg-muted rounded-lg p-4">
                      <div className="text-sm text-muted-foreground mb-1">{metric.name}</div>
                      <div className="text-2xl font-bold">{metric.value} {metric.unit}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge 
                          variant={metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'destructive' : 'outline'}
                        >
                          {metric.percentChange && `${metric.percentChange > 0 ? '+' : ''}${metric.percentChange}%`}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{metric.period}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <FinancialRatiosCard ratios={financialRatios} />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">تدفقات الإيرادات</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart data={salesTrends} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">أداء المبيعات</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <LineChart data={salesTrends} />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">المبيعات حسب المنطقة</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart data={profitability} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">المبيعات حسب القناة</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart data={salesTrends} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">نظرة عامة على المشاريع</CardTitle>
            </CardHeader>
            <CardContent>
              <ProjectStatusCard stats={projectStats} showDetails />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">حالة المشاريع</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart data={projectStats.statusChart} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">تكاليف المشاريع مقابل الميزانية</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart data={projectStats.budgetChart} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts">
          <AlertsPanel alerts={alerts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExecutiveDashboardPage;
