
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface ProductFormHeaderProps {
  isEditMode?: boolean;
}

export const ProductFormHeader: React.FC<ProductFormHeaderProps> = ({ isEditMode = false }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => navigate("/inventory/products")}
        className="mb-6 gap-2"
      >
        <ArrowRight size={16} />
        العودة إلى المنتجات
      </Button>

      <CardHeader className="bg-gray-50">
        <CardTitle className="text-xl">
          {isEditMode ? "تعديل المنتج" : "إضافة منتج جديد"}
        </CardTitle>
      </CardHeader>
    </>
  );
};
