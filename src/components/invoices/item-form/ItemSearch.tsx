
import React, { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/inventory";

interface ItemSearchProps {
  products: Product[];
  onSelectProduct: (productId: string) => void;
  selectedProductId: string;
}

export const ItemSearch: React.FC<ItemSearchProps> = ({
  products,
  onSelectProduct,
  selectedProductId
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [directCode, setDirectCode] = useState("");
  const [directName, setDirectName] = useState("");

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const term = searchTerm.toLowerCase().trim();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.code.toLowerCase().includes(term) ||
        product.category?.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  // Handle direct code input
  useEffect(() => {
    if (directCode) {
      const foundProduct = products.find(p => 
        p.code.toLowerCase() === directCode.toLowerCase().trim()
      );
      if (foundProduct) {
        onSelectProduct(foundProduct.id);
      }
    }
  }, [directCode, products, onSelectProduct]);

  // Handle direct name input
  useEffect(() => {
    if (directName) {
      const foundProduct = products.find(p => 
        p.name.toLowerCase() === directName.toLowerCase().trim()
      );
      if (foundProduct) {
        onSelectProduct(foundProduct.id);
      }
    }
  }, [directName, products, onSelectProduct]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="mb-2">
        <label htmlFor="search" className="block text-xs font-medium mb-0.5">البحث عن المنتج</label>
        <SearchBar 
          placeholder="ابحث بالاسم أو رقم الصنف أو الفئة" 
          onChange={handleSearch}
          className="text-sm h-7" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div>
          <label htmlFor="itemCode" className="block text-xs font-medium mb-0.5">رمز الصنف</label>
          <Input
            id="itemCode"
            value={directCode}
            onChange={(e) => setDirectCode(e.target.value)}
            className="h-7 text-sm"
            placeholder="أدخل رمز الصنف"
          />
        </div>
        
        <div className="md:col-span-2">
          <label htmlFor="itemName" className="block text-xs font-medium mb-0.5">اسم الصنف</label>
          <Input
            id="itemName"
            value={directName}
            onChange={(e) => setDirectName(e.target.value)}
            className="h-7 text-sm"
            placeholder="أدخل اسم الصنف"
          />
        </div>

        <div className="md:col-span-3">
          <label htmlFor="product" className="block text-xs font-medium mb-0.5">اختر من القائمة</label>
          <Select
            value={selectedProductId}
            onValueChange={onSelectProduct}
          >
            <SelectTrigger className="h-7 text-sm">
              <SelectValue placeholder="اختر منتج" />
            </SelectTrigger>
            <SelectContent className="max-h-[200px]">
              {filteredProducts.length === 0 ? (
                <div className="p-2 text-center text-xs text-gray-500">لا توجد منتجات مطابقة</div>
              ) : (
                filteredProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id} className="text-sm">
                    {product.code} - {product.name} ({product.price} ر.س)
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
};
