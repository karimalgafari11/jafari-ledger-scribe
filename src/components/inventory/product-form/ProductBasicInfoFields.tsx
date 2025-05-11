
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
    <div className="space-y-4">
      <h3 className="text-lg font-medium">المعلومات الأساسية</h3>
      
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>اسم المنتج</FormLabel>
            <FormControl>
              <Input placeholder="أدخل اسم المنتج" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="code"
        render={({ field }) => (
          <FormItem>
            <FormLabel>رمز المنتج</FormLabel>
            <FormControl>
              <Input placeholder="أدخل رمز المنتج" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="barcode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>باركود</FormLabel>
            <FormControl>
              <Input placeholder="أدخل باركود المنتج" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>الفئة</FormLabel>
            <FormControl>
              <Input placeholder="أدخل فئة المنتج" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="brand"
        render={({ field }) => (
          <FormItem>
            <FormLabel>العلامة التجارية</FormLabel>
            <FormControl>
              <Input placeholder="أدخل العلامة التجارية" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
