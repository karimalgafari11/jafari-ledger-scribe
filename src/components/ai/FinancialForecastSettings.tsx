
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { CheckSquare, ChevronDown, Settings2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { ForecastPeriod, ForecastMethod, ForecastCategory } from '@/hooks/useFinancialForecast';

interface FinancialForecastSettingsProps {
  period: ForecastPeriod;
  method: ForecastMethod;
  categories: ForecastCategory[];
  includeHistorical: boolean;
  confidenceInterval: number;
  onUpdate: (options: any) => void;
  onGenerate: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export const FinancialForecastSettings: React.FC<FinancialForecastSettingsProps> = ({
  period,
  method,
  categories,
  includeHistorical,
  confidenceInterval,
  onUpdate,
  onGenerate,
  onReset,
  isLoading
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  // قائمة الفئات المتاحة للتوقعات
  const availableCategories = [
    { id: 'revenue', label: 'الإيرادات' },
    { id: 'expenses', label: 'المصروفات' },
    { id: 'profit', label: 'الأرباح' },
    { id: 'cash_flow', label: 'التدفق النقدي' }
  ];

  // التحقق مما إذا كانت الفئة محددة
  const isCategorySelected = (categoryId: string) => {
    return categories.includes(categoryId as ForecastCategory);
  };

  // تحديث قائمة الفئات المحددة
  const toggleCategory = (categoryId: ForecastCategory) => {
    if (isCategorySelected(categoryId)) {
      // إذا كانت آخر فئة متبقية، لا تحذفها
      if (categories.length === 1) return;
      onUpdate({ categories: categories.filter(c => c !== categoryId) });
    } else {
      onUpdate({ categories: [...categories, categoryId] });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base font-medium">
          <div className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            إعدادات التوقعات المالية
          </div>
          <Button 
            onClick={onGenerate} 
            disabled={isLoading}
            size="sm"
          >
            {isLoading ? 'جاري إنشاء التوقعات...' : 'إنشاء التوقعات'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[240px]">
            <Label htmlFor="period" className="mb-1 block">فترة التوقع</Label>
            <Select value={period} onValueChange={(value) => onUpdate({ period: value as ForecastPeriod })}>
              <SelectTrigger id="period">
                <SelectValue placeholder="اختر الفترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="3_months">3 أشهر</SelectItem>
                  <SelectItem value="6_months">6 أشهر</SelectItem>
                  <SelectItem value="12_months">سنة</SelectItem>
                  <SelectItem value="24_months">سنتان</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-[240px]">
            <Label htmlFor="method" className="mb-1 block">طريقة التنبؤ</Label>
            <Select value={method} onValueChange={(value) => onUpdate({ method: value as ForecastMethod })}>
              <SelectTrigger id="method">
                <SelectValue placeholder="اختر الطريقة" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ai">الذكاء الاصطناعي</SelectItem>
                  <SelectItem value="linear">خطي</SelectItem>
                  <SelectItem value="seasonal">موسمي</SelectItem>
                  <SelectItem value="weighted">مرجح</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="border rounded-md overflow-hidden"
        >
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between px-4 py-2 bg-muted/40 cursor-pointer">
              <h4 className="text-sm font-medium">إعدادات متقدمة</h4>
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 space-y-4">
              <div className="space-y-4">
                <Label>الفئات المالية للتوقع</Label>
                <div className="grid grid-cols-2 gap-2">
                  {availableCategories.map((category) => (
                    <div 
                      key={category.id}
                      className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer ${
                        isCategorySelected(category.id) ? 'border-primary bg-primary/5' : 'border-muted'
                      }`}
                      onClick={() => toggleCategory(category.id as ForecastCategory)}
                    >
                      {isCategorySelected(category.id) && <CheckSquare className="h-4 w-4 text-primary" />}
                      {!isCategorySelected(category.id) && <div className="h-4 w-4 border rounded-sm" />}
                      <span>{category.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="include-historical">تضمين البيانات التاريخية</Label>
                  <Switch 
                    id="include-historical" 
                    checked={includeHistorical} 
                    onCheckedChange={(value) => onUpdate({ includeHistorical: value })}
                  />
                </div>
                <p className="text-xs text-muted-foreground">عرض البيانات الفعلية السابقة مع التوقعات</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="confidence-interval">مستوى الثقة</Label>
                  <span className="text-sm">{confidenceInterval}%</span>
                </div>
                <Slider
                  id="confidence-interval"
                  defaultValue={[confidenceInterval]}
                  min={50}
                  max={95}
                  step={5}
                  onValueChange={(value) => onUpdate({ confidenceInterval: value[0] })}
                />
                <p className="text-xs text-muted-foreground">مستوى الثقة للتوقعات</p>
              </div>

              <Button variant="outline" size="sm" onClick={onReset} className="w-full">
                إعادة ضبط الإعدادات
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
