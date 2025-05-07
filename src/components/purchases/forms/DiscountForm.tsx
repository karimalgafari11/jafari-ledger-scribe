
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface DiscountFormProps {
  onApply: (type: 'percentage' | 'fixed', value: number) => void;
  onCancel: () => void;
  currentDiscount?: number;
  currentType?: 'percentage' | 'fixed';
}

export const DiscountForm: React.FC<DiscountFormProps> = ({
  onApply,
  onCancel,
  currentDiscount = 0,
  currentType = 'percentage'
}) => {
  const [discountValue, setDiscountValue] = useState<number>(currentDiscount);
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>(currentType);

  const handleApply = () => {
    onApply(discountType, discountValue);
    onCancel();
  };

  return (
    <div className="space-y-4 p-2 bg-gray-50 rounded border">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="discount-value">قيمة الخصم</Label>
        <Input
          id="discount-value"
          type="number"
          min="0"
          step={discountType === 'percentage' ? "0.1" : "0.01"}
          value={discountValue || ''}
          onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
          className="text-base"
        />
      </div>

      <RadioGroup
        value={discountType}
        onValueChange={(value) => setDiscountType(value as 'percentage' | 'fixed')}
        className="flex space-x-4 rtl:space-x-reverse"
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <RadioGroupItem value="percentage" id="percentage" />
          <Label htmlFor="percentage">نسبة مئوية (%)</Label>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <RadioGroupItem value="fixed" id="fixed" />
          <Label htmlFor="fixed">قيمة ثابتة (ر.س)</Label>
        </div>
      </RadioGroup>

      <div className="flex justify-end space-x-2 rtl:space-x-reverse">
        <Button variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button onClick={handleApply}>
          تطبيق
        </Button>
      </div>
    </div>
  );
};
