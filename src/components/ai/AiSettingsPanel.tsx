
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  Shield, 
  RefreshCw, 
  Save, 
  Download, 
  Upload, 
  Lock,
  KeyRound,
  Fingerprint,
  Bell,
  Mail,
  MessageSquare
} from "lucide-react";
import { toast } from "sonner";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SensitiveDataCategory, VerificationLevel } from "@/utils/aiSecurityUtils";

export const AiSettingsPanel = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(1000);
  const [advancedDialogOpen, setAdvancedDialogOpen] = useState(false);
  const { 
    hasFullAccess, 
    toggleFullAccess, 
    securityMode, 
    setSecurityLevel, 
    identityVerified, 
    currentVerificationLevel 
  } = useAiAssistant();

  const [model, setModel] = useState("deepseek-chat");
  const [apiKey, setApiKey] = useState("sk-1c339b5c5397486ebbcc7730383c8cdc");
  
  // أمان المساعد الذكي
  const [aiAccessOptions, setAiAccessOptions] = useState({
    canAccessFinancialData: true,
    canAccessCustomerData: true,
    canAccessInventoryData: true,
    canModifySettings: false,
    canApproveTransactions: false,
    canManageUsers: false
  });
  
  const [notificationOptions, setNotificationOptions] = useState({
    notifyOnSensitiveAccess: true,
    notifyOnFailedVerification: true,
    notifyOnSystemScan: true,
    alertAdminOnDataExport: true,
    logAllInteractions: true
  });
  
  const [verificationSettings, setVerificationSettings] = useState({
    sessionTimeout: 30, // بالدقائق
    requiredVerificationLevel: {
      [SensitiveDataCategory.FINANCIAL]: VerificationLevel.TWO_FACTOR,
      [SensitiveDataCategory.CUSTOMER]: VerificationLevel.BASIC,
      [SensitiveDataCategory.INVENTORY]: VerificationLevel.BASIC,
      [SensitiveDataCategory.SYSTEM]: VerificationLevel.TWO_FACTOR,
    }
  });
  
  const handleSaveSettings = () => {
    toast.success("تم حفظ إعدادات المساعد الذكي بنجاح");
  };
  
  const handleResetSettings = () => {
    toast.success("تم إعادة ضبط إعدادات المساعد الذكي");
  };
  
  const handleExportSettings = () => {
    const settings = {
      model,
      temperature,
      maxTokens,
      aiAccessOptions,
      verificationSettings,
      notificationOptions
    };
    
    // إنشاء ملف للتنزيل
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "ai_assistant_settings.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    toast.success("تم تصدير الإعدادات بنجاح");
  };
  
  const renderVerificationLevelName = (level: VerificationLevel) => {
    switch(level) {
      case VerificationLevel.NONE:
        return "لا يوجد";
      case VerificationLevel.BASIC:
        return "أساسي";
      case VerificationLevel.TWO_FACTOR:
        return "ثنائي العامل";
      case VerificationLevel.BIOMETRIC:
        return "بيومتري";
      default:
        return "غير محدد";
    }
  };
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full mb-6 bg-white/70 backdrop-blur-sm">
          <TabsTrigger value="general" className="flex-1">عام</TabsTrigger>
          <TabsTrigger value="security" className="flex-1">الأمان</TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1">الإشعارات</TabsTrigger>
          <TabsTrigger value="advanced" className="flex-1">متقدم</TabsTrigger>
        </TabsList>
        
        {/* إعدادات عامة */}
        <TabsContent value="general" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg font-medium">الإعدادات العامة</CardTitle>
              <CardDescription>إعدادات المساعد الذكي العامة ومعلوماته الأساسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="model">نموذج الذكاء الاصطناعي</Label>
                <Select defaultValue={model} onValueChange={setModel}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نموذج الذكاء الاصطناعي" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>النماذج المدعومة</SelectLabel>
                      <SelectItem value="deepseek-chat">Deepseek Chat</SelectItem>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                      <SelectItem value="claude-3">Claude 3</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="temperature">الإبداعية (Temperature): {temperature}</Label>
                </div>
                <Slider
                  id="temperature"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                />
                <p className="text-xs text-gray-500">
                  القيمة المنخفضة (0) تعني إجابات أكثر دقة، والقيمة العالية (1) تعني إجابات أكثر إبداعية.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="maxTokens">الحد الأقصى للرموز: {maxTokens}</Label>
                </div>
                <Slider
                  id="maxTokens"
                  min={100}
                  max={4000}
                  step={100}
                  value={[maxTokens]}
                  onValueChange={(value) => setMaxTokens(value[0])}
                />
                <p className="text-xs text-gray-500">
                  عدد الرموز القصوى للإجابة الواحدة، قيمة أعلى تعني إجابات أطول.
                </p>
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">صلاحيات كاملة</Label>
                  <p className="text-sm text-gray-500">
                    السماح للمساعد الذكي بالوصول الكامل لجميع وحدات النظام
                  </p>
                </div>
                <Switch 
                  checked={hasFullAccess} 
                  onCheckedChange={toggleFullAccess} 
                />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">الاحتفاظ بسجل المحادثات</Label>
                  <p className="text-sm text-gray-500">
                    حفظ سجل محادثات المساعد الذكي بشكل دائم
                  </p>
                </div>
                <Switch 
                  defaultChecked={true}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* إعدادات الأمان */}
        <TabsContent value="security" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg font-medium">إعدادات الأمان</CardTitle>
              <CardDescription>تكوين إعدادات أمان المساعد الذكي والتحقق من الهوية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>مستوى الأمان</Label>
                <RadioGroup 
                  defaultValue={securityMode} 
                  onValueChange={(value) => setSecurityLevel(value as 'standard' | 'enhanced' | 'strict')}
                >
                  <div className="flex items-center space-x-2 rounded-md border p-3 mb-2">
                    <RadioGroupItem value="standard" id="security-standard" />
                    <Label htmlFor="security-standard" className="mr-2 flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">قياسي</p>
                        <p className="text-sm text-gray-500">
                          لا يتطلب التحقق من الهوية للمعلومات العامة
                        </p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3 mb-2">
                    <RadioGroupItem value="enhanced" id="security-enhanced" />
                    <Label htmlFor="security-enhanced" className="mr-2 flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">محسّن</p>
                        <p className="text-sm text-gray-500">
                          يتطلب التحقق من الهوية للمعلومات الحساسة فقط
                        </p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 rounded-md border p-3">
                    <RadioGroupItem value="strict" id="security-strict" />
                    <Label htmlFor="security-strict" className="mr-2 flex-1 cursor-pointer">
                      <div>
                        <p className="font-medium">صارم</p>
                        <p className="text-sm text-gray-500">
                          يتطلب التحقق من الهوية لجميع المعلومات
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-2">
                <Label>مدة صلاحية جلسة التحقق</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={verificationSettings.sessionTimeout}
                    onChange={(e) => setVerificationSettings({
                      ...verificationSettings,
                      sessionTimeout: parseInt(e.target.value)
                    })}
                    min={1}
                    max={120}
                  />
                  <span>دقيقة</span>
                </div>
                <p className="text-xs text-gray-500">
                  المدة التي يبقى فيها المستخدم متحققاً قبل إعادة طلب التحقق
                </p>
              </div>
              
              <div className="space-y-2 pt-3">
                <Label>إعدادات التحقق المطلوبة</Label>
                
                <div className="space-y-3 mt-2">
                  <div className="flex justify-between items-center p-3 rounded-md border">
                    <div>
                      <p className="font-medium">البيانات المالية</p>
                      <p className="text-xs text-gray-500">الميزانية، القيود المحاسبية، الإيرادات...</p>
                    </div>
                    <Select 
                      defaultValue={verificationSettings.requiredVerificationLevel[SensitiveDataCategory.FINANCIAL].toString()}
                      onValueChange={(value) => setVerificationSettings({
                        ...verificationSettings,
                        requiredVerificationLevel: {
                          ...verificationSettings.requiredVerificationLevel,
                          [SensitiveDataCategory.FINANCIAL]: parseInt(value)
                        }
                      })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="اختر المستوى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={VerificationLevel.NONE.toString()}>لا يوجد</SelectItem>
                        <SelectItem value={VerificationLevel.BASIC.toString()}>أساسي</SelectItem>
                        <SelectItem value={VerificationLevel.TWO_FACTOR.toString()}>ثنائي العامل</SelectItem>
                        <SelectItem value={VerificationLevel.BIOMETRIC.toString()}>بيومتري</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-md border">
                    <div>
                      <p className="font-medium">بيانات العملاء</p>
                      <p className="text-xs text-gray-500">معلومات العملاء، المديونية، التاريخ...</p>
                    </div>
                    <Select 
                      defaultValue={verificationSettings.requiredVerificationLevel[SensitiveDataCategory.CUSTOMER].toString()}
                      onValueChange={(value) => setVerificationSettings({
                        ...verificationSettings,
                        requiredVerificationLevel: {
                          ...verificationSettings.requiredVerificationLevel,
                          [SensitiveDataCategory.CUSTOMER]: parseInt(value)
                        }
                      })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="اختر المستوى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={VerificationLevel.NONE.toString()}>لا يوجد</SelectItem>
                        <SelectItem value={VerificationLevel.BASIC.toString()}>أساسي</SelectItem>
                        <SelectItem value={VerificationLevel.TWO_FACTOR.toString()}>ثنائي العامل</SelectItem>
                        <SelectItem value={VerificationLevel.BIOMETRIC.toString()}>بيومتري</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-md border">
                    <div>
                      <p className="font-medium">بيانات المخزون</p>
                      <p className="text-xs text-gray-500">تكلفة المنتجات، القيم، التسعير...</p>
                    </div>
                    <Select 
                      defaultValue={verificationSettings.requiredVerificationLevel[SensitiveDataCategory.INVENTORY].toString()}
                      onValueChange={(value) => setVerificationSettings({
                        ...verificationSettings,
                        requiredVerificationLevel: {
                          ...verificationSettings.requiredVerificationLevel,
                          [SensitiveDataCategory.INVENTORY]: parseInt(value)
                        }
                      })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="اختر المستوى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={VerificationLevel.NONE.toString()}>لا يوجد</SelectItem>
                        <SelectItem value={VerificationLevel.BASIC.toString()}>أساسي</SelectItem>
                        <SelectItem value={VerificationLevel.TWO_FACTOR.toString()}>ثنائي العامل</SelectItem>
                        <SelectItem value={VerificationLevel.BIOMETRIC.toString()}>بيومتري</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 rounded-md border">
                    <div>
                      <p className="font-medium">إعدادات النظام</p>
                      <p className="text-xs text-gray-500">مفاتيح API، كلمات المرور، الصلاحيات...</p>
                    </div>
                    <Select 
                      defaultValue={verificationSettings.requiredVerificationLevel[SensitiveDataCategory.SYSTEM].toString()}
                      onValueChange={(value) => setVerificationSettings({
                        ...verificationSettings,
                        requiredVerificationLevel: {
                          ...verificationSettings.requiredVerificationLevel,
                          [SensitiveDataCategory.SYSTEM]: parseInt(value)
                        }
                      })}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="اختر المستوى" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={VerificationLevel.NONE.toString()}>لا يوجد</SelectItem>
                        <SelectItem value={VerificationLevel.BASIC.toString()}>أساسي</SelectItem>
                        <SelectItem value={VerificationLevel.TWO_FACTOR.toString()}>ثنائي العامل</SelectItem>
                        <SelectItem value={VerificationLevel.BIOMETRIC.toString()}>بيومتري</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">صلاحيات المساعد الذكي</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="canAccessFinancialData" 
                        checked={aiAccessOptions.canAccessFinancialData}
                        onCheckedChange={(checked) => setAiAccessOptions({
                          ...aiAccessOptions,
                          canAccessFinancialData: checked === true
                        })} 
                      />
                      <Label htmlFor="canAccessFinancialData" className="mr-2">الوصول للبيانات المالية</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="canAccessCustomerData" 
                        checked={aiAccessOptions.canAccessCustomerData}
                        onCheckedChange={(checked) => setAiAccessOptions({
                          ...aiAccessOptions,
                          canAccessCustomerData: checked === true
                        })} 
                      />
                      <Label htmlFor="canAccessCustomerData" className="mr-2">الوصول لبيانات العملاء</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="canAccessInventoryData" 
                        checked={aiAccessOptions.canAccessInventoryData}
                        onCheckedChange={(checked) => setAiAccessOptions({
                          ...aiAccessOptions,
                          canAccessInventoryData: checked === true
                        })} 
                      />
                      <Label htmlFor="canAccessInventoryData" className="mr-2">الوصول لبيانات المخزون</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">صلاحيات متقدمة</h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="canModifySettings" 
                        checked={aiAccessOptions.canModifySettings}
                        onCheckedChange={(checked) => setAiAccessOptions({
                          ...aiAccessOptions,
                          canModifySettings: checked === true
                        })} 
                      />
                      <Label htmlFor="canModifySettings" className="mr-2">تعديل الإعدادات</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="canApproveTransactions" 
                        checked={aiAccessOptions.canApproveTransactions}
                        onCheckedChange={(checked) => setAiAccessOptions({
                          ...aiAccessOptions,
                          canApproveTransactions: checked === true
                        })} 
                      />
                      <Label htmlFor="canApproveTransactions" className="mr-2">الموافقة على المعاملات</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="canManageUsers" 
                        checked={aiAccessOptions.canManageUsers}
                        onCheckedChange={(checked) => setAiAccessOptions({
                          ...aiAccessOptions,
                          canManageUsers: checked === true
                        })} 
                      />
                      <Label htmlFor="canManageUsers" className="mr-2">إدارة المستخدمين</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* إعدادات الإشعارات */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg font-medium">إعدادات الإشعارات</CardTitle>
              <CardDescription>تكوين إشعارات وتنبيهات المساعد الذكي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4 mt-2">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 flex items-center gap-2">
                    <Bell className="h-5 w-5 text-amber-500" />
                    <div>
                      <Label className="text-base">إشعار عند الوصول للبيانات الحساسة</Label>
                      <p className="text-sm text-gray-500">
                        إرسال إشعار للمسؤولين عند طلب بيانات حساسة
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationOptions.notifyOnSensitiveAccess}
                    onCheckedChange={(checked) => setNotificationOptions({
                      ...notificationOptions,
                      notifyOnSensitiveAccess: checked
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <div>
                      <Label className="text-base">إشعار عند فشل التحقق</Label>
                      <p className="text-sm text-gray-500">
                        إرسال إشعار عند محاولات التحقق الفاشلة
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationOptions.notifyOnFailedVerification}
                    onCheckedChange={(checked) => setNotificationOptions({
                      ...notificationOptions,
                      notifyOnFailedVerification: checked
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-blue-500" />
                    <div>
                      <Label className="text-base">إشعار عند فحص النظام</Label>
                      <p className="text-sm text-gray-500">
                        إرسال إشعار عند إجراء فحص للنظام
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationOptions.notifyOnSystemScan}
                    onCheckedChange={(checked) => setNotificationOptions({
                      ...notificationOptions,
                      notifyOnSystemScan: checked
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 flex items-center gap-2">
                    <Download className="h-5 w-5 text-purple-500" />
                    <div>
                      <Label className="text-base">إشعار المسؤول عند تصدير البيانات</Label>
                      <p className="text-sm text-gray-500">
                        تنبيه المسؤولين عند طلب تصدير البيانات
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationOptions.alertAdminOnDataExport}
                    onCheckedChange={(checked) => setNotificationOptions({
                      ...notificationOptions,
                      alertAdminOnDataExport: checked
                    })}
                  />
                </div>
                
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-green-500" />
                    <div>
                      <Label className="text-base">تسجيل جميع التفاعلات</Label>
                      <p className="text-sm text-gray-500">
                        الاحتفاظ بسجل كامل لجميع المحادثات والتفاعلات
                      </p>
                    </div>
                  </div>
                  <Switch 
                    checked={notificationOptions.logAllInteractions}
                    onCheckedChange={(checked) => setNotificationOptions({
                      ...notificationOptions,
                      logAllInteractions: checked
                    })}
                  />
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor="notificationEmail">البريد الإلكتروني للإشعارات</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <Input
                    id="notificationEmail"
                    type="email"
                    placeholder="example@company.com"
                    defaultValue="admin@example.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* إعدادات متقدمة */}
        <TabsContent value="advanced" className="space-y-4">
          <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
            <CardHeader>
              <CardTitle className="text-lg font-medium">إعدادات متقدمة</CardTitle>
              <CardDescription>إعدادات متقدمة للمساعد الذكي ومفاتيح API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">مفتاح API</Label>
                <div className="flex">
                  <Input 
                    id="apiKey"
                    type="password" 
                    value={apiKey} 
                    onChange={(e) => setApiKey(e.target.value)}
                    className="rounded-r-none"
                  />
                  <Button 
                    variant="outline" 
                    className="rounded-l-none border-l-0"
                    onClick={() => setAdvancedDialogOpen(true)}
                  >
                    تغيير
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="systemPrompt">رسالة النظام الافتراضية</Label>
                <Textarea 
                  id="systemPrompt"
                  rows={4}
                  placeholder="أدخل رسالة النظام الافتراضية هنا"
                  defaultValue={`أنت مساعد ذكي متخصص في نظام إدارة المخزون والمحاسبة، وتتمتع بصلاحيات كاملة للوصول إلى جميع أجزاء النظام. دورك هو مساعدة المستخدم بالمعلومات المفيدة والإجابة على أسئلته بخصوص نظام إدارة المخزون والمبيعات والمشتريات والمحاسبة.`}
                />
              </div>
              
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base">وضع التصحيح</Label>
                  <p className="text-sm text-gray-500">
                    تفعيل وضع التصحيح لتسجيل معلومات أكثر تفصيلاً
                  </p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              
              <div className="pt-4 flex justify-between">
                <Button variant="outline" onClick={handleExportSettings}>
                  <Download className="h-4 w-4 mr-2" />
                  تصدير الإعدادات
                </Button>
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  استيراد الإعدادات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleResetSettings}>
          <RefreshCw className="h-4 w-4 mr-2" />
          إعادة ضبط
        </Button>
        <Button onClick={handleSaveSettings}>
          <Save className="h-4 w-4 mr-2" />
          حفظ الإعدادات
        </Button>
      </div>
      
      <Dialog open={advancedDialogOpen} onOpenChange={setAdvancedDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تغيير مفتاح API</DialogTitle>
            <DialogDescription>
              أدخل مفتاح API الجديد للمساعد الذكي
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="newApiKey">مفتاح API الجديد</Label>
              <Input id="newApiKey" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmApiKey">تأكيد مفتاح API</Label>
              <Input id="confirmApiKey" />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setAdvancedDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button onClick={() => {
              toast.success("تم تحديث مفتاح API بنجاح");
              setAdvancedDialogOpen(false);
            }}>
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
