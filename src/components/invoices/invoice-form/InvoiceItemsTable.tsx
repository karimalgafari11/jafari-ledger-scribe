
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceItem } from "@/types/invoices";
import { InvoiceItemRow } from "./InvoiceItemRow";
import { InvoiceItemSection } from "./InvoiceItemSection";
import { useInvoiceTable } from "@/hooks/sales/useInvoiceTable";
import { InvoiceSettingsType } from "./InvoiceSettings";
import { QuickProductSearch } from "./QuickProductSearch";
import { Product } from "@/types/inventory";
import { v4 as uuidv4 } from "uuid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  // إضافة مستمع لأحداث لوحة المفاتيح للجدول بأكمله
  useEffect(() => {
    const handleTableKeyDown = (e: KeyboardEvent) => {
      if (!tableHasFocus) return;
      
      // اختصارات إضافة عنصر جديد
      if (e.key === 'Insert' || (e.ctrlKey && e.key === 'n')) {
        e.preventDefault();
        if (!isAddingItem && editingItemIndex === null) {
          handleAddItemClick();
        }
      }
      
      // اختصارات أخرى عامة للجدول
      if (e.key === 'F2' && activeSearchCell) {
        // بدء تحرير الخلية المحددة حاليًا
        e.preventDefault();
        const { rowIndex, cellName } = activeSearchCell;
        handleCellClick(rowIndex, cellName);
      }
    };
    
    // تسجيل مستمع الأحداث
    document.addEventListener('keydown', handleTableKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleTableKeyDown);
    };
  }, [tableHasFocus, isAddingItem, editingItemIndex, activeSearchCell, handleCellClick]);

  // عند تحميل الجدول، ركز على أول خلية للعنصر الأول إذا وجد
  useEffect(() => {
    // التركيز على الخلية الأولى بعد تحميل الجدول إذا كانت هناك عناصر
    if (firstRender && items.length > 0 && !isAddingItem && editingItemIndex === null && !activeSearchCell) {
      // استخدم مؤقتًا أطول للتأكد من أن الجدول قد تم رسمه بالكامل
      const timer = setTimeout(() => {
        // استخدم ترتيب الخلايا للحصول على الخلية الأولى المرئية
        const firstVisibleField = showItemCodes ? 'code' : 'name';
        focusCell(0, firstVisibleField);
        setFirstRender(false);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [items.length, firstRender, isAddingItem, editingItemIndex, activeSearchCell, showItemCodes, focusCell]);

  // تحديث تركيز الجدول عند إضافة عناصر جديدة
  useEffect(() => {
    if (items.length > 0 && !activeSearchCell && !isAddingItem && editingItemIndex === null) {
      // التركيز على آخر عنصر تم إضافته
      const timer = setTimeout(() => {
        const lastItemIndex = items.length - 1;
        const firstVisibleField = showItemCodes ? 'code' : 'name';
        focusCell(lastItemIndex, firstVisibleField);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [items.length, isAddingItem]);

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

      {/* جدول العناصر */}
      <Card>
        <CardContent className="p-0">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">الأصناف والخدمات</h3>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="h-8 gap-1"
                  >
                    <Settings className="w-4 h-4" /> خيارات الجدول
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuCheckboxItem
                    checked={showGridLines}
                    onCheckedChange={toggleGridLines}
                  >
                    إظهار خطوط الجدول
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={isDenseView}
                    onCheckedChange={toggleDenseView}
                  >
                    عرض مضغوط
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                onClick={handleAddItemClick}
                disabled={isAddingItem || editingItemIndex !== null}
                size="sm"
                className="h-8 gap-1"
              >
                <Plus className="w-4 h-4" /> إضافة صنف
              </Button>
            </div>
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
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center w-12">#</TableHead>
                  {showItemCodes && <TableHead className="text-center">رمز الصنف</TableHead>}
                  <TableHead>اسم الصنف</TableHead>
                  <TableHead className="text-center">الكمية</TableHead>
                  <TableHead className="text-center">السعر</TableHead>
                  <TableHead className="text-center">الإجمالي</TableHead>
                  {showItemNotes && <TableHead>ملاحظات</TableHead>}
                  <TableHead className="text-center w-24">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell 
                      colSpan={showItemCodes && showItemNotes ? 8 : showItemCodes || showItemNotes ? 7 : 6}
                      className="text-center py-12 text-muted-foreground"
                    >
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                          <Plus className="h-6 w-6 text-gray-400" />
                        </div>
                        <p>لم يتم إضافة أصناف بعد</p>
                        <Button 
                          onClick={handleAddItemClick}
                          size="sm"
                          className="mt-2"
                          disabled={isAddingItem || editingItemIndex !== null}
                        >
                          إضافة صنف جديد
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
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
          
          {items.length > 0 && (
            <div className="py-2 px-4 text-sm text-muted-foreground border-t">
              <div className="flex justify-between items-center">
                <div>إجمالي الأصناف: {items.length}</div>
                <div className="text-xs text-gray-500">
                  <span className="bg-gray-100 px-2 py-1 rounded ml-1">Insert</span> لإضافة صنف | 
                  <span className="bg-gray-100 px-2 py-1 rounded mx-1">أسهم الكيبورد</span> للتنقل | 
                  <span className="bg-gray-100 px-2 py-1 rounded mr-1">Enter</span> للتحرير
                </div>
              </div>
            </div>
          )}
          
          {/* مقبض تغيير حجم الجدول */}
          <div
            className="resize-handle w-3 h-3 absolute bottom-0 left-0 cursor-nwse-resize"
            onMouseDown={handleResizeStart}
          />
        </CardContent>
      </Card>

      <style>
        {`
        .table-bordered th,
        .table-bordered td {
          border: 1px solid #e2e8f0;
        }
        .table-sm th,
        .table-sm td {
          padding: 0.5rem;
          font-size: 0.875rem;
        }
        .resize-handle {
          cursor: col-resize;
          border-bottom: 4px solid #cbd5e0;
          border-left: 4px solid #cbd5e0;
          transform: rotate(45deg);
          margin-left: 15px;
          margin-bottom: 10px;
        }
        .table-row-active {
          background-color: rgba(59, 130, 246, 0.05);
        }
        /* تحسين وضوح الخلية النشطة */
        [role="gridcell"]:focus {
          outline: 2px solid #3b82f6;
          outline-offset: -2px;
          background-color: rgba(59, 130, 246, 0.1);
        }
        [aria-selected="true"] {
          background-color: rgba(59, 130, 246, 0.1);
        }
        `}
      </style>
    </div>
  );
};

