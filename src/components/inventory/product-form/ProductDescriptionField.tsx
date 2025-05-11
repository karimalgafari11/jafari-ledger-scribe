
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Control } from "react-hook-form";
import { ProductFormValues } from "./ProductFormSchema";

interface ProductDescriptionFieldProps {
  control: Control<ProductFormValues>;
}

export const ProductDescriptionField: React.FC<ProductDescriptionFieldProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>الملاحظات</FormLabel>
          <FormControl>
            <Textarea
              placeholder="أضف ملاحظات للمنتج (اختياري)"
              className="min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
