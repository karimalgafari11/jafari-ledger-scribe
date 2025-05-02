
import React, { useRef } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
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
  // Auto-open item form when there are no items
  React.useEffect(() => {
    if (items.length === 0 && !isAddingItem && editingItemIndex === null) {
      setIsAddingItem(true);
    }
  }, [items, isAddingItem, editingItemIndex, setIsAddingItem]);

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-sm font-bold">الأصناف</h3>
        <Button 
          variant="outline" 
          size="xs" 
          onClick={() => setIsAddingItem(true)}
          className="h-5 text-xs"
          disabled={isAddingItem || editingItemIndex !== null}
        >
          <Plus className="ml-1 h-3 w-3" />
          إضافة صنف
        </Button>
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
        
        <Table className="w-full text-xs" bordered>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 border border-black text-center font-semibold py-0.5 text-xs">#</TableHead>
              <TableHead className="border border-black text-center font-semibold py-0.5 text-xs w-2/5">اسم الصنف</TableHead>
              <TableHead className="border border-black text-center font-semibold py-0.5 text-xs w-14">الكمية</TableHead>
              <TableHead className="border border-black text-center font-semibold py-0.5 text-xs w-24">السعر</TableHead>
              <TableHead className="border border-black text-center font-semibold py-0.5 text-xs w-24">الإجمالي</TableHead>
              <TableHead className="border border-black text-center font-semibold py-0.5 text-xs w-28">ملاحظات</TableHead>
              <TableHead className="text-center border border-black font-semibold print-hide py-0.5 text-xs w-12">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell 
                  colSpan={7} 
                  className="text-center py-1 text-muted-foreground border border-black text-xs"
                >
                  لا توجد أصناف في الفاتورة
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                  <TableCell className="border border-black text-center font-semibold py-0.5 text-xs">{index + 1}</TableCell>
                  <TableCell className="border border-black py-0.5 text-xs">{item.name}</TableCell>
                  <TableCell className="border border-black text-center py-0.5 text-xs">{item.quantity}</TableCell>
                  <TableCell className="border border-black text-center py-0.5 text-xs">{item.price.toFixed(2)}</TableCell>
                  <TableCell className="border border-black text-center font-semibold py-0.5 text-xs">{item.total.toFixed(2)}</TableCell>
                  <TableCell className="border border-black text-center py-0.5 text-xs">{item.notes || '-'}</TableCell>
                  <TableCell className="border border-black print-hide py-0.5">
                    <div className="flex space-x-1 rtl space-x-reverse justify-center">
                      <Button variant="ghost" size="xs" onClick={() => handleEditItem(index)} className="h-4 w-4 p-0">
                        <Pencil size={10} />
                      </Button>
                      <Button variant="ghost" size="xs" onClick={() => onRemoveItem(index)} className="h-4 w-4 p-0">
                        <Trash2 size={10} />
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
