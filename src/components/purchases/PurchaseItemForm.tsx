
import React, { useEffect } from "react";
import { PurchaseItem } from "@/types/purchases";
import { Product } from "@/types/inventory";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

interface PurchaseItemFormProps {
  item?: PurchaseItem;
  onSubmit: (item: Partial<PurchaseItem>) => void;
  onCancel: () => void;
}

export const PurchaseItemForm: React.FC<PurchaseItemFormProps> = ({
  item,
  onSubmit,
  onCancel
}) => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    defaultValues: item || {
      code: "",
      name: "",
      manufacturer: "",
      size: "",
      quantity: 1,
      price: 0,
      notes: ""
    }
  });

  const quantity = watch('quantity');
  const price = watch('price');
  const total = Number(quantity) * Number(price);

  // Calculate total when quantity or price changes
  React.useEffect(() => {
    setValue('total', total);
  }, [quantity, price, setValue, total]);

  const handleFormSubmit = (data: any) => {
    const formattedItem = {
      ...data,
      quantity: Number(data.quantity),
      price: Number(data.price),
      total: Number(data.quantity) * Number(data.price)
    };
    onSubmit(formattedItem);
  };

  return (
    <Card className="mb-4 border-dashed border-2 border-gray-300">
      <CardContent className="p-4">
        <h4 className="text-md font-medium mb-3">
          {item ? 'تعديل الصنف' : 'إضافة صنف جديد'}
        </h4>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="code">رقم الصنف</Label>
              <Input
                id="code"
                {...register("code", { required: "رقم الصنف مطلوب" })}
                autoFocus
              />
              {errors.code && <span className="text-red-500 text-xs">{errors.code.message as string}</span>}
            </div>
            
            <div>
              <Label htmlFor="name">اسم الصنف</Label>
              <Input
                id="name"
                {...register("name", { required: "اسم الصنف مطلوب" })}
              />
              {errors.name && <span className="text-red-500 text-xs">{errors.name.message as string}</span>}
            </div>

            <div>
              <Label htmlFor="manufacturer">الشركة المصنعة</Label>
              <Input
                id="manufacturer"
                placeholder="الشركة المصنعة"
                {...register("manufacturer")}
              />
            </div>

            <div>
              <Label htmlFor="size">المقاس</Label>
              <Input
                id="size"
                placeholder="المقاس"
                {...register("size")}
              />
            </div>
            
            <div>
              <Label htmlFor="quantity">الكمية</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                placeholder="الكمية"
                {...register("quantity", { 
                  required: "الكمية مطلوبة",
                  min: { value: 1, message: "الكمية يجب أن تكون 1 على الأقل" }
                })}
              />
              {errors.quantity && <span className="text-red-500 text-xs">{errors.quantity.message as string}</span>}
            </div>
            
            <div>
              <Label htmlFor="price">السعر</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="السعر"
                {...register("price", { 
                  required: "السعر مطلوب",
                  min: { value: 0, message: "السعر يجب أن يكون 0 على الأقل" }
                })}
              />
              {errors.price && <span className="text-red-500 text-xs">{errors.price.message as string}</span>}
            </div>

            <div>
              <Label htmlFor="total">الإجمالي</Label>
              <Input
                id="total"
                type="number"
                value={total.toFixed(2)}
                readOnly
                className="bg-muted"
              />
              <input type="hidden" {...register("total")} />
            </div>
          </div>
          
          <div>
            <Label htmlFor="notes">ملاحظات</Label>
            <Textarea
              id="notes"
              placeholder="ملاحظات"
              {...register("notes")}
              className="h-20"
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              إلغاء
            </Button>
            <Button type="submit">
              {item ? 'تحديث' : 'إضافة'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
