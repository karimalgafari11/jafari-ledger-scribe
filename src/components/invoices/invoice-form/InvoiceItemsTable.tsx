
import React, { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceItem } from "@/types/invoices";
import { InvoiceItemRow } from "./InvoiceItemRow";
import { InvoiceItemSection } from "./InvoiceItemSection";
import { useInvoiceTable } from "@/hooks/sales/useInvoiceTable";
import { InvoiceSettingsType } from "./InvoiceSettings";

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
  const [editingItem, setEditingItem] = useState<InvoiceItem | undefined>(
    editingItemIndex !== null ? items[editingItemIndex] : undefined
  );

  const {
    activeSearchCell,
    showGridLines,
    handleCellClick,
    handleDirectEdit,
    handleProductSelect,
    finishEditing,
    handleKeyNavigation,
    cellRefs
  } = useInvoiceTable({
    items,
    onUpdateItem: (index, item) => {
      // خاص بالتحديث
      console.log("Updating item:", index, item);
    },
    onRemoveItem,
    isAddingItem,
    editingItemIndex,
    setEditingItemIndex: handleEditItem
  });

  // التحقق مما إذا كانت الخلية في وضع التحرير
  const isEditingCell = (rowIndex: number, cellName: string): boolean => {
    return activeSearchCell !== null && 
           activeSearchCell.rowIndex === rowIndex && 
           activeSearchCell.cellName === cellName;
  };

  // مقبض لإضافة عنصر جديد
  const handleAddItemClick = () => {
    if (editingItemIndex === null) {
      setIsAddingItem(true);
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
      // تنفيذ التحديث
      console.log("Saving edited item:", item);
    }
    handleEditItem(null);
  };

  // عرض أكواد العناصر
  const showItemCodes = settings?.showItemCodes !== false;
  // عرض ملاحظات العناصر
  const showItemNotes = settings?.showItemNotes !== false;

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

      {/* جدول العناصر */}
      <Card>
        <CardContent className="p-0">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">الأصناف والخدمات</h3>
            <Button 
              onClick={handleAddItemClick}
              disabled={isAddingItem || editingItemIndex !== null}
              size="sm"
              className="gap-1"
            >
              <Plus className="w-4 h-4" /> إضافة صنف
            </Button>
          </div>
          
          <div 
            ref={tableRef} 
            className="overflow-x-auto" 
            style={{ width: `${tableWidth}%` }}
          >
            <Table className={showGridLines ? 'table-bordered' : ''}>
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
                      className="text-center py-8 text-muted-foreground"
                    >
                      لم يتم إضافة أصناف بعد. اضغط على زر "إضافة صنف" لإضافة صنف جديد.
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((item, index) => (
                    <InvoiceItemRow
                      key={item.id}
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
              إجمالي الأصناف: {items.length}
            </div>
          )}
          
          {/* مقبض تغيير حجم الجدول */}
          <div
            className="resize-handle w-3 h-3 absolute bottom-0 left-0 cursor-nwse-resize"
            onMouseDown={handleResizeStart}
          />
        </CardContent>
      </Card>

      {/* Fix: Remove the jsx attribute from the style tag */}
      <style>
        {`
        .table-bordered th,
        .table-bordered td {
          border: 1px solid #e2e8f0;
        }
        .resize-handle {
          cursor: col-resize;
          border-bottom: 4px solid #cbd5e0;
          border-left: 4px solid #cbd5e0;
          transform: rotate(45deg);
          margin-left: 15px;
          margin-bottom: 10px;
        }
        `}
      </style>
    </div>
  );
};
