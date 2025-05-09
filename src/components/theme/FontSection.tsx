
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeFonts } from "@/types/theme";
import { fontOptions, fontSizeOptions } from "@/hooks/useThemeCustomization";

interface FontSectionProps {
  fonts: ThemeFonts;
  onFontFamilyChange: (value: string) => void;
  onFontSizeChange: (value: 'small' | 'medium' | 'large') => void;
  linkColor: string;
}

export const FontSection: React.FC<FontSectionProps> = ({ 
  fonts, 
  onFontFamilyChange, 
  onFontSizeChange,
  linkColor
}) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>الخطوط</CardTitle>
          <CardDescription>تخصيص نوع وحجم الخط</CardDescription>
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
              نوع الخط المستخدم في التطبيق
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontSize">حجم الخط</Label>
            <Select 
              value={fonts.size} 
              onValueChange={(value: string) => onFontSizeChange(value as 'small' | 'medium' | 'large')}
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
                نص ثانوي أصغر حجمًا لمعاينة الخط في النصوص الوصفية.
              </p>
              <div className="mt-2">
                <a href="#" className="hover:underline" style={{ color: linkColor }}>
                  رابط تجريبي
                </a>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
