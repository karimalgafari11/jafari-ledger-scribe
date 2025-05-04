
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/inventory";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";

interface ProductSearchProps {
  onSelect: (product: Product) => void;
  placeholder?: string;
  autoFocus?: boolean;
  defaultValue?: string;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  onSelect,
  placeholder = "ابحث عن صنف...",
  autoFocus = false,
  defaultValue = ""
}) => {
  const { products } = useInventoryProducts();
  const [searchQuery, setSearchQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Filter products based on search query
    if (searchQuery.trim().length > 0) {
      const filteredProducts = products.filter(
        product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filteredProducts.slice(0, 8)); // Limit to 8 results
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [searchQuery, products]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (product: Product) => {
    onSelect(product);
    setSearchQuery(product.name);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={searchRef}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoFocus={autoFocus}
        className="w-full"
      />
      
      {isOpen && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          {results.map((product) => (
            <div
              key={product.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between"
              onClick={() => handleSelect(product)}
            >
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-xs text-gray-500">{product.code}</div>
              </div>
              <div className="text-sm">{product.price} ريال</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
