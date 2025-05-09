
import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, X, Grid3X3, List } from "lucide-react";
import { Product } from "@/types/inventory";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Focus search input when dialog opens
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

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
          (product.category && product.category.toLowerCase().includes(term)) ||
          (product.barcode && product.barcode.toLowerCase().includes(term))
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

  // Get stock level indicator class
  const getStockLevelClass = (quantity?: number) => {
    if (!quantity && quantity !== 0) return "";
    if (quantity <= 0) return "text-red-700 font-bold";
    if (quantity < 5) return "text-orange-500 font-bold";
    return "text-green-600";
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">اختيار منتج من المخزون</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col h-full overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="ابحث عن منتج بالاسم أو الرمز أو الباركود..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
              autoFocus
              ref={searchInputRef}
            />
            {searchTerm && (
              <Button variant="ghost" size="icon" onClick={() => setSearchTerm("")}>
                <X className="h-4 w-4" />
              </Button>
            )}
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-blue-100" : ""}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={() => setViewMode("table")}
              className={viewMode === "table" ? "bg-blue-100" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-grow overflow-hidden border rounded-md">
            <ScrollArea className="h-[60vh]">
              {viewMode === "grid" ? (
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
                            <span className="text-sm">{product.unit || ""}</span>
                            <span className="text-sm font-bold">{product.price?.toFixed(2)} ر.س</span>
                          </div>
                          {product.sku && (
                            <div className="w-full text-right mt-1">
                              <span className="text-xs text-gray-500">المقاس: {product.sku}</span>
                            </div>
                          )}
                        </div>
                      </Button>
                    ))
                  )}
                </div>
              ) : (
                <Table className="min-w-full border-collapse">
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead className="border text-center font-bold w-16">رقم</TableHead>
                      <TableHead className="border text-center font-bold">رقم الصنف</TableHead>
                      <TableHead className="border text-center font-bold">اسم المنتج</TableHead>
                      <TableHead className="border text-center font-bold">الكمية المتاحة</TableHead>
                      <TableHead className="border text-center font-bold">سعر البيع</TableHead>
                      <TableHead className="border text-center font-bold">المقاس</TableHead>
                      <TableHead className="border text-center font-bold">الوحدة</TableHead>
                      <TableHead className="border text-center font-bold w-20">إضافة</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          لا توجد منتجات مطابقة للبحث
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product, index) => (
                        <TableRow 
                          key={product.id}
                          className={`hover:bg-muted/50 cursor-pointer ${selectedProductId === product.id ? 'bg-blue-50' : ''}`}
                          onClick={() => setSelectedProductId(product.id)}
                        >
                          <TableCell className="border text-center font-medium">{index + 1}</TableCell>
                          <TableCell className="border text-center">{product.code}</TableCell>
                          <TableCell className="border">
                            <div>
                              <div className="font-medium">{product.name}</div>
                              {product.barcode && (
                                <div className="text-xs text-gray-500">باركود: {product.barcode}</div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className={`border text-center ${getStockLevelClass(product.quantity)}`}>
                            {product.quantity !== undefined ? product.quantity : "-"}
                          </TableCell>
                          <TableCell className="border text-center font-medium">
                            {product.price?.toFixed(2)} ر.س
                          </TableCell>
                          <TableCell className="border text-center">
                            {product.sku || "-"}
                          </TableCell>
                          <TableCell className="border text-center">
                            {product.unit || "قطعة"}
                          </TableCell>
                          <TableCell className="border text-center">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSelect(product);
                              }}
                            >
                              <Plus className="h-4 w-4 ml-1" />
                              إضافة
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              )}
            </ScrollArea>
          </div>

          <div className="flex justify-between mt-4 pt-2 border-t">
            <div className="text-sm text-muted-foreground">
              {filteredProducts.length} من المنتجات
            </div>
            <div className="flex gap-2">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};
