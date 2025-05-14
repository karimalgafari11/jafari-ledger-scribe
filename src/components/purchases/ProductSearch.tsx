
import React, { useState, useRef, useEffect, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Product } from "@/types/inventory";

interface ProductSearchProps {
  onSelect: (product: Product) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  showIcon?: boolean;
}

// مجموعة من المنتجات للبحث (للتجربة فقط، في التطبيق الحقيقي ستأتي من API)
const mockProducts: Product[] = [
  { id: "1", code: "P001", name: "شاشة كمبيوتر Samsung 24 بوصة", price: 450.00 },
  { id: "2", code: "P002", name: "لوحة مفاتيح لاسلكية Logitech", price: 120.00 },
  { id: "3", code: "P003", name: "ماوس لاسلكي Logitech MX Master", price: 320.00 },
  { id: "4", code: "P004", name: "سماعات رأس Sony WH-1000XM4", price: 1250.00 },
  { id: "5", code: "P005", name: "قرص صلب خارجي 1TB", price: 350.00 },
  { id: "6", code: "P006", name: "طابعة HP LaserJet", price: 800.00 },
  { id: "7", code: "P007", name: "راوتر TP-Link AC1200", price: 180.00 },
  { id: "8", code: "P008", name: "حبر طابعة HP 304 أسود", price: 90.00 },
  { id: "9", code: "P009", name: "حبر طابعة HP 304 ملون", price: 110.00 },
  { id: "10", code: "P010", name: "كيبل HDMI 2متر", price: 35.00 },
];

export const ProductSearch: React.FC<ProductSearchProps> = ({
  onSelect,
  placeholder = "ابحث عن منتج...",
  className = "",
  autoFocus = false,
  showIcon = false,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on input when component mounts if autoFocus is true
  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

  // Close results when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const filtered = mockProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  // Handle selection of a product
  const handleSelectProduct = (product: Product) => {
    onSelect(product);
    setSearchQuery("");
    setShowResults(false);
  };

  // Handle key press events for keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && results.length > 0) {
      // When Enter key is pressed and we have results, select the first product
      handleSelectProduct(results[0]);
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        {showIcon && (
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        )}
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.trim().length > 1 && setShowResults(true)}
          onKeyDown={handleKeyDown}
          className={`${showIcon ? "pl-10" : ""} ${className}`}
        />
      </div>

      {/* Search Results */}
      {showResults && results.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          <ul className="py-1 text-sm">
            {results.map((product) => (
              <li
                key={product.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectProduct(product)}
              >
                <div className="font-medium">{product.name}</div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{product.code}</span>
                  <span>{product.price} ر.س</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showResults && results.length === 0 && searchQuery.trim().length > 1 && (
        <div className="absolute z-50 mt-1 w-full bg-white border rounded-md shadow-lg p-3 text-center text-gray-500">
          لا توجد نتائج للبحث عن "{searchQuery}"
        </div>
      )}
    </div>
  );
};
