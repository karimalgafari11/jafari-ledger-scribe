
import React from "react";
import { Button } from "@/components/ui/button";

interface SearchFooterProps {
  productCount: number;
  selectedProductId: string | null;
  onClose: () => void;
}

export const SearchFooter: React.FC<SearchFooterProps> = ({
  productCount,
  selectedProductId,
  onClose,
}) => {
  return (
    <div className="flex justify-between mt-4 pt-2 border-t px-4 pb-4">
      <div className="text-sm text-muted-foreground">
        {productCount} من المنتجات{selectedProductId ? " (اضغط Enter لإضافة المنتج المحدد)" : ""}
      </div>
      <Button variant="outline" onClick={onClose}>
        إلغاء
      </Button>
    </div>
  );
};
