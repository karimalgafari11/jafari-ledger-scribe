
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/types/inventory";
import { SearchHeader } from "./product-search/SearchHeader";
import { ProductGridView } from "./product-search/ProductGridView";
import { ProductTableView } from "./product-search/ProductTableView";
import { SearchFooter } from "./product-search/SearchFooter";
import { useProductSearch } from "./product-search/useProductSearch";

interface QuickProductSearchProps {
  onClose: () => void;
  onSelect: (product: Product) => void;
}

export const QuickProductSearch: React.FC<QuickProductSearchProps> = ({
  onClose,
  onSelect
}) => {
  const {
    searchTerm,
    setSearchTerm,
    filteredProducts,
    selectedProductId,
    setSelectedProductId,
    viewMode,
    setViewMode,
    searchInputRef,
    getStockLevelClass
  } = useProductSearch();
  
  const handleSelect = (product: Product) => {
    setSelectedProductId(product.id);
    onSelect(product);
  };

  const handleAddSelected = () => {
    if (selectedProductId) {
      const product = filteredProducts.find(p => p.id === selectedProductId);
      if (product) {
        onSelect(product);
      }
    }
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">اختيار منتج من المخزون</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full overflow-hidden">
          <SearchHeader
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            viewMode={viewMode}
            setViewMode={setViewMode}
            searchInputRef={searchInputRef}
          />

          <div className="flex-grow overflow-hidden border rounded-md">
            {viewMode === "grid" ? (
              <ProductGridView
                products={filteredProducts}
                selectedProductId={selectedProductId}
                handleSelect={handleSelect}
              />
            ) : (
              <ProductTableView
                products={filteredProducts}
                selectedProductId={selectedProductId}
                setSelectedProductId={setSelectedProductId}
                handleSelect={handleSelect}
                getStockLevelClass={getStockLevelClass}
              />
            )}
          </div>

          <SearchFooter
            productCount={filteredProducts.length}
            selectedProductId={selectedProductId}
            onClose={onClose}
            handleAddSelected={handleAddSelected}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
