
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useAiEngineSettings } from "@/hooks/useAiEngineSettings";
import { AIEngineSettings } from "@/types/ai-finance";
import { toast } from "sonner";

const AiEngineSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { settings, updateSettings, resetSettings, isLoading } = useAiEngineSettings();
  
  const handleSliderChange = (
    module: keyof AIEngineSettings,
    field: string,
    value: number[]
  ) => {
    updateSettings({
      ...settings,
      [module]: {
        ...settings[module],
        [field]: value[0]
      }
    });
  };
  
  const handleToggleChange = (
    module: keyof AIEngineSettings,
    field: string,
    value: boolean
  ) => {
    updateSettings({
      ...settings,
      [module]: {
        ...settings[module],
        [field]: value
      }
    });
  };
  
  const handleResetSettings = () => {
    resetSettings();
    toast.success("تم إعادة ضبط إعدادات محرك الذكاء الاصطناعي بنجاح");
  };
  
  const handleSaveSettings = () => {
    toast.success("تم حفظ إعدادات محرك الذكاء الاصطناعي بنجاح");
  };
  
  return (
    <div className="container mx-auto p-6 rtl">
      <Header 
        title="إعدادات محرك الذكاء الاصطناعي" 
        description="تخصيص وإدارة إعدادات محرك التحليل الذكي"
        showBack={true} 
        onBackClick={() => navigate("/ai/dashboard")}
      />
      
      <div className="mt-6">
        <Tabs defaultValue="journal" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="journal">قيود اليومية</TabsTrigger>
            <TabsTrigger value="pricing">التسعير الديناميكي</TabsTrigger>
            <TabsTrigger value="alerts">التنبيهات السلوكية</TabsTrigger>
            <TabsTrigger value="variance">تحليل التباين</TabsTrigger>
          </TabsList>
          
          <TabsContent value="journal">
            <Card>
              <CardHeader>
                <CardTitle>اقتراح قيود اليومية</CardTitle>
                <CardDescription>
                  إعدادات نظام اقتراحات القيود المحاسبية الآلية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="journalSuggestions">تفعيل اقتراحات القيود</Label>
                    <p className="text-sm text-muted-foreground">
                      السماح للنظام الذكي باقتراح قيود محاسبية بناءً على العمليات السابقة
                    </p>
                  </div>
                  <Switch
                    id="journalSuggestions"
                    checked={settings.journalEntrySuggestions.enabled}
                    onCheckedChange={(checked) => handleToggleChange('journalEntrySuggestions', 'enabled', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="journalThreshold">نسبة الثقة المطلوبة للاقتراحات</Label>
                    <span className="text-sm">{settings.journalEntrySuggestions.threshold}%</span>
                  </div>
                  <Slider
                    id="journalThreshold"
                    defaultValue={[settings.journalEntrySuggestions.threshold]}
                    min={50}
                    max={95}
                    step={5}
                    onValueChange={(value) => handleSliderChange('journalEntrySuggestions', 'threshold', value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    اختر نسبة الثقة المطلوبة قبل عرض اقتراحات القيود المحاسبية
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoCreateEntries">الإنشاء التلقائي للقيود</Label>
                    <p className="text-sm text-muted-foreground">
                      إنشاء قيود محاسبية تلقائياً عند درجة ثقة عالية (95% أو أعلى)
                    </p>
                  </div>
                  <Switch
                    id="autoCreateEntries"
                    checked={settings.journalEntrySuggestions.autoCreate}
                    onCheckedChange={(checked) => handleToggleChange('journalEntrySuggestions', 'autoCreate', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="promptTemplate">قالب إرشادات الذكاء الاصطناعي</Label>
                  <Textarea
                    id="promptTemplate"
                    placeholder="أدخل الإرشادات المخصصة لإنشاء القيود المحاسبية..."
                    rows={5}
                    className="min-h-[120px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    يمكنك تخصيص الإرشادات التي يتم تزويدها لمحرك الذكاء الاصطناعي لإنشاء قيود محاسبية أكثر دقة
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>التسعير الديناميكي</CardTitle>
                <CardDescription>
                  ضبط عملية التسعير الذكي التي تتكيف مع ظروف السوق والطلب
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="dynamicPricing">تفعيل التسعير الديناميكي</Label>
                    <p className="text-sm text-muted-foreground">
                      السماح للنظام بتعديل الأسعار تلقائياً بناءً على عوامل الطلب والتكلفة
                    </p>
                  </div>
                  <Switch
                    id="dynamicPricing"
                    checked={settings.dynamicPricing.enabled}
                    onCheckedChange={(checked) => handleToggleChange('dynamicPricing', 'enabled', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maxAdjustment">الحد الأقصى لتعديل الأسعار</Label>
                    <span className="text-sm">±{settings.dynamicPricing.maxAdjustmentPercentage}%</span>
                  </div>
                  <Slider
                    id="maxAdjustment"
                    defaultValue={[settings.dynamicPricing.maxAdjustmentPercentage]}
                    min={1}
                    max={25}
                    step={1}
                    onValueChange={(value) => handleSliderChange('dynamicPricing', 'maxAdjustmentPercentage', value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    الحد الأقصى للنسبة المئوية التي يمكن للنظام تعديل الأسعار بها صعوداً أو هبوطاً
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="frequencyDays">عدد أيام التحديث</Label>
                    <span className="text-sm">كل {settings.dynamicPricing.frequencyDays} أيام</span>
                  </div>
                  <Slider
                    id="frequencyDays"
                    defaultValue={[settings.dynamicPricing.frequencyDays]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) => handleSliderChange('dynamicPricing', 'frequencyDays', value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    عدد الأيام بين كل تحديث للأسعار
                  </p>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-medium">عوامل التسعير</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between border p-3 rounded-lg">
                      <div>
                        <Label htmlFor="considerDemand">الطلب</Label>
                        <p className="text-xs text-muted-foreground">
                          مراعاة مستويات الطلب عند التسعير
                        </p>
                      </div>
                      <Switch
                        id="considerDemand"
                        checked={settings.dynamicPricing.considerDemand}
                        onCheckedChange={(checked) => handleToggleChange('dynamicPricing', 'considerDemand', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between border p-3 rounded-lg">
                      <div>
                        <Label htmlFor="considerCost">التكلفة</Label>
                        <p className="text-xs text-muted-foreground">
                          مراعاة تغيرات التكلفة عند التسعير
                        </p>
                      </div>
                      <Switch
                        id="considerCost"
                        checked={settings.dynamicPricing.considerCost}
                        onCheckedChange={(checked) => handleToggleChange('dynamicPricing', 'considerCost', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between border p-3 rounded-lg">
                      <div>
                        <Label htmlFor="considerCompetition">المنافسة</Label>
                        <p className="text-xs text-muted-foreground">
                          مراعاة أسعار المنافسين عند التسعير
                        </p>
                      </div>
                      <Switch
                        id="considerCompetition"
                        checked={settings.dynamicPricing.considerCompetition}
                        onCheckedChange={(checked) => handleToggleChange('dynamicPricing', 'considerCompetition', checked)}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>التنبيهات السلوكية</CardTitle>
                <CardDescription>
                  إعدادات نظام التنبيهات الذكي الذي يرصد الأنماط غير العادية
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="behavioralAlerts">تفعيل التنبيهات السلوكية</Label>
                    <p className="text-sm text-muted-foreground">
                      اكتشاف الأنماط غير العادية في البيانات والمعاملات وإرسال تنبيهات
                    </p>
                  </div>
                  <Switch
                    id="behavioralAlerts"
                    checked={settings.behavioralAlerts.enabled}
                    onCheckedChange={(checked) => handleToggleChange('behavioralAlerts', 'enabled', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="learningPeriod">فترة التعلم (بالأيام)</Label>
                    <span className="text-sm">{settings.behavioralAlerts.learningPeriodDays} يوم</span>
                  </div>
                  <Slider
                    id="learningPeriod"
                    defaultValue={[settings.behavioralAlerts.learningPeriodDays]}
                    min={7}
                    max={60}
                    step={1}
                    onValueChange={(value) => handleSliderChange('behavioralAlerts', 'learningPeriodDays', value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    الفترة التي يحتاجها النظام لتعلم الأنماط الطبيعية قبل إرسال تنبيهات
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="maxDailyAlerts">الحد الأقصى للتنبيهات اليومية</Label>
                    <span className="text-sm">{settings.behavioralAlerts.maxDailyAlerts} تنبيهات</span>
                  </div>
                  <Slider
                    id="maxDailyAlerts"
                    defaultValue={[settings.behavioralAlerts.maxDailyAlerts]}
                    min={1}
                    max={20}
                    step={1}
                    onValueChange={(value) => handleSliderChange('behavioralAlerts', 'maxDailyAlerts', value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    الحد الأقصى لعدد التنبيهات التي يتم إرسالها في اليوم الواحد
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="variance">
            <Card>
              <CardHeader>
                <CardTitle>تحليل التباين</CardTitle>
                <CardDescription>
                  إعدادات نظام تحليل التباين بين القيم الفعلية والمخططة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="varianceAnalysis">تفعيل تحليل التباين</Label>
                    <p className="text-sm text-muted-foreground">
                      تحليل الاختلافات بين القيم المخططة والفعلية وتقديم توصيات
                    </p>
                  </div>
                  <Switch
                    id="varianceAnalysis"
                    checked={settings.varianceAnalysis.enabled}
                    onCheckedChange={(checked) => handleToggleChange('varianceAnalysis', 'enabled', checked)}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="thresholdPercentage">نسبة تباين الإبلاغ</Label>
                    <span className="text-sm">±{settings.varianceAnalysis.thresholdPercentage}%</span>
                  </div>
                  <Slider
                    id="thresholdPercentage"
                    defaultValue={[settings.varianceAnalysis.thresholdPercentage]}
                    min={1}
                    max={25}
                    step={1}
                    onValueChange={(value) => handleSliderChange('varianceAnalysis', 'thresholdPercentage', value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    النسبة المئوية للتباين التي يتم الإبلاغ عنها
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="analysisPeriod">فترة التحليل</Label>
                  <select
                    id="analysisPeriod"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue={settings.varianceAnalysis.analysisPeriod}
                    onChange={(e) => updateSettings({
                      ...settings,
                      varianceAnalysis: {
                        ...settings.varianceAnalysis,
                        analysisPeriod: e.target.value as any
                      }
                    })}
                  >
                    <option value="daily">يومي</option>
                    <option value="weekly">أسبوعي</option>
                    <option value="monthly">شهري</option>
                    <option value="quarterly">ربع سنوي</option>
                  </select>
                  <p className="text-xs text-muted-foreground">
                    الفترة الزمنية التي يتم فيها تحليل التباين
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-between">
          <Button 
            variant="outline"
            onClick={handleResetSettings}
          >
            إعادة الضبط للإعدادات الافتراضية
          </Button>
          
          <Button 
            onClick={handleSaveSettings}
            disabled={isLoading}
          >
            {isLoading ? "جاري الحفظ..." : "حفظ الإعدادات"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AiEngineSettingsPage;
