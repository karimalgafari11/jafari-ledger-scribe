
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAiEngineSettings } from "@/hooks/useAiEngineSettings";
import { AIEngineSettings } from "@/types/ai-finance";
import { Settings, Zap, Brain, MessageSquare, Lock, Share2, Bot, History, Database } from "lucide-react";
import { AiAssistantSettings } from "@/components/ai/AiAssistantSettings";

export const AiSettingsPanel: React.FC = () => {
  const { settings, updateSettings, resetSettings, isLoading } = useAiEngineSettings();
  const [activeTab, setActiveTab] = useState("general");
  
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
  
  const handleSaveSettings = () => {
    toast.success("تم حفظ إعدادات محرك الذكاء الاصطناعي بنجاح");
  };
  
  const handleResetSettings = () => {
    resetSettings();
    toast.success("تم إعادة ضبط الإعدادات إلى القيم الافتراضية");
  };
  
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">إعدادات محرك الذكاء الاصطناعي</CardTitle>
              <CardDescription className="mt-2 text-muted-foreground">
                قم بتخصيص وإدارة إعدادات محرك التحليل الذكي وفقًا لاحتياجات عملك
              </CardDescription>
            </div>
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center shadow-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="general" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-8 p-1 bg-muted/30 rounded-lg gap-1">
          <TabsTrigger value="general" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Settings className="h-4 w-4 mr-2" />
            <span>عام</span>
          </TabsTrigger>
          <TabsTrigger value="journal" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Database className="h-4 w-4 mr-2" />
            <span>قيود اليومية</span>
          </TabsTrigger>
          <TabsTrigger value="pricing" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Zap className="h-4 w-4 mr-2" />
            <span>التسعير</span>
          </TabsTrigger>
          <TabsTrigger value="alerts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>التنبيهات</span>
          </TabsTrigger>
          <TabsTrigger value="assistant" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Bot className="h-4 w-4 mr-2" />
            <span>المساعد الذكي</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
              <CardDescription>إعدادات التشغيل الأساسية لمحرك الذكاء الاصطناعي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enableAI">تفعيل محرك الذكاء الاصطناعي</Label>
                      <p className="text-sm text-muted-foreground">
                        تفعيل جميع وظائف الذكاء الاصطناعي في النظام
                      </p>
                    </div>
                    <Switch
                      id="enableAI"
                      checked={true}
                      onCheckedChange={() => {}}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>لغة معالجة النصوص</Label>
                    <Select defaultValue="ar">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر اللغة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">الإنجليزية</SelectItem>
                        <SelectItem value="mixed">مختلط (عربي/إنجليزي)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      اللغة المستخدمة لتحليل ومعالجة النصوص في النظام
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>دقة التحليل</Label>
                    <Select defaultValue="high">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر مستوى الدقة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">منخفضة</SelectItem>
                        <SelectItem value="medium">متوسطة</SelectItem>
                        <SelectItem value="high">عالية</SelectItem>
                        <SelectItem value="very-high">عالية جداً</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      مستوى دقة التحليل يؤثر على جودة النتائج وزمن المعالجة
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="dataSharing">مشاركة البيانات للتحسين</Label>
                      <p className="text-sm text-muted-foreground">
                        مشاركة بيانات مجهولة المصدر لتحسين جودة الخدمة
                      </p>
                    </div>
                    <Switch
                      id="dataSharing"
                      checked={false}
                      onCheckedChange={() => {}}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>وضع الحفظ التلقائي</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="اختر فترة الحفظ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">كل ساعة</SelectItem>
                        <SelectItem value="daily">يومي</SelectItem>
                        <SelectItem value="weekly">أسبوعي</SelectItem>
                        <SelectItem value="manual">يدوي</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      توقيت حفظ النماذج والتحليلات بشكل تلقائي
                    </p>
                  </div>
                  
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-md">
                    <div className="flex items-start gap-2">
                      <Lock className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-amber-800 dark:text-amber-400">تنبيه الخصوصية</h4>
                        <p className="text-xs text-amber-700 dark:text-amber-500 mt-1">
                          جميع البيانات تتم معالجتها داخل النظام الخاص بك ولا يتم مشاركتها مع أي طرف خارجي دون موافقتك الصريحة.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="api-key">مفتاح API خارجي (اختياري)</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="sk-..."
                />
                <p className="text-xs text-muted-foreground">
                  يمكنك استخدام مفتاح API خاص لتعزيز قدرات المعالجة وتخصيص الخدمة
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>حفظ سجل التحليلات</Label>
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <History className="h-4 w-4" />
                    عرض السجلات السابقة
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Share2 className="h-4 w-4" />
                    تصدير البيانات
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button 
                variant="outline"
                onClick={handleResetSettings}
              >
                إعادة الضبط للإعدادات الافتراضية
              </Button>
              
              <Button 
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
              >
                {isLoading ? "جاري الحفظ..." : "حفظ الإعدادات"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
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
                  className="py-4"
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
                  className="min-h-[120px] font-mono text-sm"
                  defaultValue={`قم بتحليل العملية التالية وإنشاء القيود المحاسبية المناسبة. تأكد من أن القيود متوازنة ومتطابقة مع طبيعة العملية وتصنيفاتها الصحيحة.`}
                />
                <p className="text-xs text-muted-foreground">
                  يمكنك تخصيص الإرشادات التي يتم تزويدها لمحرك الذكاء الاصطناعي لإنشاء قيود محاسبية أكثر دقة
                </p>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-md border border-blue-200 dark:border-blue-800">
                <h3 className="font-medium text-blue-800 dark:text-blue-400 text-sm">تعلم محرك الذكاء الاصطناعي</h3>
                <p className="text-sm text-blue-700 dark:text-blue-500 mt-1">
                  يتعلم النظام من القيود السابقة لتحسين دقة الاقتراحات المستقبلية. كلما زاد استخدامك للنظام، زادت دقة الاقتراحات المقدمة.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm" className="bg-white dark:bg-blue-900/50 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900">
                    إعادة تدريب النموذج
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button 
                variant="outline"
                onClick={handleResetSettings}
              >
                إعادة الضبط
              </Button>
              
              <Button 
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
              >
                {isLoading ? "جاري الحفظ..." : "حفظ الإعدادات"}
              </Button>
            </CardFooter>
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
                  className="py-4"
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
                  className="py-4"
                />
                <p className="text-xs text-muted-foreground">
                  عدد الأيام بين كل تحديث للأسعار
                </p>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">عوامل التسعير</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between border p-3 rounded-lg bg-white dark:bg-background/50 shadow-sm">
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
                  
                  <div className="flex items-center justify-between border p-3 rounded-lg bg-white dark:bg-background/50 shadow-sm">
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
                  
                  <div className="flex items-center justify-between border p-3 rounded-lg bg-white dark:bg-background/50 shadow-sm">
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
                  
                  <div className="flex items-center justify-between border p-3 rounded-lg bg-white dark:bg-background/50 shadow-sm">
                    <div>
                      <Label htmlFor="considerSeason">الموسمية</Label>
                      <p className="text-xs text-muted-foreground">
                        مراعاة التغيرات الموسمية عند التسعير
                      </p>
                    </div>
                    <Switch
                      id="considerSeason"
                      checked={true}
                      onCheckedChange={() => {}}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>فئات المنتجات المستهدفة</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button variant="outline" className="justify-start" size="sm">
                    <input type="checkbox" className="mr-2" checked readOnly /> الإلكترونيات
                  </Button>
                  <Button variant="outline" className="justify-start" size="sm">
                    <input type="checkbox" className="mr-2" checked readOnly /> الملابس
                  </Button>
                  <Button variant="outline" className="justify-start" size="sm">
                    <input type="checkbox" className="mr-2" checked readOnly /> الأغذية
                  </Button>
                  <Button variant="outline" className="justify-start" size="sm">
                    <input type="checkbox" className="mr-2" /> مستلزمات منزلية
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  حدد فئات المنتجات التي سيتم تطبيق التسعير الديناميكي عليها
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button 
                variant="outline"
                onClick={handleResetSettings}
              >
                إعادة الضبط
              </Button>
              
              <Button 
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
              >
                {isLoading ? "جاري الحفظ..." : "حفظ الإعدادات"}
              </Button>
            </CardFooter>
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
                  className="py-4"
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
                  className="py-4"
                />
                <p className="text-xs text-muted-foreground">
                  الحد الأقصى لعدد التنبيهات التي يتم إرسالها في اليوم الواحد
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>أنواع التنبيهات</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border p-3 rounded-lg bg-white dark:bg-background/50 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">تنبيهات المبيعات</span>
                      <Switch checked={true} onCheckedChange={() => {}} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      تنبيهات حول أنماط غير عادية في المبيعات والإيرادات
                    </p>
                  </div>
                  <div className="border p-3 rounded-lg bg-white dark:bg-background/50 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">تنبيهات المصروفات</span>
                      <Switch checked={true} onCheckedChange={() => {}} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      تنبيهات حول أنماط غير عادية في المصروفات والنفقات
                    </p>
                  </div>
                  <div className="border p-3 rounded-lg bg-white dark:bg-background/50 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">تنبيهات الاحتيال</span>
                      <Switch checked={true} onCheckedChange={() => {}} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      تنبيهات حول أنشطة مشبوهة قد تشير إلى عمليات احتيال
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>طرق الإشعار</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border p-3 rounded-lg bg-white dark:bg-background/50 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">إشعارات في التطبيق</span>
                      <Switch checked={true} onCheckedChange={() => {}} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      عرض الإشعارات داخل التطبيق
                    </p>
                  </div>
                  <div className="border p-3 rounded-lg bg-white dark:bg-background/50 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">إشعارات البريد الإلكتروني</span>
                      <Switch checked={true} onCheckedChange={() => {}} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      إرسال الإشعارات عبر البريد الإلكتروني
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-6">
              <Button 
                variant="outline"
                onClick={handleResetSettings}
              >
                إعادة الضبط
              </Button>
              
              <Button 
                onClick={handleSaveSettings}
                disabled={isLoading}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white"
              >
                {isLoading ? "جاري الحفظ..." : "حفظ الإعدادات"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="assistant">
          <AiAssistantSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
