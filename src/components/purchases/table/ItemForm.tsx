
import React from "react";
import { Input } from "@/components/ui/input";
import { PurchaseItem } from "@/types/purchases";
import { Label } from "@/components/ui/label";

interface ItemFormProps {
  item: PurchaseItem;
  onChange: (field: keyof PurchaseItem, value: any) => void;
}

export const ItemForm: React.FC<ItemFormProps> = ({ item, onChange }) => {
  // Handle quantity change and recalculate total
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const quantity = parseFloat(e.target.value) || 0;
    onChange('quantity', quantity);
    onChange('total', quantity * item.price);
  };

  // Handle price change and recalculate total
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseFloat(e.target.value) || 0;
    onChange('price', price);
    onChange('total', item.quantity * price);
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      <div>
        <Label htmlFor="quantity">الكمية</Label>
        <Input
          id="quantity"
          type="number"
          min="0"
          step="0.01"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="text-left ltr"
        />
      </div>
      
      <div>
        <Label htmlFor="unit">الوحدة</Label>
        <Input
          id="unit"
          type="text"
          value={item.unit || ""}
          onChange={(e) => onChange('unit', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="price">السعر</Label>
        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={item.price}
          onChange={handlePriceChange}
          className="text-left ltr"
        />
      </div>
      
      {item.notes !== undefined && (
        <div className="col-span-3">
          <Label htmlFor="notes">ملاحظات</Label>
          <Input
            id="notes"
            value={item.notes || ""}
            onChange={(e) => onChange('notes', e.target.value)}
            placeholder="إضافة ملاحظات للصنف (اختياري)"
          />
        </div>
      )}
    </div>
  );
};
