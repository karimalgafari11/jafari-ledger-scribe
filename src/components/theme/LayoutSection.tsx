
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeEffects, ThemeRoundness, ThemeSpacing } from "@/types/theme";
import { roundnessOptions, sizeOptions, shadowOptions, spacingOptions } from "@/hooks/theme/themeDefaults";
import { Switch } from "@/components/ui/switch";

interface LayoutSectionProps {
  spacing: ThemeSpacing;
  roundness: ThemeRoundness;
  effects: ThemeEffects;
  onSpacingCompactChange: (value: boolean) => void;
  onSpacingSizeChange: (value: string) => void;
  onRoundnessChange: (value: 'none' | 'small' | 'medium' | 'large' | 'full') => void;
  onShadowsChange: (value: 'none' | 'light' | 'medium' | 'heavy') => void;
}

export const LayoutSection: React.FC<LayoutSectionProps> = ({
  spacing,
  roundness,
  effects,
  onSpacingCompactChange,
  onSpacingSizeChange,
  onRoundnessChange,
  onShadowsChange
}) => {
  return (
    <div className="space-y-4">
      <Tabs defaultValue="spacing">
        <TabsList className="w-full mb-4">
          <TabsTrigger value="spacing" className="flex-1">المسافات</TabsTrigger>
          <TabsTrigger value="roundness" className="flex-1">الحواف</TabsTrigger>
          <TabsTrigger value="effects" className="flex-1">التأثيرات</TabsTrigger>
        </TabsList>
        
        <TabsContent value="spacing">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات المسافات</CardTitle>
              <CardDescription>تخصيص مسافات العناصر في واجهة المستخدم</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compactMode">الوضع المضغوط</Label>
                  <p className="text-sm text-muted-foreground">
                    تقليص المسافات بين عناصر واجهة المستخدم
                  </p>
                </div>
                <Switch
                  id="compactMode"
                  checked={spacing.compact}
                  onCheckedChange={onSpacingCompactChange}
                />
              </div>
              
              <div className="space-y-2 mt-4">
                <Label htmlFor="spacing">المسافات بين العناصر</Label>
                <Select
                  value={spacing.size}
                  onValueChange={(value) => onSpacingSizeChange(value)}
                >
                  <SelectTrigger id="spacing">
                    <SelectValue placeholder="حدد كثافة المسافات" />
                  </SelectTrigger>
                  <SelectContent>
                    {spacingOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  تحديد المسافات بين عناصر واجهة المستخدم (التباعد)
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">معاينة المسافات</h3>
                <div className="space-y-2">
                  <div className={`bg-primary/10 p-3 rounded flex flex-col ${spacing.compact ? 'space-y-1' : 'space-y-3'}`}>
                    <div className="bg-primary/20 p-2 rounded">عنصر 1</div>
                    <div className="bg-primary/20 p-2 rounded">عنصر 2</div>
                    <div className="bg-primary/20 p-2 rounded">عنصر 3</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roundness">
          <Card>
            <CardHeader>
              <CardTitle>حواف العناصر</CardTitle>
              <CardDescription>تخصيص درجة استدارة حواف العناصر</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="borderRadius">استدارة الحواف</Label>
                <Select
                  value={roundness.size}
                  onValueChange={(value) => onRoundnessChange(value as 'none' | 'small' | 'medium' | 'large' | 'full')}
                >
                  <SelectTrigger id="borderRadius">
                    <SelectValue placeholder="حدد درجة استدارة الحواف" />
                  </SelectTrigger>
                  <SelectContent>
                    {roundnessOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  درجة استدارة حواف العناصر مثل الأزرار والبطاقات
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">معاينة استدارة الحواف</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col items-center">
                    <div 
                      className="bg-primary/20 w-20 h-10 mb-2"
                      style={{ borderRadius: getBorderRadius(roundness.size) }}
                    ></div>
                    <span className="text-xs">زر</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div 
                      className="bg-primary/20 w-20 h-20 mb-2"
                      style={{ borderRadius: getBorderRadius(roundness.size) }}
                    ></div>
                    <span className="text-xs">بطاقة</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="effects">
          <Card>
            <CardHeader>
              <CardTitle>تأثيرات العناصر</CardTitle>
              <CardDescription>تخصيص تأثيرات الظل والشفافية</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="shadows">تأثيرات الظل</Label>
                <Select
                  value={effects.shadows}
                  onValueChange={(value) => onShadowsChange(value as 'none' | 'light' | 'medium' | 'heavy')}
                >
                  <SelectTrigger id="shadows">
                    <SelectValue placeholder="حدد درجة تأثير الظلال" />
                  </SelectTrigger>
                  <SelectContent>
                    {shadowOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  درجة ظلال العناصر مثل البطاقات والقوائم المنسدلة
                </p>
              </div>
              
              <div className="bg-muted p-4 rounded-md">
                <h3 className="font-medium mb-2">معاينة تأثيرات الظل</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col items-center">
                    <div 
                      className="bg-card w-24 h-24 flex items-center justify-center mb-2"
                      style={{ 
                        borderRadius: '8px',
                        boxShadow: getShadowStyle(effects.shadows)
                      }}
                    >
                      <span className="text-sm">بطاقة</span>
                    </div>
                    <span className="text-xs">بطاقة</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div 
                      className="bg-card w-32 h-12 flex items-center justify-center mb-2"
                      style={{ 
                        borderRadius: '8px',
                        boxShadow: getShadowStyle(effects.shadows)
                      }}
                    >
                      <span className="text-sm">قائمة منسدلة</span>
                    </div>
                    <span className="text-xs">قائمة منسدلة</span>
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

// Helper functions
function getBorderRadius(size: string): string {
  switch (size) {
    case 'none': return '0';
    case 'small': return '4px';
    case 'medium': return '8px';
    case 'large': return '12px';
    case 'full': return '9999px';
    default: return '8px';
  }
}

function getShadowStyle(size: string): string {
  switch (size) {
    case 'none': return 'none';
    case 'light': return '0 2px 4px rgba(0, 0, 0, 0.1)';
    case 'medium': return '0 4px 8px rgba(0, 0, 0, 0.15)';
    case 'heavy': return '0 8px 16px rgba(0, 0, 0, 0.2)';
    default: return '0 4px 8px rgba(0, 0, 0, 0.15)';
  }
}
