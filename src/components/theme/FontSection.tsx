
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeFonts, FontOption, FontWeightOption, FontSizeOption } from "@/types/theme";
import { fontOptions, fontWeightOptions, fontSizeOptions } from "@/hooks/theme/themeDefaults";

interface FontSectionProps {
  fonts: ThemeFonts;
  onFontFamilyChange: (value: string) => void;
  onFontSizeChange: (value: 'small' | 'medium' | 'large' | 'xlarge') => void;
  onHeadingFontFamilyChange: (value: string) => void;
  onHeadingFontWeightChange: (value: 'normal' | 'medium' | 'semibold' | 'bold') => void;
}

export const FontSection: React.FC<FontSectionProps> = ({
  fonts,
  onFontFamilyChange,
  onFontSizeChange,
  onHeadingFontFamilyChange,
  onHeadingFontWeightChange
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إعدادات الخطوط</CardTitle>
        <CardDescription>
          قم بتخصيص الخطوط المستخدمة في التطبيق
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fontFamily">خط النص الأساسي</Label>
            <Select
              value={fonts.family}
              onValueChange={onFontFamilyChange}
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
            <Label htmlFor="fontSize">حجم الخط</Label>
            <Select
              value={fonts.size}
              onValueChange={(value) => onFontSizeChange(value as 'small' | 'medium' | 'large' | 'xlarge')}
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
          </div>
        </div>
        
        <div className="space-y-2 pt-4 border-t">
          <h3 className="font-medium mb-3">إعدادات العناوين</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="headingFontFamily">خط العناوين</Label>
              <Select
                value={fonts.headings.family}
                onValueChange={onHeadingFontFamilyChange}
              >
                <SelectTrigger id="headingFontFamily">
                  <SelectValue placeholder="اختر نوع خط العناوين" />
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
              <Label htmlFor="headingFontWeight">وزن خط العناوين</Label>
              <Select
                value={fonts.headings.weight}
                onValueChange={(value) => onHeadingFontWeightChange(value as 'normal' | 'medium' | 'semibold' | 'bold')}
              >
                <SelectTrigger id="headingFontWeight">
                  <SelectValue placeholder="اختر وزن خط العناوين" />
                </SelectTrigger>
                <SelectContent>
                  {fontWeightOptions.map((weight) => (
                    <SelectItem key={weight.value} value={weight.value}>
                      {weight.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="p-4 border rounded-md mt-4">
          <h3 className="font-medium mb-2">معاينة الخطوط</h3>
          <div className="space-y-3">
            <h1 style={{ 
              fontFamily: fonts.headings.family, 
              fontWeight: fonts.headings.weight === 'normal' ? 400 : 
                        fonts.headings.weight === 'medium' ? 500 : 
                        fonts.headings.weight === 'semibold' ? 600 : 700 
            }}>
              عنوان رئيسي
            </h1>
            <h2 style={{ 
              fontFamily: fonts.headings.family, 
              fontWeight: fonts.headings.weight === 'normal' ? 400 : 
                        fonts.headings.weight === 'medium' ? 500 : 
                        fonts.headings.weight === 'semibold' ? 600 : 700 
            }}>
              عنوان فرعي
            </h2>
            <p style={{ fontFamily: fonts.family }}>
              هذا نص تجريبي لعرض الخط المحدد. سيظهر هذا النص بالخط والحجم الذي تم اختياره.
            </p>
            <p style={{ fontFamily: fonts.family, fontSize: "0.875rem" }}>
              هذا نص بحجم أصغر لعرض التباين بين أحجام الخطوط.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
