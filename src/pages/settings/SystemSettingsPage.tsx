
import React from 'react';
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useSystemSettings } from "@/hooks/useSystemSettings";
import { toast } from "sonner";
import { Building2, Globe, Calendar, DollarSign, Languages, Palette, FileImage, Phone, Mail, Clock, Calculator } from "lucide-react";

const SystemSettingsPage = () => {
  const { 
    settings, 
    isLoading, 
    updateSetting, 
    saveSettings,
    resetToDefaults 
  } = useSystemSettings();
  
  const handleSaveChanges = async () => {
    const success = await saveSettings();
    if (success) {
      toast.success("تم حفظ الإعدادات بنجاح");
    }
  };
  
  const handleReset = () => {
    if (window.confirm("هل أنت متأكد من إعادة ضبط جميع الإعدادات؟")) {
      resetToDefaults();
      toast.success("تم إعادة ضبط الإعدادات للقيم الافتراضية");
    }
  };

  return (
    <Layout>
      <Header 
        title="إعدادات النظام" 
        description="إدارة إعدادات النظام الأساسية"
      />
      
      <div className="container mx-auto p-6">
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="company">معلومات الشركة</TabsTrigger>
            <TabsTrigger value="localization">الإعدادات المحلية</TabsTrigger>
            <TabsTrigger value="preferences">التفضيلات</TabsTrigger>
            <TabsTrigger value="accounting">إعدادات المحاسبة</TabsTrigger>
          </TabsList>
          
          {/* معلومات الشركة */}
          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="ml-2" size={20} />
                  معلومات الشركة
                </CardTitle>
                <CardDescription>
                  المعلومات الأساسية للشركة التي ستظهر في التقارير والفواتير
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">اسم الشركة</Label>
                    <Input 
                      id="companyName" 
                      value={settings.companyName} 
                      onChange={(e) => updateSetting('companyName', e.target.value)}
                      placeholder="أدخل اسم الشركة"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="taxNumber">الرقم الضريبي</Label>
                    <Input 
                      id="taxNumber" 
                      value={settings.taxNumber} 
                      onChange={(e) => updateSetting('taxNumber', e.target.value)}
                      placeholder="أدخل الرقم الضريبي"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Input 
                    id="address" 
                    value={settings.address} 
                    onChange={(e) => updateSetting('address', e.target.value)}
                    placeholder="أدخل عنوان الشركة"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <div className="flex items-center">
                      <Phone className="ml-2 text-muted-foreground" size={16} />
                      <Input 
                        id="phone" 
                        value={settings.phone} 
                        onChange={(e) => updateSetting('phone', e.target.value)}
                        placeholder="أدخل رقم الهاتف"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <div className="flex items-center">
                      <Mail className="ml-2 text-muted-foreground" size={16} />
                      <Input 
                        id="email" 
                        value={settings.email} 
                        onChange={(e) => updateSetting('email', e.target.value)}
                        placeholder="أدخل البريد الإلكتروني"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>شعار الشركة</Label>
                  <div className="flex items-center space-x-4">
                    <div className="h-16 w-16 border rounded-md flex items-center justify-center overflow-hidden">
                      {settings.logo ? (
                        <img 
                          src={settings.logo} 
                          alt="Company Logo" 
                          className="h-full w-full object-contain" 
                        />
                      ) : (
                        <FileImage className="text-gray-400" size={24} />
                      )}
                    </div>
                    <Button variant="outline" className="mr-4">تحميل شعار جديد</Button>
                    {settings.logo && (
                      <Button variant="ghost" onClick={() => updateSetting('logo', undefined)}>
                        حذف
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* الإعدادات المحلية */}
          <TabsContent value="localization">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="ml-2" size={20} />
                  الإعدادات المحلية
                </CardTitle>
                <CardDescription>
                  إعدادات اللغة والمنطقة الزمنية وتنسيق التاريخ والأرقام
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">اللغة</Label>
                    <div className="flex items-center">
                      <Languages className="ml-2 text-muted-foreground" size={16} />
                      <Select 
                        value={settings.language}
                        onValueChange={(value) => updateSetting('language', value as 'ar' | 'en')}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر اللغة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ar">العربية</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">العملة</Label>
                    <div className="flex items-center">
                      <DollarSign className="ml-2 text-muted-foreground" size={16} />
                      <Select 
                        value={settings.currency}
                        onValueChange={(value) => updateSetting('currency', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر العملة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SAR">ريال سعودي</SelectItem>
                          <SelectItem value="USD">دولار أمريكي</SelectItem>
                          <SelectItem value="EUR">يورو</SelectItem>
                          <SelectItem value="AED">درهم إماراتي</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">المنطقة الزمنية</Label>
                    <div className="flex items-center">
                      <Clock className="ml-2 text-muted-foreground" size={16} />
                      <Select 
                        value={settings.timezone || "Asia/Riyadh"}
                        onValueChange={(value) => updateSetting('timezone', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المنطقة الزمنية" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Asia/Riyadh">الرياض (GMT+3)</SelectItem>
                          <SelectItem value="Asia/Dubai">دبي (GMT+4)</SelectItem>
                          <SelectItem value="Europe/London">لندن (GMT+0)</SelectItem>
                          <SelectItem value="America/New_York">نيويورك (GMT-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">تنسيق التاريخ</Label>
                    <div className="flex items-center">
                      <Calendar className="ml-2 text-muted-foreground" size={16} />
                      <Select 
                        value={settings.dateFormat || "dd/MM/yyyy"}
                        onValueChange={(value) => updateSetting('dateFormat', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر تنسيق التاريخ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd/MM/yyyy">يوم/شهر/سنة (31/12/2023)</SelectItem>
                          <SelectItem value="MM/dd/yyyy">شهر/يوم/سنة (12/31/2023)</SelectItem>
                          <SelectItem value="yyyy-MM-dd">سنة-شهر-يوم (2023-12-31)</SelectItem>
                          <SelectItem value="dd-MM-yyyy">يوم-شهر-سنة (31-12-2023)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="numberFormat">تنسيق الأرقام</Label>
                  <div className="flex items-center">
                    <Calculator className="ml-2 text-muted-foreground" size={16} />
                    <Select 
                      value={settings.numberFormat || "1,234.56"}
                      onValueChange={(value) => updateSetting('numberFormat', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر تنسيق الأرقام" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1,234.56">1,234.56 (الفاصلة للآلاف والنقطة للكسور)</SelectItem>
                        <SelectItem value="1.234,56">1.234,56 (النقطة للآلاف والفاصلة للكسور)</SelectItem>
                        <SelectItem value="1 234.56">1 234.56 (المسافة للآلاف والنقطة للكسور)</SelectItem>
                        <SelectItem value="1234.56">1234.56 (بدون فواصل)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* التفضيلات */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Palette className="ml-2" size={20} />
                  التفضيلات
                </CardTitle>
                <CardDescription>
                  إعدادات المظهر وتفضيلات العرض
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme">نمط العرض</Label>
                    <Select 
                      value={settings.theme}
                      onValueChange={(value) => updateSetting('theme', value as 'light' | 'dark')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النمط" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">فاتح</SelectItem>
                        <SelectItem value="dark">داكن</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="fontSize">حجم الخط</Label>
                    <Select 
                      value={settings.fontSize || "medium"}
                      onValueChange={(value) => updateSetting('fontSize', value as 'small' | 'medium' | 'large')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر حجم الخط" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">صغير</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="large">كبير</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="density">كثافة العرض</Label>
                  <Select 
                    value={settings.density || "comfortable"}
                    onValueChange={(value) => updateSetting('density', value as 'compact' | 'comfortable' | 'spacious')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر كثافة العرض" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">مضغوط</SelectItem>
                      <SelectItem value="comfortable">مريح</SelectItem>
                      <SelectItem value="spacious">فسيح</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* إعدادات المحاسبة */}
          <TabsContent value="accounting">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="ml-2" size={20} />
                  إعدادات المحاسبة
                </CardTitle>
                <CardDescription>
                  إعدادات الفترات المحاسبية والفواتير
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fiscalYearStart">بداية السنة المالية</Label>
                    <Input 
                      type="date"
                      id="fiscalYearStart" 
                      value={settings.fiscalYearStart ? new Date(settings.fiscalYearStart).toISOString().substring(0, 10) : ""} 
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : new Date();
                        updateSetting('fiscalYearStart', date);
                      }}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="lockPeriod">فترة إغلاق الفترات المحاسبية</Label>
                    <Select 
                      value={settings.lockPeriod || "month"}
                      onValueChange={(value) => updateSetting('lockPeriod', value as 'day' | 'week' | 'month' | 'quarter')}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر فترة الإغلاق" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day">يومي</SelectItem>
                        <SelectItem value="week">أسبوعي</SelectItem>
                        <SelectItem value="month">شهري</SelectItem>
                        <SelectItem value="quarter">ربع سنوي</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="invoicePrefix">بادئة الفواتير</Label>
                    <Input 
                      id="invoicePrefix" 
                      value={settings.invoicePrefix || "INV"} 
                      onChange={(e) => updateSetting('invoicePrefix', e.target.value)}
                      placeholder="مثال: INV-"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="invoiceStartNumber">رقم بداية الفواتير</Label>
                    <Input 
                      id="invoiceStartNumber" 
                      type="number"
                      min={1}
                      value={settings.invoiceStartNumber || 1} 
                      onChange={(e) => updateSetting('invoiceStartNumber', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="automaticNumbering" 
                    checked={true}
                  />
                  <Label htmlFor="automaticNumbering" className="mr-2">ترقيم الفواتير تلقائيًا</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end gap-4 mt-6">
          <Button 
            variant="outline" 
            onClick={handleReset}
          >
            إعادة الضبط
          </Button>
          <Button 
            onClick={handleSaveChanges}
            disabled={isLoading}
          >
            {isLoading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default SystemSettingsPage;
