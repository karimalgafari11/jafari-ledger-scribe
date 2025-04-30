
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface PageSettingsProps {
  onClose: () => void;
  currency: string;
  onCurrencyChange: (currency: string) => void;
}

export function PageSettings({ onClose, currency, onCurrencyChange }: PageSettingsProps) {
  const [open, setOpen] = React.useState(true);
  const [lowStockAlert, setLowStockAlert] = React.useState(true);
  const [autoPricing, setAutoPricing] = React.useState(false);
  
  const handleClose = () => {
    setOpen(false);
    setTimeout(onClose, 300); // للتأكد من إتمام انيميشن الإغلاق
  };

  const handleSaveSettings = () => {
    toast.success("تم حفظ إعدادات الصفحة بنجاح");
    handleClose();
  };

  const currencyOptions = [
    { label: "ريال سعودي", value: "ر.س" },
    { label: "دولار أمريكي", value: "$" },
    { label: "يورو", value: "€" },
    { label: "درهم إماراتي", value: "د.إ" },
    { label: "دينار كويتي", value: "د.ك" },
  ];

  return (
    <Drawer open={open} onOpenChange={setOpen} onClose={handleClose}>
      <DrawerContent className="max-h-[90%]">
        <DrawerHeader>
          <DrawerTitle>إعدادات صفحة النقل بين المستودعات</DrawerTitle>
          <DrawerDescription>
            يمكنك تخصيص مظهر وسلوك الصفحة من هنا
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="px-4">
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">عام</TabsTrigger>
              <TabsTrigger value="notifications">التنبيهات</TabsTrigger>
              <TabsTrigger value="display">العرض</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="currency">العملة</Label>
                  <div className="col-span-3">
                    <Select 
                      value={currency}
                      onValueChange={(value) => onCurrencyChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر العملة" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencyOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label} ({option.value})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="reorderLevel">
                    مستوى إعادة الطلب الافتراضي
                  </Label>
                  <Input
                    id="reorderLevel"
                    type="number"
                    defaultValue={5}
                    min={1}
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="autoPricing">
                    تسعير تلقائي
                  </Label>
                  <div className="flex items-center gap-2 col-span-3">
                    <Switch
                      id="autoPricing"
                      checked={autoPricing}
                      onCheckedChange={setAutoPricing}
                    />
                    <span className="text-sm text-muted-foreground">
                      {autoPricing ? "تفعيل" : "تعطيل"} حساب سعر البيع تلقائيًا (نسبة من سعر الشراء)
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-4 mt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="lowStockAlert">
                  تنبيه المخزون المنخفض
                </Label>
                <div className="flex items-center gap-2 col-span-3">
                  <Switch
                    id="lowStockAlert"
                    checked={lowStockAlert}
                    onCheckedChange={setLowStockAlert}
                  />
                  <span className="text-sm text-muted-foreground">
                    {lowStockAlert ? "تفعيل" : "تعطيل"} تنبيهات المخزون المنخفض
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="emailNotifications">
                  إشعارات البريد الإلكتروني
                </Label>
                <div className="flex items-center gap-2 col-span-3">
                  <Switch id="emailNotifications" />
                  <span className="text-sm text-muted-foreground">
                    إرسال إشعارات عبر البريد الإلكتروني عند انخفاض المخزون
                  </span>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="display" className="space-y-4 mt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="pageSize">
                  عدد العناصر في الصفحة
                </Label>
                <Select defaultValue="20">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر عدد العناصر" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 عناصر</SelectItem>
                    <SelectItem value="20">20 عنصر</SelectItem>
                    <SelectItem value="50">50 عنصر</SelectItem>
                    <SelectItem value="100">100 عنصر</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="tableLines">
                  خطوط الجدول
                </Label>
                <div className="col-span-3">
                  <Select defaultValue="both">
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الخطوط" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="both">أفقية وعمودية</SelectItem>
                      <SelectItem value="horizontal">أفقية فقط</SelectItem>
                      <SelectItem value="vertical">عمودية فقط</SelectItem>
                      <SelectItem value="none">بدون خطوط</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DrawerFooter>
          <Button onClick={handleSaveSettings}>حفظ الإعدادات</Button>
          <DrawerClose asChild>
            <Button variant="outline">إلغاء</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
