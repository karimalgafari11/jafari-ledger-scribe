
import React, { useRef, useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, Search, X } from "lucide-react";
import { InvoiceItem } from "@/types/invoices";
import { InvoiceSettingsType } from "./InvoiceSettings";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/data/mockProducts";
import { QuickProductSearch } from "./QuickProductSearch";
import { toast } from "sonner";

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  isAddingItem: boolean;
  editingItemIndex: number | null;
  tableWidth: number;
  tableRef: React.RefObject<HTMLDivElement>;
  setIsAddingItem: (isAdding: boolean) => void;
  handleEditItem: (index: number) => void;
  handleResizeStart: (e: React.MouseEvent) => void;
  onRemoveItem: (index: number) => void;
  onAddItem: (item: Partial<InvoiceItem>) => void;
  settings?: InvoiceSettingsType;
}

export const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({
  items,
  isAddingItem,
  editingItemIndex,
  tableWidth,
  tableRef,
  setIsAddingItem,
  handleEditItem,
  handleResizeStart,
  onRemoveItem,
  onAddItem,
  settings
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([]);
  const [quickSearchActive, setQuickSearchActive] = useState(false);
  const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
  
  // Auto-open item form when there are no items
  useEffect(() => {
    if (items.length === 0 && !isAddingItem && editingItemIndex === null) {
      console.log("No items found, auto-opening item form");
      setIsAddingItem(true);
    }
    console.log("Current items:", items);
  }, [items, isAddingItem, editingItemIndex, setIsAddingItem]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.length > 1) {
      const results = mockProducts.filter(
        product => 
          product.name.toLowerCase().includes(term.toLowerCase()) ||
          product.code.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
      console.log("Search results:", results);
    } else {
      setSearchResults([]);
    }
  };

  const handleQuickSelect = (product: any) => {
    const newItem = {
      productId: product.id,
      code: product.code,
      name: product.name,
      quantity: 1,
      price: product.price,
      discount: 0,
      discountType: "percentage" as const,
      tax: 15,
      notes: ""
    };
    
    onAddItem(newItem);
    setSearchTerm("");
    setSearchResults([]);
    setQuickSearchActive(false);
    toast.success(`تم إضافة ${product.name} إلى الفاتورة`);
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (!isSearching) {
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  const handleRowClick = (index: number) => {
    setActiveRowIndex(index);
    setQuickSearchActive(true);
  };

  // Get display column configuration from settings
  const getVisibleColumns = () => {
    const columns = settings?.tableColumns || ['serial', 'name', 'quantity', 'price', 'total', 'notes'];
    return columns;
  };
  
  const columns = getVisibleColumns();

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-base font-bold">الأصناف</h3>
        <div className="flex gap-1">
          {isSearching ? (
            <div className="relative w-64">
              <Input
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="ابحث عن صنف..."
                className="h-8 text-sm"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-1 top-1/2 transform -translate-y-1/2 h-5 w-5"
                onClick={toggleSearch}
              >
                <X className="h-3 w-3" />
              </Button>
              {searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((product) => (
                    <div 
                      key={product.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm border-b"
                      onClick={() => handleQuickSelect(product)}
                    >
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.code} - {product.price} ر.س</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="xs" 
                onClick={toggleSearch}
                className="h-8 text-sm flex items-center"
              >
                <Search className="mr-1 h-4 w-4" />
                البحث
              </Button>
            </>
          )}
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsAddingItem(true)}
            className="h-8 text-sm"
            disabled={isAddingItem || editingItemIndex !== null}
          >
            <Plus className="ml-1 h-4 w-4" />
            إضافة صنف
          </Button>
        </div>
      </div>
      
      <div 
        ref={tableRef} 
        className="border border-gray-300 rounded-sm overflow-x-auto relative invoice-item-table" 
        style={{
          width: `${tableWidth}%`
        }}
      >
        {/* Resize handle */}
        <div 
          className="absolute top-0 bottom-0 right-0 w-1 cursor-ew-resize bg-primary/10 hover:bg-primary/20 transition-colors" 
          onMouseDown={handleResizeStart} 
        />
        
        <Table className="w-full text-base invoice-table" bordered>
          <TableHeader>
            <TableRow>
              {columns.includes('serial') && 
                <TableHead className="w-12 border border-black text-center font-semibold py-1.5 text-lg">#</TableHead>
              }
              {columns.includes('code') && 
                <TableHead className="border border-black text-center font-semibold py-1.5 text-lg w-28">رمز الصنف</TableHead>
              }
              {columns.includes('name') && 
                <TableHead className="border border-black text-center font-semibold py-1.5 text-lg w-2/5">اسم الصنف</TableHead>
              }
              {columns.includes('quantity') && 
                <TableHead className="border border-black text-center font-semibold py-1.5 text-lg w-16">الكمية</TableHead>
              }
              {columns.includes('price') && 
                <TableHead className="border border-black text-center font-semibold py-1.5 text-lg w-28">السعر</TableHead>
              }
              {columns.includes('total') && 
                <TableHead className="border border-black text-center font-semibold py-1.5 text-lg w-28">الإجمالي</TableHead>
              }
              {columns.includes('notes') && 
                <TableHead className="border border-black text-center font-semibold py-1.5 text-lg w-32">ملاحظات</TableHead>
              }
              <TableHead className="text-center border border-black font-semibold print-hide py-1.5 text-lg w-16">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={columns.length + 1} 
                  className="text-center py-2 text-muted-foreground border border-black text-lg"
                >
                  لا توجد أصناف في الفاتورة
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                  {columns.includes('serial') && 
                    <TableCell className="border border-black text-center font-semibold py-1 text-lg">{index + 1}</TableCell>
                  }
                  {columns.includes('code') && 
                    <TableCell 
                      className="border border-black text-center py-1 text-lg cursor-pointer hover:bg-gray-200"
                      onClick={() => handleRowClick(index)}
                    >
                      {item.code}
                    </TableCell>
                  }
                  {columns.includes('name') && 
                    <TableCell 
                      className="border border-black py-1 text-lg cursor-pointer hover:bg-gray-200" 
                      onClick={() => handleRowClick(index)}
                    >
                      {item.name}
                    </TableCell>
                  }
                  {columns.includes('quantity') && 
                    <TableCell className="border border-black text-center py-1 text-lg">{item.quantity}</TableCell>
                  }
                  {columns.includes('price') && 
                    <TableCell className="border border-black text-center py-1 text-lg">{item.price.toFixed(2)}</TableCell>
                  }
                  {columns.includes('total') && 
                    <TableCell className="border border-black text-center font-semibold py-1 text-lg">{item.total.toFixed(2)}</TableCell>
                  }
                  {columns.includes('notes') && 
                    <TableCell className="border border-black text-center py-1 text-lg">{item.notes || '-'}</TableCell>
                  }
                  <TableCell className="border border-black print-hide py-1">
                    <div className="flex space-x-1 rtl space-x-reverse justify-center">
                      <Button variant="ghost" size="sm" onClick={() => handleEditItem(index)} className="h-6 w-6 p-1">
                        <Pencil size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onRemoveItem(index)} className="h-6 w-6 p-1">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Quick Product Search overlay */}
      {quickSearchActive && (
        <QuickProductSearch
          onClose={() => setQuickSearchActive(false)}
          onSelect={handleQuickSelect}
        />
      )}
    </div>
  );
};
