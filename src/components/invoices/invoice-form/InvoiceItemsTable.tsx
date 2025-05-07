
import React from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceItem } from "@/types/invoices";
import { InvoiceSettingsType } from "./InvoiceSettings";
import { QuickProductSearch } from "./QuickProductSearch";

// Import refactored components
import { TableHeader as ItemsTableHeader } from "./table-components/TableHeader";
import { ProductSearchInput } from "./table-components/ProductSearchInput";
import { EmptyTable } from "./table-components/EmptyTable";
import { TableResizeHandle } from "./table-components/TableResizeHandle";
import { ItemTableRow } from "./table-components/ItemTableRow";
import { ItemFormDialog } from "./table-components/ItemFormDialog";
import { useInvoiceItemsTable } from "./hooks/useInvoiceItemsTable";

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
  const {
    searchTerm,
    isSearching,
    searchResults,
    quickSearchActive,
    showItemForm,
    currentEditItem,
    handleSearchChange,
    toggleSearch,
    handleQuickSelect,
    handleRowClick,
    handleAddNewItem,
    handleFormCancel,
    handleFormSubmit,
    setQuickSearchActive
  } = useInvoiceItemsTable(items, onAddItem, onRemoveItem);

  // Get display column configuration from settings
  const getVisibleColumns = () => {
    const columns = settings?.tableColumns || ['serial', 'name', 'quantity', 'price', 'total', 'notes'];
    return columns;
  };
  
  const columns = getVisibleColumns();

  return (
    <div className="mt-2">
      <ItemsTableHeader
        onAddNewItem={handleAddNewItem}
        onToggleSearch={toggleSearch}
      />
      
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
        className="border border-gray-300 rounded-sm overflow-x-auto relative invoice-item-table rtl" 
        style={{
          width: `${tableWidth}%`
        }}
      >
        <TableResizeHandle onMouseDown={handleResizeStart} />
        
        <Table className="w-full text-base invoice-table" bordered>
          <TableHeader>
            <TableRow className="rtl">
              <TableHead className="text-center border border-black font-semibold print-hide py-1.5 text-lg w-16">الإجراءات</TableHead>
              {columns.includes('notes') && 
                <TableHead className="border border-black text-center font-semibold py-1.5 text-lg w-32">ملاحظات</TableHead>
              }
              {columns.includes('total') && 
                <TableHead className="border border-black text-center font-semibold py-1.5 text-lg w-28">الإجمالي</TableHead>
              }
              {columns.includes('price') && 
                <TableHead className="border border-black text-center font-semibold py-1.5 text-lg w-28">السعر</TableHead>
              }
              {columns.includes('quantity') && 
                <TableHead className="border border-black text-center font-semibold py-1.5 text-lg w-16">الكمية</TableHead>
              }
              {columns.includes('name') && 
                <TableHead className="border border-black text-center font-semibold py-1.5 text-lg w-2/5">اسم الصنف</TableHead>
              }
              {columns.includes('code') && 
                <TableHead className="border border-black text-center font-semibold py-1.5 text-lg w-28">رمز الصنف</TableHead>
              }
              {columns.includes('serial') && 
                <TableHead className="w-12 border border-black text-center font-semibold py-1.5 text-lg">#</TableHead>
              }
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

      {/* Item Form Dialog */}
      <ItemFormDialog
        open={showItemForm}
        currentEditItem={currentEditItem}
        onClose={handleFormCancel}
        onSubmit={handleFormSubmit}
        includeNotes={settings?.showItemNotes !== false}
      />
    </div>
  );
};
