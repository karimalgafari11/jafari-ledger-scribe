
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area,
} from 'recharts';
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Calculator, 
  DollarSign,
  Users, 
  ShoppingCart, 
  TrendingUp, 
  AlertTriangle,
  FileText,
  Clock,
  BarChart3
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import FinancialDecisionsWidget from "@/components/ai/FinancialDecisionsWidget";
import { Button } from "@/components/ui/button";

// بيانات تمثيلية - في التطبيق الحقيقي ستأتي من API
const salesData = [
  { name: "يناير", sales: 52470, target: 45000, expenses: 32500 },
  { name: "فبراير", sales: 43820, target: 45000, expenses: 28600 },
  { name: "مارس", sales: 65500, target: 60000, expenses: 42800 },
  { name: "أبريل", sales: 74600, target: 70000, expenses: 35900 },
  { name: "مايو", sales: 84200, target: 80000, expenses: 38400 },
  { name: "يونيو", sales: 95800, target: 90000, expenses: 47200 },
];

const profitData = salesData.map(item => ({
  name: item.name,
  profit: item.sales - item.expenses,
  profitMargin: (((item.sales - item.expenses) / item.sales) * 100).toFixed(1)
}));

const customerDebtData = [
  { name: "شركة الأفق", value: 48500, percentage: 28 },
  { name: "مؤسسة النور", value: 35200, percentage: 21 },
  { name: "شركة الإبداع", value: 29800, percentage: 17 },
  { name: "مؤسسة التقدم", value: 24500, percentage: 14 },
  { name: "أخرى", value: 34000, percentage: 20 },
];

const supplierCreditData = [
  { name: "شركة المستقبل", value: 67200, percentage: 32 },
  { name: "مؤسسة الريادة", value: 54000, percentage: 25 },
  { name: "شركة التطوير", value: 38900, percentage: 19 },
  { name: "مؤسسة البناء", value: 31500, percentage: 15 },
  { name: "أخرى", value: 19400, percentage: 9 },
];

const dailySalesData = [
  { day: "السبت", sales: 12500 },
  { day: "الأحد", sales: 14800 },
  { day: "الاثنين", sales: 16200 },
  { day: "الثلاثاء", sales: 15700 },
  { day: "الأربعاء", sales: 18900 },
  { day: "الخميس", sales: 21300 },
  { day: "الجمعة", sales: 9800 },
];

const costCenterData = [
  { name: "المبيعات", value: 145000, percentage: 48 },
  { name: "التسويق", value: 87500, percentage: 29 },
  { name: "الإدارة", value: 42500, percentage: 14 },
  { name: "تقنية المعلومات", value: 27000, percentage: 9 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Dashboard = () => {
  const { systemAlerts } = useAiAssistant();
  const { products } = useInventoryProducts();
  const { entries } = useJournalEntries();

  const [date, setDate] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });
  
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [branch, setBranch] = useState<string>('all');
  const [department, setDepartment] = useState<string>('all');
  
  // حساب معلومات التقارير
  const lowStockItems = products.filter(p => p.quantity <= p.reorderLevel);
  const activeProducts = products.filter(p => p.isActive);

  // حساب إجماليات الدخل والمصروفات والربح
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalExpenses = salesData.reduce((sum, item) => sum + item.expenses, 0);
  const netProfit = totalSales - totalExpenses;
  const profitMargin = (netProfit / totalSales * 100).toFixed(1);

  // حساب الفواتير المتأخرة (مثال)
  const overdueInvoices = 12;
  const overdueTotalAmount = 48250;
  
  // مؤشرات الأداء الرئيسية
  const kpis = [
    { title: "نمو المبيعات", value: "+12.4%", status: "up", description: "مقارنة بالفترة السابقة" },
    { title: "نسبة الربح الإجمالي", value: `${profitMargin}%`, status: "up", description: "من إجمالي المبيعات" },
    { title: "متوسط قيمة الفاتورة", value: "645 ريال", status: "down", description: "انخفاض 3.2% عن الشهر السابق" },
    { title: "معدل تكرار الشراء", value: "2.8", status: "up", description: "متوسط عدد المشتريات لكل عميل" },
  ];

  return (
    <div className="container mx-auto p-6 rtl">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <Header title="لوحة التحكم الرئيسية" />
        <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
          <DatePickerWithRange
            value={date}
            onChange={setDate}
            className="min-w-[260px]"
          />
          <div className="flex gap-2">
            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="كل الفروع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">كل الفروع</SelectItem>
                <SelectItem value="branch1">الفرع الرئيسي</SelectItem>
                <SelectItem value="branch2">الفرع الشمالي</SelectItem>
                <SelectItem value="branch3">الفرع الغربي</SelectItem>
              </SelectContent>
            </Select>
            <Select value={period} onValueChange={(value: any) => setPeriod(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="فترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">يومي</SelectItem>
                <SelectItem value="weekly">أسبوعي</SelectItem>
                <SelectItem value="monthly">شهري</SelectItem>
                <SelectItem value="quarterly">ربع سنوي</SelectItem>
                <SelectItem value="yearly">سنوي</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      {/* بطاقات الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="shadow-md hover:shadow-lg transition-all">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium text-primary">الإيرادات</CardTitle>
              <CardDescription>إجمالي إيرادات الفترة</CardDescription>
            </div>
            <div className="bg-primary/10 p-2 rounded-full">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSales.toLocaleString()} ريال</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-green-600" />
              <span className="text-green-600">↑12.4%</span> مقارنة بالفترة السابقة
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-all">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium text-amber-600">المصروفات</CardTitle>
              <CardDescription>إجمالي تكاليف الفترة</CardDescription>
            </div>
            <div className="bg-amber-50 p-2 rounded-full">
              <ShoppingCart className="h-6 w-6 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalExpenses.toLocaleString()} ريال</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3.5 w-3.5 rotate-180 text-green-600" />
              <span className="text-green-600">↓3.2%</span> مقارنة بالفترة السابقة
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-all">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium text-green-600">الربح الصافي</CardTitle>
              <CardDescription>صافي الربح بعد المصروفات</CardDescription>
            </div>
            <div className="bg-green-50 p-2 rounded-full">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{netProfit.toLocaleString()} ريال</div>
            <p className="text-xs text-muted-foreground mt-1">
              نسبة الربح <span className="font-medium text-green-600">{profitMargin}%</span> من المبيعات
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-md hover:shadow-lg transition-all">
          <CardHeader className="pb-2 flex flex-row justify-between items-center">
            <div>
              <CardTitle className="text-lg font-medium text-red-600">فواتير متأخرة</CardTitle>
              <CardDescription>الفواتير المتأخرة عن السداد</CardDescription>
            </div>
            <div className="bg-red-50 p-2 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overdueInvoices} فاتورة</div>
            <p className="text-xs text-muted-foreground mt-1">
              بقيمة <span className="font-medium text-red-600">{overdueTotalAmount.toLocaleString()}</span> ريال
            </p>
          </CardContent>
        </Card>
      </div>

      {/* مؤشرات الأداء الرئيسية */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          مؤشرات الأداء الرئيسية (KPIs)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, index) => (
            <Card key={index} className="bg-gradient-to-br from-white to-gray-50 shadow-md">
              <CardContent className="pt-6">
                <div className="text-sm font-medium text-muted-foreground mb-1">{kpi.title}</div>
                <div className="text-3xl font-bold flex items-center gap-2">
                  {kpi.value}
                  {kpi.status === 'up' && <TrendingUp className="h-5 w-5 text-green-500" />}
                  {kpi.status === 'down' && <TrendingUp className="h-5 w-5 text-red-500 rotate-180" />}
                </div>
                <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* المخططات الرئيسية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                المبيعات والمصروفات
              </CardTitle>
              <Select defaultValue="monthly">
                <SelectTrigger className="w-[120px] h-8">
                  <SelectValue placeholder="عرض" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">يومي</SelectItem>
                  <SelectItem value="weekly">أسبوعي</SelectItem>
                  <SelectItem value="monthly">شهري</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <CardDescription>تحليل الإيرادات والمصروفات حسب الفترة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} ريال`]} />
                  <Legend />
                  <Bar name="المبيعات" dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
                  <Bar name="المصروفات" dataKey="expenses" fill="#FF8042" radius={[4, 4, 0, 0]} />
                  <Bar name="المستهدف" dataKey="target" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                هامش الربح
              </CardTitle>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                متوسط هامش الربح: {profitMargin}%
              </Badge>
            </div>
            <CardDescription>تطور نسبة الربح والعائد</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip formatter={(value, name) => 
                    name === "profitMargin" ? 
                    [`${value}%`, "هامش الربح"] : 
                    [`${value} ريال`, "الربح"]
                  } />
                  <Legend />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="profit" 
                    fill="rgb(136, 132, 216, 0.3)" 
                    stroke="#8884d8" 
                    name="الربح"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="profitMargin" 
                    stroke="#82ca9d" 
                    name="هامش الربح %" 
                    dot={{ stroke: '#82ca9d', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* المزيد من البيانات - العملاء، الموردين، وتحليل مراكز التكلفة */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              أعلى 5 عملاء (الديون)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={customerDebtData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {customerDebtData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} ريال`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" /> عرض تقرير العملاء المفصل
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              أعلى 5 موردين (المستحقات)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={supplierCreditData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {supplierCreditData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} ريال`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" /> عرض تقرير الموردين المفصل
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                مراكز التكلفة
              </CardTitle>
              <Select defaultValue="expenses" className="w-32">
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="عرض" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expenses">المصروفات</SelectItem>
                  <SelectItem value="revenue">الإيرادات</SelectItem>
                  <SelectItem value="profit">الأرباح</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costCenterData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {costCenterData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} ريال`]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" /> تقرير مراكز التكلفة المفصل
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* بيانات المبيعات اليومية وقسم الإشعارات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              المبيعات اليومية (الأسبوع الحالي)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} ريال`, "المبيعات"]} />
                  <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="rgb(136, 132, 216, 0.3)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                التنبيهات والإشعارات
              </CardTitle>
              <Badge className="bg-amber-100 text-amber-800 border-amber-300">{systemAlerts.length} تنبيهات جديدة</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="alerts" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="alerts" className="w-1/2">تنبيهات مالية</TabsTrigger>
                <TabsTrigger value="tasks" className="w-1/2">مهام مستحقة</TabsTrigger>
              </TabsList>
              <TabsContent value="alerts">
                <ScrollArea className="h-64 w-full">
                  {systemAlerts.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      لا توجد تنبيهات جديدة
                    </div>
                  ) : (
                    <div className="space-y-4 mt-2">
                      {systemAlerts.map((alert, index) => (
                        <div key={index} className={`p-4 rounded-lg border ${
                          alert.priority === 'high' ? 'bg-red-50 border-red-200 hover:bg-red-100' : 
                          alert.priority === 'medium' ? 'bg-amber-50 border-amber-200 hover:bg-amber-100' : 
                          'bg-blue-50 border-blue-200 hover:bg-blue-100'
                        } cursor-pointer transition-colors`}>
                          <div className="flex justify-between">
                            <h4 className={`font-medium ${
                              alert.priority === 'high' ? 'text-red-700' : 
                              alert.priority === 'medium' ? 'text-amber-700' : 
                              'text-blue-700'
                            }`}>
                              {alert.type === 'inventory' && 'المخزون'}
                              {alert.type === 'expenses' && 'المصروفات'}
                              {alert.type === 'invoices' && 'الفواتير'}
                              {alert.type === 'customers' && 'العملاء'}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {new Date(alert.timestamp).toLocaleDateString('ar-SA')}
                            </span>
                          </div>
                          <p className="text-sm mt-1">{alert.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
              <TabsContent value="tasks">
                <ScrollArea className="h-64 w-full">
                  <div className="space-y-4 mt-2">
                    <div className="p-4 rounded-lg border border-amber-200 bg-amber-50">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-amber-700">مراجعة فواتير مستحقة</h4>
                        <span className="text-xs text-gray-500">اليوم</span>
                      </div>
                      <p className="text-sm mt-1">مراجعة 8 فواتير مستحقة السداد</p>
                    </div>
                    <div className="p-4 rounded-lg border border-blue-200 bg-blue-50">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-blue-700">تسوية حسابات بنكية</h4>
                        <span className="text-xs text-gray-500">غدًا</span>
                      </div>
                      <p className="text-sm mt-1">إجراء تسوية للحسابات البنكية لشهر مايو</p>
                    </div>
                    <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-red-700">سداد مستحقات ضريبية</h4>
                        <span className="text-xs text-gray-500">بعد 3 أيام</span>
                      </div>
                      <p className="text-sm mt-1">سداد الضرائب المستحقة للربع الثاني من العام</p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm" className="text-xs">
                إعدادات التنبيهات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* FinancialDecisionsWidget من النظام الذكي */}
      <div className="mt-6">
        <FinancialDecisionsWidget />
      </div>
    </div>
  );
};

export default Dashboard;
