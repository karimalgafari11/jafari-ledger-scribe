
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InventoryValuationMethod } from "@/types/accountingRules";
import { toast } from "sonner";

export const InventoryAccountingSettings = () => {
  const [settings, setSettings] = useState({
    inventoryValuationMethod: InventoryValuationMethod.WeightedAverage,
    automaticCostCalculation: true,
    recordInventoryTransactions: true,
    allowNegativeInventory: false,
    createAutomaticJournalEntries: true,
    updateCostOnPurchase: true,
  });

  const handleValuationMethodChange = (value: InventoryValuationMethod) => {
    setSettings((prev) => ({
      ...prev,
      inventoryValuationMethod: value,
    }));
  };

  const handleToggle = (field: string) => (checked: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  const handleSaveSettings = () => {
    // في التطبيق الفعلي، هنا سيتم حفظ الإعدادات للقاعدة البيانات
    console.log("حفظ إعدادات المحاسبة للمخزون:", settings);
    toast.success("تم حفظ إعدادات المحاسبة للمخزون بنجاح");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardTitle>إعدادات التكامل المحاسبي للمخزون</CardTitle>
          <CardDescription>
            تكوين قواعد تقييم المخزون وتكامله مع النظام المحاسبي
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="valuation" className="w-full">
            <TabsList className="grid grid-cols-3 w-full mb-4">
              <TabsTrigger value="valuation">طرق تقييم المخزون</TabsTrigger>
              <TabsTrigger value="costing">حساب التكلفة</TabsTrigger>
              <TabsTrigger value="integration">التكامل المحاسبي</TabsTrigger>
            </TabsList>

            <TabsContent value="valuation">
              <div className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="text-md font-medium mb-2">طريقة تقييم المخزون</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    اختر طريقة التقييم التي ستستخدم لحساب تكلفة المخزون وتحديد قيمة المخزون
                  </p>

                  <RadioGroup
                    value={settings.inventoryValuationMethod}
                    onValueChange={(value) => handleValuationMethodChange(value as InventoryValuationMethod)}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3 space-x-reverse">
                      <RadioGroupItem value={InventoryValuationMethod.FIFO} id="fifo" />
                      <Label htmlFor="fifo" className="font-medium">
                        الوارد أولاً صادر أولاً (FIFO)
                      </Label>
                    </div>
                    <div className="text-sm text-muted-foreground mr-7">
                      يفترض أن المواد المشتراة أولاً هي التي يتم بيعها أولاً، مما يعني أن البضائع المتبقية في المخزون هي الأحدث
                    </div>

                    <div className="flex items-center space-x-3 space-x-reverse">
                      <RadioGroupItem value={InventoryValuationMethod.LIFO} id="lifo" />
                      <Label htmlFor="lifo" className="font-medium">
                        الوارد أخيراً صادر أولاً (LIFO)
                      </Label>
                    </div>
                    <div className="text-sm text-muted-foreground mr-7">
                      يفترض أن المواد المشتراة أخيراً هي التي يتم بيعها أولاً، مما يعني أن البضائع المتبقية هي الأقدم
                    </div>

                    <div className="flex items-center space-x-3 space-x-reverse">
                      <RadioGroupItem value={InventoryValuationMethod.WeightedAverage} id="weightedAverage" />
                      <Label htmlFor="weightedAverage" className="font-medium">
                        المتوسط المرجح (Weighted Average)
                      </Label>
                    </div>
                    <div className="text-sm text-muted-foreground mr-7">
                      تكلفة المخزون هي متوسط تكلفة جميع العناصر المتوفرة للبيع خلال الفترة
                    </div>

                    <div className="flex items-center space-x-3 space-x-reverse">
                      <RadioGroupItem value={InventoryValuationMethod.SpecificIdentification} id="specificIdentification" />
                      <Label htmlFor="specificIdentification" className="font-medium">
                        التحديد المعين (Specific Identification)
                      </Label>
                    </div>
                    <div className="text-sm text-muted-foreground mr-7">
                      تتبع التكلفة الفعلية لكل عنصر مخزون على حدة، مناسب للعناصر الفريدة وعالية القيمة
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="costing">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">حساب التكلفة آلياً</Label>
                      <p className="text-sm text-muted-foreground">
                        حساب تكلفة المخزون آليًا عند إدخال فواتير المشتريات
                      </p>
                    </div>
                    <Switch
                      checked={settings.automaticCostCalculation}
                      onCheckedChange={handleToggle("automaticCostCalculation")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">تحديث تكلفة المخزون عند الشراء</Label>
                      <p className="text-sm text-muted-foreground">
                        تحديث متوسط تكلفة المنتجات تلقائياً عند استلام فواتير الشراء
                      </p>
                    </div>
                    <Switch
                      checked={settings.updateCostOnPurchase}
                      onCheckedChange={handleToggle("updateCostOnPurchase")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">السماح بالمخزون السالب</Label>
                      <p className="text-sm text-muted-foreground">
                        السماح ببيع المنتجات حتى لو كانت الكمية المتاحة أقل من الكمية المطلوبة
                      </p>
                    </div>
                    <Switch
                      checked={settings.allowNegativeInventory}
                      onCheckedChange={handleToggle("allowNegativeInventory")}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="integration">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">تسجيل معاملات المخزون تلقائيًا</Label>
                      <p className="text-sm text-muted-foreground">
                        تسجيل جميع معاملات المخزون تلقائياً (المشتريات، المبيعات، التعديلات)
                      </p>
                    </div>
                    <Switch
                      checked={settings.recordInventoryTransactions}
                      onCheckedChange={handleToggle("recordInventoryTransactions")}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">إنشاء قيود محاسبية تلقائياً</Label>
                      <p className="text-sm text-muted-foreground">
                        إنشاء قيود محاسبية تلقائية مع كل عملية مخزون (بيع، شراء، تعديل)
                      </p>
                    </div>
                    <Switch
                      checked={settings.createAutomaticJournalEntries}
                      onCheckedChange={handleToggle("createAutomaticJournalEntries")}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-6">
            <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
