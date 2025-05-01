
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { ChatInterface } from "@/components/ai/ChatInterface";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  MessageSquare, 
  Settings, 
  Bot, 
  AlertCircle, 
  BarChart, 
  Calculator, 
  Database, 
  Users, 
  FileText, 
  Inbox,
  HelpCircle
} from "lucide-react";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart as ReBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ReTooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { QuickActionCard } from "@/components/ai/QuickActionCard";
import { SystemAlertCard } from "@/components/ai/SystemAlertCard";
import { AiSuggestionCard } from "@/components/ai/AiSuggestionCard";
import { InteractiveStatCard } from "@/components/ai/InteractiveStatCard";
import { AiAnalyticsPanel } from "@/components/ai/AiAnalyticsPanel";
import { AiRulesPanel } from "@/components/ai/AiRulesPanel";
import { AiSettingsPanel } from "@/components/ai/AiSettingsPanel";

// بيانات افتراضية للرسوم البيانية
const performanceData = [
  { name: 'السبت', sales: 4000, expenses: 2400, profit: 1600 },
  { name: 'الأحد', sales: 3000, expenses: 1398, profit: 1602 },
  { name: 'الإثنين', sales: 5000, expenses: 3800, profit: 1200 },
  { name: 'الثلاثاء', sales: 2780, expenses: 2200, profit: 580 },
  { name: 'الأربعاء', sales: 1890, expenses: 1100, profit: 790 },
  { name: 'الخميس', sales: 2390, expenses: 1500, profit: 890 },
  { name: 'الجمعة', sales: 3490, expenses: 2100, profit: 1390 }
];

const categoryData = [
  { name: 'ملابس', value: 35 },
  { name: 'إلكترونيات', value: 25 },
  { name: 'أحذية', value: 20 },
  { name: 'إكسسوارات', value: 15 },
  { name: 'حقائب', value: 5 }
];

const customerData = [
  { name: 'ولاء', value: 80 },
  { name: 'جدد', value: 45 },
  { name: 'متكررين', value: 60 },
  { name: 'فقدوا', value: 25 }
];

const inventoryData = [
  { name: 'ملابس', stock: 85, optimal: 100 },
  { name: 'إلكترونيات', stock: 45, optimal: 50 },
  { name: 'أحذية', stock: 30, optimal: 40 },
  { name: 'إكسسوارات', stock: 95, optimal: 80 },
  { name: 'حقائب', stock: 15, optimal: 30 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// البيانات المتعلقة بقوانين المحاسبة والأعمال الذكية
const aiQuickActions = [
  {
    title: "إنشاء قيد محاسبي",
    description: "إنشاء قيد محاسبي آلي بناءً على أنماط البيانات",
    icon: Calculator,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "تقرير الأرباح والخسائر",
    description: "استخراج تقرير الأرباح والخسائر للشهر الحالي",
    icon: FileText,
    color: "bg-green-100 text-green-600"
  },
  {
    title: "متابعة العملاء المتأخرين",
    description: "تقرير بالعملاء المتأخرين عن السداد",
    icon: Users,
    color: "bg-amber-100 text-amber-600"
  },
  {
    title: "تحليل المخزون",
    description: "تحليل حالة المخزون والبنود التي تحتاج لإعادة طلب",
    icon: Database,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "مراجعة الفواتير",
    description: "مراجعة الفواتير غير المدفوعة والقريبة من الاستحقاق",
    icon: Inbox,
    color: "bg-rose-100 text-rose-600"
  },
  {
    title: "المساعدة وأسئلة متكررة",
    description: "الحصول على مساعدة حول استخدام النظام",
    icon: HelpCircle,
    color: "bg-cyan-100 text-cyan-600"
  }
];

const AiAssistantPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const { systemAlerts, getLowStockProducts, getPendingExpenses } = useAiAssistant();
  
  const lowStockItems = getLowStockProducts();
  const pendingExpenses = getPendingExpenses();

  return (
    <Layout>
      <div className="flex flex-col h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
        {/* رأس الصفحة مع المعلومات الأساسية */}
        <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              <Bot className="mr-2" /> المساعد الذكي
            </h1>
            <p className="text-blue-100 text-sm mt-1">
              استخدم المساعد الذكي للحصول على معلومات ومساعدة مخصصة لإدارة أعمالك
            </p>
          </div>
          <Badge variant="outline" className="bg-white/20 text-white border-white/30 backdrop-blur-sm flex items-center px-3 py-1">
            <Bot className="h-4 w-4 mr-2" />
            متصل بنموذج DeepSeek AI
          </Badge>
        </div>

        {/* المؤشرات والإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-6 pt-6">
          <InteractiveStatCard 
            title="مخزون منخفض" 
            value={`${lowStockItems.length} منتج`}
            description={lowStockItems.length > 0 ? "يحتاج لإعادة طلب فوراً" : "جميع المنتجات متوفرة بكميات كافية"}
            icon={Database} 
            trend={lowStockItems.length > 5 ? "down" : "up"}
            trendValue={`${lowStockItems.length > 5 ? "-" : "+"}${Math.floor(Math.random() * 15 + 5)}%`}
            animation="pulse"
          />
          
          <InteractiveStatCard 
            title="مصروفات معلقة" 
            value={`${pendingExpenses.length}`}
            description={pendingExpenses.length > 0 ? "تنتظر الموافقة" : "لا توجد مصروفات معلقة"}
            icon={Calculator}
            trend="neutral"
            animation="fade"
          />
          
          <InteractiveStatCard 
            title="فواتير غير مدفوعة" 
            value="5 فواتير"
            description="بقيمة 12,500 ريال"
            icon={FileText}
            trend="down"
            trendValue="-15%"
            animation="scale"
          />
          
          <InteractiveStatCard 
            title="تنبيهات النظام" 
            value={`${systemAlerts.length}`}
            description={`${systemAlerts.filter(a => a.priority === "high").length} تنبيهات عالية الأولوية`}
            icon={AlertCircle}
            trend={systemAlerts.some(a => a.priority === "high") ? "down" : "up"}
            animation={systemAlerts.some(a => a.priority === "high") ? "pulse" : "fade"}
            color={systemAlerts.some(a => a.priority === "high") ? "red" : "blue"}
          />
        </div>

        {/* التبويبات الرئيسية */}
        <div className="flex-1 overflow-hidden px-6 pb-6 mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
            <TabsList className="mb-4 bg-white/70 backdrop-blur-sm p-1 rounded-xl">
              <TabsTrigger value="chat" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg">
                <MessageSquare className="ml-2 h-4 w-4" />
                المحادثة
              </TabsTrigger>
              <TabsTrigger value="quick-actions" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg">
                <Bot className="ml-2 h-4 w-4" />
                إجراءات سريعة
              </TabsTrigger>
              <TabsTrigger value="insights" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg">
                <BarChart className="ml-2 h-4 w-4" />
                التحليلات والتوصيات
              </TabsTrigger>
              <TabsTrigger value="accounting-rules" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg">
                <Calculator className="ml-2 h-4 w-4" />
                قوانين المحاسبة
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-br data-[state=active]:from-blue-500 data-[state=active]:to-indigo-600 data-[state=active]:text-white rounded-lg">
                <Settings className="ml-2 h-4 w-4" />
                الإعدادات
              </TabsTrigger>
            </TabsList>
            
            {/* محتوى تبويب المحادثة */}
            <TabsContent value="chat" className="h-full overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-full">
                <Card className="lg:col-span-3 h-full overflow-hidden bg-white/70 backdrop-blur-sm border-blue-100">
                  <CardHeader className="pb-2 border-b border-blue-50">
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-blue-500" /> 
                      المساعد الذكي
                    </CardTitle>
                    <CardDescription>تحدث مع المساعد الذكي للحصول على المساعدة والمعلومات</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 h-[calc(100%-80px)]">
                    <ChatInterface />
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  {/* تنبيهات النظام */}
                  <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                        تنبيهات النظام
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-[300px] overflow-auto p-3">
                      <ScrollArea className="h-full">
                        {systemAlerts.length > 0 ? (
                          <div className="space-y-2">
                            {systemAlerts.slice(0, 3).map((alert, i) => (
                              <SystemAlertCard key={i} alert={alert} />
                            ))}
                            {systemAlerts.length > 3 && (
                              <p className="text-center text-xs text-blue-500 hover:underline cursor-pointer mt-2">
                                عرض {systemAlerts.length - 3} تنبيه إضافي
                              </p>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 text-center">
                            لا توجد تنبيهات حالية
                          </p>
                        )}
                      </ScrollArea>
                    </CardContent>
                  </Card>
                  
                  {/* اقتراحات المساعد الذكي */}
                  <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center">
                        <Bot className="h-4 w-4 mr-2 text-blue-500" />
                        اقتراحات ذكية
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="max-h-[200px] overflow-auto p-3">
                      <ScrollArea className="h-full">
                        <div className="space-y-2">
                          <AiSuggestionCard
                            title="تقرير المبيعات الأسبوعي"
                            description="هل تريد إنشاء تقرير المبيعات الأسبوعي كالمعتاد؟"
                            actionText="إنشاء التقرير"
                          />
                          <AiSuggestionCard
                            title="فواتير مستحقة"
                            description="يوجد 3 فواتير مستحقة خلال الأسبوع القادم"
                            actionText="عرض الفواتير"
                          />
                          <AiSuggestionCard
                            title="عميل جديد"
                            description="تم تسجيل عميل جديد اليوم. هل تريد مراجعة البيانات؟"
                            actionText="مراجعة"
                          />
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* محتوى تبويب الإجراءات السريعة */}
            <TabsContent value="quick-actions" className="h-full overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiQuickActions.map((action, index) => (
                  <QuickActionCard
                    key={index}
                    title={action.title}
                    description={action.description}
                    icon={action.icon}
                    colorClass={action.color}
                  />
                ))}
              </div>
              
              <Card className="mt-6 bg-white/70 backdrop-blur-sm border-blue-100">
                <CardHeader>
                  <CardTitle>سجل النشاطات الذكية</CardTitle>
                  <CardDescription>الإجراءات السابقة التي تم تنفيذها بواسطة المساعد الذكي</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">إنشاء تقرير المبيعات الشهري</h3>
                          <p className="text-sm text-gray-600">تم إنشاء تقرير المبيعات لشهر أبريل 2025</p>
                        </div>
                        <Badge>اليوم 13:45</Badge>
                      </div>
                      <div className="flex justify-end mt-2">
                        <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md hover:bg-blue-200">
                          إعادة التنفيذ
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">إرسال تذكيرات للعملاء المتأخرين</h3>
                          <p className="text-sm text-gray-600">تم إرسال 5 تذكيرات للعملاء المتأخرين عن السداد</p>
                        </div>
                        <Badge>أمس 10:30</Badge>
                      </div>
                      <div className="flex justify-end mt-2">
                        <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md hover:bg-blue-200">
                          إعادة التنفيذ
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">إنشاء قيد محاسبي لتسوية المخزون</h3>
                          <p className="text-sm text-gray-600">تم إنشاء قيد محاسبي لتسوية المخزون بقيمة 4,500 ريال</p>
                        </div>
                        <Badge>30/04/2025</Badge>
                      </div>
                      <div className="flex justify-end mt-2">
                        <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md hover:bg-blue-200">
                          إعادة التنفيذ
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* محتوى تبويب التحليلات والتوصيات */}
            <TabsContent value="insights" className="h-full overflow-auto">
              <AiAnalyticsPanel 
                performanceData={performanceData}
                categoryData={categoryData}
                customerData={customerData}
                inventoryData={inventoryData}
                lowStockItems={lowStockItems}
                pendingExpenses={pendingExpenses}
                COLORS={COLORS}
              />
            </TabsContent>
            
            {/* محتوى تبويب قوانين المحاسبة */}
            <TabsContent value="accounting-rules" className="h-full overflow-auto">
              <AiRulesPanel />
            </TabsContent>
            
            {/* محتوى تبويب الإعدادات */}
            <TabsContent value="settings" className="h-full overflow-auto">
              <AiSettingsPanel />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default AiAssistantPage;
