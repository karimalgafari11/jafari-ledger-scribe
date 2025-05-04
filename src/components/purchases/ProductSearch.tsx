
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/inventory";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { Search } from "lucide-react";
import { debounce } from "lodash";

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
  maxResults = 5
}, ref) => {
  const { products } = useInventoryProducts();
  const [searchQuery, setSearchQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Focus the input when autoFocus is true
  useEffect(() => {
    if (autoFocus && ref && 'current' in ref && ref.current) {
      ref.current.focus();
      console.log("Auto-focusing search input");
    }
  }, [autoFocus, ref]);

  // Filter products using debounce
  const filterProducts = React.useCallback(
    debounce((query: string) => {
      if (query.trim().length > 0) {
        const filteredProducts = products.filter(
          product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.code.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredProducts.slice(0, maxResults));
        setIsOpen(true);
        console.log("Search results:", filteredProducts.length);
      } else {
        // If no search query, show some recent or common products
        setResults(products.slice(0, maxResults));
        setIsOpen(products.length > 0);
      }
      setSelectedIndex(-1);
    }, 150),
    [products, maxResults]
  );

  useEffect(() => {
    filterProducts(searchQuery);
  }, [searchQuery, filterProducts]);

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

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          handleSelect(results[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && selectedIndex >= 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex]);

  const handleSelect = (product: Product) => {
    onSelect(product);
    setSearchQuery(""); // Clear the search input after selection
    setIsOpen(false);
    console.log("Product selected from dropdown:", product.name);
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
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          className={`${showIcon ? 'pr-10' : ''} ${className}`}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
        />
        {showIcon && (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
        )}
      </div>
      
      {isOpen && (
        <div 
          className="absolute z-[1000] mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          ref={resultsRef}
        >
          {results.length > 0 ? (
            results.map((product, index) => (
              <div
                key={product.id}
                className={`px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between ${selectedIndex === index ? 'bg-blue-50' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(product);
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.code}</div>
                </div>
                <div className="text-sm">{product.price} ريال</div>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-center text-gray-500">
              لا توجد نتائج مطابقة
            </div>
          )}
        </div>
      )}
    </div>
  );
});

ProductSearch.displayName = "ProductSearch";
