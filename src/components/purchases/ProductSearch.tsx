
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/inventory";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { Search } from "lucide-react";

interface ProductSearchProps {
  onSelect: (product: Product) => void;
  placeholder?: string;
  autoFocus?: boolean;
  defaultValue?: string;
  className?: string;
  inline?: boolean;
  showIcon?: boolean;
  maxResults?: number;
}

export const ProductSearch = forwardRef<HTMLInputElement, ProductSearchProps>(({
  onSelect,
  placeholder = "ابحث عن صنف...",
  autoFocus = false,
  defaultValue = "",
  className = "",
  inline = false,
  showIcon = true,
  maxResults = 8
}, ref) => {
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
      setResults(filteredProducts.slice(0, maxResults));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [searchQuery, products, maxResults]);

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
    setSearchQuery(""); // Clear the search input after selection
    setIsOpen(false);
  };

  return (
    <div className={`relative ${inline ? 'inline-block' : 'w-full'}`} ref={searchRef}>
      <div className="relative">
        <Input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus={autoFocus}
          className={`${showIcon ? 'pr-10' : ''} ${className}`}
        />
        {showIcon && (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
        )}
      </div>
      
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
});

ProductSearch.displayName = "ProductSearch";
