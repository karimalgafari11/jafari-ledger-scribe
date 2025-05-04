
import React, { useState } from "react";
import { PurchaseItem } from "@/types/purchases";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { PurchaseItemForm } from "./PurchaseItemForm";

interface PurchaseInvoiceTableProps {
  items: PurchaseItem[];
  isAddingItem: boolean;
  editingItemIndex: number | null;
  setIsAddingItem: (isAdding: boolean) => void;
  setEditingItemIndex: (index: number | null) => void;
  onAddItem: (item: Partial<PurchaseItem>) => void;
  onUpdateItem: (index: number, item: Partial<PurchaseItem>) => void;
  onRemoveItem: (index: number) => void;
}

export const PurchaseInvoiceTable: React.FC<PurchaseInvoiceTableProps> = ({
  items,
  isAddingItem,
  editingItemIndex,
  setIsAddingItem,
  setEditingItemIndex,
  onAddItem,
  onUpdateItem,
  onRemoveItem
}) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">الأصناف</h3>
        <Button 
          onClick={() => setIsAddingItem(true)} 
          className="flex items-center gap-1"
          size="sm"
          disabled={isAddingItem || editingItemIndex !== null}
        >
          <Plus size={16} /> إضافة صنف
        </Button>
      </div>
      
      {/* نموذج إضافة أو تحرير صنف */}
      {(isAddingItem || editingItemIndex !== null) && (
        <PurchaseItemForm 
          item={editingItemIndex !== null ? items[editingItemIndex] : undefined}
          onSubmit={(item) => {
            if (editingItemIndex !== null) {
              onUpdateItem(editingItemIndex, item);
            } else {
              onAddItem(item);
            }
          }}
          onCancel={() => {
            setIsAddingItem(false);
            setEditingItemIndex(null);
          }}
        />
      )}
      
      {/* جدول الأصناف */}
      <div className="border rounded overflow-auto">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="text-center border border-gray-300 p-2 w-12">#</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">اسم الصنف</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">رقم الصنف</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">المقاس</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">الشركة المصنعة</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">الكمية</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">السعر</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">الإجمالي</TableHead>
              <TableHead className="text-center border border-gray-300 p-2">ملاحظات</TableHead>
              <TableHead className="text-center border border-gray-300 p-2 w-20 print:hidden">إجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-4 border border-gray-300">
                  لا توجد أصناف. قم بالضغط على زر "إضافة صنف" لإضافة صنف جديد.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center border border-gray-300 p-2">{index + 1}</TableCell>
                  <TableCell className="border border-gray-300 p-2">{item.name}</TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">{item.code}</TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">{item.size || "-"}</TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">{item.manufacturer || "-"}</TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">{item.quantity}</TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">{item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-center border border-gray-300 p-2">{item.total.toFixed(2)}</TableCell>
                  <TableCell className="border border-gray-300 p-2">{item.notes || "-"}</TableCell>
                  <TableCell className="text-center border border-gray-300 p-2 print:hidden">
                    <div className="flex justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingItemIndex(index)}
                        disabled={isAddingItem || editingItemIndex !== null}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(index)}
                        disabled={isAddingItem || editingItemIndex !== null}
                      >
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
    </div>
  );
};
