
import React from "react";
import { useAccountingSettings } from "@/hooks/useAccountingSettings";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { 
  PercentIcon, 
  Building, 
  Save, 
  RotateCcw 
} from "lucide-react";
import { TaxSettings as TaxSettingsType } from "@/types/accountingSettings";

export const TaxSettings = () => {
  const { settings, isLoading, updateTaxSettings } = useAccountingSettings();

  const handleSave = () => {
    updateTaxSettings(settings.taxSettings);
  };

  const handleTaxChange = (field: keyof TaxSettingsType, value: any) => {
    updateTaxSettings({
      ...settings.taxSettings,
      [field]: value
    });
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex items-center justify-between pb-4">
          <div className="space-y-0.5">
            <Label htmlFor="enableTax">تفعيل نظام الضرائب</Label>
            <p className="text-sm text-muted-foreground">تطبيق الضرائب على الفواتير والمستندات</p>
          </div>
          <Switch
            id="enableTax"
            checked={settings.taxSettings.enableTax}
            onCheckedChange={(checked) => handleTaxChange("enableTax", checked)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="defaultTaxRate">
              <PercentIcon className="inline-block ml-2 h-4 w-4" />
              نسبة الضريبة الافتراضية (%)
            </Label>
            <Input
              id="defaultTaxRate"
              type="number"
              min="0"
              max="100"
              value={settings.taxSettings.defaultTaxRate}
              onChange={(e) => handleTaxChange("defaultTaxRate", parseFloat(e.target.value))}
              disabled={!settings.taxSettings.enableTax}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="taxNumber">
              <PercentIcon className="inline-block ml-2 h-4 w-4" />
              الرقم الضريبي
            </Label>
            <Input
              id="taxNumber"
              value={settings.taxSettings.taxNumber}
              onChange={(e) => handleTaxChange("taxNumber", e.target.value)}
              disabled={!settings.taxSettings.enableTax}
              placeholder="أدخل الرقم الضريبي"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="taxAuthority">
              <Building className="inline-block ml-2 h-4 w-4" />
              الجهة الضريبية
            </Label>
            <Input
              id="taxAuthority"
              value={settings.taxSettings.taxAuthority}
              onChange={(e) => handleTaxChange("taxAuthority", e.target.value)}
              disabled={!settings.taxSettings.enableTax}
              placeholder="مثال: الهيئة العامة للزكاة والدخل"
            />
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-blue-700 font-medium">معلومات عن الضرائب</h3>
            <p className="text-blue-600 text-sm mt-1">
              ضريبة القيمة المضافة (VAT) هي ضريبة غير مباشرة تُفرض على استيراد وتوريد السلع والخدمات في كل مرحلة من مراحل الإنتاج والتوزيع.
              يجب التأكد من تحديث الإعدادات الضريبية وفقًا للتشريعات الضريبية الحالية في منطقتك.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-2 space-x-reverse pt-4">
          <Button variant="outline" onClick={() => null} disabled={isLoading}>
            <RotateCcw className="ml-2 h-4 w-4" />
            إعادة ضبط
          </Button>
          <Button onClick={handleSave} disabled={isLoading || !settings.taxSettings.enableTax}>
            <Save className="ml-2 h-4 w-4" />
            حفظ إعدادات الضرائب
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
