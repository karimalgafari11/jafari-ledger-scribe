
import React, { useState, useCallback, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/inventory";

// قائمة مؤقتة بالمنتجات للعرض في البحث
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

interface ProductSearchProps {
  onSelect: (product: Product) => void;
  placeholder?: string;
  autoFocus?: boolean;
  showIcon?: boolean;
  className?: string;
}

export const ProductSearch: React.FC<ProductSearchProps> = ({
  onSelect,
  placeholder = "البحث عن منتج...",
  autoFocus = false,
  showIcon = true,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
    
    if (term.length > 1) {
      // في تطبيق حقيقي، هنا سنقوم بإجراء طلب API للبحث
      const filteredResults = mockProducts.filter(product => 
        product.name.includes(term) || 
        product.code.includes(term)
      );
      setResults(filteredResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, []);

  const handleSelectProduct = (product: Product) => {
    onSelect(product);
    setSearchTerm("");
    setResults([]);
    setIsOpen(false);
  };

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
    
    // إغلاق قائمة النتائج عند النقر خارجها
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [autoFocus]);

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        {showIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
        )}
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => searchTerm.length > 1 && setIsOpen(true)}
          className={`${showIcon ? 'pr-10' : ''}`}
          autoFocus={autoFocus}
        />
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg max-h-60 overflow-auto border">
          <ul className="py-1 text-sm">
            {results.map((product) => (
              <li 
                key={product.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                onClick={() => handleSelectProduct(product)}
              >
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-gray-500">{product.code}</div>
                </div>
                <div className="font-bold">{product.price.toFixed(2)}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && searchTerm.length > 1 && results.length === 0 && (
        <div className="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg border">
          <div className="px-3 py-2 text-sm text-gray-500">
            لا توجد نتائج لهذا البحث
          </div>
        </div>
      )}
    </div>
  );
};
