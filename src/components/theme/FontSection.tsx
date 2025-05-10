
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HeadingFonts, ThemeFonts } from "@/types/theme";
import { fontOptions, fontSizeOptions, fontWeightOptions } from "@/hooks/theme/themeDefaults";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface FontSectionProps {
  fonts: ThemeFonts;
  onFontFamilyChange: (value: string) => void;
  onFontSizeChange: (value: 'small' | 'medium' | 'large' | 'xlarge') => void;
  onHeadingFontFamilyChange: (value: string) => void;
  onHeadingFontWeightChange: (value: 'normal' | 'medium' | 'semibold' | 'bold') => void;
  linkColor: string;
}

export const FontSection: React.FC<FontSectionProps> = ({ 
  fonts, 
  onFontFamilyChange, 
  onFontSizeChange,
  onHeadingFontFamilyChange,
  onHeadingFontWeightChange,
  linkColor
}) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="general">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="general" className="flex-1">الخط الأساسي</TabsTrigger>
          <TabsTrigger value="headings" className="flex-1">خط العناوين</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>الخط الأساسي</CardTitle>
              <CardDescription>تخصيص نوع وحجم الخط المستخدم في النصوص الأساسية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="fontFamily">نوع الخط</Label>
                <Select 
                  value={fonts.family} 
                  onValueChange={onFontFamilyChange}
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
                  نوع الخط المستخدم في النصوص الأساسية للتطبيق
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fontSize">حجم الخط</Label>
                <Select 
                  value={fonts.size} 
                  onValueChange={(value: string) => onFontSizeChange(value as 'small' | 'medium' | 'large' | 'xlarge')}
                >
                  <SelectTrigger id="fontSize">
                    <SelectValue placeholder="اختر حجم الخط" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontSizeOptions.map((size) => (
                      <SelectItem key={size.value} value={size.value}>
                        {size.label} ({Math.round(size.scale * 100)}%)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  حجم الخط المستخدم في جميع أنحاء التطبيق
                </p>
              </div>
              
              <div className="space-y-2 pt-4">
                <Label>معاينة الخط</Label>
                <Card className="p-4 border">
                  <p className="mb-2" style={{ fontFamily: `'${fonts.family}', sans-serif` }}>
                    هذا نص تجريبي لمعاينة الخط المختار. يمكنك رؤية كيف سيظهر الخط في مختلف أحجام النص.
                  </p>
                  <p className="text-sm text-muted-foreground mb-2" style={{ fontFamily: `'${fonts.family}', sans-serif` }}>
                    نص ثانوي أصغر حجمًا لمعاينة الخط في النصوص الوصفية.
                  </p>
                  <div>
                    <a href="#" className="hover:underline" style={{ color: linkColor, fontFamily: `'${fonts.family}', sans-serif` }}>
                      رابط تجريبي
                    </a>
                  </div>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="headings">
          <Card>
            <CardHeader>
              <CardTitle>خط العناوين</CardTitle>
              <CardDescription>تخصيص نوع وحجم الخط المستخدم في العناوين</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="headingFontFamily">نوع خط العناوين</Label>
                <Select 
                  value={fonts.headings.family} 
                  onValueChange={onHeadingFontFamilyChange}
                >
                  <SelectTrigger id="headingFontFamily">
                    <SelectValue placeholder="اختر نوع خط العناوين" />
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
                  نوع الخط المستخدم في عناوين التطبيق
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="headingFontWeight">سمك خط العناوين</Label>
                <Select 
                  value={fonts.headings.weight} 
                  onValueChange={(value: string) => onHeadingFontWeightChange(value as 'normal' | 'medium' | 'semibold' | 'bold')}
                >
                  <SelectTrigger id="headingFontWeight">
                    <SelectValue placeholder="اختر سمك خط العناوين" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontWeightOptions.map((weight) => (
                      <SelectItem key={weight.value} value={weight.value}>
                        {weight.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  سمك الخط المستخدم في عناوين التطبيق
                </p>
              </div>
              
              <Separator className="my-2" />
              
              <div className="space-y-2">
                <Label>معاينة خط العناوين</Label>
                <Card className="p-4 border">
                  <h1 className="text-2xl mb-2" style={{ 
                    fontFamily: `'${fonts.headings.family}', sans-serif`,
                    fontWeight: getFontWeight(fonts.headings.weight)
                  }}>
                    عنوان رئيسي (H1)
                  </h1>
                  <h2 className="text-xl mb-2" style={{ 
                    fontFamily: `'${fonts.headings.family}', sans-serif`,
                    fontWeight: getFontWeight(fonts.headings.weight)
                  }}>
                    عنوان فرعي (H2)
                  </h2>
                  <h3 className="text-lg mb-2" style={{ 
                    fontFamily: `'${fonts.headings.family}', sans-serif`,
                    fontWeight: getFontWeight(fonts.headings.weight)
                  }}>
                    عنوان ثالث (H3)
                  </h3>
                  <h4 className="text-base" style={{ 
                    fontFamily: `'${fonts.headings.family}', sans-serif`,
                    fontWeight: getFontWeight(fonts.headings.weight)
                  }}>
                    عنوان رابع (H4)
                  </h4>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to convert weight string to CSS font-weight value
function getFontWeight(weight: string): number {
  switch (weight) {
    case 'normal': return 400;
    case 'medium': return 500;
    case 'semibold': return 600;
    case 'bold': return 700;
    default: return 400;
  }
}
