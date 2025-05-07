
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockProducts } from "@/data/mockProducts";
import { SearchIcon } from "lucide-react";

interface QuickProductSearchProps {
  onClose: () => void;
  onSelect: (product: any) => void;
}

export const QuickProductSearch: React.FC<QuickProductSearchProps> = ({
  onClose,
  onSelect
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(mockProducts);
    } else {
      const term = searchTerm.toLowerCase().trim();
      const filtered = mockProducts.filter(
        product => 
          product.name.toLowerCase().includes(term) ||
          product.code.toLowerCase().includes(term) ||
          (product.category && product.category.toLowerCase().includes(term))
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm]);

  const handleSelect = (product: any) => {
    onSelect(product);
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>إضافة منتج للفاتورة</DialogTitle>
        </DialogHeader>

        <div className="relative mb-4">
          <Input
            type="text"
            placeholder="ابحث عن منتج بالاسم أو الرمز..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 h-10"
            autoFocus
          />
          <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>

        <ScrollArea className="max-h-[400px] overflow-y-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              لا توجد منتجات مطابقة للبحث
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {filteredProducts.map((product) => (
                <Button
                  key={product.id}
                  variant="outline"
                  className="h-auto py-3 px-4 justify-between flex flex-row items-start text-right"
                  onClick={() => handleSelect(product)}
                >
                  <div className="flex flex-col items-start">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md">{product.code}</span>
                    {product.category && (
                      <span className="text-xs text-gray-500 mt-1">{product.category}</span>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-sm font-bold">{product.price.toFixed(2)} ر.س</span>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
