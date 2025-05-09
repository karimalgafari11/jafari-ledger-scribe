
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockProducts } from "@/data/mockProducts";
import { Search, Plus, X } from "lucide-react";
import { Product } from "@/types/inventory";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";

interface QuickProductSearchProps {
  onClose: () => void;
  onSelect: (product: Product) => void;
}

export const QuickProductSearch: React.FC<QuickProductSearchProps> = ({
  onClose,
  onSelect
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, searchQuery, setSearchQuery } = useInventoryProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Update filtered products when search term changes
  useEffect(() => {
    setSearchQuery(searchTerm);
  }, [searchTerm, setSearchQuery]);

  // Update filtered products when products or search query change
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products.slice(0, 50)); // Show first 50 products by default
    } else {
      const term = searchTerm.toLowerCase().trim();
      const filtered = products.filter(
        product => 
          product.name.toLowerCase().includes(term) ||
          product.code.toLowerCase().includes(term) ||
          (product.category && product.category.toLowerCase().includes(term))
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchTerm]);

  const handleSelect = (product: Product) => {
    setSelectedProductId(product.id);
    onSelect(product);
  };

  const handleAddSelected = () => {
    if (selectedProductId) {
      const product = products.find(p => p.id === selectedProductId);
      if (product) {
        onSelect(product);
      }
    }
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">اختيار منتج من المخزون</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن منتج بالاسم أو الرمز..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
              autoFocus
            />
            {searchTerm && (
              <Button variant="ghost" size="icon" onClick={() => setSearchTerm("")}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="flex-grow overflow-hidden border rounded-md">
            <ScrollArea className="h-[50vh]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-2">
                {filteredProducts.length === 0 ? (
                  <div className="col-span-2 text-center py-12 text-gray-500">
                    لا توجد منتجات مطابقة للبحث
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <Button
                      key={product.id}
                      variant={selectedProductId === product.id ? "default" : "outline"}
                      className={`h-auto py-3 px-4 flex flex-col items-stretch text-right justify-between ${
                        selectedProductId === product.id ? "bg-primary text-primary-foreground" : ""
                      }`}
                      onClick={() => handleSelect(product)}
                    >
                      <div className="flex justify-between w-full mb-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">
                          {product.code}
                        </span>
                        {product.quantity !== undefined && (
                          <span className={`text-xs px-2 py-0.5 rounded-md ${
                            product.quantity > 0 
                              ? "bg-green-100 text-green-800" 
                              : "bg-red-100 text-red-800"
                          }`}>
                            {product.quantity > 0 ? `متوفر: ${product.quantity}` : "غير متوفر"}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-start w-full">
                        <span className="font-medium text-right w-full">{product.name}</span>
                        <div className="flex justify-between w-full mt-1">
                          <span className="text-sm">{product.category || ""}</span>
                          <span className="text-sm font-bold">{product.price?.toFixed(2)} ر.س</span>
                        </div>
                      </div>
                    </Button>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          <div className="flex justify-between mt-4 pt-2 border-t">
            <Button variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button 
              onClick={handleAddSelected} 
              disabled={!selectedProductId}
            >
              <Plus className="h-4 w-4 ml-2" />
              إضافة المنتج
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
