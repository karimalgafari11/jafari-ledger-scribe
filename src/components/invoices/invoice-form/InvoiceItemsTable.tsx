
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TableActionButtons } from "./table-components/TableActionButtons";
import { ProductSearchInput } from "./table-components/ProductSearchInput";
import { InvoiceItem } from "@/types/invoices";
import { useInvoiceItemsTable } from "./hooks/useInvoiceItemsTable";
import { InvoiceItemForm } from "./InvoiceItemForm";
import { Trash2, Edit } from "lucide-react";
import { QuickProductSearch } from "./QuickProductSearch";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface InvoiceItemsTableProps {
  items: InvoiceItem[];
  isAddingItem?: boolean;
  editingItemIndex?: number | null;
  tableWidth?: number;
  tableRef?: React.RefObject<HTMLDivElement>;
  setIsAddingItem?: (isAdding: boolean) => void;
  handleEditItem?: (index: number) => void;
  handleResizeStart?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onRemoveItem: (index: number) => void;
  onAddItem: (item: Partial<InvoiceItem>) => void;
  onUpdateItem: (index: number, item: Partial<InvoiceItem>) => void;
  settings?: {
    showItemCodes?: boolean;
    showItemNotes?: boolean;
    fontSize?: 'small' | 'medium' | 'large';
    tableColumns?: string[];
    tableWidth?: number;
  }
}

export const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({
  items,
  isAddingItem,
  editingItemIndex,
  tableWidth = 100,
  tableRef,
  setIsAddingItem = () => {},
  handleEditItem = () => {},
  handleResizeStart = () => {},
  onRemoveItem,
  onAddItem,
  onUpdateItem,
  settings = {}
}) => {
  const {
    searchTerm,
    isSearching,
    searchResults,
    quickSearchActive,
    showItemForm,
    showItemDialog,
    currentEditItem,
    handleSearchChange,
    toggleSearch,
    handleQuickSelect,
    handleRowClick,
    handleAddNewItem,
    handleFormCancel,
    handleFormSubmit,
    setQuickSearchActive,
    setShowItemDialog,
  } = useInvoiceItemsTable(items, onAddItem, onRemoveItem);

  const fontSize = settings.fontSize || 'medium';
  const fontSizeClass = fontSize === 'small' ? 'text-xs' : fontSize === 'large' ? 'text-base' : 'text-sm';
  
  // إظهار قائمة الأصناف
  const handleUpdateItemForm = (index: number, item: Partial<InvoiceItem>) => {
    onUpdateItem(index, item);
  };

  return (
    <div className="relative mt-4 overflow-auto border rounded-md">
      <div className="sticky top-0 z-10 bg-white p-2 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold">الأصناف</h3>
        <TableActionButtons 
          onAddNewItem={() => setQuickSearchActive(true)}
          onToggleSearch={toggleSearch}
        />
      </div>
      
      {isSearching && (
        <ProductSearchInput
          searchTerm={searchTerm}
          searchResults={searchResults}
          onSearchChange={handleSearchChange}
          onSelect={handleQuickSelect}
          onClose={toggleSearch}
        />
      )}
      
      <div
        ref={tableRef}
        className="overflow-x-auto"
        style={{ width: `${tableWidth}%` }}
      >
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-right">#</TableHead>
              {settings.showItemCodes !== false && (
                <TableHead className="w-28 text-right">الرمز</TableHead>
              )}
              <TableHead className="text-right">اسم الصنف</TableHead>
              <TableHead className="w-20 text-right">الكمية</TableHead>
              <TableHead className="w-28 text-right">السعر</TableHead>
              <TableHead className="w-28 text-right">الإجمالي</TableHead>
              {settings.showItemNotes !== false && (
                <TableHead className="w-40 text-right">ملاحظات</TableHead>
              )}
              <TableHead className="w-20 text-right">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={settings.showItemNotes !== false ? 7 : 6}
                  className="text-center h-32 text-muted-foreground"
                >
                  لم يتم إضافة أي أصناف بعد
                  <div className="mt-2">
                    <Button
                      onClick={() => setQuickSearchActive(true)}
                      variant="outline"
                      size="sm"
                    >
                      اضغط هنا لإضافة صنف
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={item.id} className={fontSizeClass}>
                  <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                  {settings.showItemCodes !== false && (
                    <TableCell>{item.code}</TableCell>
                  )}
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price.toFixed(2)}</TableCell>
                  <TableCell className="font-bold">{item.total.toFixed(2)}</TableCell>
                  {settings.showItemNotes !== false && (
                    <TableCell className="text-muted-foreground text-xs">
                      {item.notes}
                    </TableCell>
                  )}
                  <TableCell>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => {
                          // تعديل الصنف
                          setShowItemDialog(true);
                          handleEditItem(index);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onRemoveItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* إظهار نافذة البحث عن المنتجات عند الضغط على إضافة صنف */}
      {quickSearchActive && (
        <QuickProductSearch 
          onClose={() => setQuickSearchActive(false)} 
          onSelect={handleQuickSelect} 
          initialQuery=""
        />
      )}
      
      {/* نافذة إضافة/تعديل الصنف */}
      <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <InvoiceItemForm 
            item={currentEditItem || undefined}
            onCancel={() => setShowItemDialog(false)}
            onSave={(item) => {
              if (currentEditItem) {
                const index = items.findIndex(i => i.id === currentEditItem.id);
                if (index !== -1) {
                  handleUpdateItemForm(index, item);
                }
              } else {
                handleFormSubmit(item);
              }
              setShowItemDialog(false);
            }}
            settings={{
              showItemCodes: settings.showItemCodes,
              showItemNotes: settings.showItemNotes
            }}
          />
        </DialogContent>
      </Dialog>

      <div
        className="absolute top-0 bottom-0 right-0 w-1 cursor-ew-resize hover:bg-blue-400 opacity-0 hover:opacity-100"
        onMouseDown={handleResizeStart}
      />
    </div>
  );
};
