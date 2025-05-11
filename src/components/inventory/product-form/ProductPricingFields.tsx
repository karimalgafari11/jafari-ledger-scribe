
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { ProductFormValues } from "./ProductFormSchema";

interface ProductPricingFieldsProps {
  control: Control<ProductFormValues>;
}

export const ProductPricingFields: React.FC<ProductPricingFieldsProps> = ({ control }) => {
  return (
    <>
      {/* سعر البيع */}
      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>سعر البيع *</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" {...field} placeholder="أدخل سعر البيع" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* سعر الشراء */}
      <FormField
        control={control}
        name="costPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>سعر الشراء</FormLabel>
            <FormControl>
              <Input type="number" step="0.01" {...field} placeholder="أدخل سعر الشراء" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
