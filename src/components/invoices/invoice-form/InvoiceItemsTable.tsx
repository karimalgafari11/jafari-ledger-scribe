
import React, { useRef } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { InvoiceItem } from "@/types/invoices";
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
  const showItemCodes = settings?.showItemCodes !== false;
  const showItemNotes = settings?.showItemNotes !== false;

  // Auto-open item form when there are no items
  React.useEffect(() => {
    if (items.length === 0 && !isAddingItem && editingItemIndex === null) {
      setIsAddingItem(true);
    }
  }, [items, isAddingItem, editingItemIndex, setIsAddingItem]);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-bold">الأصناف</h3>
      </div>
      
      <div 
        ref={tableRef} 
        className="border-2 border-black rounded-md overflow-x-auto relative" 
        style={{
          width: `${tableWidth}%`
        }}
      >
        {/* Resize handle */}
        <div 
          className="absolute top-0 bottom-0 right-0 w-2 cursor-ew-resize bg-primary/10 hover:bg-primary/20 transition-colors" 
          onMouseDown={handleResizeStart} 
        />
        
        <Table className="w-full text-sm" gridLines="both" bordered>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-10 border-2 border-black text-center font-bold py-1">#</TableHead>
              {showItemCodes && (
                <TableHead className="border-2 border-black text-center font-bold py-1">رقم الماده</TableHead>
              )}
              <TableHead className="border-2 border-black text-center font-bold py-1">اسم الماده</TableHead>
              <TableHead className="border-2 border-black text-center font-bold py-1">الكمية</TableHead>
              <TableHead className="border-2 border-black text-center font-bold py-1">السعر</TableHead>
              {settings?.showDiscount !== false && (
                <TableHead className="border-2 border-black text-center font-bold py-1">الخصم</TableHead>
              )}
              <TableHead className="border-2 border-black text-center font-bold py-1">الإجمالي</TableHead>
              {showItemNotes && (
                <TableHead className="border-2 border-black text-center font-bold py-1">ملاحظات</TableHead>
              )}
              <TableHead className="text-center border-2 border-black font-bold print-hide py-1">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={showItemCodes && showItemNotes ? 9 : (showItemCodes || showItemNotes ? 8 : 7)} 
                  className="text-center py-2 text-muted-foreground border-2 border-black text-xs"
                >
                  لا توجد أصناف في الفاتورة. قم بالبحث عن صنف أو خدمة.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={index} className="border-2 border-black">
                  <TableCell className="border-2 border-black text-center font-bold py-1">{index + 1}</TableCell>
                  {showItemCodes && (
                    <TableCell className="border-2 border-black text-center py-1">{item.code || '-'}</TableCell>
                  )}
                  <TableCell className="border-2 border-black text-center py-1">{item.name}</TableCell>
                  <TableCell className="border-2 border-black text-center py-1">{item.quantity}</TableCell>
                  <TableCell className="border-2 border-black text-center py-1">{item.price.toFixed(2)} ر.س</TableCell>
                  {settings?.showDiscount !== false && (
                    <TableCell className="border-2 border-black text-center py-1">
                      {item.discount > 0 && (
                        <Badge variant="outline" className="text-xs py-0">
                          {item.discountType === 'percentage' ? `${item.discount}%` : `${item.discount} ر.س`}
                        </Badge>
                      )}
                    </TableCell>
                  )}
                  <TableCell className="border-2 border-black text-center font-bold py-1">{item.total.toFixed(2)} ر.س</TableCell>
                  {showItemNotes && (
                    <TableCell className="border-2 border-black text-center py-1 text-xs">{item.notes || '-'}</TableCell>
                  )}
                  <TableCell className="border-2 border-black print-hide py-1">
                    <div className="flex space-x-1 rtl space-x-reverse justify-center">
                      <Button variant="ghost" size="xs" onClick={() => handleEditItem(index)} className="h-5 w-5">
                        <Pencil size={12} />
                      </Button>
                      <Button variant="ghost" size="xs" onClick={() => onRemoveItem(index)} className="h-5 w-5">
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
            <TableRow>
              <TableCell 
                colSpan={showItemCodes && showItemNotes ? 9 : (showItemCodes || showItemNotes ? 8 : 7)} 
                className="text-center border-2 border-black bg-muted/30 cursor-pointer hover:bg-muted py-1"
                onClick={() => !isAddingItem && editingItemIndex === null ? setIsAddingItem(true) : null}
              >
                <span className="text-xs text-muted-foreground">+ إضافة صنف جديد</span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="text-xs text-muted-foreground mt-1">* اسحب من الجانب الأيمن لتغيير حجم الجدول</div>
    </div>
  );
};
