
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SearchFooterProps {
  productCount: number;
  selectedProductId: string | null;
  onClose: () => void;
  handleAddSelected: () => void;
}

export const SearchFooter: React.FC<SearchFooterProps> = ({
  productCount,
  selectedProductId,
  onClose,
  handleAddSelected
}) => {
  return (
    <div className="flex justify-between mt-4 pt-2 border-t">
      <div className="text-sm text-muted-foreground">
        {productCount} من المنتجات
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onClose}>
          إلغاء
        </Button>
        <Button 
          onClick={handleAddSelected} 
          disabled={!selectedProductId}
        >
          <Plus className="h-4 w-4 ml-2" />
          إضافة المنتج
        </Button>
      </div>
    </div>
  );
};
