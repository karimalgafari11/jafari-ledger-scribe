
import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Product } from "@/types/inventory";
import { mockProducts } from "@/data/mockProducts";
import { useIsMobile } from "@/hooks/use-mobile";
import { debounce } from "lodash";

interface InventoryPickerProps {
  position: { top: number, left: number };
  onSelect: (product: Product) => void;
  onClose: () => void;
  field: "code" | "name";
  initialSearchTerm?: string;
}

export const InventoryPicker: React.FC<InventoryPickerProps> = ({ 
  position, 
  onSelect, 
  onClose,
  field,
  initialSearchTerm = ""
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const pickerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  
  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Filter products based on search term
  const filterProducts = (term: string) => {
    if (!term.trim()) {
      setFilteredProducts(mockProducts);
      return;
    }
    
    const lowercaseTerm = term.toLowerCase().trim();
    const filtered = mockProducts.filter(product => {
      if (field === "code") {
        return product.code.toLowerCase().includes(lowercaseTerm);
      } else {
        return (
          product.name.toLowerCase().includes(lowercaseTerm) || 
          product.code.toLowerCase().includes(lowercaseTerm) ||
          (product.category && product.category.toLowerCase().includes(lowercaseTerm))
        );
      }
    });
    
    setFilteredProducts(filtered);
    setSelectedIndex(0); // Reset selection when filtering
  };
  
  // Create debounced filter function
  const debouncedFilter = debounce(filterProducts, 300);
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFilter(value);
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredProducts.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredProducts.length > 0) {
          onSelect(filteredProducts[selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
    }
  };
  
  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);
  
  // Initial filtering
  useEffect(() => {
    if (initialSearchTerm) {
      filterProducts(initialSearchTerm);
    }
  }, [initialSearchTerm]);
  
  // Choose different positioning based on device
  const pickerStyle = isMobile 
    ? { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 } as React.CSSProperties
    : { 
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1000
      } as React.CSSProperties;
  
  const containerClasses = isMobile 
    ? "fixed inset-0 z-[1000] bg-white p-4 flex flex-col"
    : "absolute z-[1000] bg-white shadow-lg rounded-md p-4 w-96 max-h-96 flex flex-col";
  
  return (
    <div 
      ref={pickerRef}
      className={containerClasses}
      style={pickerStyle}
      data-testid="inventory-picker"
    >
      <div className="flex items-center gap-2 mb-4">
        <Search className="h-4 w-4 text-gray-500" />
        <input
          ref={inputRef}
          type="text"
          placeholder={field === "code" ? "ابحث برقم الصنف..." : "ابحث عن صنف..."}
          className="flex-1 p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <button 
          onClick={onClose}
          className="p-1 bg-gray-100 rounded-full hover:bg-gray-200"
          aria-label="إغلاق"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="overflow-y-auto flex-grow">
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 py-4">
            لا توجد نتائج
          </div>
        ) : (
          <div className="space-y-1">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                className={`p-2 rounded-md cursor-pointer flex justify-between items-center ${selectedIndex === index ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => onSelect(product)}
              >
                <div className="flex-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">
                    {product.code} - السعر: {product.price} ر.س
                  </div>
                </div>
                <div className={`text-xs px-1.5 py-0.5 rounded-full ${product.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {product.quantity > 0 ? `متوفر: ${product.quantity}` : 'غير متوفر'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
