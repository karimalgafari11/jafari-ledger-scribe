
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Control } from "react-hook-form";
import { ProductFormValues } from "./ProductFormSchema";

interface ProductInventoryFieldsProps {
  control: Control<ProductFormValues>;
}

export const ProductInventoryFields: React.FC<ProductInventoryFieldsProps> = ({ control }) => {
  return (
    <>
      {/* الكمية المتوفرة */}
      <FormField
        control={control}
        name="quantity"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الكمية المتوفرة</FormLabel>
            <FormControl>
              <Input type="number" {...field} placeholder="أدخل الكمية" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* المقاس */}
      <FormField
        control={control}
        name="size"
        render={({ field }) => (
          <FormItem>
            <FormLabel>المقاس</FormLabel>
            <FormControl>
              <Input {...field} placeholder="أدخل مقاس المنتج" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* التصنيف */}
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>التصنيف</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="اختر التصنيف" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="أجهزة كهربائية">أجهزة كهربائية</SelectItem>
                <SelectItem value="إلكترونيات">إلكترونيات</SelectItem>
                <SelectItem value="أدوات منزلية">أدوات منزلية</SelectItem>
                <SelectItem value="قطع غيار">قطع غيار</SelectItem>
                <SelectItem value="أخرى">أخرى</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* حد إعادة الطلب */}
      <FormField
        control={control}
        name="reorderLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>حد إعادة الطلب</FormLabel>
            <FormControl>
              <Input type="number" {...field} placeholder="أدخل حد إعادة الطلب" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
