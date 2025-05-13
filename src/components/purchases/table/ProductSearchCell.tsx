
import React, { useState, useEffect, useRef } from "react";
import { Product } from "@/types/inventory";

// Mock products for testing
const mockProducts = [
  { id: "p1", code: "PR001", name: "شاشة كمبيوتر 24 بوصة", price: 850, quantity: 30, unit: "قطعة" },
  { id: "p2", code: "PR002", name: "لوحة مفاتيح لاسلكية", price: 120, quantity: 45, unit: "قطعة" },
  { id: "p3", code: "PR003", name: "ماوس لاسلكي", price: 80, quantity: 50, unit: "قطعة" },
  { id: "p4", code: "PR004", name: "سماعات رأس مع ميكروفون", price: 200, quantity: 25, unit: "قطعة" },
  { id: "p5", code: "PR005", name: "كامرة ويب HD", price: 150, quantity: 20, unit: "قطعة" }
];

interface ProductSearchCellProps {
  value: string;
  code?: string;
  isActive: boolean;
  onActivate: () => void;
  onProductSelect: (product: Product) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  className?: string;
}

export const ProductSearchCell: React.FC<ProductSearchCellProps> = ({
  value,
  code,
  isActive,
  onActivate,
  onProductSelect,
  inputRef,
  className = ""
}) => {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<Product[]>([]);
  const localRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  
  // Focus input when cell becomes active
  useEffect(() => {
    if (isActive) {
      const input = inputRef?.current || localRef.current;
      if (input) {
        input.focus();
        input.select();
      }
    }
  }, [isActive, inputRef]);
  
  // Search for products when query changes
  useEffect(() => {
    if (isActive && query.trim()) {
      const filtered = mockProducts.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.code.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 5));
    } else {
      setResults([]);
    }
  }, [query, isActive]);
  
  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && results.length > 0) {
      onProductSelect(results[0]);
    }
  };
  
  // When a product is selected
  const handleSelect = (product: Product) => {
    onProductSelect(product);
  };
  
  // Display search interface or static value
  if (isActive) {
    return (
      <div className="relative">
        <input
          ref={inputRef || localRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full border-0 p-0 focus:ring-0 focus:outline-none"
          placeholder="ابحث عن منتج..."
        />
        
        {results.length > 0 && (
          <div 
            ref={resultsRef}
            className="absolute z-30 mt-1 w-64 bg-white border border-gray-300 shadow-lg rounded-md max-h-60 overflow-auto right-0 search-results"
          >
            <ul className="py-1">
              {results.map((product) => (
                <li
                  key={product.id}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSelect(product)}
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{product.name}</span>
                    <div className="flex text-sm text-gray-600 justify-between">
                      <span>كود: {product.code}</span>
                      <span>السعر: {product.price}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  
  // Display product name and code when not active
  return (
    <div onClick={onActivate} className={`cursor-pointer ${className}`}>
      <div className="font-medium">{value || "انقر للبحث..."}</div>
      {code && <div className="text-xs text-gray-500">كود: {code}</div>}
    </div>
  );
};
