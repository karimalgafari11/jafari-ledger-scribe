
import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Grid3X3, List } from "lucide-react";
import { Product } from "@/types/inventory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGridView } from "./product-search/ProductGridView";
import { ProductTableView } from "./product-search/ProductTableView";
import { SearchHeader } from "./product-search/SearchHeader";
import { SearchFooter } from "./product-search/SearchFooter";
import { useProductSearch } from "./product-search/useProductSearch";

interface QuickProductSearchProps {
  onClose: () => void;
  onSelect: (product: Product) => void;
  initialQuery?: string;
}

export const QuickProductSearch: React.FC<QuickProductSearchProps> = ({
  onClose,
  onSelect,
  initialQuery = ""
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
  
  // Focus search input on mount
  useEffect(() => {
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  }, []);
  
  // Handle product selection and close dialog
  const handleSelectProduct = (product: Product) => {
    onSelect(product);
    onClose();
  };

  // Find the currently selected product
  const getSelectedProduct = (): Product | undefined => {
    return filteredProducts.find(p => p.id === selectedProductId);
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      const selectedProduct = getSelectedProduct();
      if (selectedProduct) {
        e.preventDefault();
        handleSelectProduct(selectedProduct);
      }
    } else if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      // Navigate through products with arrow keys
      e.preventDefault();
      const currentIndex = filteredProducts.findIndex(p => p.id === selectedProductId);
      
      if (currentIndex === -1) {
        // If no product is selected, select the first one
        if (filteredProducts.length > 0) {
          setSelectedProductId(filteredProducts[0].id);
        }
        return;
      }
      
      let newIndex;
      if (e.key === 'ArrowDown') {
        newIndex = (currentIndex + 1) % filteredProducts.length;
      } else {
        newIndex = (currentIndex - 1 + filteredProducts.length) % filteredProducts.length;
      }
      
      setSelectedProductId(filteredProducts[newIndex].id);
    }
  };

  // This is a mock since these weren't in useProductSearch - will only be used for UI rendering
  const categories = [];
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0" 
        onKeyDown={handleKeyDown}
      >
        <DialogTitle className="sr-only">البحث عن المنتجات</DialogTitle>
        <SearchHeader 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchInputRef={searchInputRef}
        />
        
        <Tabs defaultValue="products" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-4 justify-start">
            <TabsTrigger value="products">المنتجات ({filteredProducts.length})</TabsTrigger>
            <TabsTrigger value="categories">الفئات ({categories.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="flex-1 overflow-hidden m-0 p-0">
            {viewMode === 'grid' ? (
              <ProductGridView 
                products={filteredProducts} 
                selectedProductId={selectedProductId} 
                handleSelect={handleSelectProduct}
              />
            ) : (
              <ProductTableView 
                products={filteredProducts} 
                selectedProductId={selectedProductId}
                setSelectedProductId={setSelectedProductId}
                handleSelect={handleSelectProduct}
                getStockLevelClass={getStockLevelClass}
              />
            )}
          </TabsContent>
          
          <TabsContent value="categories" className="flex-1 overflow-auto m-0 p-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={category.selected ? "default" : "outline"}
                  className="justify-start h-auto py-2"
                  onClick={() => {}}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${category.color}`}></div>
                    <span>{category.name} ({category.count})</span>
                  </div>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <SearchFooter 
          productCount={filteredProducts.length}
          selectedProductId={selectedProductId}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
