
import React from "react";
import { ProductsToolbar } from "@/components/inventory/ProductsToolbar";
import { FilterOptions } from "@/types/inventory";

interface ProductToolbarSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  selectedProducts: string[];
  handleBulkDelete: (selectedProducts: string[], bulkDeleteProducts: () => void) => void;
  bulkDeleteProducts: () => void;
  setShowExportDialog: (show: boolean) => void;
  setShowShareDialog: (show: boolean) => void;
  goToAddProduct: () => void;
}

export const ProductToolbarSection: React.FC<ProductToolbarSectionProps> = ({
  searchQuery,
  setSearchQuery,
  filterOptions,
  setFilterOptions,
  selectedProducts,
  handleBulkDelete,
  bulkDeleteProducts,
  setShowExportDialog,
  setShowShareDialog,
  goToAddProduct,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <ProductsToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        selectedCount={selectedProducts.length}
        onBulkDelete={() => handleBulkDelete(selectedProducts, bulkDeleteProducts)}
        onExport={() => setShowExportDialog(true)}
        onShare={() => setShowShareDialog(true)}
        onAddProduct={goToAddProduct}
      />
    </div>
  );
};
