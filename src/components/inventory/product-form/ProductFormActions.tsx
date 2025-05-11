
import React from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";

interface ProductFormActionsProps {
  isSubmitting?: boolean;
}

export const ProductFormActions: React.FC<ProductFormActionsProps> = ({
  isSubmitting = false
}) => {
  const navigate = useNavigate();
  
  return (
    <CardFooter className="flex justify-between border-t pt-6 px-0">
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate("/inventory/products")}
      >
        إلغاء
      </Button>
      <Button 
        type="submit" 
        className="gap-2"
        disabled={isSubmitting}
      >
        <Save size={16} />
        حفظ المنتج
      </Button>
    </CardFooter>
  );
};
