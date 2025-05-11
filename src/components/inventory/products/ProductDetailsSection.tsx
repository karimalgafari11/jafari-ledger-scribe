
import React from "react";
import { ProductDetails } from "@/components/inventory/ProductDetails";
import { ProductExportDialog } from "@/components/inventory/ProductExportDialog";
import { ProductShareDialog } from "@/components/inventory/ProductShareDialog";
import { Product } from "@/types/inventory";

interface ProductDetailsSectionProps {
  showDetails: boolean;
  setShowDetails: (show: boolean) => void;
  selectedProduct: Product | null;
  showExportDialog: boolean;
  setShowExportDialog: (show: boolean) => void;
  showShareDialog: boolean;
  setShowShareDialog: (show: boolean) => void;
  products: Product[];
  selectedProducts: string[];
  defaultColumns: any[];
  visibleColumns: string[];
}

export const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({
  showDetails,
  setShowDetails,
  selectedProduct,
  showExportDialog,
  setShowExportDialog,
  showShareDialog,
  setShowShareDialog,
  products,
  selectedProducts,
  defaultColumns,
  visibleColumns,
}) => {
  return (
    <>
      {/* Product Details Dialog */}
      <ProductDetails 
        open={showDetails}
        onOpenChange={setShowDetails}
        product={selectedProduct}
      />

      {/* Export Dialog */}
      <ProductExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        products={products}
        selectedProducts={selectedProducts}
        columns={defaultColumns}
        visibleColumns={visibleColumns}
      />

      {/* Share Dialog */}
      <ProductShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        data={products}
        selectedProducts={selectedProducts}
      />
    </>
  );
};
