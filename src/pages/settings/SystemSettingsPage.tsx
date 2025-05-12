
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";

// Mock data for system settings
const mockSystemSettings = {
  companyName: "شركة الجعفري للمحاسبة",
  companyLogo: "/lovable-uploads/b46a496c-1b88-47b3-bb09-5f709425862f.png",
  language: "ar",
  timeZone: "Asia/Riyadh",
  dateFormat: "DD/MM/YYYY",
  currency: "SAR",
  fiscalYearStart: "01/01",
  enableDarkMode: true,
  enableNotifications: true,
  enableAuditLogs: true,
  sessionTimeout: 30,
  maxLoginAttempts: 5,
  passwordPolicy: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true
  }
};

const SystemSettingsPage = () => {
  const [settings, setSettings] = useState(mockSystemSettings);
  const [activeTab, setActiveTab] = useState("general");

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePasswordPolicyChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      passwordPolicy: {
        ...prev.passwordPolicy,
        [key]: value
      }
    }));
  };

  const handleSaveSettings = () => {
    toast.success("تم حفظ إعدادات النظام بنجاح");
  };

  const handleResetSettings = () => {
    setSettings(mockSystemSettings);
    toast.info("تم إعادة تعيين الإعدادات للقيم الافتراضية");
  };

  return (
    <PageContainer title="إعدادات النظام" showBack={true}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">إعدادات النظام الأساسية</h1>
          <div className="space-x-2 flex">
            <Button variant="outline" onClick={handleResetSettings}>
              <RefreshCw className="ml-2 h-4 w-4" />
              إعادة تعيين
            </Button>
            <Button onClick={handleSaveSettings}>
              <Save className="ml-2 h-4 w-4" />
              حفظ الإعدادات
            </Button>
          </div>
        </div>

        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="general">إعدادات عامة</TabsTrigger>
            <TabsTrigger value="appearance">المظهر</TabsTrigger>
            <TabsTrigger value="security">الأمان</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات العامة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">اسم الشركة</Label>
                    <Input
                      id="companyName"
                      value={settings.companyName}
                      onChange={(e) => handleChange("companyName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">اللغة الافتراضية</Label>
                    <Select
                      value={settings.language}
                      onValueChange={(value) => handleChange("language", value)}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="اختر اللغة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeZone">المنطقة الزمنية</Label>
                    <Select
                      value={settings.timeZone}
                      onValueChange={(value) => handleChange("timeZone", value)}
                    >
                      <SelectTrigger id="timeZone">
                        <SelectValue placeholder="اختر المنطقة الزمنية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Riyadh">توقيت الرياض (GMT+3)</SelectItem>
                        <SelectItem value="Asia/Dubai">توقيت دبي (GMT+4)</SelectItem>
                        <SelectItem value="Asia/Kuwait">توقيت الكويت (GMT+3)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">صيغة التاريخ</Label>
                    <Select
                      value={settings.dateFormat}
                      onValueChange={(value) => handleChange("dateFormat", value)}
                    >
                      <SelectTrigger id="dateFormat">
                        <SelectValue placeholder="اختر صيغة التاريخ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">يوم/شهر/سنة</SelectItem>
                        <SelectItem value="MM/DD/YYYY">شهر/يوم/سنة</SelectItem>
                        <SelectItem value="YYYY/MM/DD">سنة/شهر/يوم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">العملة الافتراضية</Label>
                    <Select
                      value={settings.currency}
                      onValueChange={(value) => handleChange("currency", value)}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="اختر العملة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAR">ريال سعودي (ر.س)</SelectItem>
                        <SelectItem value="USD">دولار أمريكي ($)</SelectItem>
                        <SelectItem value="EUR">يورو (€)</SelectItem>
                        <SelectItem value="AED">درهم إماراتي (د.إ)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fiscalYearStart">بداية السنة المالية</Label>
                    <Select
                      value={settings.fiscalYearStart}
                      onValueChange={(value) => handleChange("fiscalYearStart", value)}
                    >
                      <SelectTrigger id="fiscalYearStart">
                        <SelectValue placeholder="اختر بداية السنة المالية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="01/01">1 يناير</SelectItem>
                        <SelectItem value="01/04">1 أبريل</SelectItem>
                        <SelectItem value="01/07">1 يوليو</SelectItem>
                        <SelectItem value="01/10">1 أكتوبر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات المظهر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableDarkMode">تفعيل الوضع الليلي</Label>
                  <Switch
                    id="enableDarkMode"
                    checked={settings.enableDarkMode}
                    onCheckedChange={(value) => handleChange("enableDarkMode", value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableNotifications">تفعيل الإشعارات</Label>
                  <Switch
                    id="enableNotifications"
                    checked={settings.enableNotifications}
                    onCheckedChange={(value) => handleChange("enableNotifications", value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الأمان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sessionTimeout">مدة جلسة العمل (دقائق)</Label>
                    <Input
                      id="sessionTimeout"
                      type="number"
                      value={settings.sessionTimeout}
                      onChange={(e) => handleChange("sessionTimeout", parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxLoginAttempts">الحد الأقصى لمحاولات تسجيل الدخول</Label>
                    <Input
                      id="maxLoginAttempts"
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) => handleChange("maxLoginAttempts", parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mt-4">سياسة كلمة المرور</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minLength">الحد الأدنى لطول كلمة المرور</Label>
                    <Input
                      id="minLength"
                      type="number"
                      value={settings.passwordPolicy.minLength}
                      onChange={(e) => handlePasswordPolicyChange("minLength", parseInt(e.target.value))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireUppercase">يتطلب حروف كبيرة</Label>
                    <Switch
                      id="requireUppercase"
                      checked={settings.passwordPolicy.requireUppercase}
                      onCheckedChange={(value) => handlePasswordPolicyChange("requireUppercase", value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireLowercase">يتطلب حروف صغيرة</Label>
                    <Switch
                      id="requireLowercase"
                      checked={settings.passwordPolicy.requireLowercase}
                      onCheckedChange={(value) => handlePasswordPolicyChange("requireLowercase", value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireNumbers">يتطلب أرقام</Label>
                    <Switch
                      id="requireNumbers"
                      checked={settings.passwordPolicy.requireNumbers}
                      onCheckedChange={(value) => handlePasswordPolicyChange("requireNumbers", value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireSpecialChars">يتطلب رموز خاصة</Label>
                    <Switch
                      id="requireSpecialChars"
                      checked={settings.passwordPolicy.requireSpecialChars}
                      onCheckedChange={(value) => handlePasswordPolicyChange("requireSpecialChars", value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <Label htmlFor="enableAuditLogs">تفعيل سجلات المراجعة</Label>
                  <Switch
                    id="enableAuditLogs"
                    checked={settings.enableAuditLogs}
                    onCheckedChange={(value) => handleChange("enableAuditLogs", value)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageContainer>
  );
};

export default SystemSettingsPage;
