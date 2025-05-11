
import React from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Save, Trash2, ArrowRight, ArrowLeft } from "lucide-react";

interface ProductFormActionsProps {
  isSubmitting?: boolean;
  onDelete?: () => void;
  onNextProduct?: () => void;
  onPreviousProduct?: () => void;
  showDeleteButton?: boolean;
  showNavigationButtons?: boolean;
}

export const ProductFormActions: React.FC<ProductFormActionsProps> = ({
  isSubmitting = false,
  onDelete,
  onNextProduct,
  onPreviousProduct,
  showDeleteButton = false,
  showNavigationButtons = true
}) => {
  const navigate = useNavigate();
  
  return (
    <CardFooter className="flex flex-wrap justify-between border-t pt-6 px-0 gap-2">
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/inventory/products")}
        >
          إلغاء
        </Button>
        
        {showDeleteButton && (
          <Button 
            type="button"
            variant="destructive"
            className="gap-2"
            onClick={onDelete}
          >
            <Trash2 size={16} />
            حذف المنتج
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        {showNavigationButtons && (
          <>
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={onPreviousProduct}
            >
              <ArrowLeft size={16} />
              المنتج السابق
            </Button>
            
            <Button
              type="button"
              variant="outline"
              className="gap-2"
              onClick={onNextProduct}
            >
              المنتج التالي
              <ArrowRight size={16} />
            </Button>
          </>
        )}
        
        <Button 
          type="submit" 
          className="gap-2"
          disabled={isSubmitting}
        >
          <Save size={16} />
          حفظ المنتج
        </Button>
      </div>
    </CardFooter>
  );
};
