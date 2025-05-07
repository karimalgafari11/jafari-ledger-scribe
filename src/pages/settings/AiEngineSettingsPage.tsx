
import React from 'react';
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { AlertCircle, CloudCog, Settings2, Zap, Database, UserPlus2, LineChart, Brain, Clipboard, ShieldAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AiEngineSettingsPage = () => {
  const [loading, setLoading] = React.useState(false);
  const [aiSettings, setAiSettings] = React.useState({
    enabled: true,
    model: "gpt-4",
    apiKey: "••••••••••••••••••••••••••",
    maxTokens: 2000,
    temperature: 0.7,
    suggestionsEnabled: true,
    alertsEnabled: true,
    dataAccess: "all",
    privacyLevel: "high",
    retentionDays: 30,
    customPrompt: "",
    autoAnalysis: true,
    financialInsights: true,
    inventoryPredictions: true,
    customerSegmentation: true
  });
  
  const handleChange = (key: string, value: any) => {
    setAiSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSaveChanges = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("تم حفظ إعدادات الذكاء الاصطناعي بنجاح");
    }, 1000);
  };
  
  const handleResetDefaults = () => {
    if (window.confirm("هل أنت متأكد من إعادة ضبط جميع إعدادات الذكاء الاصطناعي؟")) {
      setAiSettings({
        enabled: true,
        model: "gpt-4",
        apiKey: "••••••••••••••••••••••••••",
        maxTokens: 2000,
        temperature: 0.7,
        suggestionsEnabled: true,
        alertsEnabled: true,
        dataAccess: "all",
        privacyLevel: "high",
        retentionDays: 30,
        customPrompt: "",
        autoAnalysis: true,
        financialInsights: true,
        inventoryPredictions: true,
        customerSegmentation: true
      });
      toast.success("تم إعادة ضبط إعدادات الذكاء الاصطناعي للقيم الافتراضية");
    }
  };
  
  const handleRegenerateApiKey = () => {
    if (window.confirm("هل أنت متأكد من إعادة إنشاء مفتاح API؟ سيتم إلغاء المفتاح الحالي.")) {
      toast.success("تم إعادة إنشاء مفتاح API بنجاح");
    }
  };

  return (
    <Layout>
      <Header 
        title="إعدادات محرك الذكاء الاصطناعي" 
        description="تخصيص وإدارة إعدادات محرك الذكاء الاصطناعي المدمج"
        showBack={true}
      />
      
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <CloudCog className="h-8 w-8 text-primary ml-2" />
            <div>
              <h2 className="text-2xl font-bold">محرك الذكاء الاصطناعي</h2>
              <p className="text-sm text-muted-foreground">إدارة وتخصيص إعدادات محرك الذكاء الاصطناعي المدمج في النظام</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Switch 
              checked={aiSettings.enabled} 
              onCheckedChange={(value) => handleChange('enabled', value)} 
              id="ai-enabled" 
            />
            <Label htmlFor="ai-enabled" className="mr-2">
              {aiSettings.enabled ? "مفعل" : "معطل"}
            </Label>
          </div>
        </div>
        
        {!aiSettings.enabled && (
          <Alert className="mb-6 border-amber-300 bg-amber-50 text-amber-900">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>محرك الذكاء الاصطناعي معطل</AlertTitle>
            <AlertDescription>
              تم تعطيل محرك الذكاء الاصطناعي. لن تتلقى أي تحليلات أو توصيات أو تنبيهات ذكية.
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">الإعدادات العامة</TabsTrigger>
            <TabsTrigger value="privacy">الخصوصية والأمان</TabsTrigger>
            <TabsTrigger value="features">ميزات التحليل</TabsTrigger>
            <TabsTrigger value="integration">التكامل</TabsTrigger>
          </TabsList>
          
          {/* الإعدادات العامة */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings2 className="ml-2" size={20} />
                  الإعدادات العامة
                </CardTitle>
                <CardDescription>
                  إعدادات نموذج الذكاء الاصطناعي الأساسية
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="model">نموذج الذكاء الاصطناعي</Label>
                    <Select 
                      value={aiSettings.model}
                      onValueChange={(value) => handleChange('model', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النموذج" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4 (أعلى دقة، أبطأ)</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo (سريع، موازنة)</SelectItem>
                        <SelectItem value="local-model">النموذج المحلي (خصوصية أعلى)</SelectItem>
                        <SelectItem value="custom">نموذج مخصص</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="apiKey">مفتاح API</Label>
                    <div className="flex gap-2">
                      <Input 
                        id="apiKey" 
                        value={aiSettings.apiKey} 
                        onChange={(e) => handleChange('apiKey', e.target.value)}
                        type="password"
                        disabled={aiSettings.model === "local-model"}
                      />
                      <Button variant="outline" onClick={handleRegenerateApiKey}>إعادة إنشاء</Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>درجة الإبداعية (Temperature)</Label>
                    <span className="text-sm">{aiSettings.temperature}</span>
                  </div>
                  <Slider 
                    min={0} 
                    max={1} 
                    step={0.1} 
                    value={[aiSettings.temperature]}
                    onValueChange={(value) => handleChange('temperature', value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>أكثر دقة وتحديدًا</span>
                    <span>أكثر إبداعًا وتنوعًا</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>الحد الأقصى للرموز (Max Tokens)</Label>
                    <span className="text-sm">{aiSettings.maxTokens}</span>
                  </div>
                  <Slider 
                    min={500} 
                    max={8000} 
                    step={500} 
                    value={[aiSettings.maxTokens]}
                    onValueChange={(value) => handleChange('maxTokens', value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>أقصر (أقل تكلفة)</span>
                    <span>أطول (أكثر تفاصيل)</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="block mb-1">التوصيات التلقائية</Label>
                      <p className="text-sm text-muted-foreground">تمكين عرض التوصيات التلقائية في لوحة التحكم</p>
                    </div>
                    <Switch 
                      checked={aiSettings.suggestionsEnabled} 
                      onCheckedChange={(value) => handleChange('suggestionsEnabled', value)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="block mb-1">التنبيهات الذكية</Label>
                      <p className="text-sm text-muted-foreground">تمكين التنبيهات الذكية للمشاكل والفرص المحتملة</p>
                    </div>
                    <Switch 
                      checked={aiSettings.alertsEnabled} 
                      onCheckedChange={(value) => handleChange('alertsEnabled', value)} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* الخصوصية والأمان */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShieldAlert className="ml-2" size={20} />
                  الخصوصية والأمان
                </CardTitle>
                <CardDescription>
                  إعدادات الخصوصية وأمان البيانات لمحرك الذكاء الاصطناعي
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="dataAccess">وصول البيانات</Label>
                  <Select 
                    value={aiSettings.dataAccess}
                    onValueChange={(value) => handleChange('dataAccess', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر مستوى الوصول" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع البيانات (المالية، العملاء، المخزون)</SelectItem>
                      <SelectItem value="financial">البيانات المالية فقط</SelectItem>
                      <SelectItem value="inventory">بيانات المخزون فقط</SelectItem>
                      <SelectItem value="aggregated">بيانات مجمعة فقط (بدون تفاصيل)</SelectItem>
                      <SelectItem value="limited">وصول محدود (قيود خاصة)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="privacyLevel">مستوى الخصوصية</Label>
                  <Select 
                    value={aiSettings.privacyLevel}
                    onValueChange={(value) => handleChange('privacyLevel', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر مستوى الخصوصية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">منخفض (تحليل كامل، أداء أفضل)</SelectItem>
                      <SelectItem value="medium">متوسط (موازنة بين الخصوصية والأداء)</SelectItem>
                      <SelectItem value="high">عالي (تتبع أقل، بيانات مجهولة)</SelectItem>
                      <SelectItem value="max">قصوى (معالجة محلية بالكامل)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="retentionDays">فترة الاحتفاظ بالبيانات (بالأيام)</Label>
                    <span className="text-sm">{aiSettings.retentionDays} يوم</span>
                  </div>
                  <Slider 
                    min={1} 
                    max={90} 
                    step={1} 
                    value={[aiSettings.retentionDays]}
                    onValueChange={(value) => handleChange('retentionDays', value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>فترة قصيرة</span>
                    <span>فترة طويلة</span>
                  </div>
                </div>
                
                <Alert className="border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    البيانات المستخدمة في التحليل يتم تشفيرها ولا يتم مشاركتها مع أطراف خارجية.
                    عند اختيار المستوى القصوى للخصوصية، قد تكون بعض ميزات التحليل المتقدم محدودة.
                  </AlertDescription>
                </Alert>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="block mb-1">تطبيق حذف البيانات التلقائي</Label>
                    <p className="text-sm text-muted-foreground">حذف بيانات التحليل والذكاء الاصطناعي تلقائيًا بعد فترة الاحتفاظ</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* ميزات التحليل */}
          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="ml-2" size={20} />
                  ميزات التحليل الذكي
                </CardTitle>
                <CardDescription>
                  تخصيص الميزات والتحليلات التي يوفرها محرك الذكاء الاصطناعي
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">التحليل التلقائي</h3>
                      <p className="text-sm text-muted-foreground">تحليل تلقائي للبيانات وإنشاء تقارير ذكية</p>
                    </div>
                    <Switch 
                      checked={aiSettings.autoAnalysis} 
                      onCheckedChange={(value) => handleChange('autoAnalysis', value)} 
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">تحليلات مالية</h3>
                      <p className="text-sm text-muted-foreground">تحليل وتوصيات لتحسين الأداء المالي</p>
                    </div>
                    <Switch 
                      checked={aiSettings.financialInsights} 
                      onCheckedChange={(value) => handleChange('financialInsights', value)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">تنبؤات المخزون</h3>
                      <p className="text-sm text-muted-foreground">التنبؤ بمستويات المخزون واقتراح إعادة الطلب</p>
                    </div>
                    <Switch 
                      checked={aiSettings.inventoryPredictions} 
                      onCheckedChange={(value) => handleChange('inventoryPredictions', value)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">تقسيم العملاء</h3>
                      <p className="text-sm text-muted-foreground">تحليل وتقسيم العملاء حسب السلوك والقيمة</p>
                    </div>
                    <Switch 
                      checked={aiSettings.customerSegmentation} 
                      onCheckedChange={(value) => handleChange('customerSegmentation', value)} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label>مبرمج مخصص للتحليلات</Label>
                  <div className="border rounded-md p-4">
                    <Textarea 
                      value={aiSettings.customPrompt} 
                      onChange={(e) => handleChange('customPrompt', e.target.value)} 
                      placeholder="أدخل التوجيهات المخصصة لعمليات التحليل الذكي. مثال: قم بالتركيز على تحليل هامش الربح وتقديم اقتراحات لتحسينه."
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    يمكنك إضافة توجيهات مخصصة للذكاء الاصطناعي لتوجيه طريقة تحليل البيانات وإنشاء التوصيات.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* التكامل */}
          <TabsContent value="integration">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="ml-2" size={20} />
                  التكامل مع النظام
                </CardTitle>
                <CardDescription>
                  تكامل الذكاء الاصطناعي مع وحدات النظام المختلفة
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-slate-50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <LineChart className="h-4 w-4 ml-2 text-blue-600" />
                          لوحة التحكم
                        </CardTitle>
                        <Switch defaultChecked id="dashboard-integration" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        عرض التوصيات والتحليلات في لوحة التحكم الرئيسية
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <Database className="h-4 w-4 ml-2 text-emerald-600" />
                          التقارير المالية
                        </CardTitle>
                        <Switch defaultChecked id="financial-integration" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        تحسين وتحليل التقارير المالية بالذكاء الاصطناعي
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <UserPlus2 className="h-4 w-4 ml-2 text-violet-600" />
                          العملاء
                        </CardTitle>
                        <Switch defaultChecked id="customers-integration" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        تحليل سلوك العملاء وتقديم توصيات للتعامل معهم
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-slate-50">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium flex items-center">
                          <Clipboard className="h-4 w-4 ml-2 text-amber-600" />
                          الفواتير
                        </CardTitle>
                        <Switch defaultChecked id="invoices-integration" />
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        تحسين عمليات إنشاء الفواتير والمستندات بالذكاء الاصطناعي
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="pt-4">
                  <Button variant="outline" className="w-full">إدارة متقدمة للتكامل</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-4 mt-6">
          <Button 
            variant="outline" 
            onClick={handleResetDefaults}
          >
            إعادة الضبط
          </Button>
          <Button 
            onClick={handleSaveChanges}
            disabled={loading}
          >
            {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

// مكون Textarea الذي كان مفقودًا
const Textarea = ({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

export default AiEngineSettingsPage;
