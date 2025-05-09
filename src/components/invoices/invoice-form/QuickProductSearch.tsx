
import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Grid3X3, List } from "lucide-react";
import { Product } from "@/types/inventory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGridView } from "@/components/purchases/product-search/ProductGridView";
import { ProductTableView } from "@/components/purchases/product-search/ProductTableView";
import { useProductSearch } from "@/hooks/sales/useProductSearch";

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
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
    
    if (initialQuery) {
      setSearchTerm(initialQuery);
    }
  }, [initialQuery]);
  
  // Handle product selection and close dialog
  const handleSelectProduct = (product: Product) => {
    onSelect(product);
    onClose();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && selectedProductId) {
      const selectedProduct = filteredProducts.find(p => p.id === selectedProductId);
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
  
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-3xl h-[80vh] flex flex-col p-0 gap-0" 
        onKeyDown={handleKeyDown}
      >
        <DialogHeader className="px-4 pt-4 pb-2 border-b flex-shrink-0">
          <DialogTitle className="text-xl">اختيار منتج للفاتورة</DialogTitle>
          
          <div className="relative mt-2">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder="ابحث عن المنتج بالاسم أو الكود..."
              className="pr-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          
          <div className="flex justify-between items-center mt-2">
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} منتج
            </div>
            <div className="flex gap-1">
              <Button 
                size="sm" 
                variant={viewMode === 'grid' ? "default" : "outline"} 
                className="h-8 w-8 p-0"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant={viewMode === 'table' ? "default" : "outline"} 
                className="h-8 w-8 p-0"
                onClick={() => setViewMode('table')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
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
        </div>
        
        <div className="border-t p-4 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            اختر منتج بالنقر المزدوج أو اضغط Enter
          </span>
          <Button variant="outline" onClick={onClose}>
            إلغاء
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
