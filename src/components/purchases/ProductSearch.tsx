
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Product } from "@/types/inventory";

// Mock products data for testing
const mockProducts = [
  { id: "p1", code: "PR001", name: "شاشة كمبيوتر 24 بوصة", price: 850, quantity: 30, unit: "قطعة" },
  { id: "p2", code: "PR002", name: "لوحة مفاتيح لاسلكية", price: 120, quantity: 45, unit: "قطعة" },
  { id: "p3", code: "PR003", name: "ماوس لاسلكي", price: 80, quantity: 50, unit: "قطعة" },
  { id: "p4", code: "PR004", name: "سماعات رأس مع ميكروفون", price: 200, quantity: 25, unit: "قطعة" },
  { id: "p5", code: "PR005", name: "كامرة ويب HD", price: 150, quantity: 20, unit: "قطعة" },
  { id: "p6", code: "PR006", name: "كيبل HDMI 2م", price: 25, quantity: 100, unit: "قطعة" },
  { id: "p7", code: "PR007", name: "وحدة تخزين خارجية 1TB", price: 300, quantity: 15, unit: "قطعة" },
  { id: "p8", code: "PR008", name: "حامل شاشة كمبيوتر", price: 120, quantity: 10, unit: "قطعة" },
  { id: "p9", code: "PR009", name: "حقيبة لابتوب", price: 90, quantity: 30, unit: "قطعة" },
  { id: "p10", code: "PR010", name: "فلاش درايف 64GB", price: 60, quantity: 40, unit: "قطعة" }
];

interface ProductSearchProps {
  onSelect: (product: Product) => void;
  placeholder?: string;
  autoFocus?: boolean;
  showIcon?: boolean;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  onSelect,
  placeholder = "البحث عن منتج...",
  autoFocus = false,
  showIcon = false
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Search for products when query changes
  useEffect(() => {
    if (query.trim().length > 0) {
      // In a real app, this would be an API call
      const filtered = mockProducts.filter(product => 
        product.name.includes(query) || 
        product.code.includes(query)
      );
      setResults(filtered.slice(0, 5)); // Limit to 5 results for performance
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);
  
  // Click outside to close results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // Handle product selection
  const handleSelect = (product: Product) => {
    onSelect(product);
    setQuery("");
    setIsOpen(false);
  };
  
  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        {showIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        )}
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={showIcon ? "pl-3 pr-10" : "px-3"}
          onFocus={() => query.trim() && setIsOpen(true)}
          autoFocus={autoFocus}
        />
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="absolute z-30 mt-1 w-full bg-white border border-gray-300 shadow-lg rounded-md max-h-60 overflow-auto search-results">
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
                    <span>السعر: {product.price} ر.س</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
