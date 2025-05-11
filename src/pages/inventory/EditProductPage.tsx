
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { ProductForm } from "@/components/inventory/product-form/ProductForm";
import { ProductFormHeader } from "@/components/inventory/product-form/ProductFormHeader";
import { Product } from "@/types/inventory";
import { ProductFormValues } from "@/components/inventory/product-form/ProductFormSchema";

const EditProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const isDuplicate = window.location.pathname.includes('/duplicate/');

  // محاكاة جلب بيانات المنتج من API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // في التطبيق الحقيقي، سيتم استبدال هذا بطلب فعلي إلى API
        // فقط لغرض العرض، نستخدم بيانات محاكاة
        setProduct({
          id: id || '',
          code: 'PRD-' + id,
          name: 'منتج رقم ' + id,
          description: 'وصف تفصيلي للمنتج',
          price: 100,
          cost: 70,
          quantity: 50,
          unit: 'قطعة',
          category: 'إلكترونيات',
          barcode: '123456789',
          isActive: true
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // تحويل بيانات المنتج إلى قيم النموذج
  const mapProductToFormValues = (product: Product | null): Partial<ProductFormValues> => {
    if (!product) return {};

    return {
      name: product.name,
      code: product.code,
      barcode: product.barcode || '', // الآن لدينا حقل barcode في النموذج
      description: product.description || '',
      price: product.price,
      costPrice: product.cost || 0,
      taxRate: product.taxRate || 0,
      quantity: product.quantity || 0,
      unit: product.unit || '',
      category: product.category || '',
      subcategory: product.subcategory || '',
      brand: product.brand || '',
      reorderLevel: product.reorderLevel || 0,
      isActive: product.isActive !== undefined ? product.isActive : true,
    };
  };

  // معالجة تقديم النموذج
  const handleSubmit = (values: ProductFormValues) => {
    console.log("تم تعديل المنتج:", values);
    // في التطبيق الحقيقي، سيتم إرسال البيانات إلى API
  };

  if (loading) {
    return (
      <PageContainer title="تحميل...">
        <div className="p-4 md:p-6">
          جاري تحميل بيانات المنتج...
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title={isDuplicate ? "نسخ منتج" : "تعديل المنتج"}>
      <div className="p-4 md:p-6">
        <ProductFormHeader />
        
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <ProductForm 
              initialValues={mapProductToFormValues(product)}
              onSubmit={handleSubmit}
              isEditMode={!isDuplicate}
            />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default EditProductPage;
