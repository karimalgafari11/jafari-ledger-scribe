
import React, { useState } from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Palette, Save, Undo2, LayoutDashboard, Type, ArrowLeftRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

// Mock theme settings
const mockThemeSettings = {
  primaryColor: "#0066cc",
  secondaryColor: "#6c757d",
  accentColor: "#ff9800",
  textColor: "#212529",
  backgroundColor: "#f8f9fa",
  cardColor: "#ffffff",
  borderColor: "#dee2e6",
  borderRadius: 8,
  fontFamily: "Neo Sans Arabic, sans-serif",
  fontSize: 16,
  customCSS: "",
  layoutDirection: "rtl",
  darkMode: false,
  sidebarCollapsed: false,
  sidebarPosition: "right",
  contentWidth: "full",
  animationsEnabled: true
};

// Color presets
const colorPresets = [
  { name: "الافتراضي", primary: "#0066cc", secondary: "#6c757d", accent: "#ff9800" },
  { name: "الأخضر", primary: "#28a745", secondary: "#6c757d", accent: "#ffc107" },
  { name: "الأحمر", primary: "#dc3545", secondary: "#6c757d", accent: "#17a2b8" },
  { name: "البنفسجي", primary: "#6f42c1", secondary: "#6c757d", accent: "#20c997" }
];

// Font options
const fontOptions = [
  { value: "Neo Sans Arabic, sans-serif", label: "Neo Sans Arabic" },
  { value: "Droid Arabic Kufi, sans-serif", label: "Droid Arabic Kufi" },
  { value: "Cairo, sans-serif", label: "Cairo" },
  { value: "Tajawal, sans-serif", label: "Tajawal" },
  { value: "Almarai, sans-serif", label: "Almarai" }
];

const ThemeCustomizationPage = () => {
  const [themeSettings, setThemeSettings] = useState(mockThemeSettings);
  const [activeTab, setActiveTab] = useState("colors");
  const [previewMode, setPreviewMode] = useState<"light" | "dark">("light");

  const handleColorChange = (key: string, value: string) => {
    setThemeSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleLayoutChange = (key: string, value: any) => {
    setThemeSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const applyColorPreset = (preset: any) => {
    setThemeSettings(prev => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent
    }));
    toast.success(`تم تطبيق نمط الألوان: ${preset.name}`);
  };

  const handleSaveTheme = () => {
    toast.success("تم حفظ إعدادات المظهر بنجاح");
  };

  const handleResetTheme = () => {
    setThemeSettings(mockThemeSettings);
    toast.info("تم إعادة تعيين إعدادات المظهر للقيم الافتراضية");
  };

  // Preview component to show theme changes
  const ThemePreview = () => {
    const previewStyles = {
      backgroundColor: previewMode === "light" ? themeSettings.backgroundColor : "#121212",
      color: previewMode === "light" ? themeSettings.textColor : "#e0e0e0",
      fontFamily: themeSettings.fontFamily,
      padding: "20px",
      borderRadius: `${themeSettings.borderRadius}px`,
      border: `1px solid ${previewMode === "light" ? themeSettings.borderColor : "#333"}`,
      direction: themeSettings.layoutDirection as any
    };

    const cardStyles = {
      backgroundColor: previewMode === "light" ? themeSettings.cardColor : "#1e1e1e",
      borderRadius: `${themeSettings.borderRadius}px`,
      padding: "15px",
      marginBottom: "15px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      border: `1px solid ${previewMode === "light" ? themeSettings.borderColor : "#333"}`
    };

    const buttonStyles = {
      backgroundColor: themeSettings.primaryColor,
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: `${themeSettings.borderRadius}px`,
      cursor: "pointer",
      marginRight: "10px"
    };

    const secondaryButtonStyles = {
      backgroundColor: themeSettings.secondaryColor,
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: `${themeSettings.borderRadius}px`,
      cursor: "pointer"
    };

    const accentStyles = {
      color: themeSettings.accentColor,
      fontWeight: "bold"
    };

    return (
      <div style={previewStyles}>
        <h3 style={{ fontFamily: themeSettings.fontFamily, fontSize: `${themeSettings.fontSize}px`, marginBottom: "15px" }}>
          معاينة المظهر
        </h3>
        
        <div style={cardStyles}>
          <h4 style={{ fontFamily: themeSettings.fontFamily, color: previewMode === "light" ? themeSettings.textColor : "#e0e0e0" }}>
            عنوان البطاقة
          </h4>
          <p style={{ fontSize: `${themeSettings.fontSize - 2}px` }}>
            هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.
            <span style={accentStyles}> نص مميز بلون التمييز</span>.
          </p>
          <div style={{ marginTop: "10px" }}>
            <button style={buttonStyles}>زر أساسي</button>
            <button style={secondaryButtonStyles}>زر ثانوي</button>
          </div>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
          <div style={{ height: "20px", width: "50px", backgroundColor: themeSettings.primaryColor, borderRadius: `${themeSettings.borderRadius}px` }}></div>
          <div style={{ height: "20px", width: "50px", backgroundColor: themeSettings.secondaryColor, borderRadius: `${themeSettings.borderRadius}px` }}></div>
          <div style={{ height: "20px", width: "50px", backgroundColor: themeSettings.accentColor, borderRadius: `${themeSettings.borderRadius}px` }}></div>
        </div>
      </div>
    );
  };

  return (
    <PageContainer title="تخصيص المظهر" showBack={true}>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">تخصيص مظهر النظام</h1>
          <div className="space-x-2 flex">
            <Button variant="outline" onClick={handleResetTheme}>
              <Undo2 className="ml-2 h-4 w-4" />
              إعادة تعيين
            </Button>
            <Button onClick={handleSaveTheme}>
              <Save className="ml-2 h-4 w-4" />
              حفظ التغييرات
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="colors" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="colors">الألوان</TabsTrigger>
                <TabsTrigger value="typography">الخطوط</TabsTrigger>
                <TabsTrigger value="layout">التخطيط</TabsTrigger>
                <TabsTrigger value="advanced">متقدم</TabsTrigger>
              </TabsList>
              
              <TabsContent value="colors">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Palette className="ml-2 h-5 w-5" />
                      إعدادات الألوان
                    </CardTitle>
                    <CardDescription>
                      تخصيص ألوان واجهة المستخدم
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor">اللون الأساسي</Label>
                        <div className="flex">
                          <Input
                            id="primaryColor"
                            type="color"
                            value={themeSettings.primaryColor}
                            onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input 
                            type="text"
                            value={themeSettings.primaryColor}
                            onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                            className="flex-1 mr-2"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="secondaryColor">اللون الثانوي</Label>
                        <div className="flex">
                          <Input
                            id="secondaryColor"
                            type="color"
                            value={themeSettings.secondaryColor}
                            onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input 
                            type="text"
                            value={themeSettings.secondaryColor}
                            onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                            className="flex-1 mr-2"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="accentColor">لون التمييز</Label>
                        <div className="flex">
                          <Input
                            id="accentColor"
                            type="color"
                            value={themeSettings.accentColor}
                            onChange={(e) => handleColorChange("accentColor", e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input 
                            type="text"
                            value={themeSettings.accentColor}
                            onChange={(e) => handleColorChange("accentColor", e.target.value)}
                            className="flex-1 mr-2"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="textColor">لون النص</Label>
                        <div className="flex">
                          <Input
                            id="textColor"
                            type="color"
                            value={themeSettings.textColor}
                            onChange={(e) => handleColorChange("textColor", e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input 
                            type="text"
                            value={themeSettings.textColor}
                            onChange={(e) => handleColorChange("textColor", e.target.value)}
                            className="flex-1 mr-2"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="backgroundColor">لون الخلفية</Label>
                        <div className="flex">
                          <Input
                            id="backgroundColor"
                            type="color"
                            value={themeSettings.backgroundColor}
                            onChange={(e) => handleColorChange("backgroundColor", e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input 
                            type="text"
                            value={themeSettings.backgroundColor}
                            onChange={(e) => handleColorChange("backgroundColor", e.target.value)}
                            className="flex-1 mr-2"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardColor">لون البطاقات</Label>
                        <div className="flex">
                          <Input
                            id="cardColor"
                            type="color"
                            value={themeSettings.cardColor}
                            onChange={(e) => handleColorChange("cardColor", e.target.value)}
                            className="w-12 h-10 p-1"
                          />
                          <Input 
                            type="text"
                            value={themeSettings.cardColor}
                            onChange={(e) => handleColorChange("cardColor", e.target.value)}
                            className="flex-1 mr-2"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-4">
                      <Label>قوالب الألوان الجاهزة</Label>
                      <div className="flex flex-wrap gap-3">
                        {colorPresets.map((preset) => (
                          <Button
                            key={preset.name}
                            variant="outline"
                            className="flex items-center"
                            onClick={() => applyColorPreset(preset)}
                          >
                            <div className="flex gap-1 ml-2">
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: preset.primary }}
                              />
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: preset.secondary }}
                              />
                              <div 
                                className="w-3 h-3 rounded-full" 
                                style={{ backgroundColor: preset.accent }}
                              />
                            </div>
                            {preset.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="space-y-2">
                      <Label htmlFor="borderRadius">نصف قطر الحدود</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="borderRadius"
                          min={0}
                          max={16}
                          step={1}
                          value={[themeSettings.borderRadius]}
                          onValueChange={(values) => handleLayoutChange("borderRadius", values[0])}
                          className="flex-1"
                        />
                        <span className="w-12 text-center">{themeSettings.borderRadius}px</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch
                        id="darkMode"
                        checked={themeSettings.darkMode}
                        onCheckedChange={(checked) => handleLayoutChange("darkMode", checked)}
                      />
                      <Label htmlFor="darkMode" className="mr-2">تفعيل الوضع الداكن افتراضياً</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="typography">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Type className="ml-2 h-5 w-5" />
                      إعدادات الخطوط
                    </CardTitle>
                    <CardDescription>
                      تخصيص الخطوط وأحجامها
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="fontFamily">نوع الخط</Label>
                      <Select
                        value={themeSettings.fontFamily}
                        onValueChange={(value) => handleLayoutChange("fontFamily", value)}
                      >
                        <SelectTrigger id="fontFamily">
                          <SelectValue placeholder="اختر نوع الخط" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem key={font.value} value={font.value}>
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fontSize">حجم الخط الأساسي</Label>
                      <div className="flex items-center gap-4">
                        <Slider
                          id="fontSize"
                          min={12}
                          max={24}
                          step={1}
                          value={[themeSettings.fontSize]}
                          onValueChange={(values) => handleLayoutChange("fontSize", values[0])}
                          className="flex-1"
                        />
                        <span className="w-12 text-center">{themeSettings.fontSize}px</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mt-6">
                      <Label>معاينة أحجام الخطوط</Label>
                      <div className="space-y-3 p-4 border rounded-md">
                        <p style={{ fontSize: "24px", fontFamily: themeSettings.fontFamily }}>العنوان الرئيسي (24px)</p>
                        <p style={{ fontSize: "20px", fontFamily: themeSettings.fontFamily }}>العنوان الفرعي (20px)</p>
                        <p style={{ fontSize: "16px", fontFamily: themeSettings.fontFamily }}>النص العادي (16px)</p>
                        <p style={{ fontSize: "14px", fontFamily: themeSettings.fontFamily }}>النص الصغير (14px)</p>
                        <p style={{ fontSize: "12px", fontFamily: themeSettings.fontFamily }}>التعليقات والهوامش (12px)</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="layout">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LayoutDashboard className="ml-2 h-5 w-5" />
                      إعدادات التخطيط
                    </CardTitle>
                    <CardDescription>
                      تخصيص تخطيط واجهة المستخدم
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="layoutDirection">اتجاه التخطيط</Label>
                      <Select
                        value={themeSettings.layoutDirection}
                        onValueChange={(value) => handleLayoutChange("layoutDirection", value)}
                      >
                        <SelectTrigger id="layoutDirection">
                          <SelectValue placeholder="اختر اتجاه التخطيط" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rtl">من اليمين إلى اليسار (RTL)</SelectItem>
                          <SelectItem value="ltr">من اليسار إلى اليمين (LTR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="sidebarPosition">موضع القائمة الجانبية</Label>
                      <Select
                        value={themeSettings.sidebarPosition}
                        onValueChange={(value) => handleLayoutChange("sidebarPosition", value)}
                      >
                        <SelectTrigger id="sidebarPosition">
                          <SelectValue placeholder="اختر موضع القائمة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="right">اليمين</SelectItem>
                          <SelectItem value="left">اليسار</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contentWidth">عرض المحتوى</Label>
                      <Select
                        value={themeSettings.contentWidth}
                        onValueChange={(value) => handleLayoutChange("contentWidth", value)}
                      >
                        <SelectTrigger id="contentWidth">
                          <SelectValue placeholder="اختر عرض المحتوى" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full">عرض كامل</SelectItem>
                          <SelectItem value="boxed">محدود</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch
                        id="sidebarCollapsed"
                        checked={themeSettings.sidebarCollapsed}
                        onCheckedChange={(checked) => handleLayoutChange("sidebarCollapsed", checked)}
                      />
                      <Label htmlFor="sidebarCollapsed" className="mr-2">عرض القائمة الجانبية مطوية افتراضياً</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Switch
                        id="animationsEnabled"
                        checked={themeSettings.animationsEnabled}
                        onCheckedChange={(checked) => handleLayoutChange("animationsEnabled", checked)}
                      />
                      <Label htmlFor="animationsEnabled" className="mr-2">تفعيل الحركات والانتقالات</Label>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="advanced">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات متقدمة</CardTitle>
                    <CardDescription>
                      إعدادات CSS المخصصة
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="customCSS">CSS مخصص</Label>
                      <textarea
                        id="customCSS"
                        value={themeSettings.customCSS}
                        onChange={(e) => handleLayoutChange("customCSS", e.target.value)}
                        className="min-h-[300px] w-full border rounded-md p-2 font-mono text-sm"
                        placeholder="/* أضف رموز CSS المخصصة هنا */
.my-custom-class {
  background-color: #f5f5f5;
  padding: 10px;
}"
                      />
                    </div>
                    <Alert className="bg-amber-50">
                      <p className="text-sm text-amber-700">
                        <strong>ملاحظة:</strong> استخدم رموز CSS المخصصة بحذر. قد تؤثر التغييرات المخصصة على تجربة المستخدم وتوافق التطبيق.
                      </p>
                    </Alert>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>معاينة مباشرة</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                    onClick={() => setPreviewMode(previewMode === "light" ? "dark" : "light")}
                  >
                    <ArrowLeftRight className="ml-2 h-4 w-4" />
                    {previewMode === "light" ? "وضع داكن" : "وضع فاتح"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ThemePreview />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>معلومات المظهر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">الخط المستخدم</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {fontOptions.find(f => f.value === themeSettings.fontFamily)?.label || themeSettings.fontFamily}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">الألوان الأساسية</h4>
                  <div className="flex gap-2 mt-1">
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: themeSettings.primaryColor }}
                      title="اللون الأساسي"
                    ></div>
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: themeSettings.secondaryColor }}
                      title="اللون الثانوي"
                    ></div>
                    <div
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: themeSettings.accentColor }}
                      title="لون التمييز"
                    ></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium">اتجاه التخطيط</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {themeSettings.layoutDirection === "rtl" ? "من اليمين إلى اليسار (RTL)" : "من اليسار إلى اليمين (LTR)"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ThemeCustomizationPage;
