
import React from "react";
import { useAccountingSettings } from "@/hooks/useAccountingSettings";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  CalendarIcon, 
  RotateCcw, 
  Save, 
  DollarSign, 
  FileText 
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

export const GeneralSettings = () => {
  const { settings, isLoading, updateGeneralSettings } = useAccountingSettings();

  const handleSave = () => {
    updateGeneralSettings({
      fiscalYearStart: settings.fiscalYearStart,
      fiscalYearEnd: settings.fiscalYearEnd,
      defaultCurrency: settings.defaultCurrency,
      autoGenerateEntries: settings.autoGenerateEntries,
      journalNamingFormat: settings.journalNamingFormat,
      allowBackdatedEntries: settings.allowBackdatedEntries,
      requireApproval: settings.requireApproval,
      defaultApprover: settings.defaultApprover,
    });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fiscalYearStart">بداية السنة المالية</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-right font-normal",
                    !settings.fiscalYearStart && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {settings.fiscalYearStart ? format(settings.fiscalYearStart, "PPP", { locale: ar }) : "اختر التاريخ"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={settings.fiscalYearStart}
                  onSelect={(date) => date && updateGeneralSettings({ fiscalYearStart: date })}
                  disabled={(date) => date > new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fiscalYearEnd">نهاية السنة المالية</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-right font-normal",
                    !settings.fiscalYearEnd && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="ml-2 h-4 w-4" />
                  {settings.fiscalYearEnd ? format(settings.fiscalYearEnd, "PPP", { locale: ar }) : "اختر التاريخ"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={settings.fiscalYearEnd}
                  onSelect={(date) => date && updateGeneralSettings({ fiscalYearEnd: date })}
                  disabled={(date) => date < settings.fiscalYearStart}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultCurrency">العملة الافتراضية</Label>
            <Select
              value={settings.defaultCurrency}
              onValueChange={(value) => updateGeneralSettings({ defaultCurrency: value })}
            >
              <SelectTrigger id="defaultCurrency">
                <SelectValue placeholder="اختر العملة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                <SelectItem value="EUR">يورو (EUR)</SelectItem>
                <SelectItem value="AED">درهم إماراتي (AED)</SelectItem>
                <SelectItem value="KWD">دينار كويتي (KWD)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="journalNamingFormat">صيغة تسمية القيود</Label>
            <Input
              id="journalNamingFormat"
              value={settings.journalNamingFormat}
              onChange={(e) => updateGeneralSettings({ journalNamingFormat: e.target.value })}
              placeholder="مثال: JE-{YEAR}{MONTH}{DAY}-{NUMBER}"
            />
            <p className="text-xs text-muted-foreground">
              استخدم {"{YEAR}"} للسنة، {"{MONTH}"} للشهر، {"{DAY}"} لليوم، {"{NUMBER}"} للرقم التسلسلي
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="defaultApprover">المعتمد الافتراضي</Label>
            <Input
              id="defaultApprover"
              value={settings.defaultApprover}
              onChange={(e) => updateGeneralSettings({ defaultApprover: e.target.value })}
              placeholder="المعتمد الافتراضي للقيود"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="retainDataYears">عدد سنوات الاحتفاظ بالبيانات</Label>
            <Input
              id="retainDataYears"
              type="number"
              min="1"
              max="10"
              value={settings.retainDataYears}
              onChange={(e) => updateGeneralSettings({ retainDataYears: parseInt(e.target.value) })}
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-medium">خيارات متقدمة</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoGenerateEntries">إنشاء قيود محاسبية تلقائية</Label>
              <p className="text-sm text-muted-foreground">إنشاء قيود محاسبية تلقائية من المستندات</p>
            </div>
            <Switch
              id="autoGenerateEntries"
              checked={settings.autoGenerateEntries}
              onCheckedChange={(checked) => updateGeneralSettings({ autoGenerateEntries: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allowBackdatedEntries">السماح بتسجيل قيود بتاريخ سابق</Label>
              <p className="text-sm text-muted-foreground">السماح بتسجيل قيود بتاريخ سابق للفترات المغلقة</p>
            </div>
            <Switch
              id="allowBackdatedEntries"
              checked={settings.allowBackdatedEntries}
              onCheckedChange={(checked) => updateGeneralSettings({ allowBackdatedEntries: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="requireApproval">تتطلب القيود اعتماداً</Label>
              <p className="text-sm text-muted-foreground">يجب اعتماد جميع القيود قبل ترحيلها</p>
            </div>
            <Switch
              id="requireApproval"
              checked={settings.requireApproval}
              onCheckedChange={(checked) => updateGeneralSettings({ requireApproval: checked })}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="autoCloseAccounts">إغلاق الحسابات تلقائياً</Label>
              <p className="text-sm text-muted-foreground">إغلاق تلقائي للحسابات في نهاية السنة المالية</p>
            </div>
            <Switch
              id="autoCloseAccounts"
              checked={settings.autoCloseAccounts}
              onCheckedChange={(checked) => updateGeneralSettings({ autoCloseAccounts: checked })}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 space-x-reverse pt-4">
          <Button variant="outline" onClick={() => null} disabled={isLoading}>
            <RotateCcw className="ml-2 h-4 w-4" />
            إعادة ضبط
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="ml-2 h-4 w-4" />
            حفظ الإعدادات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
