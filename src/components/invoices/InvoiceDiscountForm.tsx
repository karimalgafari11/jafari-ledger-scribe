
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

interface DiscountFormProps {
  onApply: (type: 'percentage' | 'fixed', value: number) => void;
  onCancel: () => void;
  currentDiscount: number;
  currentType: 'percentage' | 'fixed';
}

export const InvoiceDiscountForm: React.FC<DiscountFormProps> = ({
  onApply,
  onCancel,
  currentDiscount,
  currentType
}) => {
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>(currentType);
  const [discountValue, setDiscountValue] = useState(currentDiscount.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(discountType, parseFloat(discountValue) || 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <RadioGroup 
        value={discountType}
        onValueChange={(value) => setDiscountType(value as 'percentage' | 'fixed')}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-1 rtl">
          <RadioGroupItem value="percentage" id="percentage" className="h-3 w-3" />
          <Label htmlFor="percentage" className="text-xs">نسبة مئوية (%)</Label>
        </div>
        <div className="flex items-center space-x-1 rtl">
          <RadioGroupItem value="fixed" id="fixed" className="h-3 w-3" />
          <Label htmlFor="fixed" className="text-xs">قيمة ثابتة</Label>
        </div>
      </RadioGroup>

      <div>
        <label htmlFor="discountValue" className="block text-xs font-medium mb-0.5">
          قيمة الخصم {discountType === 'percentage' ? '(%)' : '(ر.س)'}
        </label>
        <Input
          id="discountValue"
          type="number"
          min="0"
          step="0.01"
          max={discountType === 'percentage' ? 100 : undefined}
          value={discountValue}
          onChange={(e) => setDiscountValue(e.target.value)}
          required
          className="h-7 text-sm"
        />
      </div>

      <div className="flex justify-end space-x-2 rtl space-x-reverse">
        <Button type="button" variant="outline" onClick={onCancel} size="sm" className="h-7 text-xs">
          <X className="ml-1 h-3 w-3" />
          إلغاء
        </Button>
        <Button type="submit" size="sm" className="h-7 text-xs">
          <Check className="ml-1 h-3 w-3" />
          تطبيق الخصم
        </Button>
      </div>
    </form>
  );
};
