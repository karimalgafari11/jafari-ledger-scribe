
import React, { useState, useEffect, useRef, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/inventory";
import { Search } from "lucide-react";
import { debounce } from "lodash";
import { mockProducts } from "@/data/mockProducts"; // استخدام البيانات المزيفة للعرض التجريبي

interface ProductSearchProps {
  onSelect: (product: Product) => void;
  placeholder?: string;
  autoFocus?: boolean;
  defaultValue?: string;
  className?: string;
  showIcon?: boolean;
  maxResults?: number;
}

export const ProductSearch = forwardRef<HTMLInputElement, ProductSearchProps>(({
  onSelect,
  placeholder = "ابحث عن صنف...",
  autoFocus = false,
  defaultValue = "",
  className = "",
  showIcon = true,
  maxResults = 5
}, ref) => {
  const [products] = useState<Product[]>(mockProducts || []);
  const [searchQuery, setSearchQuery] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Merge the refs to support autoFocus
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(inputRef.current);
      } else {
        ref.current = inputRef.current;
      }
    }
  }, [ref]);

  // Focus the input when active
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          console.log("Auto-focusing search input");
        }
      }, 50);
    }
  }, [autoFocus]);

  // Filter products using debounce
  const filterProducts = React.useCallback(
    debounce((query: string) => {
      if (query.trim().length > 0) {
        const filteredProducts = products.filter(
          product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            String(product.code).toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredProducts.slice(0, maxResults));
        setIsOpen(true);
        console.log("Search results:", filteredProducts.length);
      } else {
        // If no search query, don't show results
        setResults([]);
        setIsOpen(false);
      }
      setSelectedIndex(-1);
    }, 150),
    [products, maxResults]
  );

  // Update search results when query changes
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      filterProducts(searchQuery);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [searchQuery, filterProducts]);

  // Show results when input is focused
  const handleFocus = () => {
    if (searchQuery.trim() !== '') {
      setIsOpen(true);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && searchQuery.trim() !== '') {
      setIsOpen(true);
      return;
    }
    
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
        } else if (results.length > 0) {
          // Select first result if none selected
          handleSelect(results[0]);
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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (product: Product) => {
    onSelect(product);
    setSearchQuery(""); // Clear the search input after selection
    setIsOpen(false);
    console.log("Product selected:", product.name);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          className={`${showIcon ? 'pr-10' : ''} ${className}`}
        />
        {showIcon && (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
        )}
      </div>
      
      {isOpen && results.length > 0 && (
        <div 
          className="absolute z-[1001] mt-1 w-full bg-white border-2 border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
          ref={resultsRef}
        >
          {results.map((product, index) => (
            <div
              key={product.id}
              className={`px-4 py-2 hover:bg-blue-50 cursor-pointer flex justify-between ${selectedIndex === index ? 'bg-blue-100' : ''}`}
              onClick={() => handleSelect(product)}
              onMouseEnter={() => setSelectedIndex(index)}
            >
              <div>
                <div className="font-medium">{product.name}</div>
                <div className="text-xs text-gray-500">{product.code}</div>
              </div>
              <div className="text-sm text-gray-700">{product.price} ريال</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

ProductSearch.displayName = "ProductSearch";
