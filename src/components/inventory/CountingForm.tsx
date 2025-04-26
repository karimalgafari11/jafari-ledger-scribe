
import React from "react";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { InventoryCountItem } from "@/types/inventory";
import { X } from "lucide-react";

interface CountingFormProps {
  warehouseId: string;
  warehouseName: string;
  onWarehouseChange: (name: string) => void;
  items: InventoryCountItem[];
  onItemCountChange: (itemId: string, count: number) => void;
  onSave: (notes: string) => void;
  onCancel: () => void;
}

export function CountingForm({
  warehouseId,
  warehouseName,
  onWarehouseChange,
  items,
  onItemCountChange,
  onSave,
  onCancel
}: CountingFormProps) {
  const [notes, setNotes] = React.useState("");

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>جرد مخزون جديد</CardTitle>
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="warehouse">المستودع</Label>
            <Input
              id="warehouse"
              value={warehouseName}
              onChange={(e) => onWarehouseChange(e.target.value)}
              placeholder="اختر المستودع"
            />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-lg">الأصناف</h3>
          
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              قم باختيار مستودع لعرض الأصناف المتوفرة فيه
            </div>
          ) : (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">الصنف</TableHead>
                    <TableHead className="text-center">الكمية المتوقعة</TableHead>
                    <TableHead className="text-center">الكمية الفعلية</TableHead>
                    <TableHead className="text-center">الفرق</TableHead>
                    <TableHead className="text-center">ملاحظات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map(item => (
                    <TableRow key={item.itemId}>
                      <TableCell className="font-medium">{item.itemName}</TableCell>
                      <TableCell className="text-center">{item.expectedQuantity}</TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          value={item.actualQuantity}
                          onChange={(e) => onItemCountChange(item.itemId, parseInt(e.target.value) || 0)}
                          className="w-24 mx-auto text-center"
                        />
                      </TableCell>
                      <TableCell className={`text-center font-medium ${
                        item.difference < 0 ? 'text-red-600' : 
                        item.difference > 0 ? 'text-green-600' : ''
                      }`}>
                        {item.difference}
                      </TableCell>
                      <TableCell>
                        <Input
                          value={item.notes}
                          placeholder="إضافة ملاحظة"
                          className="w-full"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">ملاحظات عامة</Label>
          <Input
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="إضافة ملاحظات حول عملية الجرد"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          إلغاء
        </Button>
        <Button onClick={() => onSave(notes)}>
          حفظ
        </Button>
      </CardFooter>
    </Card>
  );
}
