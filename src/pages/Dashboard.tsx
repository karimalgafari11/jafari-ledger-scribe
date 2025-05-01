
import React from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart,
  Line
} from 'recharts';
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import { ScrollArea } from "@/components/ui/scroll-area";
import FinancialDecisionsWidget from "@/components/ai/FinancialDecisionsWidget";

const salesData = [
  { name: "Jan", sales: 2470 },
  { name: "Feb", sales: 3820 },
  { name: "Mar", sales: 3500 },
  { name: "Apr", sales: 4600 },
  { name: "May", sales: 4200 },
  { name: "Jun", sales: 5800 },
];

const Dashboard = () => {
  const { systemAlerts } = useAiAssistant();
  const { products } = useInventoryProducts();
  const { entries } = useJournalEntries();
  
  // حساب معلومات التقارير
  const lowStockItems = products.filter(p => p.quantity <= p.reorderLevel);
  const activeProducts = products.filter(p => p.isActive);
  
  // حساب إجمالي معاملات المبيعات حسب الشهر
  const monthlyExpenses = [
    { month: "Jan", amount: 32500 },
    { month: "Feb", amount: 28600 },
    { month: "Mar", amount: 42800 },
    { month: "Apr", amount: 35900 },
    { month: "May", amount: 38400 },
    { month: "Jun", amount: 47200 },
  ];

  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="لوحة التحكم الرئيسية" />
      
      {/* بطاقات الإحصائيات السريعة */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">إجمالي المبيعات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">152,540 ريال</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-green-600 mr-1">↑12%</span> مقارنة بالشهر الماضي
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">الفواتير غير المدفوعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 فاتورة</div>
            <p className="text-xs text-muted-foreground mt-1">بقيمة 48,250 ريال</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">المخزون منخفض</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems.length} منتجات</div>
            <p className="text-xs text-muted-foreground mt-1">
              من أصل {activeProducts.length} منتج نشط
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">القيود المحاسبية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entries.length} قيد</div>
            <p className="text-xs text-muted-foreground mt-1">
              {entries.filter(entry => entry.status === "draft").length} قيود مسودة
            </p>
          </CardContent>
        </Card>
      </div>

      {/* الرسوم البيانية والمخططات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>المبيعات الشهرية</CardTitle>
            <CardDescription>تحليل اتجاه المبيعات خلال الأشهر الستة الماضية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReBarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} ريال`, 'المبيعات']} />
                  <Bar dataKey="sales" fill="#8884d8" />
                </ReBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>المصروفات الشهرية</CardTitle>
            <CardDescription>تحليل المصروفات خلال الأشهر الستة الماضية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyExpenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} ريال`, 'المصروفات']} />
                  <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* قسم التنبيهات والقرارات المالية */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>آخر التنبيهات</CardTitle>
            <CardDescription>تنبيهات النظام والإشعارات الهامة</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[320px]">
              {systemAlerts.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  لا توجد تنبيهات جديدة
                </div>
              ) : (
                <div className="space-y-4">
                  {systemAlerts.map((alert, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      alert.priority === 'high' ? 'bg-red-50 border-red-200' : 
                      alert.priority === 'medium' ? 'bg-amber-50 border-amber-200' : 
                      'bg-blue-50 border-blue-200'
                    }`}>
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
          </CardContent>
        </Card>
        
        <FinancialDecisionsWidget />
      </div>
    </div>
  );
};

export default Dashboard;
