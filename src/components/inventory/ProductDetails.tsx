
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/inventory";
import { useNavigate } from "react-router-dom";

interface ProductDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({
  open,
  onOpenChange,
  product,
}) => {
  const navigate = useNavigate();

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">تفاصيل المنتج</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-muted-foreground">اسم المنتج</h3>
              <p className="text-lg">{product.name}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground">رمز المنتج</h3>
              <p className="text-lg">{product.code}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground">الشركة الصانعة</h3>
              <p>{product.brand || "غير محدد"}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground">المقاس</h3>
              <p>{product.size || "غير محدد"}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground">الوصف</h3>
              <p>{product.description || "لا يوجد وصف"}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-muted-foreground">سعر البيع</h3>
              <p className="text-lg font-medium">{product.price?.toFixed(2) || "غير محدد"} ر.س</p>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground">سعر التكلفة</h3>
              <p>{product.costPrice?.toFixed(2) || "غير محدد"} ر.س</p>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground">الكمية المتوفرة</h3>
              <p className={`font-medium ${product.quantity <= 5 ? 'text-red-600' : ''}`}>
                {product.quantity}
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground">التصنيف</h3>
              <p>{product.category || "غير مصنف"}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground">الباركود</h3>
              <p>{product.barcode || "غير محدد"}</p>
            </div>
          </div>
          
          <div className="md:col-span-2 flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => navigate(`/inventory/products/edit/${product.id}`)}
            >
              تعديل المنتج
            </Button>
            <Button onClick={() => onOpenChange(false)}>إغلاق</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
