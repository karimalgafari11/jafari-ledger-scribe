
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";
import { InvoiceItem } from "@/types/invoices";
import { InvoiceItemRow } from "./InvoiceItemRow";
import { InvoiceItemSection } from "./InvoiceItemSection";
import { useInvoiceTable } from "@/hooks/sales/useInvoiceTable";
import { InvoiceSettingsType } from "./InvoiceSettings";
import { QuickProductSearch } from "./QuickProductSearch";
import { Product } from "@/types/inventory";
import { v4 as uuidv4 } from "uuid";

// Import the newly created components
import { TableHeader } from "./table-components/TableHeader";
import { TableColumns } from "./table-components/TableColumns";
import { TableFooter } from "./table-components/TableFooter";
import { EmptyTableContent } from "./table-components/EmptyTableContent";
import { TableStyles } from "./table-components/TableStyles";
import { useTableInitialFocus } from "./table-components/TableInitialFocus";
import { TableKeyboardNavigation } from "./table-components/TableKeyboardNavigation";

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
  onUpdateItem: (index: number, item: Partial<InvoiceItem>) => void;
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
  onUpdateItem,
  settings
}) => {
  // عرض أكواد العناصر
  const showItemCodes = settings?.showItemCodes !== false;
  // عرض ملاحظات العناصر
  const showItemNotes = settings?.showItemNotes !== false;

  const [editingItem, setEditingItem] = useState<InvoiceItem | undefined>(
    editingItemIndex !== null ? items[editingItemIndex] : undefined
  );
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [tableHasFocus, setTableHasFocus] = useState(false);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [firstRender, setFirstRender] = useState(true); // لتتبع التحميل الأولي

  // استخدام هوك لإدارة جدول الفاتورة
  const {
    activeSearchCell,
    showGridLines,
    isDenseView,
    handleCellClick,
    handleDirectEdit,
    handleProductSelect,
    handleKeyNavigation,
    cellRefs,
    isEditingCell,
    toggleGridLines,
    toggleDenseView,
    handleTableClick,
    focusCell
  } = useInvoiceTable({
    items,
    onUpdateItem,
    onRemoveItem,
    isAddingItem,
    editingItemIndex,
    setEditingItemIndex: handleEditItem
  });

  // استخدام هوك التركيز الأولي
  useTableInitialFocus({
    items,
    isAddingItem,
    editingItemIndex,
    activeSearchCell,
    showItemCodes,
    focusCell,
    firstRender,
    setFirstRender
  });

  // التعامل مع التركيز على الجدول
  const handleTableFocus = () => {
    setTableHasFocus(true);
  };

  const handleTableBlur = (e: React.FocusEvent) => {
    // التحقق إذا كان التركيز لا يزال ضمن الجدول
    if (!tableContainerRef.current?.contains(e.relatedTarget as Node)) {
      setTableHasFocus(false);
    }
  };

  // مقبض لإضافة عنصر جديد
  const handleAddItemClick = () => {
    if (editingItemIndex === null) {
      setShowProductSearch(true);
    }
  };

  // مقبضات للتحرير والإلغاء
  const handleCancelEdit = () => {
    handleEditItem(null);
  };

  const handleCancelAdd = () => {
    setIsAddingItem(false);
  };

  // مقبضات لحفظ العنصر المحرر
  const handleUpdateItem = (item: Partial<InvoiceItem>) => {
    if (editingItemIndex !== null && items[editingItemIndex]) {
      onUpdateItem(editingItemIndex, item);
    }
    handleEditItem(null);
  };

  // معالج اختيار المنتج من البحث السريع
  const handleProductSelected = (product: Product) => {
    const newItem: Partial<InvoiceItem> = {
      id: uuidv4(),
      productId: product.id,
      code: product.code,
      name: product.name,
      quantity: 1,
      price: product.price,
      discount: 0,
      discountType: "percentage",
      tax: 15,
      total: product.price
    };
    
    onAddItem(newItem);
    setShowProductSearch(false);
    
    // بعد إضافة عنصر، ركز على الصف الجديد بعد تأخير كافٍ للسماح بإنشاء العنصر
    const timer = setTimeout(() => {
      const newRowIndex = items.length; // الفهرس الجديد بعد الإضافة
      focusCell(newRowIndex, 'quantity');
    }, 300);
    
    return () => clearTimeout(timer);
  };

  return (
    <div className="space-y-4">
      {/* قسم إضافة/تحرير العنصر */}
      <InvoiceItemSection
        isAddingItem={isAddingItem}
        editingItemIndex={editingItemIndex}
        editingItem={editingItem}
        handleAddItem={onAddItem}
        handleUpdateItem={handleUpdateItem}
        handleCancelEdit={handleCancelEdit}
        handleCancelAdd={handleCancelAdd}
        settings={settings}
      />

      {/* نافذة البحث عن المنتجات */}
      {showProductSearch && (
        <QuickProductSearch
          onClose={() => setShowProductSearch(false)}
          onSelect={handleProductSelected}
        />
      )}

      {/* إضافة مستمع أحداث لوحة المفاتيح */}
      <TableKeyboardNavigation
        tableHasFocus={tableHasFocus}
        isAddingItem={isAddingItem}
        editingItemIndex={editingItemIndex}
        activeSearchCell={activeSearchCell}
        handleCellClick={handleCellClick}
        handleAddItemClick={handleAddItemClick}
      />

      {/* جدول العناصر */}
      <Card>
        <CardContent className="p-0">
          <TableHeader
            handleAddItemClick={handleAddItemClick}
            isAddingItem={isAddingItem}
            editingItemIndex={editingItemIndex}
            showGridLines={showGridLines}
            isDenseView={isDenseView}
            toggleGridLines={toggleGridLines}
            toggleDenseView={toggleDenseView}
          />
          
          <div 
            ref={(node) => {
              // دمج المرجعين
              if (tableRef && typeof tableRef === 'object') {
                (tableRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
              }
              tableContainerRef.current = node;
            }}
            className="overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            style={{ width: `${tableWidth}%` }}
            onFocus={handleTableFocus}
            onBlur={handleTableBlur}
            onClick={handleTableClick}
            tabIndex={0}
            role="grid"
            aria-label="جدول الفاتورة"
          >
            <Table className={`${showGridLines ? 'table-bordered' : ''} ${isDenseView ? 'table-sm' : ''}`}>
              <TableColumns
                showItemCodes={showItemCodes}
                showItemNotes={showItemNotes}
              />
              <TableBody>
                {items.length === 0 ? (
                  <EmptyTableContent
                    colSpanValue={showItemCodes && showItemNotes ? 8 : showItemCodes || showItemNotes ? 7 : 6}
                    handleAddItemClick={handleAddItemClick}
                    isAddingItem={isAddingItem}
                    editingItemIndex={editingItemIndex}
                  />
                ) : (
                  items.map((item, index) => (
                    <InvoiceItemRow
                      key={item.id || index}
                      item={item}
                      index={index}
                      activeSearchCell={activeSearchCell}
                      handleCellClick={handleCellClick}
                      handleProductSelect={handleProductSelect}
                      handleDirectEdit={handleDirectEdit}
                      isEditingCell={isEditingCell}
                      editingItemIndex={editingItemIndex}
                      isAddingItem={isAddingItem}
                      setEditingItemIndex={handleEditItem}
                      onRemoveItem={onRemoveItem}
                      showItemCodes={showItemCodes}
                      showItemNotes={showItemNotes}
                      onKeyDown={handleKeyNavigation}
                      cellRefs={cellRefs}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <TableFooter itemsCount={items.length} />
          
          {/* مقبض تغيير حجم الجدول */}
          <div
            className="resize-handle w-3 h-3 absolute bottom-0 left-0 cursor-nwse-resize"
            onMouseDown={handleResizeStart}
          />
        </CardContent>
      </Card>

      <TableStyles />
    </div>
  );
};
