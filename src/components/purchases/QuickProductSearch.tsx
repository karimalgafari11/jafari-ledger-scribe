
import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Grid3X3, List } from "lucide-react";
import { Product } from "@/types/inventory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockProducts } from "@/data/mockProducts";
import { useProductSearch } from "@/hooks/sales/useProductSearch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";

interface ProductGridViewProps {
  products: Product[];
  selectedProductId: string | null;
  handleSelect: (product: Product) => void;
}

const ProductGridView: React.FC<ProductGridViewProps> = ({ 
  products, 
  selectedProductId, 
  handleSelect 
}) => {
  return (
    <ScrollArea className="h-[60vh] w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        {products.map((product) => (
          <div
            key={product.id}
            className={`rounded-lg border overflow-hidden cursor-pointer transition-all hover:shadow-md ${
              selectedProductId === product.id ? 'ring-2 ring-blue-500 shadow-md' : ''
            }`}
            onClick={() => handleSelect(product)}
            onDoubleClick={() => handleSelect(product)}
          >
            <div className="aspect-square relative bg-gray-100">
              {product.imageUrl ? (
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>{product.name.substring(0, 2).toUpperCase()}</span>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {product.code}
              </div>
              {product.quantity <= 0 && (
                <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-xs text-center py-1">
                  غير متوفر
                </div>
              )}
            </div>
            <div className="p-3">
              <div className="font-medium text-sm truncate">{product.name}</div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm font-bold">{formatCurrency(product.price)}</span>
                <span className="text-xs bg-gray-100 px-1 py-0.5 rounded">
                  {product.quantity > 0 ? product.quantity : 'نفذ'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

interface ProductTableViewProps {
  products: Product[];
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  handleSelect: (product: Product) => void;
  getStockLevelClass: (quantity?: number) => string;
}

const ProductTableView: React.FC<ProductTableViewProps> = ({ 
  products, 
  selectedProductId, 
  setSelectedProductId,
  handleSelect,
  getStockLevelClass
}) => {
  return (
    <ScrollArea className="h-[60vh] w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">الرمز</TableHead>
            <TableHead>المنتج</TableHead>
            <TableHead className="text-left">السعر</TableHead>
            <TableHead className="text-center">المخزون</TableHead>
            <TableHead className="w-[80px] text-center">الفئة</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              className={`cursor-pointer ${selectedProductId === product.id ? 'bg-blue-50' : ''}`}
              onClick={() => setSelectedProductId(product.id)}
              onDoubleClick={() => handleSelect(product)}
            >
              <TableCell className="font-medium">{product.code}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="text-left">{formatCurrency(product.price)}</TableCell>
              <TableCell className="text-center">
                <span className={getStockLevelClass(product.quantity)}>
                  {product.quantity}
                </span>
              </TableCell>
              <TableCell className="text-center">
                <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {product.category || '-'}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

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
        className="max-w-4xl h-[80vh] flex flex-col p-0 gap-0" 
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
