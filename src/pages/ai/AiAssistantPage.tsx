
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { ChatInterface } from "@/components/ai/ChatInterface";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Settings, Bot, AlertCircle, BarChart } from "lucide-react";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// بيانات افتراضية للرسوم البيانية
const performanceData = [
  { name: 'السبت', sales: 4000 },
  { name: 'الأحد', sales: 3000 },
  { name: 'الإثنين', sales: 5000 },
  { name: 'الثلاثاء', sales: 2780 },
  { name: 'الأربعاء', sales: 1890 },
  { name: 'الخميس', sales: 2390 },
  { name: 'الجمعة', sales: 3490 },
];

const categoryData = [
  { name: 'ملابس', value: 35 },
  { name: 'إلكترونيات', value: 25 },
  { name: 'أحذية', value: 20 },
  { name: 'إكسسوارات', value: 15 },
  { name: 'حقائب', value: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const AiAssistantPage = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const { systemAlerts, getLowStockProducts, getPendingExpenses } = useAiAssistant();
  
  const lowStockItems = getLowStockProducts();
  const pendingExpenses = getPendingExpenses();

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">المساعد الذكي</h1>
            <p className="text-gray-500 text-sm mt-1">
              استخدم المساعد الذكي للحصول على معلومات ودعم مخصص لإدارة أعمالك
            </p>
          </div>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 flex items-center">
            <Bot className="h-4 w-4 mr-1" />
            متصل بنموذج DeepSeek
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">مخزون منخفض</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {lowStockItems.length} منتج
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {lowStockItems.length > 0 ? "يحتاج لإعادة طلب فوراً" : "جميع المنتجات متوفرة بكميات كافية"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">مصروفات معلقة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {pendingExpenses.length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {pendingExpenses.length > 0 ? "تنتظر الموافقة" : "لا توجد مصروفات معلقة"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">فواتير غير مدفوعة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                5 فواتير
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                بقيمة 12,500 ريال
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">تنبيهات النظام</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                {systemAlerts.length}
                {systemAlerts.some(a => a.priority === "high") && (
                  <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {systemAlerts.filter(a => a.priority === "high").length} تنبيهات عالية الأولوية
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="chat">
              <MessageSquare className="ml-2 h-4 w-4" />
              المحادثة
            </TabsTrigger>
            <TabsTrigger value="insights">
              <BarChart className="ml-2 h-4 w-4" />
              التحليلات والتوصيات
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="ml-2 h-4 w-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>المساعد الذكي</CardTitle>
                <CardDescription>تحدث مع المساعد الذكي للحصول على المساعدة والمعلومات</CardDescription>
              </CardHeader>
              <CardContent>
                <ChatInterface />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights" className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>توصيات المساعد الذكي</CardTitle>
                  <CardDescription>توصيات مبنية على تحليل بيانات نظامك</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lowStockItems.length > 0 && (
                      <div className="p-4 rounded-md bg-yellow-50 border border-yellow-200">
                        <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          توصية: إعادة طلب المنتجات منخفضة المخزون
                        </h3>
                        <p className="text-sm text-amber-700 mb-2">
                          هناك {lowStockItems.length} منتج وصل مخزونها إلى الحد الأدنى أو أقل. يوصى بإعادة طلبها في أقرب وقت.
                        </p>
                        <ScrollArea className="h-24 w-full">
                          <ul className="space-y-1 text-xs">
                            {lowStockItems.map(item => (
                              <li key={item.id} className="flex justify-between">
                                <span>{item.name}</span>
                                <span className={`${item.quantity === 0 ? 'text-red-500 font-bold' : 'text-amber-700'}`}>
                                  {item.quantity} / {item.reorderLevel}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                      </div>
                    )}
                    
                    {pendingExpenses.length > 0 && (
                      <div className="p-4 rounded-md bg-blue-50 border border-blue-200">
                        <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-2" />
                          توصية: مراجعة المصروفات المعلقة
                        </h3>
                        <p className="text-sm text-blue-700 mb-2">
                          هناك {pendingExpenses.length} مصروفات تنتظر الموافقة منذ أكثر من 3 أيام.
                        </p>
                      </div>
                    )}
                    
                    <div className="p-4 rounded-md bg-green-50 border border-green-200">
                      <h3 className="font-medium text-green-800 mb-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        توصية: التركيز على المنتجات الأكثر مبيعاً
                      </h3>
                      <p className="text-sm text-green-700">
                        وفقاً لتحليل البيانات، المنتجات الأكثر مبيعاً الشهر الحالي هي "قميص قطني" و "بنطلون جينز". يُنصح بزيادة المخزون وعمل عروض ترويجية.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>المبيعات الأسبوعية</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReBarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="sales" fill="#8884d8" />
                    </ReBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>المبيعات حسب التصنيف</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات المساعد الذكي</CardTitle>
                <CardDescription>تخصيص إعدادات الذكاء الاصطناعي</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">نموذج الذكاء الاصطناعي</h3>
                    <p className="text-sm text-gray-500">يتم حالياً استخدام نموذج DeepSeek للمساعد الذكي. هذا النموذج مناسب للغة العربية والإنجليزية.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">التنبيهات التلقائية</h3>
                    <p className="text-sm text-gray-500">المساعد مهيأ لإرسال تنبيهات تلقائية عند وصول المخزون للمستويات الحرجة، أو عند وجود فواتير متأخرة.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">الاتصال بقاعدة البيانات</h3>
                    <p className="text-sm text-gray-500">المساعد متصل بقواعد بيانات المخزون، العملاء، المصروفات والفواتير لتقديم معلومات دقيقة ومحدثة.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">الوصول للبيانات</h3>
                    <Badge className="ml-1">المخزون</Badge>
                    <Badge className="ml-1">العملاء</Badge>
                    <Badge className="ml-1">المصروفات</Badge>
                    <Badge className="ml-1">المبيعات</Badge>
                    <Badge className="ml-1">الحسابات</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AiAssistantPage;
