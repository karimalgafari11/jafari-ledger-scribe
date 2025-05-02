
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { InvoiceItem } from "@/types/invoices";
import { mockProducts } from "@/data/mockProducts";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { v4 as uuid } from "uuid";

interface InvoiceItemFormProps {
  item?: InvoiceItem;
  onSubmit: (item: Partial<InvoiceItem>) => void;
  onCancel: () => void;
  includeNotes?: boolean;
}

export const InvoiceItemForm: React.FC<InvoiceItemFormProps> = ({
  item,
  onSubmit,
  onCancel,
  includeNotes = false
}) => {
  const [formData, setFormData] = useState<Partial<InvoiceItem>>({
    id: item?.id || uuid(),
    productId: item?.productId || "",
    code: item?.code || "",
    name: item?.name || "",
    description: item?.description || "",
    quantity: item?.quantity || 1,
    price: item?.price || 0,
    discount: item?.discount || 0,
    discountType: item?.discountType || "percentage",
    tax: item?.tax || 15,
    total: item?.total || 0,
    notes: item?.notes || ""
  });

  useEffect(() => {
    calculateTotal();
  }, [formData.quantity, formData.price, formData.discount, formData.discountType, formData.tax]);

  const handleChange = (field: keyof InvoiceItem, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectProduct = (productId: string) => {
    const product = mockProducts.find((p) => p.id === productId);
    
    if (product) {
      setFormData((prev) => ({
        ...prev,
        productId,
        code: product.sku,
        name: product.name,
        description: product.description || "",
        price: product.price,
      }));
    }
  };

  const calculateTotal = () => {
    const quantity = formData.quantity || 0;
    const price = formData.price || 0;
    const discount = formData.discount || 0;
    const tax = formData.tax || 0;
    
    let subtotal = quantity * price;
    
    // Apply discount
    if (formData.discountType === "percentage") {
      subtotal = subtotal * (1 - discount / 100);
    } else {
      subtotal = subtotal - discount;
    }
    
    // Apply tax
    const total = subtotal * (1 + tax / 100);
    
    setFormData((prev) => ({
      ...prev,
      total,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="product" className="block text-sm font-medium mb-1">المنتج</label>
          <Select
            value={formData.productId}
            onValueChange={handleSelectProduct}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر منتج" />
            </SelectTrigger>
            <SelectContent>
              {mockProducts.map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium mb-1">الرمز</label>
          <Input
            id="code"
            type="text"
            value={formData.code}
            onChange={(e) => handleChange("code", e.target.value)}
            placeholder="رمز المنتج"
          />
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">الاسم</label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="اسم المنتج أو الخدمة"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">الوصف</label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="وصف المنتج أو الخدمة"
        />
      </div>

      {includeNotes && (
        <div>
          <label htmlFor="notes" className="block text-sm font-medium mb-1">ملاحظات</label>
          <Textarea
            id="notes"
            value={formData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            placeholder="ملاحظات خاصة بهذا الصنف"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium mb-1">الكمية</label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => handleChange("quantity", parseInt(e.target.value) || 0)}
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
            value={formData.price}
            onChange={(e) => handleChange("price", parseFloat(e.target.value) || 0)}
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
            value={formData.tax}
            onChange={(e) => handleChange("tax", parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">نوع الخصم</label>
          <RadioGroup 
            value={formData.discountType} 
            onValueChange={(value) => handleChange("discountType", value)}
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
            {formData.discountType === "percentage" ? "الخصم %" : "الخصم (ر.س)"}
          </label>
          <Input
            id="discount"
            type="number"
            step="0.01"
            min="0"
            value={formData.discount}
            onChange={(e) => handleChange("discount", parseFloat(e.target.value) || 0)}
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold">الإجمالي:</span>{" "}
            {formData.total.toFixed(2)} ر.س
          </div>
          <div className="space-x-2 rtl space-x-reverse">
            <Button type="button" variant="outline" onClick={onCancel}>
              إلغاء
            </Button>
            <Button type="submit">
              {item ? "تحديث" : "إضافة"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
