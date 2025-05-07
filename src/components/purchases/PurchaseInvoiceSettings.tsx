
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PurchaseInvoiceSettingsProps {
  settings: any;
  onSettingsChange: (settings: any) => void;
}

export const PurchaseInvoiceSettings: React.FC<PurchaseInvoiceSettingsProps> = ({
  settings,
  onSettingsChange,
}) => {
  const handleToggleSetting = (key: string) => {
    onSettingsChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  const handleChangeFontSize = (size: string) => {
    onSettingsChange({
      ...settings,
      fontSize: size,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="print-hide h-9 text-base"
          aria-label="إعدادات الفاتورة"
        >
          <Settings className="ml-1 h-4 w-4" />
          الإعدادات
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>إعدادات الفاتورة</DialogTitle>
          <DialogDescription>
            قم بتخصيص طريقة عرض فاتورة المشتريات
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">محتوى الفاتورة</h4>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="showVendorDetails" 
                checked={settings.showVendorDetails} 
                onCheckedChange={() => handleToggleSetting('showVendorDetails')} 
              />
              <Label htmlFor="showVendorDetails">إظهار تفاصيل المورد</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="showItemCodes" 
                checked={settings.showItemCodes} 
                onCheckedChange={() => handleToggleSetting('showItemCodes')} 
              />
              <Label htmlFor="showItemCodes">إظهار أكواد الأصناف</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="showItemNotes" 
                checked={settings.showItemNotes} 
                onCheckedChange={() => handleToggleSetting('showItemNotes')} 
              />
              <Label htmlFor="showItemNotes">إظهار ملاحظات الأصناف</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="showDiscount" 
                checked={settings.showDiscount} 
                onCheckedChange={() => handleToggleSetting('showDiscount')} 
              />
              <Label htmlFor="showDiscount">إظهار الخصومات</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="showTax" 
                checked={settings.showTax} 
                onCheckedChange={() => handleToggleSetting('showTax')} 
              />
              <Label htmlFor="showTax">إظهار الضريبة</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="showSignature" 
                checked={settings.showSignature} 
                onCheckedChange={() => handleToggleSetting('showSignature')} 
              />
              <Label htmlFor="showSignature">إظهار حقل التوقيع</Label>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="showCompanyLogo" 
                checked={settings.showCompanyLogo} 
                onCheckedChange={() => handleToggleSetting('showCompanyLogo')} 
              />
              <Label htmlFor="showCompanyLogo">إظهار شعار الشركة</Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">حجم الخط</h4>
            <RadioGroup 
              defaultValue={settings.fontSize} 
              onValueChange={handleChangeFontSize}
            >
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="small" id="r1" />
                <Label htmlFor="r1">صغير</Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="medium" id="r2" />
                <Label htmlFor="r2">متوسط</Label>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <RadioGroupItem value="large" id="r3" />
                <Label htmlFor="r3">كبير</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

