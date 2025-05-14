
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThemeSettings } from "@/types/theme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ThemePreviewProps {
  theme: ThemeSettings;
}

export const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
  const applyThemeStyles = (element: string) => {
    const styles: React.CSSProperties = {};
    
    // استخدام نوع الخط وحجمه
    if (element === 'container' || element === 'text') {
      styles.fontFamily = `'${theme.fonts.family}', sans-serif`;
    }
    
    // تطبيق الألوان المناسبة حسب العنصر
    switch (element) {
      case 'container':
        styles.backgroundColor = theme.colors.background;
        styles.color = theme.colors.textPrimary;
        styles.borderRadius = getRoundnessValue(theme.roundness.size);
        styles.boxShadow = getShadowValue(theme.effects.shadows);
        styles.padding = getSpacingValue(theme.spacing.size);
        break;
      case 'header':
        styles.backgroundColor = theme.colors.header;
        styles.color = '#ffffff';
        styles.padding = `${getSpacingValue(theme.spacing.size, 0.7)} ${getSpacingValue(theme.spacing.size)}`;
        styles.borderRadius = getRoundnessValue(theme.roundness.size, 0.75);
        styles.marginBottom = getSpacingValue(theme.spacing.size);
        break;
      case 'heading':
        styles.fontFamily = `'${theme.fonts.headings.family}', sans-serif`;
        styles.fontWeight = getFontWeightValue(theme.fonts.headings.weight);
        styles.marginBottom = getSpacingValue(theme.spacing.size, 0.5);
        break;
      case 'text':
        styles.color = theme.colors.textPrimary;
        styles.marginBottom = getSpacingValue(theme.spacing.size, 0.5);
        break;
      case 'secondaryText':
        styles.color = theme.colors.textSecondary;
        styles.fontSize = '0.9em';
        styles.marginBottom = getSpacingValue(theme.spacing.size, 0.5);
        break;
      case 'link':
        styles.color = theme.colors.link;
        break;
      case 'button':
        styles.backgroundColor = theme.colors.button;
        styles.color = "#ffffff";
        styles.borderRadius = getRoundnessValue(theme.roundness.size, 0.75);
        break;
      case 'secondaryContainer':
        styles.backgroundColor = theme.colors.secondary;
        styles.borderRadius = getRoundnessValue(theme.roundness.size, 0.75);
        styles.padding = getSpacingValue(theme.spacing.size, 0.7);
        styles.marginTop = getSpacingValue(theme.spacing.size, 0.7);
        break;
      case 'sidebar':
        styles.backgroundColor = theme.colors.sidebar.background;
        styles.color = theme.colors.sidebar.foreground;
        styles.borderRadius = getRoundnessValue(theme.roundness.size, 0.75);
        styles.padding = getSpacingValue(theme.spacing.size, 0.5);
        break;
      case 'sidebarItem':
        styles.padding = getSpacingValue(theme.spacing.size, 0.5);
        styles.color = theme.colors.sidebar.item.text;
        styles.display = 'flex';
        styles.alignItems = 'center';
        styles.borderRadius = getRoundnessValue(theme.roundness.size, 0.75);
        break;
      case 'sidebarItemActive':
        styles.padding = getSpacingValue(theme.spacing.size, 0.5);
        styles.backgroundColor = theme.colors.sidebar.item.active;
        styles.color = theme.colors.sidebar.item.activeText;
        styles.display = 'flex';
        styles.alignItems = 'center';
        styles.borderRadius = getRoundnessValue(theme.roundness.size, 0.75);
        break;
    }
    
    return styles;
  };

  // Helper functions for converting theme values to CSS values
  const getFontWeightValue = (weight: string): number => {
    switch(weight) {
      case 'normal': return 400;
      case 'medium': return 500;
      case 'semibold': return 600;
      case 'bold': return 700;
      default: return 400;
    }
  };

  const getRoundnessValue = (size: string, multiplier = 1): string => {
    const baseRadius = 8; // القيمة الأساسية بالبكسل
    switch(size) {
      case 'none': return '0px';
      case 'small': return `${baseRadius * 0.5 * multiplier}px`;
      case 'medium': return `${baseRadius * multiplier}px`;
      case 'large': return `${baseRadius * 1.5 * multiplier}px`;
      case 'full': return '9999px';
      default: return `${baseRadius * multiplier}px`;
    }
  };

  const getShadowValue = (size: string): string => {
    switch(size) {
      case 'none': return 'none';
      case 'light': return '0 2px 4px rgba(0, 0, 0, 0.1)';
      case 'medium': return '0 4px 8px rgba(0, 0, 0, 0.15)';
      case 'heavy': return '0 8px 16px rgba(0, 0, 0, 0.2)';
      default: return '0 4px 8px rgba(0, 0, 0, 0.15)';
    }
  };

  const getSpacingValue = (size: string, multiplier = 1): string => {
    const baseSpacing = 16; // القيمة الأساسية بالبكسل
    switch(size) {
      case 'compact': return `${baseSpacing * 0.75 * multiplier}px`;
      case 'medium': return `${baseSpacing * multiplier}px`;
      case 'large': return `${baseSpacing * 1.25 * multiplier}px`;
      default: return `${baseSpacing * multiplier}px`;
    }
  };

  return (
    <Card className="sticky top-4 shadow-md">
      <CardHeader>
        <CardTitle>معاينة مباشرة</CardTitle>
        <CardDescription>معاينة التغييرات قبل الحفظ</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="mainView" className="mb-4">
          <TabsList className="w-full mb-2">
            <TabsTrigger value="mainView" className="flex-1">الواجهة الرئيسية</TabsTrigger>
            <TabsTrigger value="sidebar" className="flex-1">القائمة الجانبية</TabsTrigger>
          </TabsList>
          
          <TabsContent value="mainView">
            <div className="border rounded-md overflow-hidden" style={applyThemeStyles('container')}>
              <div style={applyThemeStyles('header')}>
                <h3 className="text-sm font-medium">ترويسة التطبيق</h3>
              </div>
              
              <div className="p-4">
                <h4 className="text-lg" style={applyThemeStyles('heading')}>عنوان القسم</h4>
                <p className="text-sm" style={applyThemeStyles('text')}>
                  هذا نص تجريبي لمعاينة كيفية ظهور النصوص في التطبيق. يمكنك رؤية تأثير اختياراتك هنا.
                </p>
                <p className="text-xs" style={applyThemeStyles('secondaryText')}>
                  نص ثانوي أصغر حجمًا لمعاينة لون النص الثانوي.
                </p>
                
                <div className="my-3">
                  <a href="#" style={applyThemeStyles('link')}>رابط تجريبي</a>
                </div>
                
                <div className="flex space-x-2 space-x-reverse mb-3">
                  <Button style={applyThemeStyles('button')}>
                    زر رئيسي
                  </Button>
                  <Button variant="outline">زر ثانوي</Button>
                </div>
                
                <div style={applyThemeStyles('secondaryContainer')}>
                  <p className="text-xs">
                    هذا مثال على القسم ذو الخلفية الثانوية
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sidebar">
            <div className="border rounded-md overflow-hidden" style={applyThemeStyles('container')}>
              <div className="h-64" style={applyThemeStyles('sidebar')}>
                <div className="px-2 py-4 mb-4 text-center">
                  <div className="font-bold mb-1">اسم النظام</div>
                  <div className="text-xs opacity-75">لوحة التحكم</div>
                </div>
                
                <div style={applyThemeStyles('sidebarItemActive')} className="mb-1">
                  <span className="mr-2 text-lg">⬚</span>
                  <span>لوحة التحكم</span>
                </div>
                
                <div style={applyThemeStyles('sidebarItem')} className="mb-1">
                  <span className="mr-2 text-lg">⬚</span>
                  <span>المبيعات</span>
                </div>
                
                <div style={applyThemeStyles('sidebarItem')} className="mb-1">
                  <span className="mr-2 text-lg">⬚</span>
                  <span>المشتريات</span>
                </div>
                
                <div style={applyThemeStyles('sidebarItem')}>
                  <span className="mr-2 text-lg">⬚</span>
                  <span>الإعدادات</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* نصائح للمستخدم */}
        <div className="text-xs text-muted-foreground p-3 bg-muted rounded-md mt-4">
          <p className="font-semibold mb-1">❓ نصائح للتخصيص:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>تأكد من وجود تباين كافٍ بين ألوان النصوص والخلفيات</li>
            <li>اختر ألوانًا متناسقة تعكس هوية مؤسستك</li>
            <li>يمكنك تبديل الوضع بين الفاتح والداكن لمعاينة كلا المظهرين</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
