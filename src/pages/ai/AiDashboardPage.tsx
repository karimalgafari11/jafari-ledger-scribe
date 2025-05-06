import React, { useState } from "react";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { Badge } from "@/components/ui/badge";
import { Bot, Zap, LineChart, Settings, AlertTriangle } from "lucide-react";
import { SystemAlertCard } from "@/components/ai/SystemAlertCard";
import { InteractiveStatCard } from "@/components/ai/InteractiveStatCard";
import { QuickActionCard } from "@/components/ai/QuickActionCard";
import { AiSuggestionCard } from "@/components/ai/AiSuggestionCard";

const AiDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { systemAlerts, isLoading, scanForSystemErrors, analyzePerformance } = useAiAssistant();
  const [insights, setInsights] = useState<any>({
    loading: false,
    data: null
  });

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleScanSystem = async () => {
    try {
      const results = await scanForSystemErrors();
      setInsights({
        loading: false,
        data: results
      });
    } catch (error) {
      console.error("Error scanning system:", error);
    }
  };

  const performanceInsights = analyzePerformance();

  // Filter high priority alerts
  const highPriorityAlerts = systemAlerts.filter(alert => alert.priority === "high");
  
  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="الذكاء الاصطناعي" showBack={true} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-3 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm border-blue-100">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl font-bold text-blue-900">مرحباً بك في نظام الذكاء الاصطناعي</CardTitle>
                <CardDescription className="text-blue-700">
                  اكتشف قوة الذكاء الاصطناعي في إدارة أعمالك وتحسين قراراتك
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                الإصدار 1.0
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700 mb-4">
              يقدم نظام الذكاء الاصطناعي المتكامل مجموعة من الأدوات والخدمات المصممة خصيصاً لتحسين عمليات الأعمال وتقديم رؤى قيمة من البيانات.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="default"
                className="bg-gradient-to-r from-blue-600 to-indigo-600"
                onClick={() => handleNavigate("/ai/assistant")}
              >
                <Bot className="ml-1 h-4 w-4" />
                المساعد الذكي
              </Button>
              <Button 
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                onClick={() => handleNavigate("/ai/financial-decisions")}
              >
                <LineChart className="ml-1 h-4 w-4" />
                التحليل المالي
              </Button>
              <Button 
                variant="outline"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
                onClick={() => handleNavigate("/ai/settings")}
              >
                <Settings className="ml-1 h-4 w-4" />
                إعدادات الذكاء الاصطناعي
              </Button>
              <Button 
                variant="outline"
                className="border-amber-200 text-amber-700 hover:bg-amber-50"
                onClick={handleScanSystem}
              >
                <AlertTriangle className="ml-1 h-4 w-4" />
                فحص النظام
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <InteractiveStatCard 
              title="المخزون المنخفض"
              value={highPriorityAlerts.filter(a => a.type === "inventory").length.toString()} // Convert number to string
              description="منتجات تحتاج إعادة طلب"
              colorClass="bg-amber-50 border-amber-200"
              textClass="text-amber-700"
              onClick={() => handleNavigate("/inventory/products")}
            />
            <InteractiveStatCard 
              title="التحسينات المقترحة"
              value="4" // Changed from number to string
              description="تحسينات لزيادة الكفاءة"
              colorClass="bg-blue-50 border-blue-200"
              textClass="text-blue-700"
              onClick={() => {}}
            />
            <InteractiveStatCard 
              title="الفرص المحتملة"
              value={(performanceInsights.topProduct ? 1 : 0).toString()} // Convert number to string
              description="فرص لزيادة المبيعات"
              colorClass="bg-green-50 border-green-200"
              textClass="text-green-700"
              onClick={() => handleNavigate("/dashboard")}
            />
          </div>
          
          {highPriorityAlerts.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-medium text-gray-800 mb-2">التنبيهات ذات الأولوية العالية</h2>
              <div className="space-y-3">
                {highPriorityAlerts.slice(0, 3).map((alert, index) => (
                  <SystemAlertCard key={index} alert={alert} />
                ))}
                {highPriorityAlerts.length > 3 && (
                  <Button 
                    variant="ghost" 
                    className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    onClick={() => {}}
                  >
                    عرض {highPriorityAlerts.length - 3} تنبيهات إضافية
                  </Button>
                )}
              </div>
            </div>
          )}
          
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-2">التوصيات الذكية</h2>
            <div className="grid gap-3">
              <AiSuggestionCard 
                title="تعديل أسعار المنتجات"
                description="يقترح النظام تعديل أسعار 3 منتجات بناءً على تغيرات التكلفة والطلب في السوق"
                actionText="عرض التفاصيل"
                onAction={() => {}}
                icon={<LineChart className="h-5 w-5 text-blue-600" />}
              />
              <AiSuggestionCard 
                title="العملاء المحتملون للتواصل"
                description="هناك 5 عملاء لم يقوموا بالشراء منذ فترة ويحتمل عودتهم مع عرض خاص"
                actionText="إنشاء حملة"
                onAction={() => {}}
                icon={<Zap className="h-5 w-5 text-indigo-600" />}
              />
            </div>
          </div>
        </div>
        
        <div>
          <div className="space-y-4">
            <Card className="shadow-sm border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">الإجراءات السريعة</CardTitle>
                <CardDescription>إجراءات مدعومة بالذكاء الاصطناعي</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <QuickActionCard
                  title="تحليل المبيعات"
                  description="تحليل أ��ماط المبيعات والعملاء"
                  onClick={() => {}}
                />
                <QuickActionCard
                  title="التنبؤ بالمخزون"
                  description="توقع احتياجات المخزون المستقبلية"
                  onClick={() => {}}
                />
                <QuickActionCard
                  title="اقتراح قيود محاسبية"
                  description="توليد قيود محاسبية ذكية"
                  onClick={() => {}}
                />
                <QuickActionCard
                  title="تحسين التسعير"
                  description="تحليل وتعديل استراتيجيات التسعير"
                  onClick={() => {}}
                />
              </CardContent>
            </Card>
            
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
              onClick={() => handleNavigate("/ai/assistant")}
            >
              <Bot className="ml-1 h-4 w-4" />
              التحدث مع المساعد الذكي
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiDashboardPage;
