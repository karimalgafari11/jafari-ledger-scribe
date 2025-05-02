
import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search, ArrowRight } from "lucide-react";
import { mockProducts } from "@/data/mockProducts";

interface QuickProductSearchProps {
  onClose: () => void;
  onSelect: (product: any) => void;
}

export const QuickProductSearch: React.FC<QuickProductSearchProps> = ({
  onClose,
  onSelect
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Focus on input when opened
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Add event listener to detect clicks outside
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  
  useEffect(() => {
    if (searchTerm.length > 0) {
      const results = mockProducts.filter(
        product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      // Show all products when no search term
      setSearchResults(mockProducts.slice(0, 10)); // Show first 10 for performance
    }
  }, [searchTerm]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        ref={containerRef}
        className="bg-white rounded-md p-4 w-full max-w-2xl max-h-[600px] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">بحث عن منتج</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative mb-4">
          <Input
            ref={inputRef}
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="أدخل اسم المنتج أو رمزه للبحث..."
            className="pr-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        <div className="overflow-y-auto flex-1">
          {searchResults.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              لا توجد منتجات مطابقة للبحث
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-right">رمز الصنف</th>
                  <th className="p-2 text-right">اسم الصنف</th>
                  <th className="p-2 text-right">السعر</th>
                  <th className="p-2 text-right">الكمية المتوفرة</th>
                  <th className="p-2 text-right">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((product) => (
                  <tr 
                    key={product.id} 
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-2">{product.code}</td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2">{product.price.toFixed(2)} ر.س</td>
                    <td className="p-2">
                      <span className={`${product.quantity <= 0 ? 'text-red-600' : product.quantity < product.reorderLevel ? 'text-amber-600' : 'text-green-600'}`}>
                        {product.quantity}
                      </span>
                    </td>
                    <td className="p-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8"
                        onClick={() => onSelect(product)}
                      >
                        <ArrowRight className="h-4 w-4 ml-1" />
                        إضافة
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
