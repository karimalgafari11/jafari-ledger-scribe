
import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
    searchQuery, 
    setSearchQuery,
    filteredProducts,
    selectedCategories,
    toggleCategory,
    selectedProduct,
    setSelectedProduct,
    filterOptions,
    categories,
    viewType,
    setViewType,
    handleSearchChange,
    handleCategoryFilter
  } = useProductSearch(initialQuery);
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Focus search input on mount
  useEffect(() => {
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  }, []);
  
  // Handle product selection and close dialog
  const handleSelectProduct = (product: Product) => {
    onSelect(product);
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && selectedProduct) {
      handleSelectProduct(selectedProduct);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0" 
        onKeyDown={handleKeyDown}
      >
        <SearchHeader 
          searchQuery={searchQuery} 
          searchInputRef={searchInputRef} 
          handleSearchChange={handleSearchChange} 
          onClose={onClose} 
          viewType={viewType}
          setViewType={setViewType}
        />
        
        <Tabs defaultValue="products" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-4 justify-start">
            <TabsTrigger value="products">المنتجات ({filteredProducts.length})</TabsTrigger>
            <TabsTrigger value="categories">الفئات ({categories.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="flex-1 overflow-hidden m-0 p-0">
            {viewType === 'grid' ? (
              <ProductGridView 
                products={filteredProducts} 
                selectedProductId={selectedProduct?.id || null} 
                handleSelect={(product) => {
                  setSelectedProduct(product);
                  handleSelectProduct(product); // تعديل ليتم إضافة المنتج فور الاختيار
                }}
              />
            ) : (
              <ProductTableView 
                products={filteredProducts} 
                selectedProductId={selectedProduct?.id || null} 
                handleSelect={(product) => {
                  setSelectedProduct(product);
                  handleSelectProduct(product); // تعديل ليتم إضافة المنتج فور الاختيار
                }} 
              />
            )}
          </TabsContent>
          
          <TabsContent value="categories" className="flex-1 overflow-auto m-0 p-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                  className="justify-start h-auto py-2"
                  onClick={() => toggleCategory(category.id)}
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
          selectedProduct={selectedProduct} 
          onSelect={handleSelectProduct} 
          onCancel={onClose} 
        />
      </DialogContent>
    </Dialog>
  );
};
