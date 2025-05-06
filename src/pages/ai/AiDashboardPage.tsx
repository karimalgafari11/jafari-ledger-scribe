
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
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
  const { getSystemAlerts, analyzePerformance } = useAiAssistant();
  const [activeTab, setActiveTab] = useState<"suggestions" | "alerts">("suggestions");
  
  const alerts = getSystemAlerts();
  const performance = analyzePerformance();
  
  const handleNavigateToAssistant = () => {
    navigate("/ai/assistant");
  };
  
  const handleNavigateToFinancialDecisions = () => {
    navigate("/ai/financial-decisions");
  };
  
  const handleNavigateToSettings = () => {
    navigate("/ai/settings");
  };

  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="الذكاء الاصطناعي" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* Stats Column */}
        <div className="col-span-1 space-y-6">
          <Card className="shadow-sm border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle>إحصائيات الذكاء الاصطناعي</CardTitle>
              <CardDescription>مؤشرات استخدام وفعالية النظام الذكي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <InteractiveStatCard
                title="معدل دقة التوصيات"
                value="94%"
                description="معدل دقة التوصيات المالية خلال الشهر الماضي"
                icon={Zap}
                trend="up"
                trendValue="5% تحسن عن الشهر السابق"
                animation="scale"
                color="blue"
                onClick={handleNavigateToFinancialDecisions}
              />
              
              <InteractiveStatCard
                title="استفسارات تم الرد عليها"
                value="187"
                description="إجمالي الاستفسارات التي تم الرد عليها هذا الشهر"
                icon={Bot}
                trend="up"
                trendValue="12% زيادة عن الشهر السابق"
                animation="pulse"
                color="green"
                onClick={handleNavigateToAssistant}
              />
              
              <InteractiveStatCard
                title="توصيات مالية فعالة"
                value="23"
                description="عدد التوصيات المالية التي وفرت تكاليف أو زادت الإيرادات"
                icon={LineChart}
                trend="neutral"
                trendValue="مستقر منذ الشهر الماضي"
                animation="fade"
                color="amber"
                onClick={handleNavigateToFinancialDecisions}
              />
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-blue-100">
            <CardHeader className="pb-2">
              <CardTitle>إجراءات سريعة</CardTitle>
              <CardDescription>وصول سريع للوظائف الأكثر استخداماً</CardDescription>
            </CardHeader>
            <CardContent>
              <QuickActionCard 
                title="طرح سؤال للمساعد الذكي"
                description="الحصول على إجابات فورية لأسئلتك حول الحسابات والمالية"
                onClick={handleNavigateToAssistant}
              />
              
              <QuickActionCard 
                title="عرض القرارات المالية"
                description="استعراض التوصيات المالية والقرارات الذكية"
                onClick={handleNavigateToFinancialDecisions}
              />
              
              <QuickActionCard 
                title="تخصيص إعدادات الذكاء الاصطناعي"
                description="ضبط وتخصيص إعدادات النظام الذكي حسب احتياجاتك"
                onClick={handleNavigateToSettings}
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Center Column - Alerts & Suggestions */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-blue-100">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>التنبيهات والتوصيات</CardTitle>
                <div className="flex space-x-1">
                  <Badge 
                    className={`mx-1 cursor-pointer ${activeTab === 'suggestions' ? 'bg-primary' : 'bg-secondary'}`}
                    onClick={() => setActiveTab('suggestions')}
                  >
                    التوصيات
                  </Badge>
                  <Badge 
                    className={`mx-1 cursor-pointer ${activeTab === 'alerts' ? 'bg-primary' : 'bg-secondary'}`}
                    variant={activeTab === 'alerts' ? 'default' : 'secondary'}
                    onClick={() => setActiveTab('alerts')}
                  >
                    التنبيهات {alerts.length > 0 && <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full ml-2">{alerts.length}</span>}
                  </Badge>
                </div>
              </div>
              <CardDescription>
                {activeTab === 'suggestions' ? 'توصيات مخصصة لتحسين أداء عملك' : 'تنبيهات هامة من النظام الذكي'}
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              {activeTab === 'suggestions' && (
                <div className="space-y-4">
                  <AiSuggestionCard
                    title="تحسين التدفق النقدي"
                    description="يمكن تحسين التدفق النقدي من خلال إعادة جدولة المدفوعات للموردين. تحليل البيانات يشير إلى إمكانية توفير 15% من التكاليف الشهرية."
                    confidence={87}
                    impact="مرتفع"
                    impactValue={15000}
                    type="cost_saving"
                    onAccept={() => console.log("تم قبول الاقتراح")}
                    onDismiss={() => console.log("تم رفض الاقتراح")}
                    onViewDetails={handleNavigateToFinancialDecisions}
                  />
                  
                  <AiSuggestionCard
                    title="تسعير المنتجات"
                    description="تحليل مرونة الطلب على المنتجات الأكثر مبيعاً يشير إلى إمكانية زيادة الأسعار بنسبة 5% دون التأثير على حجم المبيعات."
                    confidence={92}
                    impact="متوسط"
                    impactValue={8500}
                    type="revenue_increase"
                    onAccept={() => console.log("تم قبول الاقتراح")}
                    onDismiss={() => console.log("تم رفض الاقتراح")}
                    onViewDetails={handleNavigateToFinancialDecisions}
                  />
                  
                  <AiSuggestionCard
                    title="خصومات العملاء"
                    description="يوصى بمراجعة نظام الخصومات للعملاء حيث تشير البيانات إلى أن 30% من الخصومات الممنوحة لا تؤثر إيجابياً على سلوك الشراء."
                    confidence={78}
                    impact="منخفض"
                    impactValue={3200}
                    type="revenue_increase"
                    onAccept={() => console.log("تم قبول الاقتراح")}
                    onDismiss={() => console.log("تم رفض الاقتراح")}
                    onViewDetails={handleNavigateToFinancialDecisions}
                  />
                </div>
              )}
              
              {activeTab === 'alerts' && (
                <div className="space-y-4">
                  {alerts.length > 0 ? (
                    alerts.map((alert, index) => (
                      <SystemAlertCard
                        key={index}
                        title={alert.title}
                        description={alert.description}
                        severity={alert.severity}
                        timestamp={alert.timestamp}
                        isRead={alert.isRead}
                        source={alert.source}
                        onMarkAsRead={() => console.log("Marked as read", alert)}
                        onDismiss={() => console.log("Dismissed alert", alert)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <h3 className="mt-4 text-lg font-medium">لا توجد تنبيهات حالياً</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        سيتم إظهار التنبيهات الهامة هنا حال ظهورها
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* AI Performance card */}
          {performance && (
            <Card className="shadow-sm border-blue-100">
              <CardHeader className="pb-2">
                <CardTitle>تحليل الأداء المالي</CardTitle>
                <CardDescription>
                  رؤية تحليلية مستندة على البيانات المالية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium">الربحية</h4>
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">هامش الربح</span>
                          <span className={`text-sm ${performance.profitMargin > 20 ? 'text-green-600' : 'text-amber-600'}`}>
                            {performance.profitMargin}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-600 h-1.5 rounded-full" 
                            style={{ width: `${Math.min(performance.profitMargin, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg border bg-card">
                      <h4 className="font-medium">السيولة</h4>
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-muted-foreground">نسبة التداول</span>
                          <span className={`text-sm ${performance.currentRatio > 1.5 ? 'text-green-600' : 'text-amber-600'}`}>
                            {performance.currentRatio}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div 
                            className="bg-green-600 h-1.5 rounded-full" 
                            style={{ width: `${Math.min(performance.currentRatio * 33, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleNavigateToFinancialDecisions}
                  >
                    عرض التحليل الكامل للأداء المالي
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiDashboardPage;
