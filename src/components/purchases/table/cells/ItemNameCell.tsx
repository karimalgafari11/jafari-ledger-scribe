
import React, { useState, useEffect, forwardRef, KeyboardEvent } from "react";
import { TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Product } from "@/types/inventory";

interface ItemNameCellProps {
  name: string;
  index: number;
  isEditing: boolean;
  handleProductSelect: (product: Product, index?: number) => void;
  handleDirectEdit: (index: number, field: string, value: any) => void;
  handleCellClick: (rowIndex: number, cellName: string) => void;
  isAddingItem: boolean;
  editingItemIndex: number | null;
  onKeyDown?: (e: KeyboardEvent<HTMLTableCellElement>) => void;
  tabIndex?: number;
}

// نفس منتجات البحث المستخدمة في ProductSearch
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

export const ItemNameCell = forwardRef<HTMLTableCellElement, ItemNameCellProps>(({
  name,
  index,
  isEditing,
  handleProductSelect,
  handleDirectEdit,
  handleCellClick,
  isAddingItem,
  editingItemIndex,
  onKeyDown,
  tabIndex
}, ref) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  
  useEffect(() => {
    if (isEditing) {
      setSearchTerm(name);
    }
  }, [isEditing, name]);
  
  useEffect(() => {
    if (searchTerm.length > 1) {
      // في تطبيق حقيقي، هنا سنقوم بإجراء طلب API للبحث
      const filteredResults = mockProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [searchTerm]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleBlur = () => {
    if (searchTerm !== name) {
      handleDirectEdit(index, 'name', searchTerm);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleDirectEdit(index, 'name', searchTerm);
    }
  };
  
  return (
    <TableCell 
      className="border border-gray-300 p-2 relative"
      onClick={() => !isAddingItem && editingItemIndex === null && handleCellClick(index, 'name')}
      data-row-index={index}
      data-cell-name="name"
      onKeyDown={onKeyDown}
      ref={ref}
      tabIndex={tabIndex}
    >
      {isEditing ? (
        <div>
          <Input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="h-8"
            autoFocus
          />
          {results.length > 0 && (
            <div className="absolute z-20 mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
              <ul className="py-1 text-sm">
                {results.map((product) => (
                  <li 
                    key={product.id}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProductSelect(product, index);
                    }}
                  >
                    <div>{product.name}</div>
                    <div className="text-xs text-gray-500">{product.code}</div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <span className="cursor-text">{name}</span>
      )}
    </TableCell>
  );
});

ItemNameCell.displayName = "ItemNameCell";
