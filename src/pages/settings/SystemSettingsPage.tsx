
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { mockSystemSettings } from '@/data/mockSettings';
import { SystemSettings } from '@/types/settings';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Settings2, 
  Language, 
  Calendar, 
  Building2, 
  PaletteIcon, 
  Receipt, 
  Image 
} from "lucide-react";

const SystemSettingsPage = () => {
  const [settings, setSettings] = useState<SystemSettings>(mockSystemSettings);
  const [activeTab, setActiveTab] = useState("general");
  
  const handleSettingsChange = (field: keyof SystemSettings, value: string | Date) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSaveSettings = () => {
    // Simulate API call to save settings
    setTimeout(() => {
      toast.success("تم حفظ الإعدادات بنجاح");
    }, 500);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 rtl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">إعدادات النظام</h1>
          <Button onClick={handleSaveSettings} className="bg-primary hover:bg-primary/90">
            حفظ الإعدادات
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} dir="rtl" className="w-full">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span>عام</span>
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>الشركة</span>
            </TabsTrigger>
            <TabsTrigger value="localization" className="flex items-center gap-2">
              <Language className="h-4 w-4" />
              <span>التخصيص</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <PaletteIcon className="h-4 w-4" />
              <span>المظهر</span>
            </TabsTrigger>
            <TabsTrigger value="fiscal" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>السنة المالية</span>
            </TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>الإعدادات العامة</CardTitle>
                <CardDescription>إعدادات النظام الأساسية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="systemLanguage">لغة النظام</Label>
                    <Select 
                      value={settings.language} 
                      onValueChange={(value) => handleSettingsChange("language", value as "ar" | "en")}
                    >
                      <SelectTrigger id="systemLanguage">
                        <SelectValue placeholder="اختر لغة النظام" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="systemTheme">سمة النظام</Label>
                    <Select 
                      value={settings.theme} 
                      onValueChange={(value) => handleSettingsChange("theme", value as "light" | "dark")}
                    >
                      <SelectTrigger id="systemTheme">
                        <SelectValue placeholder="اختر سمة النظام" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">فاتح</SelectItem>
                        <SelectItem value="dark">داكن</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Company Settings */}
          <TabsContent value="company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الشركة</CardTitle>
                <CardDescription>بيانات الشركة الأساسية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">اسم الشركة</Label>
                    <Input 
                      id="companyName" 
                      value={settings.companyName} 
                      onChange={(e) => handleSettingsChange("companyName", e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                    <Input 
                      id="taxNumber" 
                      value={settings.taxNumber} 
                      onChange={(e) => handleSettingsChange("taxNumber", e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input 
                      id="phone" 
                      value={settings.phone} 
                      onChange={(e) => handleSettingsChange("phone", e.target.value)} 
                      dir="ltr" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input 
                      id="email" 
                      value={settings.email} 
                      onChange={(e) => handleSettingsChange("email", e.target.value)} 
                      dir="ltr" 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">العنوان</Label>
                    <Input 
                      id="address" 
                      value={settings.address} 
                      onChange={(e) => handleSettingsChange("address", e.target.value)} 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="logo">شعار الشركة</Label>
                    <div className="flex items-start gap-4 mt-2">
                      <div className="border border-gray-200 rounded-md p-2 w-20 h-20 flex items-center justify-center bg-gray-50">
                        {settings.logo ? (
                          <img src={settings.logo} alt="Company Logo" className="max-w-full max-h-full" />
                        ) : (
                          <Image className="h-8 w-8 text-gray-400" />
                        )}
                      </div>
                      <Button variant="outline" className="h-10">
                        <span>تغيير الشعار</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Localization Settings */}
          <TabsContent value="localization" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات التخصيص</CardTitle>
                <CardDescription>خيارات اللغة والعملة والمنطقة الزمنية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">العملة الافتراضية</Label>
                    <Select 
                      value={settings.currency} 
                      onValueChange={(value) => handleSettingsChange("currency", value)}
                    >
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="اختر العملة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                        <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                        <SelectItem value="EUR">يورو (EUR)</SelectItem>
                        <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">المنطقة الزمنية</Label>
                    <Select defaultValue="Asia/Riyadh">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="اختر المنطقة الزمنية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Riyadh">الرياض (GMT+3)</SelectItem>
                        <SelectItem value="Asia/Dubai">دبي (GMT+4)</SelectItem>
                        <SelectItem value="Asia/Kuwait">الكويت (GMT+3)</SelectItem>
                        <SelectItem value="Asia/Cairo">القاهرة (GMT+2)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">صيغة التاريخ</Label>
                    <Select defaultValue="dd/MM/yyyy">
                      <SelectTrigger id="dateFormat">
                        <SelectValue placeholder="اختر صيغة التاريخ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/MM/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-MM-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numberFormat">صيغة الأرقام</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="numberFormat">
                        <SelectValue placeholder="اختر صيغة الأرقام" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">1,234.56</SelectItem>
                        <SelectItem value="european">1.234,56</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات المظهر</CardTitle>
                <CardDescription>تخصيص مظهر النظام</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label>السمة</Label>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className={`border rounded-md p-3 cursor-pointer ${settings.theme === 'light' ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200'}`}
                        onClick={() => handleSettingsChange("theme", "light" as "light")}
                      >
                        <div className="h-20 rounded bg-white border border-gray-200 mb-2"></div>
                        <div className="text-center">فاتح</div>
                      </div>
                      <div className={`border rounded-md p-3 cursor-pointer ${settings.theme === 'dark' ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200'}`}
                        onClick={() => handleSettingsChange("theme", "dark" as "dark")}
                      >
                        <div className="h-20 rounded bg-gray-900 border border-gray-700 mb-2"></div>
                        <div className="text-center">داكن</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">حجم الخط</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="fontSize">
                        <SelectValue placeholder="اختر حجم الخط" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">صغير</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="large">كبير</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="density">كثافة العرض</Label>
                    <Select defaultValue="comfortable">
                      <SelectTrigger id="density">
                        <SelectValue placeholder="اختر كثافة العرض" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="compact">مدمج</SelectItem>
                        <SelectItem value="comfortable">مريح</SelectItem>
                        <SelectItem value="spacious">واسع</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Fiscal Year Settings */}
          <TabsContent value="fiscal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات السنة المالية</CardTitle>
                <CardDescription>تحديد بداية ونهاية السنة المالية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fiscalYearStart">بداية السنة المالية</Label>
                    <Select defaultValue="jan">
                      <SelectTrigger id="fiscalYearStart">
                        <SelectValue placeholder="اختر بداية السنة المالية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jan">1 يناير</SelectItem>
                        <SelectItem value="apr">1 أبريل</SelectItem>
                        <SelectItem value="jul">1 يوليو</SelectItem>
                        <SelectItem value="oct">1 أكتوبر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lockPeriod">فترة الإقفال</Label>
                    <Select defaultValue="month">
                      <SelectTrigger id="lockPeriod">
                        <SelectValue placeholder="اختر فترة الإقفال" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">يومي</SelectItem>
                        <SelectItem value="week">أسبوعي</SelectItem>
                        <SelectItem value="month">شهري</SelectItem>
                        <SelectItem value="quarter">ربع سنوي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoicePrefix">بادئة الفاتورة</Label>
                    <Input id="invoicePrefix" placeholder="INV-" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoiceStartNumber">رقم بداية الفاتورة</Label>
                    <Input id="invoiceStartNumber" type="number" defaultValue="1000" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="outline" onClick={() => toast.info("تم الإلغاء")}>
                  إلغاء
                </Button>
                <Button onClick={() => toast.success("تم حفظ إعدادات السنة المالية")}>
                  <Receipt className="ml-2 h-4 w-4" />
                  حفظ الإعدادات
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SystemSettingsPage;
