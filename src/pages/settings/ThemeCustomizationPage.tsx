
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { 
  Paintbrush, 
  Type, 
  Layout as LayoutIcon, 
  Save, 
  RotateCcw, 
  Check,
  Monitor,
  Moon,
  Sun,
  ChevronDown
} from "lucide-react";

// نوع بيانات السمة
interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  button: string;
  header: string;
  textPrimary: string;
  textSecondary: string;
  link: string;
}

interface ThemeFonts {
  family: string;
  size: 'small' | 'medium' | 'large';
}

interface ThemeSettings {
  colors: ThemeColors;
  fonts: ThemeFonts;
  mode: 'light' | 'dark';
}

// القيم الافتراضية
const defaultLightTheme: ThemeSettings = {
  colors: {
    primary: '#0a6e78',
    secondary: '#f3f4f6',
    background: '#ffffff',
    button: '#0a6e78',
    header: '#0a6e78',
    textPrimary: '#1f2937',
    textSecondary: '#4b5563',
    link: '#0a6e78',
  },
  fonts: {
    family: 'Tajawal',
    size: 'medium'
  },
  mode: 'light'
};

const defaultDarkTheme: ThemeSettings = {
  colors: {
    primary: '#0a6e78',
    secondary: '#2d3748',
    background: '#1a202c',
    button: '#0a6e78',
    header: '#1a202c',
    textPrimary: '#f7fafc',
    textSecondary: '#a0aec0',
    link: '#4fd1c5',
  },
  fonts: {
    family: 'Tajawal',
    size: 'medium'
  },
  mode: 'dark'
};

// خيارات الخطوط
const fontOptions = [
  { value: 'Tajawal', label: 'Tajawal' },
  { value: 'Cairo', label: 'Cairo' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Tahoma', label: 'Tahoma' },
  { value: 'Arial', label: 'Arial' },
];

// خيارات أحجام الخط
const fontSizeOptions = [
  { value: 'small', label: 'صغير', scale: 0.85 },
  { value: 'medium', label: 'متوسط', scale: 1 },
  { value: 'large', label: 'كبير', scale: 1.15 },
];

const ThemeCustomizationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("colors");
  const [currentTheme, setCurrentTheme] = useState<ThemeSettings>(defaultLightTheme);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  
  // تطبيق التغييرات على DOM
  useEffect(() => {
    applyThemeToDOM(currentTheme);
    
    // محاولة استرجاع الإعدادات المخزنة عند التحميل الأول
    if (localStorage.getItem('appThemeSettings')) {
      try {
        const savedTheme = JSON.parse(localStorage.getItem('appThemeSettings') || '');
        setCurrentTheme(savedTheme);
        applyThemeToDOM(savedTheme);
      } catch (e) {
        console.error('خطأ في استرجاع إعدادات السمة:', e);
      }
    }
  }, []);

  // تطبيق السمة على DOM
  const applyThemeToDOM = (theme: ThemeSettings) => {
    const root = document.documentElement;
    
    // تطبيق الألوان
    root.style.setProperty('--primary', themeColorToHsl(theme.colors.primary));
    root.style.setProperty('--secondary', themeColorToHsl(theme.colors.secondary));
    root.style.setProperty('--background', themeColorToHsl(theme.colors.background));
    root.style.setProperty('--foreground', themeColorToHsl(theme.colors.textPrimary));
    
    // تطبيق حجم الخط
    const fontSizeScale = fontSizeOptions.find(option => option.value === theme.fonts.size)?.scale || 1;
    root.style.setProperty('--font-scale', fontSizeScale.toString());
    
    // تطبيق نوع الخط
    if (theme.fonts.family !== 'Tajawal') {
      // إضافة الخط إذا كان مختلفًا عن Tajawal
      const fontLink = document.createElement('link');
      fontLink.rel = 'stylesheet';
      fontLink.href = `https://fonts.googleapis.com/css2?family=${theme.fonts.family}:wght@300;400;500;700&display=swap`;
      document.head.appendChild(fontLink);
    }
    
    document.body.style.fontFamily = `'${theme.fonts.family}', sans-serif`;
    
    // تطبيق وضع السمة (فاتح/داكن)
    if (theme.mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };
  
  // تحويل اللون إلى تنسيق HSL لمتغيرات CSS
  const themeColorToHsl = (color: string): string => {
    // تحويل مبسط - في التطبيق الحقيقي يتم تنفيذ تحويل hex إلى hsl
    // هنا نفترض أن المتغيرات في CSS موجودة بالفعل
    return color;
  };

  // تغيير لون في السمة
  const handleColorChange = (colorKey: keyof ThemeColors, value: string) => {
    setCurrentTheme({
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        [colorKey]: value
      }
    });
    
    // تطبيق التغيير فورًا للمعاينة المباشرة
    applyThemeToDOM({
      ...currentTheme,
      colors: {
        ...currentTheme.colors,
        [colorKey]: value
      }
    });
  };

  // تغيير الخط
  const handleFontFamilyChange = (value: string) => {
    setCurrentTheme({
      ...currentTheme,
      fonts: {
        ...currentTheme.fonts,
        family: value
      }
    });
    
    // تطبيق التغيير فورًا للمعاينة المباشرة
    applyThemeToDOM({
      ...currentTheme,
      fonts: {
        ...currentTheme.fonts,
        family: value
      }
    });
  };

  // تغيير حجم الخط
  const handleFontSizeChange = (value: 'small' | 'medium' | 'large') => {
    setCurrentTheme({
      ...currentTheme,
      fonts: {
        ...currentTheme.fonts,
        size: value
      }
    });
    
    // تطبيق التغيير فورًا للمعاينة المباشرة
    applyThemeToDOM({
      ...currentTheme,
      fonts: {
        ...currentTheme.fonts,
        size: value
      }
    });
  };

  // تبديل وضع السمة (فاتح/داكن)
  const handleThemeModeToggle = () => {
    const newMode = currentTheme.mode === 'light' ? 'dark' : 'light';
    const newTheme = newMode === 'light' ? 
      { ...currentTheme, ...defaultLightTheme, mode: 'light' } : 
      { ...currentTheme, ...defaultDarkTheme, mode: 'dark' };
      
    setCurrentTheme(newTheme);
    applyThemeToDOM(newTheme);
  };

  // حفظ التغييرات
  const handleSaveTheme = () => {
    // حفظ في التخزين المحلي (في التطبيق الحقيقي سيتم الحفظ في قاعدة البيانات)
    localStorage.setItem('appThemeSettings', JSON.stringify(currentTheme));
    
    // إظهار رسالة نجاح
    toast.success("تم حفظ إعدادات السمة بنجاح");
  };

  // إعادة التعيين إلى الإعدادات الافتراضية
  const handleResetTheme = () => {
    const defaultTheme = currentTheme.mode === 'light' ? defaultLightTheme : defaultDarkTheme;
    setCurrentTheme(defaultTheme);
    applyThemeToDOM(defaultTheme);
    setIsResetDialogOpen(false);
    toast.info("تم إعادة ضبط السمة إلى الإعدادات الافتراضية");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 rtl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">تخصيص المظهر</h1>
            <p className="text-muted-foreground mt-1">
              خصص ألوان وخطوط النظام حسب تفضيلاتك
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleThemeModeToggle}
              title={currentTheme.mode === 'light' ? 'تفعيل الوضع الليلي' : 'تفعيل الوضع النهاري'}
            >
              {currentTheme.mode === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            
            <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <RotateCcw className="h-4 w-4 ml-2" />
                  إعادة الضبط
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>إعادة ضبط السمة</AlertDialogTitle>
                  <AlertDialogDescription>
                    هل أنت متأكد من إعادة ضبط جميع إعدادات السمة إلى القيم الافتراضية؟ لا يمكن التراجع عن هذا الإجراء.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>إلغاء</AlertDialogCancel>
                  <AlertDialogAction onClick={handleResetTheme}>
                    نعم، إعادة الضبط
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <Button onClick={handleSaveTheme}>
              <Save className="h-4 w-4 ml-2" />
              حفظ التغييرات
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* قسم الإعدادات */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="colors" className="flex items-center">
                  <Paintbrush className="h-4 w-4 ml-2" />
                  الألوان
                </TabsTrigger>
                <TabsTrigger value="typography" className="flex items-center">
                  <Type className="h-4 w-4 ml-2" />
                  الخطوط
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex items-center">
                  <LayoutIcon className="h-4 w-4 ml-2" />
                  التخطيط
                </TabsTrigger>
              </TabsList>
              
              {/* محتوى علامات التبويب - قسم الألوان */}
              <TabsContent value="colors" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>الألوان الأساسية</CardTitle>
                    <CardDescription>تخصيص ألوان الواجهة الرئيسية</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="primaryColor">اللون الرئيسي</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-8 h-8 rounded-full border"
                            style={{ backgroundColor: currentTheme.colors.primary }}
                          ></div>
                          <Input
                            id="primaryColor"
                            type="color"
                            value={currentTheme.colors.primary}
                            onChange={(e) => handleColorChange('primary', e.target.value)}
                            className="w-full h-8"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          يستخدم للأزرار والعناصر التفاعلية الرئيسية
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="secondaryColor">اللون الثانوي</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-8 h-8 rounded-full border"
                            style={{ backgroundColor: currentTheme.colors.secondary }}
                          ></div>
                          <Input
                            id="secondaryColor"
                            type="color"
                            value={currentTheme.colors.secondary}
                            onChange={(e) => handleColorChange('secondary', e.target.value)}
                            className="w-full h-8"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          يستخدم للخلفيات والعناصر الثانوية
                        </p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="backgroundColor">لون الخلفية</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-8 h-8 rounded-full border"
                            style={{ backgroundColor: currentTheme.colors.background }}
                          ></div>
                          <Input
                            id="backgroundColor"
                            type="color"
                            value={currentTheme.colors.background}
                            onChange={(e) => handleColorChange('background', e.target.value)}
                            className="w-full h-8"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          لون خلفية صفحات التطبيق
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="buttonColor">لون الأزرار</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-8 h-8 rounded-full border"
                            style={{ backgroundColor: currentTheme.colors.button }}
                          ></div>
                          <Input
                            id="buttonColor"
                            type="color"
                            value={currentTheme.colors.button}
                            onChange={(e) => handleColorChange('button', e.target.value)}
                            className="w-full h-8"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          لون الأزرار الرئيسية في التطبيق
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="headerColor">لون الترويسة</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-8 h-8 rounded-full border"
                          style={{ backgroundColor: currentTheme.colors.header }}
                        ></div>
                        <Input
                          id="headerColor"
                          type="color"
                          value={currentTheme.colors.header}
                          onChange={(e) => handleColorChange('header', e.target.value)}
                          className="w-full h-8"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        لون ترويسة التطبيق (الشريط العلوي)
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>ألوان النصوص</CardTitle>
                    <CardDescription>تخصيص ألوان النصوص والروابط</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="textPrimaryColor">لون النص الأساسي</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-8 h-8 rounded-full border"
                            style={{ backgroundColor: currentTheme.colors.textPrimary }}
                          ></div>
                          <Input
                            id="textPrimaryColor"
                            type="color"
                            value={currentTheme.colors.textPrimary}
                            onChange={(e) => handleColorChange('textPrimary', e.target.value)}
                            className="w-full h-8"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          لون النص الأساسي في التطبيق
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="textSecondaryColor">لون النص الثانوي</Label>
                        <div className="flex gap-2">
                          <div 
                            className="w-8 h-8 rounded-full border"
                            style={{ backgroundColor: currentTheme.colors.textSecondary }}
                          ></div>
                          <Input
                            id="textSecondaryColor"
                            type="color"
                            value={currentTheme.colors.textSecondary}
                            onChange={(e) => handleColorChange('textSecondary', e.target.value)}
                            className="w-full h-8"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          لون النص الثانوي والوصفي
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="linkColor">لون الروابط</Label>
                      <div className="flex gap-2">
                        <div 
                          className="w-8 h-8 rounded-full border"
                          style={{ backgroundColor: currentTheme.colors.link }}
                        ></div>
                        <Input
                          id="linkColor"
                          type="color"
                          value={currentTheme.colors.link}
                          onChange={(e) => handleColorChange('link', e.target.value)}
                          className="w-full h-8"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        لون الروابط في التطبيق
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* محتوى علامات التبويب - قسم الخطوط */}
              <TabsContent value="typography" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>الخطوط</CardTitle>
                    <CardDescription>تخصيص نوع وحجم الخط</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="fontFamily">نوع الخط</Label>
                      <Select 
                        value={currentTheme.fonts.family} 
                        onValueChange={handleFontFamilyChange}
                      >
                        <SelectTrigger id="fontFamily">
                          <SelectValue placeholder="اختر نوع الخط" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontOptions.map((font) => (
                            <SelectItem 
                              key={font.value} 
                              value={font.value}
                              style={{ fontFamily: font.value }}
                            >
                              {font.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        نوع الخط المستخدم في التطبيق
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fontSize">حجم الخط</Label>
                      <Select 
                        value={currentTheme.fonts.size} 
                        onValueChange={(value: string) => handleFontSizeChange(value as 'small' | 'medium' | 'large')}
                      >
                        <SelectTrigger id="fontSize">
                          <SelectValue placeholder="اختر حجم الخط" />
                        </SelectTrigger>
                        <SelectContent>
                          {fontSizeOptions.map((size) => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        حجم الخط المستخدم في التطبيق
                      </p>
                    </div>
                    
                    <div className="space-y-2 pt-4">
                      <Label>عينة من النص</Label>
                      <Card className="p-4 border">
                        <h3 className="text-xl font-bold mb-2">عنوان تجريبي</h3>
                        <p className="mb-2">
                          هذا نص تجريبي لمعاينة الخط المختار. يمكنك رؤية كيف سيظهر الخط في مختلف أحجام النص.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          نص ثانوي بحجم أصغر لمعاينة الخط في النصوص الوصفية.
                        </p>
                        <div className="mt-2">
                          <a href="#" className="hover:underline" style={{ color: currentTheme.colors.link }}>
                            رابط تجريبي
                          </a>
                        </div>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* محتوى علامات التبويب - قسم التخطيط */}
              <TabsContent value="layout" className="space-y-4 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات التخطيط</CardTitle>
                    <CardDescription>تخصيص تخطيط التطبيق</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="borderRadius">استدارة الحواف</Label>
                      <Slider
                        id="borderRadius"
                        min={0}
                        max={16}
                        step={1}
                        defaultValue={[8]}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>لا استدارة</span>
                        <span>استدارة قصوى</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="spacing">المسافات بين العناصر</Label>
                      <Slider
                        id="spacing"
                        min={1}
                        max={5}
                        step={1}
                        defaultValue={[3]}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>متقاربة</span>
                        <span>متباعدة</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>تأثيرات الظل</Label>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الظلال" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">بدون ظلال</SelectItem>
                          <SelectItem value="light">ظلال خفيفة</SelectItem>
                          <SelectItem value="medium">ظلال متوسطة</SelectItem>
                          <SelectItem value="heavy">ظلال كثيفة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>معاينة الكثافة</CardTitle>
                    <CardDescription>معاينة كثافة عناصر واجهة المستخدم</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Label>كثافة عناصر الواجهة</Label>
                      <Select defaultValue="comfortable">
                        <SelectTrigger>
                          <SelectValue placeholder="اختر كثافة العناصر" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compact">مضغوطة</SelectItem>
                          <SelectItem value="comfortable">مريحة</SelectItem>
                          <SelectItem value="spacious">متباعدة</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        تحدد المسافة بين عناصر واجهة المستخدم
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* قسم المعاينة */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>معاينة مباشرة</CardTitle>
                <CardDescription>معاينة التغييرات قبل الحفظ</CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="border rounded-md p-4 mb-4"
                  style={{ 
                    backgroundColor: currentTheme.colors.background,
                    color: currentTheme.colors.textPrimary,
                  }}
                >
                  <div 
                    className="h-10 mb-4 flex items-center px-3 rounded-md"
                    style={{ backgroundColor: currentTheme.colors.header, color: '#ffffff' }}
                  >
                    <h3 className="text-sm font-medium">ترويسة التطبيق</h3>
                  </div>
                  
                  <h4 className="text-lg font-bold mb-2">عنوان القسم</h4>
                  <p className="text-sm mb-3" style={{ color: currentTheme.colors.textPrimary }}>
                    هذا نص تجريبي لمعاينة كيفية ظهور النصوص في التطبيق. يمكنك رؤية تأثير اختياراتك هنا.
                  </p>
                  <p className="text-xs mb-3" style={{ color: currentTheme.colors.textSecondary }}>
                    نص ثانوي أصغر حجمًا لمعاينة لون النص الثانوي.
                  </p>
                  
                  <div className="mb-4">
                    <a href="#" style={{ color: currentTheme.colors.link }}>رابط تجريبي</a>
                  </div>
                  
                  <div className="flex space-x-2 space-x-reverse">
                    <Button 
                      style={{
                        backgroundColor: currentTheme.colors.button,
                        color: "#ffffff"
                      }}
                    >
                      زر رئيسي
                    </Button>
                    <Button variant="outline">زر ثانوي</Button>
                  </div>
                  
                  <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: currentTheme.colors.secondary }}>
                    <p className="text-xs">
                      هذا مثال على القسم ذو الخلفية الثانوية
                    </p>
                  </div>
                </div>
                
                {/* نصائح للمستخدم */}
                <div className="text-xs text-muted-foreground p-2 bg-muted rounded-md">
                  <p>❓ نصائح للتخصيص:</p>
                  <ul className="list-disc list-inside mt-1">
                    <li>تأكد من وجود تباين كافٍ بين ألوان النصوص والخلفيات</li>
                    <li>اختر ألوانًا متناسقة تعكس هوية مؤسستك</li>
                    <li>يمكنك تبديل الوضع بين الفاتح والداكن لمعاينة كلا المظهرين</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ThemeCustomizationPage;
