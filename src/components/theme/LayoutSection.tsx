
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ThemeSpacing, ThemeRoundness, ThemeEffects } from "@/types/theme";
import { spacingOptions, roundnessOptions, shadowOptions } from "@/hooks/theme/themeDefaults";

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
    <Card>
      <CardHeader>
        <CardTitle>المظهر والتخطيط</CardTitle>
        <CardDescription>
          قم بتخصيص مظهر وتخطيط عناصر واجهة المستخدم
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">المسافات والتباعد</h3>
          <div className="flex items-center justify-between">
            <Label htmlFor="compactSpacing">وضع التباعد المدمج</Label>
            <Switch
              id="compactSpacing"
              checked={spacing.compact}
              onCheckedChange={onSpacingCompactChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="spacingSize">حجم المسافات</Label>
            <Select
              value={spacing.size}
              onValueChange={onSpacingSizeChange}
              disabled={spacing.compact}
            >
              <SelectTrigger id="spacingSize">
                <SelectValue placeholder="اختر حجم المسافات" />
              </SelectTrigger>
              <SelectContent>
                {spacingOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium">الحواف والزوايا</h3>
          <div className="space-y-2">
            <Label htmlFor="roundnessSize">مقدار تدوير الزوايا</Label>
            <Select
              value={roundness.size}
              onValueChange={(value) => onRoundnessChange(value as 'none' | 'small' | 'medium' | 'large' | 'full')}
            >
              <SelectTrigger id="roundnessSize">
                <SelectValue placeholder="اختر مقدار التدوير" />
              </SelectTrigger>
              <SelectContent>
                {roundnessOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-medium">التأثيرات والظلال</h3>
          <div className="space-y-2">
            <Label htmlFor="shadowsSize">مقدار الظلال</Label>
            <Select
              value={effects.shadows}
              onValueChange={(value) => onShadowsChange(value as 'none' | 'light' | 'medium' | 'heavy')}
            >
              <SelectTrigger id="shadowsSize">
                <SelectValue placeholder="اختر مقدار الظلال" />
              </SelectTrigger>
              <SelectContent>
                {shadowOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="p-4 border rounded-md" style={{ 
            borderRadius: roundness.size === 'small' ? '0.25rem' : 
                          roundness.size === 'medium' ? '0.5rem' : 
                          roundness.size === 'large' ? '1rem' : 
                          roundness.size === 'full' ? '9999px' : '0',
            boxShadow: effects.shadows === 'light' ? '0 2px 4px rgba(0,0,0,0.1)' : 
                        effects.shadows === 'medium' ? '0 4px 8px rgba(0,0,0,0.15)' : 
                        effects.shadows === 'heavy' ? '0 8px 16px rgba(0,0,0,0.2)' : 'none'
          }}>
            <div className="text-center">معاينة الزوايا والظلال</div>
          </div>
          <div className="space-y-2 p-4 border rounded-md" style={{ 
            padding: spacing.compact ? '0.5rem' : 
                    spacing.size === 'compact' ? '0.75rem' : 
                    spacing.size === 'medium' ? '1rem' : '1.5rem' 
          }}>
            <div>عنصر 1</div>
            <div>عنصر 2</div>
            <div>عنصر 3</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
