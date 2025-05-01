
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

interface DiscountFormProps {
  onApply: (type: 'percentage' | 'fixed', value: number) => void;
  onCancel: () => void;
  currentDiscount: {
    type: 'percentage' | 'fixed';
    value: number;
  };
}

export const InvoiceDiscountForm: React.FC<DiscountFormProps> = ({
  onApply,
  onCancel,
  currentDiscount
}) => {
  const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>(currentDiscount.type);
  const [discountValue, setDiscountValue] = useState(currentDiscount.value.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(discountType, parseFloat(discountValue) || 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <RadioGroup 
        value={discountType}
        onValueChange={(value) => setDiscountType(value as 'percentage' | 'fixed')}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2 rtl">
          <RadioGroupItem value="percentage" id="percentage" />
          <Label htmlFor="percentage" className="text-sm">نسبة مئوية (%)</Label>
        </div>
        <div className="flex items-center space-x-2 rtl">
          <RadioGroupItem value="fixed" id="fixed" />
          <Label htmlFor="fixed" className="text-sm">قيمة ثابتة</Label>
        </div>
      </RadioGroup>

      <div>
        <label htmlFor="discountValue" className="block text-sm font-medium mb-1">
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
        />
      </div>

      <div className="flex justify-end space-x-2 rtl">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="ml-2 h-4 w-4" />
          إلغاء
        </Button>
        <Button type="submit">
          <Check className="ml-2 h-4 w-4" />
          تطبيق الخصم
        </Button>
      </div>
    </form>
  );
};
