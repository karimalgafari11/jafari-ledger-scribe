
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAiSystemContext } from "@/context/AiSystemContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { 
  Save, 
  Trash2, 
  Bot, 
  Volume2, 
  MessageSquare, 
  BellRing, 
  Shield,
  Key,
  FileOutput,
  Lock,
  Fingerprint
} from "lucide-react";
import { toast } from "sonner";

export const AiAssistantSettings = () => {
  const { systemPrompt, setSystemPrompt } = useAiSystemContext();
  const [localPrompt, setLocalPrompt] = useState(systemPrompt);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [voiceSpeed, setVoiceSpeed] = useState([1]);
  const [voiceVolume, setVoiceVolume] = useState([70]);
  const [selectedVoice, setSelectedVoice] = useState("alloy");
  const [language, setLanguage] = useState("ar");
  const [securityLevel, setSecurityLevel] = useState("standard");
  const [dataAccessLevel, setDataAccessLevel] = useState("moderate");
  
  // حفظ التغييرات
  const saveChanges = () => {
    setSystemPrompt(localPrompt);
    toast.success("تم حفظ الإعدادات بنجاح");
  };

  // إعادة ضبط المطالبة إلى الإعدادات الافتراضية
  const resetPrompt = () => {
    const defaultPrompt = "أنت مساعد ذكي لنظام إدارة محاسبي. تساعد المستخدمين في إدارة المخزون، الفواتير، المصروفات، والعملاء. " +
      "يمكنك الإجابة على الأسئلة والاستفسارات المتعلقة بالنظام، وتقديم النصائح والإرشادات. " +
      "كما يمكنك استخراج معلومات من قواعد البيانات المتاحة، وإنشاء تقارير بسيطة، وإجراء حسابات. " +
      "قدم المعلومات بطريقة واضحة ومفيدة، واطلب توضيحات عندما تكون الأسئلة غامضة.";
    
    setLocalPrompt(defaultPrompt);
    toast.info("تم إعادة ضبط المطالبة إلى الإعدادات الافتراضية");
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">
            <Bot className="h-4 w-4 mr-2" />
            <span>عام</span>
          </TabsTrigger>
          <TabsTrigger value="voice">
            <Volume2 className="h-4 w-4 mr-2" />
            <span>الصوت</span>
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2" />
            <span>الأمان</span>
          </TabsTrigger>
          <TabsTrigger value="advanced">
            <FileOutput className="h-4 w-4 mr-2" />
            <span>متقدم</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>الإعدادات العامة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="systemPrompt">مطالبة النظام (System Prompt)</Label>
                <Textarea
                  id="systemPrompt"
                  value={localPrompt}
                  onChange={(e) => setLocalPrompt(e.target.value)}
                  className="min-h-[150px] font-mono text-sm"
                  placeholder="اكتب مطالبة النظام هنا..."
                />
                <p className="text-xs text-muted-foreground">
                  مطالبة النظام تحدد شخصية وسلوك المساعد الذكي وقدراته
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>اللغة المفضلة</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر اللغة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">الإنجليزية</SelectItem>
                    <SelectItem value="mixed">مختلط (عربي/إنجليزي)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">تفعيل الإشعارات</Label>
                <Switch
                  id="notifications"
                  checked={notificationsEnabled}
                  onCheckedChange={setNotificationsEnabled}
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="ghost" size="sm" onClick={resetPrompt}>
                  <Trash2 className="h-4 w-4 mr-1" /> إعادة ضبط
                </Button>
                <Button size="sm" onClick={saveChanges}>
                  <Save className="h-4 w-4 mr-1" /> حفظ التغييرات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الصوت</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="voice-enabled">تفعيل التحدث الصوتي</Label>
                <Switch
                  id="voice-enabled"
                  checked={voiceEnabled}
                  onCheckedChange={setVoiceEnabled}
                />
              </div>
              
              <div className="space-y-2">
                <Label>اختيار الصوت</Label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع الصوت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alloy">Alloy (متوازن)</SelectItem>
                    <SelectItem value="echo">Echo (هادئ)</SelectItem>
                    <SelectItem value="fable">Fable (ودود)</SelectItem>
                    <SelectItem value="onyx">Onyx (قوي)</SelectItem>
                    <SelectItem value="nova">Nova (حيوي)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label>سرعة الصوت</Label>
                  <span className="text-xs">{voiceSpeed[0].toFixed(1)}x</span>
                </div>
                <Slider
                  value={voiceSpeed}
                  onValueChange={setVoiceSpeed}
                  min={0.5}
                  max={2}
                  step={0.1}
                  disabled={!voiceEnabled}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>بطيء</span>
                  <span>سريع</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label>مستوى الصوت</Label>
                  <span className="text-xs">{voiceVolume[0]}%</span>
                </div>
                <Slider
                  value={voiceVolume}
                  onValueChange={setVoiceVolume}
                  min={0}
                  max={100}
                  step={1}
                  disabled={!voiceEnabled}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>منخفض</span>
                  <span>مرتفع</span>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button size="sm" onClick={() => toast.success("تم حفظ إعدادات الصوت")}>
                  <Save className="h-4 w-4 mr-1" /> حفظ إعدادات الصوت
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات الأمان والخصوصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>مستوى أمان المساعد</Label>
                <Select value={securityLevel} onValueChange={setSecurityLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر مستوى الأمان" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">قياسي</SelectItem>
                    <SelectItem value="enhanced">مُحسّن</SelectItem>
                    <SelectItem value="strict">صارم</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  المستوى الصارم يتطلب مصادقة إضافية للأوامر الحساسة
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>مستوى الوصول للبيانات</Label>
                <Select value={dataAccessLevel} onValueChange={setDataAccessLevel}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر مستوى الوصول" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">الحد الأدنى</SelectItem>
                    <SelectItem value="moderate">متوسط</SelectItem>
                    <SelectItem value="full">وصول كامل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
                <div className="flex items-start gap-2">
                  <Lock className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">تنبيه الأمان</h4>
                    <p className="text-xs text-amber-700 mt-1">
                      منح المساعد الذكي وصول كامل للبيانات قد يسمح له بالوصول إلى معلومات حساسة.
                      تأكد من ضبط الإعدادات المناسبة حسب احتياجاتك.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <Button variant="outline" className="w-full flex gap-2 mt-2" size="sm">
                  <Fingerprint className="h-4 w-4" />
                  إعداد المصادقة متعددة العوامل
                </Button>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button size="sm" onClick={() => toast.success("تم حفظ إعدادات الأمان")}>
                  <Save className="h-4 w-4 mr-1" /> حفظ إعدادات الأمان
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات متقدمة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">مفتاح الـ API (اختياري)</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="sk-..."
                />
                <p className="text-xs text-muted-foreground">
                  استخدم مفتاح API خاص لتخصيص قدرات المساعد الذكي
                </p>
              </div>
              
              <div>
                <Label className="mb-2 block">مراقبة أداء المساعد الذكي</Label>
                <Button variant="outline" className="w-full flex gap-2" size="sm">
                  <Key className="h-4 w-4" />
                  تجديد مفاتيح الوصول
                </Button>
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-1" /> مسح جميع البيانات
                </Button>
                <Button size="sm" onClick={() => toast.success("تم حفظ الإعدادات المتقدمة")}>
                  <Save className="h-4 w-4 mr-1" /> حفظ الإعدادات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
