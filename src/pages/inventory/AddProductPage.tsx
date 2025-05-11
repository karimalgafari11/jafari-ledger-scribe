
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { ProductForm } from "@/components/inventory/product-form/ProductForm";
import { ProductFormHeader } from "@/components/inventory/product-form/ProductFormHeader";

const AddProductPage = () => {
  return (
    <PageContainer title="إضافة منتج جديد">
      <div className="p-4 md:p-6">
        <ProductFormHeader />
        
        <Card className="shadow-md">
          <CardContent className="pt-6">
            <ProductForm />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AddProductPage;
