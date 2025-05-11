
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types/inventory";
import { ActionDefinition } from "@/components/inventory/types";
import { Eye, Pencil, Trash2, FilePlus } from "lucide-react";
import { useProductActions } from "@/hooks/useProductActions";

export const useProductPageActions = (
  deleteProduct: (id: string) => void,
  bulkDeleteProducts: () => void,
  products: Product[]
) => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  
  // Use product actions hook
  const { 
    handleViewProduct, 
    handleDeleteProduct, 
    handleDuplicateProduct, 
    handleBulkDelete,
    handleAddProduct 
  } = useProductActions(
    deleteProduct, 
    setSelectedProduct, 
    setShowDetails
  );

  const actions: ActionDefinition[] = [
    {
      icon: <Eye className="h-4 w-4" />,
      label: "عرض",
      onClick: (product: Product) => handleViewProduct(product),
    },
    {
      icon: <Pencil className="h-4 w-4" />,
      label: "تعديل",
      onClick: (product: Product) => navigate(`/inventory/products/edit/${product.id}`),
    },
    {
      icon: <Trash2 className="h-4 w-4" />,
      label: "حذف",
      onClick: (product: Product) => handleDeleteProduct(product.id),
      variant: "destructive",
    },
    {
      icon: <FilePlus className="h-4 w-4" />,
      label: "نسخ",
      onClick: (product: Product) => handleDuplicateProduct(product),
    },
  ];

  const goToAddProduct = () => navigate("/inventory/products/add");

  return {
    showDetails, 
    setShowDetails,
    selectedProduct,
    setSelectedProduct,
    showExportDialog,
    setShowExportDialog,
    showShareDialog,
    setShowShareDialog,
    actions,
    handleBulkDelete,
    goToAddProduct
  };
};
