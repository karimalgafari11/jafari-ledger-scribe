import React, { useState, useEffect } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceItem } from "@/types/invoices";
import { InvoiceSettingsType } from "./InvoiceSettings";
import { mockProducts } from "@/data/mockProducts";
import { QuickProductSearch } from "./QuickProductSearch";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

// Import new components
import { ItemTableHeader } from "./table-components/ItemTableHeader";
import { SearchResults } from "./table-components/SearchResults";
import { EmptyTable } from "./table-components/EmptyTable";
import { TableResizeHandle } from "./table-components/TableResizeHandle";
import { ItemTableRow } from "./table-components/ItemTableRow";
import { InvoiceItemForm } from "../InvoiceItemForm";

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
  const [showItemForm, setShowItemForm] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<InvoiceItem | null>(null);
  
  // Auto-open item form when there are no items
  useEffect(() => {
    if (items.length === 0 && !isAddingItem && editingItemIndex === null && !quickSearchActive && !showItemForm) {
      setQuickSearchActive(true);
    }
  }, [items.length, isAddingItem, editingItemIndex, quickSearchActive, showItemForm]);

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

  const handleQuickSelect = (product: any) => {
    console.log("Adding product from quick select:", product);
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
    const clickedItem = items[index];
    setCurrentEditItem(clickedItem);
    setShowItemForm(true);
  };

  const handleAddNewItem = () => {
    setQuickSearchActive(true);
  };

  const handleFormCancel = () => {
    setShowItemForm(false);
    setCurrentEditItem(null);
  };

  const handleFormSubmit = (item: Partial<InvoiceItem>) => {
    if (currentEditItem) {
      const index = items.findIndex(i => i.id === currentEditItem.id);
      if (index !== -1) {
        onAddItem(item); // Using the addItem function which will update
      }
    } else {
      onAddItem(item);
    }
    setShowItemForm(false);
    setCurrentEditItem(null);
  };

  // Get display column configuration from settings
  const getVisibleColumns = () => {
    const columns = settings?.tableColumns || ['serial', 'name', 'quantity', 'price', 'total', 'notes'];
    return columns;
  };
  
  const columns = getVisibleColumns();

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">الأصناف</h3>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleSearch}
            className="flex items-center gap-1"
          >
            <Search className="h-4 w-4" />
            بحث
          </Button>
          <Button 
            onClick={handleAddNewItem} 
            size="sm"
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            إضافة صنف
          </Button>
        </div>
      </div>
      
      {isSearching && (
        <div className="mb-2">
          <Input
            type="text"
            placeholder="ابحث عن صنف..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="mb-1"
          />
          {searchResults.length > 0 && (
            <SearchResults results={searchResults} onSelect={handleQuickSelect} />
          )}
        </div>
      )}
      
      <div 
        ref={tableRef} 
        className="border border-gray-300 rounded-sm overflow-x-auto relative invoice-item-table" 
        style={{
          width: `${tableWidth}%`
        }}
      >
        <TableResizeHandle onMouseDown={handleResizeStart} />
        
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
              <EmptyTable colSpan={columns.length + 1} />
            ) : (
              items.map((item, index) => (
                <ItemTableRow 
                  key={index}
                  item={item}
                  index={index}
                  columns={columns}
                  onRowClick={() => handleRowClick(index)}
                  onEdit={() => handleEditItem(index)}
                  onRemove={() => onRemoveItem(index)}
                />
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

      {/* Item Form Modal */}
      {showItemForm && (
        <Dialog open={true} onOpenChange={() => setShowItemForm(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{currentEditItem ? "تعديل صنف" : "إضافة صنف"}</DialogTitle>
            </DialogHeader>
            <InvoiceItemForm
              item={currentEditItem || undefined}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              includeNotes={settings?.showItemNotes !== false}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
