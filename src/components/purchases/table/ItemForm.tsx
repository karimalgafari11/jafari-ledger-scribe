
import React from "react";
import { Input } from "@/components/ui/input";
import { PurchaseItem } from "@/types/purchases";
import { Label } from "@/components/ui/label";

interface ItemFormProps {
  item: PurchaseItem;
  onChange: (field: string, value: any) => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ 
  item, 
  onChange 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // معالجة خاصة للحقول الرقمية
    if (name === 'quantity' || name === 'price') {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        onChange(name, numValue);
        
        // حساب الإجمالي تلقائيًا
        if (name === 'quantity') {
          onChange('total', numValue * item.price);
        } else if (name === 'price') {
          onChange('total', item.quantity * numValue);
        }
      }
    } else {
      onChange(name, value);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2">
        <Label htmlFor="name">اسم الصنف</Label>
        <Input
          id="name"
          name="name"
          value={item.name}
          onChange={handleChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="quantity">الكمية</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          value={item.quantity}
          onChange={handleChange}
          className="mt-1"
          min="0"
          step="0.01"
        />
      </div>
      
      <div>
        <Label htmlFor="unit">الوحدة</Label>
        <Input
          id="unit"
          name="unit"
          value={item.unit || "قطعة"}
          onChange={handleChange}
          className="mt-1"
        />
      </div>
      
      <div>
        <Label htmlFor="price">السعر</Label>
        <Input
          id="price"
          name="price"
          type="number"
          value={item.price}
          onChange={handleChange}
          className="mt-1"
          min="0"
          step="0.01"
        />
      </div>
      
      <div>
        <Label htmlFor="total">الإجمالي</Label>
        <Input
          id="total"
          name="total"
          type="number"
          value={item.total}
          readOnly
          className="mt-1 bg-gray-100"
        />
      </div>
    </div>
  );
};
