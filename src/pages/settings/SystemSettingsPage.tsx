
import React from "react";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useSystemSettings } from "@/hooks/useSystemSettings";
import { toast } from "sonner";

const SystemSettingsPage = () => {
  const { settings, updateSettings, isLoading } = useSystemSettings();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settings);
    toast.success("تم حفظ إعدادات النظام بنجاح");
  };
  
  return (
    <div className="container mx-auto p-6 rtl">
      <Header 
        title="إعدادات النظام" 
        description="تخصيص وإدارة إعدادات النظام الأساسية"
      />
      
      <div className="mt-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="general">عام</TabsTrigger>
            <TabsTrigger value="company">معلومات الشركة</TabsTrigger>
            <TabsTrigger value="appearance">المظهر</TabsTrigger>
            <TabsTrigger value="localization">التعريب</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>الإعدادات العامة</CardTitle>
                  <CardDescription>
                    إدارة الإعدادات الأساسية للنظام
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemName">اسم النظام</Label>
                    <Input
                      id="systemName"
                      placeholder="نظام إدارة الأعمال"
                      defaultValue="نظام إدارة الأعمال"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="autoSaveEnabled">الحفظ التلقائي</Label>
                      <p className="text-sm text-muted-foreground">
                        حفظ البيانات تلقائياً أثناء العمل
                      </p>
                    </div>
                    <Switch
                      id="autoSaveEnabled"
                      checked={settings?.autoSave}
                      onCheckedChange={(checked) => updateSettings({ 
                        ...settings, 
                        autoSave: checked 
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notificationsEnabled">إشعارات النظام</Label>
                      <p className="text-sm text-muted-foreground">
                        تفعيل الإشعارات النظامية
                      </p>
                    </div>
                    <Switch
                      id="notificationsEnabled"
                      checked={settings?.notifications}
                      onCheckedChange={(checked) => updateSettings({ 
                        ...settings, 
                        notifications: checked 
                      })}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="mt-4" 
                    disabled={isLoading}
                  >
                    {isLoading ? "جاري الحفظ..." : "حفظ الإعدادات"}
                  </Button>
                </CardContent>
              </Card>
            </form>
          </TabsContent>
          
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الشركة</CardTitle>
                <CardDescription>
                  إدارة معلومات الشركة الأساسية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">اسم الشركة</Label>
                      <Input id="companyName" placeholder="أدخل اسم الشركة" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                      <Input id="taxNumber" placeholder="أدخل الرقم الضريبي" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="companyAddress">عنوان الشركة</Label>
                    <Input id="companyAddress" placeholder="أدخل عنوان الشركة" />
                  </div>
                  
                  <Button>حفظ معلومات الشركة</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات المظهر</CardTitle>
                <CardDescription>
                  تخصيص مظهر النظام
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="darkMode">الوضع الليلي</Label>
                      <p className="text-sm text-muted-foreground">
                        تفعيل الوضع الليلي في النظام
                      </p>
                    </div>
                    <Switch
                      id="darkMode"
                      checked={settings?.darkMode}
                      onCheckedChange={(checked) => updateSettings({ 
                        ...settings, 
                        darkMode: checked 
                      })}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compactMode">العرض المضغوط</Label>
                      <p className="text-sm text-muted-foreground">
                        تقليص المساحات في واجهة المستخدم
                      </p>
                    </div>
                    <Switch
                      id="compactMode"
                      checked={settings?.compactMode}
                      onCheckedChange={(checked) => updateSettings({ 
                        ...settings, 
                        compactMode: checked 
                      })}
                    />
                  </div>
                  
                  <Button>حفظ إعدادات المظهر</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="localization">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات اللغة والتعريب</CardTitle>
                <CardDescription>
                  إعدادات اللغة والتاريخ والعملة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">اللغة الافتراضية</Label>
                      <select
                        id="language"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="ar"
                      >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                        <option value="fr">Français</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">تنسيق التاريخ</Label>
                      <select
                        id="dateFormat"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        defaultValue="dd/mm/yyyy"
                      >
                        <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                        <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                        <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button>حفظ إعدادات التعريب</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SystemSettingsPage;
