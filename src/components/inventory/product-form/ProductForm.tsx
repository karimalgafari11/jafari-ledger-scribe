
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ProductBasicInfoFields } from "./ProductBasicInfoFields";
import { ProductPricingFields } from "./ProductPricingFields";
import { ProductInventoryFields } from "./ProductInventoryFields";
import { ProductStatusField } from "./ProductStatusField";
import { ProductDescriptionField } from "./ProductDescriptionField";
import { ProductFormActions } from "./ProductFormActions";
import { productSchema, ProductFormValues, defaultProductValues } from "./ProductFormSchema";

interface ProductFormProps {
  initialValues?: Partial<ProductFormValues>;
  onSubmit?: (values: ProductFormValues) => void;
  isEditMode?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({
  initialValues = {},
  onSubmit,
  isEditMode = false,
}) => {
  const navigate = useNavigate();
  
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      ...defaultProductValues,
      ...initialValues
    },
  });

  const handleSubmit = (values: ProductFormValues) => {
    console.log("تم حفظ المنتج:", values);
    
    if (onSubmit) {
      onSubmit(values);
    } else {
      // هنا سيكون إرسال البيانات للخادم (API) في التطبيق الحقيقي
      toast.success(isEditMode ? "تم تعديل المنتج بنجاح" : "تم إضافة المنتج بنجاح");
      navigate("/inventory/products");
    }
  };

  const handleDelete = () => {
    // في حالة التطبيق الحقيقي، يمكن هنا إضافة تأكيد قبل الحذف
    toast.success("تم حذف المنتج بنجاح");
    navigate("/inventory/products");
  };

  const handleNextProduct = () => {
    // حفظ المنتج الحالي وإنشاء منتج جديد
    toast.success("تم الانتقال إلى إنشاء منتج جديد");
    form.reset(defaultProductValues);
  };

  const handlePreviousProduct = () => {
    // العودة إلى المنتج السابق
    toast.info("العودة إلى المنتج السابق");
    navigate(-1); // يعود للصفحة السابقة
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductBasicInfoFields control={form.control} />
          <ProductPricingFields control={form.control} />
          <ProductInventoryFields control={form.control} />
          <ProductStatusField control={form.control} />
        </div>

        <ProductDescriptionField control={form.control} />
        
        <ProductFormActions 
          isSubmitting={form.formState.isSubmitting}
          onDelete={handleDelete}
          onNextProduct={handleNextProduct}
          onPreviousProduct={handlePreviousProduct}
          showDeleteButton={isEditMode}
          showNavigationButtons={true}
        />
      </form>
    </Form>
  );
};
