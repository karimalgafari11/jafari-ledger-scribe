
import { useNavigate } from "react-router-dom";
import { Product } from "@/types/inventory";
import { toast } from "sonner";

export const useProductActions = (
  deleteProduct: (id: string) => void,
  setSelectedProduct: (product: Product) => void,
  setShowDetails: (show: boolean) => void
) => {
  const navigate = useNavigate();

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    toast.success("تم حذف المنتج بنجاح");
  };

  const handleDuplicateProduct = (product: Product) => {
    navigate(`/inventory/products/duplicate/${product.id}`);
    toast.success("تم نسخ المنتج، يمكنك الآن تعديل النسخة الجديدة");
  };

  const handleBulkDelete = (selectedProducts: string[], bulkDeleteProducts: () => void) => {
    if (selectedProducts.length === 0) {
      toast.error("الرجاء تحديد المنتجات المراد حذفها أولاً");
      return;
    }

    bulkDeleteProducts();
    toast.success(`تم حذف ${selectedProducts.length} منتج بنجاح`);
  };

  return {
    handleViewProduct,
    handleDeleteProduct,
    handleDuplicateProduct,
    handleBulkDelete
  };
};
