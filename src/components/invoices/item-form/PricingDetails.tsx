
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium mb-1">الكمية</label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => onChange("quantity", parseInt(e.target.value) || 0)}
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">السعر</label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => onChange("price", parseFloat(e.target.value) || 0)}
            required
          />
        </div>

        <div>
          <label htmlFor="tax" className="block text-sm font-medium mb-1">الضريبة %</label>
          <Input
            id="tax"
            type="number"
            step="0.01"
            min="0"
            value={tax}
            onChange={(e) => onChange("tax", parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">نوع الخصم</label>
          <RadioGroup 
            value={discountType} 
            onValueChange={(value) => onChange("discountType", value)}
            className="flex space-x-4 rtl space-x-reverse"
          >
            <div className="flex items-center space-x-2 rtl space-x-reverse">
              <RadioGroupItem value="percentage" id="discount-percentage" />
              <Label htmlFor="discount-percentage">نسبة %</Label>
            </div>
            <div className="flex items-center space-x-2 rtl space-x-reverse">
              <RadioGroupItem value="fixed" id="discount-fixed" />
              <Label htmlFor="discount-fixed">مبلغ ثابت</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <label htmlFor="discount" className="block text-sm font-medium mb-1">
            {discountType === "percentage" ? "الخصم %" : "الخصم (ر.س)"}
          </label>
          <Input
            id="discount"
            type="number"
            step="0.01"
            min="0"
            value={discount}
            onChange={(e) => onChange("discount", parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>
    </>
  );
};
