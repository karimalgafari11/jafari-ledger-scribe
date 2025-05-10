
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeColors } from "@/types/theme";
import { Button } from "@/components/ui/button";
import { Check, Palette, Pipette } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ColorSectionProps {
  colors: ThemeColors;
  onColorChange: (key: keyof ThemeColors, value: string) => void;
  onSidebarColorChange: (key: string, value: string) => void;
}

export const ColorSection: React.FC<ColorSectionProps> = ({ 
  colors, 
  onColorChange,
  onSidebarColorChange
}) => {
  const [activeColorTab, setActiveColorTab] = useState<string>("main");

  const colorPresets = [
    { name: 'تركواز', primary: '#0a6e78', button: '#0a6e78', header: '#0a6e78', link: '#0a6e78' },
    { name: 'أزرق', primary: '#2563eb', button: '#2563eb', header: '#2563eb', link: '#2563eb' },
    { name: 'بنفسجي', primary: '#8b5cf6', button: '#8b5cf6', header: '#8b5cf6', link: '#8b5cf6' },
    { name: 'وردي', primary: '#ec4899', button: '#ec4899', header: '#ec4899', link: '#ec4899' },
    { name: 'أحمر', primary: '#ef4444', button: '#ef4444', header: '#ef4444', link: '#ef4444' },
    { name: 'برتقالي', primary: '#f97316', button: '#f97316', header: '#f97316', link: '#f97316' },
    { name: 'أخضر', primary: '#10b981', button: '#10b981', header: '#10b981', link: '#10b981' },
    { name: 'بوردو', primary: '#800020', button: '#800020', header: '#800020', link: '#800020' }
  ];

  const applyColorPreset = (preset: any) => {
    Object.keys(preset).forEach(key => {
      if (key !== 'name') {
        onColorChange(key as keyof ThemeColors, preset[key]);
      }
    });
  };
  
  const ColorSelector = ({ id, label, color, description, onChange }: { 
    id: string, 
    label: string, 
    color: string,
    description: string,
    onChange: (value: string) => void 
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="flex items-center gap-2">
        <div 
          className="w-8 h-8 rounded-full border"
          style={{ backgroundColor: color }}
        />
        <Input
          id={id}
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-8"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {description}
      </p>
    </div>
  );

  return (
    <div className="space-y-4">
      <Tabs value={activeColorTab} onValueChange={setActiveColorTab}>
        <TabsList className="w-full mb-4">
          <TabsTrigger value="main" className="flex-1">الألوان الأساسية</TabsTrigger>
          <TabsTrigger value="text" className="flex-1">ألوان النصوص</TabsTrigger>
          <TabsTrigger value="sidebar" className="flex-1">القائمة الجانبية</TabsTrigger>
        </TabsList>
        
        <TabsContent value="main">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>الألوان الأساسية</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      <Palette className="h-4 w-4 mr-1" />
                      <span>ألوان معدة مسبقاً</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80" align="end">
                    <div className="grid grid-cols-4 gap-2">
                      {colorPresets.map((preset, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className="h-10 p-0 overflow-hidden"
                          title={`تطبيق لون ${preset.name}`}
                          onClick={() => applyColorPreset(preset)}
                        >
                          <div className="w-full h-5" style={{ backgroundColor: preset.primary }}></div>
                          <div className="text-xs truncate px-1 py-1">{preset.name}</div>
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </CardTitle>
              <CardDescription>تخصيص الألوان الرئيسية للتطبيق</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ColorSelector 
                  id="primaryColor"
                  label="اللون الرئيسي"
                  color={colors.primary}
                  description="يستخدم للألوان الأساسية في التطبيق"
                  onChange={(value) => onColorChange('primary', value)}
                />
                
                <ColorSelector 
                  id="secondaryColor"
                  label="اللون الثانوي"
                  color={colors.secondary}
                  description="يستخدم للخلفيات والعناصر الثانوية"
                  onChange={(value) => onColorChange('secondary', value)}
                />
              </div>
              
              <Separator className="my-2" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ColorSelector 
                  id="backgroundColor"
                  label="لون الخلفية"
                  color={colors.background}
                  description="لون خلفية صفحات التطبيق"
                  onChange={(value) => onColorChange('background', value)}
                />
                
                <ColorSelector 
                  id="headerColor"
                  label="لون الترويسة"
                  color={colors.header}
                  description="لون ترويسة التطبيق (الشريط العلوي)"
                  onChange={(value) => onColorChange('header', value)}
                />
              </div>
              
              <div className="space-y-2">
                <ColorSelector 
                  id="buttonColor"
                  label="لون الأزرار"
                  color={colors.button}
                  description="لون الأزرار الرئيسية في التطبيق"
                  onChange={(value) => onColorChange('button', value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>ألوان النصوص</CardTitle>
              <CardDescription>تخصيص ألوان النصوص والروابط</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ColorSelector 
                  id="textPrimaryColor"
                  label="لون النص الأساسي"
                  color={colors.textPrimary}
                  description="لون النص الأساسي في التطبيق"
                  onChange={(value) => onColorChange('textPrimary', value)}
                />
                
                <ColorSelector 
                  id="textSecondaryColor"
                  label="لون النص الثانوي"
                  color={colors.textSecondary}
                  description="لون النص الثانوي والوصفي"
                  onChange={(value) => onColorChange('textSecondary', value)}
                />
              </div>
              
              <div className="space-y-2">
                <ColorSelector 
                  id="linkColor"
                  label="لون الروابط"
                  color={colors.link}
                  description="لون الروابط في التطبيق"
                  onChange={(value) => onColorChange('link', value)}
                />
              </div>

              <div className="bg-muted p-4 rounded-md mt-4">
                <h3 className="font-medium mb-2">معاينة النصوص</h3>
                <div className="space-y-2 text-right">
                  <p style={{color: colors.textPrimary}}>هذا نص أساسي يستخدم اللون الرئيسي للنص.</p>
                  <p style={{color: colors.textSecondary}}>هذا نص ثانوي يستخدم اللون الثانوي للنص.</p>
                  <a href="#" style={{color: colors.link}}>هذا رابط تجريبي باللون المختار.</a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sidebar">
          <Card>
            <CardHeader>
              <CardTitle>ألوان القائمة الجانبية</CardTitle>
              <CardDescription>تخصيص ألوان القائمة الجانبية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ColorSelector 
                  id="sidebarBackgroundColor"
                  label="خلفية القائمة الجانبية"
                  color={colors.sidebar.background}
                  description="لون خلفية القائمة الجانبية"
                  onChange={(value) => onSidebarColorChange('background', value)}
                />
                
                <ColorSelector 
                  id="sidebarForegroundColor"
                  label="لون النص الرئيسي"
                  color={colors.sidebar.foreground}
                  description="لون النص الرئيسي في القائمة الجانبية"
                  onChange={(value) => onSidebarColorChange('foreground', value)}
                />
              </div>
              
              <Separator className="my-2" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ColorSelector 
                  id="sidebarItemActiveColor"
                  label="لون العنصر النشط"
                  color={colors.sidebar.item.active}
                  description="لون خلفية العنصر النشط في القائمة الجانبية"
                  onChange={(value) => onSidebarColorChange('item.active', value)}
                />
                
                <ColorSelector 
                  id="sidebarItemHoverColor"
                  label="لون التحويم"
                  color={colors.sidebar.item.hover}
                  description="لون العنصر عند المرور فوقه بالماوس"
                  onChange={(value) => onSidebarColorChange('item.hover', value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ColorSelector 
                  id="sidebarItemTextColor"
                  label="لون النص"
                  color={colors.sidebar.item.text}
                  description="لون نص العناصر في القائمة الجانبية"
                  onChange={(value) => onSidebarColorChange('item.text', value)}
                />
                
                <ColorSelector 
                  id="sidebarItemActiveTextColor"
                  label="لون نص العنصر النشط"
                  color={colors.sidebar.item.activeText}
                  description="لون نص العنصر النشط في القائمة"
                  onChange={(value) => onSidebarColorChange('item.activeText', value)}
                />
              </div>

              <div className="bg-muted p-4 rounded-md mt-4">
                <h3 className="font-medium mb-2">معاينة القائمة الجانبية</h3>
                <div className="h-32 rounded-md overflow-hidden" style={{
                  backgroundColor: colors.sidebar.background,
                  color: colors.sidebar.foreground
                }}>
                  <div className="p-3 text-center border-b border-white/10">
                    <div className="font-bold">لوحة التحكم</div>
                  </div>
                  <div className="flex items-center gap-2 p-2 my-1 rounded" style={{
                    backgroundColor: colors.sidebar.item.active,
                    color: colors.sidebar.item.activeText
                  }}>
                    <div className="w-4 h-4 rounded-full bg-current opacity-70"></div>
                    <span>العنصر النشط</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 my-1 rounded" style={{
                    color: colors.sidebar.item.text
                  }}>
                    <div className="w-4 h-4 rounded-full bg-current opacity-70"></div>
                    <span>عنصر غير نشط</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
