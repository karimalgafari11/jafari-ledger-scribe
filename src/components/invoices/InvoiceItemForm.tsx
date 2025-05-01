
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { InvoiceItem } from "@/types/invoices";
import { mockProducts } from "@/data/mockProducts";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface InvoiceItemFormProps {
  item?: InvoiceItem;
  onSubmit: (item: Partial<InvoiceItem>) => void;
  onCancel: () => void;
}

export const InvoiceItemForm: React.FC<InvoiceItemFormProps> = ({
  item,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<InvoiceItem>>({
    productId: item?.productId || "",
    code: item?.code || "",
    name: item?.name || "",
    description: item?.description || "",
    quantity: item?.quantity || 1,
    price: item?.price || 0,
    discount: item?.discount || 0,
    discountType: item?.discountType || "percentage",
    tax: item?.tax || 15, // ضريبة القيمة المضافة الافتراضية 15%
    total: item?.total || 0
  });
  
  // حساب الإجمالي عند تغيير القيمة أو الكمية أو الخصم
  useEffect(() => {
    calculateTotal();
  }, [formData.quantity, formData.price, formData.discount, formData.discountType, formData.tax]);
  
  const handleProductChange = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      setFormData(prev => ({
        ...prev,
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price,
      }));
    }
  };
  
  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const calculateTotal = () => {
    let subtotal = (formData.quantity || 0) * (formData.price || 0);
    
    // حساب الخصم
    let discountValue = 0;
    if (formData.discount && formData.discount > 0) {
      if (formData.discountType === 'percentage') {
        discountValue = subtotal * (formData.discount / 100);
      } else {
        discountValue = formData.discount;
      }
    }
    
    // حساب القيمة بعد الخصم
    const afterDiscount = subtotal - discountValue;
    
    // حساب الضريبة
    const taxAmount = afterDiscount * ((formData.tax || 0) / 100);
    
    // الإجمالي النهائي
    const total = afterDiscount + taxAmount;
    
    setFormData(prev => ({
      ...prev,
      total: Number(total.toFixed(2))
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
            onValueChange={handleProductChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر المنتج" />
            </SelectTrigger>
            <SelectContent>
              {mockProducts.filter(p => p.isActive).map((product) => (
                <SelectItem key={product.id} value={product.id}>
                  {product.name} ({product.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium mb-1">كود المنتج</label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => handleChange('code', e.target.value)}
            readOnly
            className="bg-muted"
          />
        </div>
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">اسم المنتج</label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">الوصف</label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium mb-1">الكمية</label>
          <Input
            id="quantity"
            type="number"
            min="1"
            step="1"
            value={formData.quantity}
            onChange={(e) => handleChange('quantity', Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">السعر</label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange('price', Number(e.target.value))}
            required
          />
        </div>

        <div>
          <label htmlFor="tax" className="block text-sm font-medium mb-1">الضريبة %</label>
          <Input
            id="tax"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={formData.tax}
            onChange={(e) => handleChange('tax', Number(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="discountType" className="block text-sm font-medium mb-1">نوع الخصم</label>
          <Select
            value={formData.discountType}
            onValueChange={(value) => handleChange('discountType', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="نوع الخصم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">نسبة مئوية</SelectItem>
              <SelectItem value="fixed">قيمة ثابتة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="discount" className="block text-sm font-medium mb-1">قيمة الخصم</label>
          <Input
            id="discount"
            type="number"
            min="0"
            step="0.01"
            value={formData.discount}
            onChange={(e) => handleChange('discount', Number(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="total" className="block text-sm font-medium mb-1">الإجمالي</label>
          <div className="relative">
            <Input
              id="total"
              type="number"
              value={formData.total}
              readOnly
              className="bg-muted"
            />
            <Badge className="absolute right-2 top-1/2 transform -translate-y-1/2">ر.س</Badge>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 rtl">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="ml-2 h-4 w-4" />
          إلغاء
        </Button>
        <Button type="submit">
          <Check className="ml-2 h-4 w-4" />
          {item ? 'تعديل' : 'إضافة'}
        </Button>
      </div>
    </form>
  );
};
