
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check } from "lucide-react";

interface InvoiceDiscountFormProps {
  onApply: (type: 'percentage' | 'fixed', value: number) => void;
  onClose: () => void;
  currentDiscount?: number;
  currentType?: 'percentage' | 'fixed';
}

export const InvoiceDiscountForm: React.FC<InvoiceDiscountFormProps> = ({
  onApply,
  onClose,
  currentDiscount = 0,
  currentType = 'fixed'
}) => {
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>(currentType);
  const [discountValue, setDiscountValue] = useState<number>(currentDiscount);

  const handleApply = () => {
    onApply(discountType, discountValue);
    onClose();
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-base">تطبيق خصم على الفاتورة</h3>
      
      <RadioGroup 
        value={discountType} 
        onValueChange={(value) => setDiscountType(value as 'percentage' | 'fixed')}
        className="flex items-center gap-4"
      >
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="fixed" id="fixed" />
          <Label htmlFor="fixed">مبلغ ثابت</Label>
        </div>
        <div className="flex items-center space-x-2 space-x-reverse">
          <RadioGroupItem value="percentage" id="percentage" />
          <Label htmlFor="percentage">نسبة مئوية</Label>
        </div>
      </RadioGroup>
      
      <div>
        <Label htmlFor="discountValue">قيمة الخصم</Label>
        <div className="relative">
          <Input
            id="discountValue"
            type="number"
            min="0"
            step={discountType === 'percentage' ? '0.1' : '0.01'}
            max={discountType === 'percentage' ? '100' : undefined}
            value={discountValue || ''}
            onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
            className="pr-10"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500">{discountType === 'percentage' ? '%' : 'ريال'}</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          className="px-3"
        >
          إلغاء
        </Button>
        <Button 
          type="button" 
          onClick={handleApply}
          className="px-3"
        >
          <Check className="h-4 w-4 ml-2" />
          تطبيق
        </Button>
      </div>
    </div>
  );
};
