
import React, { useState } from "react";
import { Settings } from "lucide-react";
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger 
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface InvoiceSettingsProps {
  settings: InvoiceSettingsType;
  onSettingsChange: (settings: InvoiceSettingsType) => void;
}

export interface InvoiceSettingsType {
  showCustomerDetails: boolean;
  showItemCodes: boolean;
  showItemNotes: boolean;
  showDiscount: boolean;
  showTax: boolean;
  showSignature: boolean;
  showCompanyLogo: boolean;
  fontSize?: 'small' | 'medium' | 'large';
  tableColumns?: string[];
  tableWidth?: number;
}

export const InvoiceSettings: React.FC<InvoiceSettingsProps> = ({
  settings,
  onSettingsChange
}) => {
  const [localSettings, setLocalSettings] = useState<InvoiceSettingsType>({
    ...settings,
    fontSize: settings.fontSize || 'medium',
    tableColumns: settings.tableColumns || ['serial', 'name', 'quantity', 'price', 'total', 'notes'],
    tableWidth: settings.tableWidth || 100
  });

  const handleToggle = (field: keyof InvoiceSettingsType) => {
    const newSettings = { ...localSettings, [field]: !localSettings[field] };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    const newSettings = { ...localSettings, fontSize: size };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleTableWidthChange = (value: number[]) => {
    const newSettings = { ...localSettings, tableWidth: value[0] };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const availableTableColumns = [
    { id: 'serial', label: 'الرقم التسلسلي' },
    { id: 'name', label: 'اسم الصنف' },
    { id: 'code', label: 'رمز الصنف' },
    { id: 'quantity', label: 'الكمية' },
    { id: 'price', label: 'السعر' },
    { id: 'total', label: 'الإجمالي' },
    { id: 'notes', label: 'ملاحظات' },
    { id: 'discount', label: 'الخصم' },
    { id: 'tax', label: 'الضريبة' },
  ];

  const toggleTableColumn = (columnId: string) => {
    const currentColumns = localSettings.tableColumns || [];
    let newColumns: string[];
    
    if (currentColumns.includes(columnId)) {
      // Don't allow removing essential columns
      if (['serial', 'name', 'quantity', 'price', 'total'].includes(columnId)) {
        return;
      }
      newColumns = currentColumns.filter(id => id !== columnId);
    } else {
      newColumns = [...currentColumns, columnId];
    }
    
    const newSettings = { ...localSettings, tableColumns: newColumns };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" title="إعدادات الفاتورة" className="print-hide">
          <Settings className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader className="text-right">
          <DrawerTitle className="text-lg">إعدادات الفاتورة</DrawerTitle>
        </DrawerHeader>
        
        <Tabs defaultValue="visibility" className="px-4 overflow-y-auto max-h-[calc(80vh-140px)]">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="visibility">عرض العناصر</TabsTrigger>
            <TabsTrigger value="table">إعدادات الجدول</TabsTrigger>
            <TabsTrigger value="appearance">المظهر</TabsTrigger>
          </TabsList>
          
          <TabsContent value="visibility" className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-customer" className="text-base">عرض تفاصيل العميل</Label>
              <Switch 
                id="show-customer" 
                checked={localSettings.showCustomerDetails}
                onCheckedChange={() => handleToggle('showCustomerDetails')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-item-codes" className="text-base">عرض أكواد الأصناف</Label>
              <Switch 
                id="show-item-codes" 
                checked={localSettings.showItemCodes}
                onCheckedChange={() => handleToggle('showItemCodes')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-item-notes" className="text-base">عرض ملاحظات الأصناف</Label>
              <Switch 
                id="show-item-notes" 
                checked={localSettings.showItemNotes}
                onCheckedChange={() => handleToggle('showItemNotes')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-discount" className="text-base">عرض خانة الخصم</Label>
              <Switch 
                id="show-discount" 
                checked={localSettings.showDiscount}
                onCheckedChange={() => handleToggle('showDiscount')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-tax" className="text-base">عرض الضريبة</Label>
              <Switch 
                id="show-tax" 
                checked={localSettings.showTax}
                onCheckedChange={() => handleToggle('showTax')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-signature" className="text-base">إظهار التوقيع</Label>
              <Switch 
                id="show-signature" 
                checked={localSettings.showSignature}
                onCheckedChange={() => handleToggle('showSignature')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-logo" className="text-base">عرض شعار الشركة</Label>
              <Switch 
                id="show-logo" 
                checked={localSettings.showCompanyLogo}
                onCheckedChange={() => handleToggle('showCompanyLogo')}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="table" className="space-y-4">
            <h3 className="font-semibold text-base mb-2">أعمدة الجدول</h3>
            <div className="grid grid-cols-1 gap-2">
              {availableTableColumns.map(column => (
                <div key={column.id} className="flex items-center justify-between">
                  <Label htmlFor={`col-${column.id}`} className="text-base">
                    {column.label}
                  </Label>
                  <Switch 
                    id={`col-${column.id}`}
                    checked={localSettings.tableColumns?.includes(column.id) ?? false}
                    onCheckedChange={() => toggleTableColumn(column.id)}
                    disabled={['serial', 'name', 'quantity', 'price', 'total'].includes(column.id)}
                  />
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <Label className="text-base mb-2 block">عرض الجدول</Label>
              <div className="flex items-center gap-4">
                <span>ضيق</span>
                <Slider 
                  defaultValue={[localSettings.tableWidth || 100]} 
                  max={100} 
                  min={60} 
                  step={5}
                  onValueChange={handleTableWidthChange}
                  className="flex-grow"
                />
                <span>واسع</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <div>
              <Label htmlFor="font-size" className="block text-base mb-1">حجم الخط</Label>
              <Select 
                value={localSettings.fontSize} 
                onValueChange={(val) => handleFontSizeChange(val as 'small' | 'medium' | 'large')}
              >
                <SelectTrigger id="font-size">
                  <SelectValue placeholder="اختر حجم الخط" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">صغير</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="large">كبير</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator className="my-4" />
            
            <div>
              <Label htmlFor="page-direction" className="block text-base mb-1">اتجاه الصفحة</Label>
              <Select defaultValue="rtl">
                <SelectTrigger id="page-direction">
                  <SelectValue placeholder="اختر اتجاه الصفحة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rtl">من اليمين إلى اليسار</SelectItem>
                  <SelectItem value="ltr">من اليسار إلى اليمين</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </TabsContent>
        </Tabs>
        
        <DrawerFooter className="flex flex-row justify-end">
          <DrawerClose asChild>
            <Button size="lg" className="text-base">إغلاق</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
