
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ReorderItem } from "@/types/inventory";

interface ReorderTableProps {
  items: ReorderItem[];
  selectedItems: string[];
  onToggleSelection: (id: string) => void;
  onCreateOrder: () => void;
}

export function ReorderTable({
  items,
  selectedItems,
  onToggleSelection,
  onCreateOrder
}: ReorderTableProps) {
  return (
    <div className="space-y-4">
      {items.length > 0 && (
        <div className="flex justify-end">
          <Button 
            onClick={onCreateOrder}
            disabled={selectedItems.length === 0}
            className="gap-2 bg-teal hover:bg-teal-dark"
          >
            إنشاء طلب شراء للمنتجات المحددة
          </Button>
        </div>
      )}
      
      <div className="border rounded-lg overflow-hidden bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={e => {
                    const isChecked = e.target.checked;
                    items.forEach(item => {
                      if (isChecked && !selectedItems.includes(item.itemId)) {
                        onToggleSelection(item.itemId);
                      } else if (!isChecked && selectedItems.includes(item.itemId)) {
                        onToggleSelection(item.itemId);
                      }
                    });
                  }}
                  checked={items.length > 0 && selectedItems.length === items.length}
                />
              </TableHead>
              <TableHead className="text-center">الصنف</TableHead>
              <TableHead className="text-center">المستودع</TableHead>
              <TableHead className="text-center">الكمية المتاحة</TableHead>
              <TableHead className="text-center">حد إعادة الطلب</TableHead>
              <TableHead className="text-center">الكمية المقترحة للطلب</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500 text-lg">
                  لا توجد أصناف تحتاج لإعادة طلب
                </TableCell>
              </TableRow>
            ) : (
              items.map(item => (
                <TableRow key={item.itemId}>
                  <TableCell className="text-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedItems.includes(item.itemId)}
                      onChange={() => onToggleSelection(item.itemId)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.itemName}</TableCell>
                  <TableCell className="text-center">{item.warehouseName}</TableCell>
                  <TableCell className={`text-center ${item.availableQuantity === 0 ? 'font-bold text-red-600' : 'text-orange-600'}`}>
                    {item.availableQuantity}
                  </TableCell>
                  <TableCell className="text-center">{item.reorderThreshold}</TableCell>
                  <TableCell className="text-center text-green-600 font-medium">
                    {item.suggestedOrderQuantity}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
