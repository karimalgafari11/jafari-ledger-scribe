
import React, { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { InvoiceItem } from "@/types/invoices";
import { InvoiceSettingsType } from "./InvoiceSettings";
import { Input } from "@/components/ui/input";
import { mockProducts } from "@/data/mockProducts";

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
  settings
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([]);
  
  // Auto-open item form when there are no items
  React.useEffect(() => {
    if (items.length === 0 && !isAddingItem && editingItemIndex === null) {
      setIsAddingItem(true);
    }
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
    } else {
      setSearchResults([]);
    }
  };

  const toggleSearch = () => {
    setIsSearching(!isSearching);
    if (!isSearching) {
      setSearchTerm("");
      setSearchResults([]);
    }
  };

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
              {searchResults.length > 0 && (
                <div className="absolute z-20 top-full right-0 w-full max-h-48 overflow-y-auto bg-white shadow-lg border rounded-md mt-1">
                  {searchResults.map((product) => (
                    <div 
                      key={product.id} 
                      className="p-2 hover:bg-gray-100 cursor-pointer text-sm border-b"
                      onClick={() => {
                        setIsAddingItem(true);
                        setIsSearching(false);
                      }}
                    >
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-xs text-gray-500">{product.code} - {product.price} ر.س</div>
                    </div>
                  ))}
                </div>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-1 top-1/2 transform -translate-y-1/2 h-5 w-5"
                onClick={toggleSearch}
              >
                <Search className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="xs" 
              onClick={toggleSearch}
              className="h-8 text-sm flex items-center"
            >
              <Search className="mr-1 h-4 w-4" />
              البحث
            </Button>
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
        className="border border-gray-300 rounded-sm overflow-x-auto relative" 
        style={{
          width: `${tableWidth}%`
        }}
      >
        {/* Resize handle */}
        <div 
          className="absolute top-0 bottom-0 right-0 w-1 cursor-ew-resize bg-primary/10 hover:bg-primary/20 transition-colors" 
          onMouseDown={handleResizeStart} 
        />
        
        <Table className="w-full text-base" bordered>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 border border-black text-center font-semibold py-1.5 text-base">#</TableHead>
              <TableHead className="border border-black text-center font-semibold py-1.5 text-base w-2/5">اسم الصنف</TableHead>
              <TableHead className="border border-black text-center font-semibold py-1.5 text-base w-16">الكمية</TableHead>
              <TableHead className="border border-black text-center font-semibold py-1.5 text-base w-28">السعر</TableHead>
              <TableHead className="border border-black text-center font-semibold py-1.5 text-base w-28">الإجمالي</TableHead>
              <TableHead className="border border-black text-center font-semibold py-1.5 text-base w-32">ملاحظات</TableHead>
              <TableHead className="text-center border border-black font-semibold print-hide py-1.5 text-base w-16">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={7} 
                  className="text-center py-2 text-muted-foreground border border-black text-base"
                >
                  لا توجد أصناف في الفاتورة
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                  <TableCell className="border border-black text-center font-semibold py-1 text-base">{index + 1}</TableCell>
                  <TableCell 
                    className="border border-black py-1 text-base cursor-pointer hover:bg-gray-200" 
                    onClick={() => handleEditItem(index)}
                  >
                    {item.name}
                  </TableCell>
                  <TableCell className="border border-black text-center py-1 text-base">{item.quantity}</TableCell>
                  <TableCell className="border border-black text-center py-1 text-base">{item.price.toFixed(2)}</TableCell>
                  <TableCell className="border border-black text-center font-semibold py-1 text-base">{item.total.toFixed(2)}</TableCell>
                  <TableCell className="border border-black text-center py-1 text-base">{item.notes || '-'}</TableCell>
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
    </div>
  );
};
