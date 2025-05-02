
import React, { useRef } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
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

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">الأصناف</h3>
        <Button 
          onClick={() => setIsAddingItem(true)} 
          variant="outline" 
          disabled={isAddingItem || editingItemIndex !== null}
        >
          <Plus className="ml-2 h-4 w-4" />
          إضافة صنف
        </Button>
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
        
        <Table className="w-full" gridLines="both" bordered>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-12 border-2 border-black text-center font-bold">#</TableHead>
              {showItemCodes && (
                <TableHead className="border-2 border-black text-center font-bold">رقم الماده</TableHead>
              )}
              <TableHead className="border-2 border-black text-center font-bold">اسم الماده</TableHead>
              <TableHead className="border-2 border-black text-center font-bold">الكمية</TableHead>
              <TableHead className="border-2 border-black text-center font-bold">السعر</TableHead>
              {settings?.showDiscount !== false && (
                <TableHead className="border-2 border-black text-center font-bold">الخصم</TableHead>
              )}
              <TableHead className="border-2 border-black text-center font-bold">الإجمالي</TableHead>
              {showItemNotes && (
                <TableHead className="border-2 border-black text-center font-bold">ملاحظات</TableHead>
              )}
              <TableHead className="text-center border-2 border-black font-bold print-hide">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={showItemCodes && showItemNotes ? 9 : (showItemCodes || showItemNotes ? 8 : 7)} 
                  className="text-center py-4 text-muted-foreground border-2 border-black"
                >
                  لا توجد أصناف في الفاتورة. قم بإضافة صنف باستخدام زر "إضافة صنف".
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={index} className="border-2 border-black">
                  <TableCell className="border-2 border-black text-center font-bold">{index + 1}</TableCell>
                  {showItemCodes && (
                    <TableCell className="border-2 border-black text-center">{item.code || '-'}</TableCell>
                  )}
                  <TableCell className="border-2 border-black text-center">{item.name}</TableCell>
                  <TableCell className="border-2 border-black text-center">{item.quantity}</TableCell>
                  <TableCell className="border-2 border-black text-center">{item.price.toFixed(2)} ر.س</TableCell>
                  {settings?.showDiscount !== false && (
                    <TableCell className="border-2 border-black text-center">
                      {item.discount > 0 && (
                        <Badge variant="outline">
                          {item.discountType === 'percentage' ? `${item.discount}%` : `${item.discount} ر.س`}
                        </Badge>
                      )}
                    </TableCell>
                  )}
                  <TableCell className="border-2 border-black text-center font-bold">{item.total.toFixed(2)} ر.س</TableCell>
                  {showItemNotes && (
                    <TableCell className="border-2 border-black text-center">{item.notes || '-'}</TableCell>
                  )}
                  <TableCell className="border-2 border-black print-hide">
                    <div className="flex space-x-2 rtl space-x-reverse justify-center">
                      <Button variant="ghost" size="sm" onClick={() => handleEditItem(index)}>
                        <Pencil size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onRemoveItem(index)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-xs text-muted-foreground mt-2">* اسحب من الجانب الأيمن لتغيير حجم الجدول</div>
    </div>
  );
};
