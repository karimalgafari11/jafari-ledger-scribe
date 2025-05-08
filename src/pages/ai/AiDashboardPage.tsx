
import React from "react";
import { Header } from "@/components/Header";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bot, Brain, ChartLine, LineChart, Zap } from "lucide-react";
import { useSystemAlerts } from "@/hooks/useSystemAlerts";
import { SystemAlertCard } from "@/components/ai/SystemAlertCard";
import { InteractiveStatCard } from "@/components/ai/InteractiveStatCard";
import { useAiAssistant } from "@/hooks/useAiAssistant";

const AiDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { alerts } = useSystemAlerts();
  const { analyzePerformance } = useAiAssistant();
  const performance = analyzePerformance();

  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="لوحة تحكم الذكاء الاصطناعي" />

      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-indigo-600" />
                المساعد الذكي
              </CardTitle>
              <CardDescription>
                مساعد ذكي لتحليل البيانات والإجابة على استفساراتك
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div>جاهز للإجابة على استفساراتك</div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">متصل</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate("/ai/assistant")}
                className="w-full"
                variant="outline"
              >
                بدء محادثة جديدة
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-violet-600" />
                القرارات المالية
              </CardTitle>
              <CardDescription>
                تحليل وتوصيات مالية ذكية لتحسين أداء العمل
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div>تم تحليل الأداء المالي</div>
                <div className="bg-violet-100 text-violet-800 px-2 py-1 rounded text-xs">
                  {performance ? `${performance.recommendations.length} توصيات` : 'جاري التحليل...'}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate("/ai/financial-decisions")}
                className="w-full"
                variant="outline"
              >
                عرض القرارات المالية
              </Button>
            </CardFooter>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-teal-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLine className="h-5 w-5 text-emerald-600" />
                التوقعات المالية
              </CardTitle>
              <CardDescription>
                تنبؤات مالية مستقبلية باستخدام الذكاء الاصطناعي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <div>توقعات للأشهر القادمة</div>
                <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs">جديد</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate("/ai/financial-forecast")}
                className="w-full"
                variant="outline"
              >
                استكشاف التوقعات
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 mt-6">
          <div className="lg:col-span-4 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">تنبيهات النظام</CardTitle>
                <CardDescription>
                  التنبيهات الذكية التي تم اكتشافها من قبل النظام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.slice(0, 3).map((alert) => (
                    <SystemAlertCard key={alert.id} alert={alert} />
                  ))}
                  {alerts.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      لا توجد تنبيهات حالية
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full" onClick={() => {}}>
                  عرض جميع التنبيهات
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">الإحصائيات والتحليلات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InteractiveStatCard
                    title="مستخدمين نشطين"
                    value="24"
                    change={12}
                    isUp={true}
                  />
                  <InteractiveStatCard
                    title="معدل تحويل"
                    value="3.2%"
                    change={0.4}
                    isUp={true}
                  />
                  <InteractiveStatCard
                    title="معدل الضغط"
                    value="18%"
                    change={2.1}
                    isUp={false}
                  />
                  <InteractiveStatCard
                    title="وقت الاستجابة"
                    value="230ms"
                    change={15}
                    isUp={true}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  وحدات الذكاء الاصطناعي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div 
                  className="p-4 rounded-lg bg-blue-50 border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors"
                  onClick={() => navigate("/ai/assistant")}
                >
                  <div className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-blue-600" />
                    <h3 className="font-medium">المساعد الذكي</h3>
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground">
                    مساعد ذكي يجيب على استفساراتك ويساعدك في تحليل البيانات
                  </p>
                </div>

                <div 
                  className="p-4 rounded-lg bg-violet-50 border border-violet-100 cursor-pointer hover:bg-violet-100 transition-colors"
                  onClick={() => navigate("/ai/financial-decisions")}
                >
                  <div className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-violet-600" />
                    <h3 className="font-medium">القرارات المالية</h3>
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground">
                    تحليلات وتوصيات ذكية لتحسين الأداء المالي واتخاذ القرارات
                  </p>
                </div>

                <div 
                  className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 cursor-pointer hover:bg-emerald-100 transition-colors"
                  onClick={() => navigate("/ai/financial-forecast")}
                >
                  <div className="flex items-center gap-2">
                    <ChartLine className="h-5 w-5 text-emerald-600" />
                    <h3 className="font-medium">التوقعات المالية</h3>
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground">
                    تنبؤات مستقبلية ذكية للإيرادات والمصروفات والتدفقات النقدية
                  </p>
                </div>

                <Separator className="my-2" />

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate("/ai/settings")}
                >
                  <Zap className="h-4 w-4 ml-2" />
                  إدارة إعدادات الذكاء الاصطناعي
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">أداء النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>استخدام وحدة المعالجة المركزية</span>
                      <span className="font-medium">24%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-blue-500 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>استخدام الذاكرة</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>وقت استجابة API</span>
                      <span className="font-medium">230ms</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>دقة التوقعات</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-2 bg-purple-500 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiDashboardPage;
