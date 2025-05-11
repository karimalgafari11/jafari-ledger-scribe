
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody } from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
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
import { ItemFormDialog } from "./table-components/ItemFormDialog";

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
  const [showItemDialog, setShowItemDialog] = useState(false); // إضافة حالة للتحكم في ظهور نافذة إضافة الصنف
  const [currentEditItem, setCurrentEditItem] = useState<InvoiceItem | null>(null); // حالة لتخزين العنصر الحالي للتحرير
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
    if (editingItemIndex === null && !isAddingItem) {
      setShowItemDialog(true);
      setCurrentEditItem(null);
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

  // معالج إغلاق نافذة إضافة/تعديل العنصر
  const handleCloseItemDialog = () => {
    setShowItemDialog(false);
    setCurrentEditItem(null);
  };

  // معالج حفظ الصنف من النافذة
  const handleSubmitItemForm = (item: Partial<InvoiceItem>) => {
    if (currentEditItem) {
      // تحديث صنف موجود
      const index = items.findIndex(i => i.id === currentEditItem.id);
      if (index !== -1) {
        onUpdateItem(index, item);
      }
    } else {
      // إضافة صنف جديد
      onAddItem(item);
    }
    setShowItemDialog(false);
    setCurrentEditItem(null);
  };

  // معالج تعديل صنف موجود
  const handleEditExistingItem = (index: number) => {
    const item = items[index];
    if (item) {
      setCurrentEditItem(item);
      setShowItemDialog(true);
    }
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

  // معالج تبديل البحث السريع
  const handleToggleSearch = () => {
    setShowProductSearch(!showProductSearch);
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

      {/* نافذة إضافة/تعديل الصنف */}
      <ItemFormDialog 
        open={showItemDialog}
        currentEditItem={currentEditItem}
        onClose={handleCloseItemDialog}
        onSubmit={handleSubmitItemForm}
        includeNotes={showItemNotes}
      />

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
          
          <div className="p-4 flex flex-wrap gap-2 border-b">
            <Button
              onClick={handleAddItemClick}
              className="flex items-center gap-2"
              size="sm"
              disabled={isAddingItem || editingItemIndex !== null || showItemDialog}
            >
              <Plus className="h-4 w-4" />
              إضافة صنف جديد
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleToggleSearch}
              className="flex items-center gap-2"
              disabled={isAddingItem || editingItemIndex !== null || showItemDialog}
            >
              <Search className="h-4 w-4" />
              البحث عن صنف
            </Button>
          </div>
          
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
                      setEditingItemIndex={(idx) => {
                        if (idx === index) handleEditExistingItem(index);
                        else handleEditItem(idx);
                      }}
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
