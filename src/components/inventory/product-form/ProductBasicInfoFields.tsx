
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ProductFormValues } from "./ProductFormSchema";

interface ProductBasicInfoFieldsProps {
  control: Control<ProductFormValues>;
}

export const ProductBasicInfoFields: React.FC<ProductBasicInfoFieldsProps> = ({ control }) => {
  return (
    <>
      {/* اسم المنتج */}
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>اسم المنتج *</FormLabel>
            <FormControl>
              <Input {...field} placeholder="أدخل اسم المنتج" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* رقم المنتج */}
      <FormField
        control={control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>رقم المنتج *</FormLabel>
            <FormControl>
              <Input {...field} placeholder="أدخل رقم المنتج" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* الشركة الصانعة */}
      <FormField
        control={control}
        name="brand"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الشركة الصانعة</FormLabel>
            <FormControl>
              <Input {...field} placeholder="أدخل اسم الشركة الصانعة" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
