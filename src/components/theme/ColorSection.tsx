
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ThemeColors } from "@/types/theme";

interface ColorSectionProps {
  colors: ThemeColors;
  onColorChange: (key: keyof ThemeColors, value: string) => void;
}

export const ColorSection: React.FC<ColorSectionProps> = ({ colors, onColorChange }) => {
  return (
    <div className="space-y-4">
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
                  style={{ backgroundColor: colors.primary }}
                ></div>
                <Input
                  id="primaryColor"
                  type="color"
                  value={colors.primary}
                  onChange={(e) => onColorChange('primary', e.target.value)}
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
                  style={{ backgroundColor: colors.secondary }}
                ></div>
                <Input
                  id="secondaryColor"
                  type="color"
                  value={colors.secondary}
                  onChange={(e) => onColorChange('secondary', e.target.value)}
                  className="w-full h-8"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                يستخدم للخلفيات والعناصر الثانوية
              </p>
            </div>
          </div>
          
          <Separator className="my-2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="backgroundColor">لون الخلفية</Label>
              <div className="flex gap-2">
                <div 
                  className="w-8 h-8 rounded-full border"
                  style={{ backgroundColor: colors.background }}
                ></div>
                <Input
                  id="backgroundColor"
                  type="color"
                  value={colors.background}
                  onChange={(e) => onColorChange('background', e.target.value)}
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
                  style={{ backgroundColor: colors.button }}
                ></div>
                <Input
                  id="buttonColor"
                  type="color"
                  value={colors.button}
                  onChange={(e) => onColorChange('button', e.target.value)}
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
                style={{ backgroundColor: colors.header }}
              ></div>
              <Input
                id="headerColor"
                type="color"
                value={colors.header}
                onChange={(e) => onColorChange('header', e.target.value)}
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
                  style={{ backgroundColor: colors.textPrimary }}
                ></div>
                <Input
                  id="textPrimaryColor"
                  type="color"
                  value={colors.textPrimary}
                  onChange={(e) => onColorChange('textPrimary', e.target.value)}
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
                  style={{ backgroundColor: colors.textSecondary }}
                ></div>
                <Input
                  id="textSecondaryColor"
                  type="color"
                  value={colors.textSecondary}
                  onChange={(e) => onColorChange('textSecondary', e.target.value)}
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
                style={{ backgroundColor: colors.link }}
              ></div>
              <Input
                id="linkColor"
                type="color"
                value={colors.link}
                onChange={(e) => onColorChange('link', e.target.value)}
                className="w-full h-8"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              لون الروابط في التطبيق
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
