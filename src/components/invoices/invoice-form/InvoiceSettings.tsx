
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
}

export const InvoiceSettings: React.FC<InvoiceSettingsProps> = ({
  settings,
  onSettingsChange
}) => {
  const [localSettings, setLocalSettings] = useState<InvoiceSettingsType>(settings);

  const handleToggle = (field: keyof InvoiceSettingsType) => {
    const newSettings = { ...localSettings, [field]: !localSettings[field] };
    setLocalSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" title="إعدادات الفاتورة" className="print-hide">
          <Settings className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-right">
          <DrawerTitle>إعدادات الفاتورة</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          <Separator className="mb-4" />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-customer">عرض تفاصيل العميل</Label>
              <Switch 
                id="show-customer" 
                checked={localSettings.showCustomerDetails}
                onCheckedChange={() => handleToggle('showCustomerDetails')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-item-codes">عرض أكواد الأصناف</Label>
              <Switch 
                id="show-item-codes" 
                checked={localSettings.showItemCodes}
                onCheckedChange={() => handleToggle('showItemCodes')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-item-notes">عرض ملاحظات الأصناف</Label>
              <Switch 
                id="show-item-notes" 
                checked={localSettings.showItemNotes}
                onCheckedChange={() => handleToggle('showItemNotes')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-discount">عرض خانة الخصم</Label>
              <Switch 
                id="show-discount" 
                checked={localSettings.showDiscount}
                onCheckedChange={() => handleToggle('showDiscount')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-tax">عرض الضريبة</Label>
              <Switch 
                id="show-tax" 
                checked={localSettings.showTax}
                onCheckedChange={() => handleToggle('showTax')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-signature">إظهار التوقيع</Label>
              <Switch 
                id="show-signature" 
                checked={localSettings.showSignature}
                onCheckedChange={() => handleToggle('showSignature')}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-logo">عرض شعار الشركة</Label>
              <Switch 
                id="show-logo" 
                checked={localSettings.showCompanyLogo}
                onCheckedChange={() => handleToggle('showCompanyLogo')}
              />
            </div>
          </div>
        </div>
        <DrawerFooter className="flex flex-row justify-end">
          <DrawerClose asChild>
            <Button>إغلاق</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
