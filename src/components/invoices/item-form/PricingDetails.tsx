
import React from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PricingDetailsProps {
  quantity: number;
  price: number;
  tax: number;
  discount: number;
  discountType: 'percentage' | 'fixed';
  onChange: (field: string, value: any) => void;
}

export const PricingDetails: React.FC<PricingDetailsProps> = ({
  quantity,
  price,
  tax,
  discount,
  discountType,
  onChange
}) => {
  // Calculate total including tax and discounts when values change
  React.useEffect(() => {
    let total = quantity * price;
    
    if (discount > 0) {
      if (discountType === 'percentage') {
        total = total * (1 - discount / 100);
      } else {
        total = total - discount;
      }
    }
    
    if (tax > 0) {
      total = total * (1 + tax / 100);
    }
    
    onChange("total", total);
  }, [quantity, price, discount, discountType, tax, onChange]);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="quantity" className="block text-xs font-medium mb-0.5">الكمية</label>
          <Input
            id="quantity"
            type="number"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => onChange("quantity", parseInt(e.target.value) || 1)}
            className="h-7 text-sm"
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-xs font-medium mb-0.5">السعر (ر.س)</label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => onChange("price", parseFloat(e.target.value) || 0)}
            className="h-7 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label htmlFor="tax" className="block text-xs font-medium mb-0.5">ضريبة القيمة المضافة (%)</label>
          <Input
            id="tax"
            type="number"
            min="0"
            step="1"
            max="100"
            value={tax}
            onChange={(e) => onChange("tax", parseFloat(e.target.value) || 0)}
            className="h-7 text-sm"
          />
        </div>
        <div>
          <label htmlFor="discount" className="block text-xs font-medium mb-0.5">الخصم</label>
          <div className="flex space-x-1 rtl space-x-reverse">
            <Input
              id="discount"
              type="number"
              min="0"
              step="0.01"
              value={discount}
              onChange={(e) => onChange("discount", parseFloat(e.target.value) || 0)}
              className="h-7 text-sm flex-1"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium">نوع الخصم</label>
        <RadioGroup 
          value={discountType} 
          onValueChange={(value) => onChange("discountType", value)}
          className="flex space-x-4 rtl space-x-reverse mt-1"
        >
          <div className="flex items-center space-x-1 rtl space-x-reverse">
            <RadioGroupItem value="percentage" id="discount-percentage" className="h-3 w-3" />
            <Label htmlFor="discount-percentage" className="text-xs">نسبة مئوية (%)</Label>
          </div>
          <div className="flex items-center space-x-1 rtl space-x-reverse">
            <RadioGroupItem value="fixed" id="discount-fixed" className="h-3 w-3" />
            <Label htmlFor="discount-fixed" className="text-xs">قيمة ثابتة</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};
