
import React, { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

  // Filter products based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(products);
    } else {
      const term = searchTerm.toLowerCase().trim();
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.code.toLowerCase().includes(term)
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium mb-1">البحث عن المنتج</label>
        <SearchBar 
          placeholder="ابحث بالاسم أو رقم الصنف" 
          onChange={handleSearch} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="product" className="block text-sm font-medium mb-1">المنتج</label>
          <Select
            value={selectedProductId}
            onValueChange={onSelectProduct}
          >
            <SelectTrigger>
              <SelectValue placeholder="اختر منتج" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {filteredProducts.length === 0 ? (
                <div className="p-2 text-center text-sm text-gray-500">لا توجد منتجات مطابقة</div>
              ) : (
                filteredProducts.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.code} - {product.name}
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
