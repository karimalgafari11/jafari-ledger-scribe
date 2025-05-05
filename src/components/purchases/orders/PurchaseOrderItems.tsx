
import React, { useState } from "react";
import { PurchaseItem } from "@/types/purchases";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Plus, Edit, Trash2 } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { PurchaseItemDialog } from "./PurchaseItemDialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { v4 as uuidv4 } from "uuid";

interface PurchaseOrderItemsProps {
  items: PurchaseItem[];
  onAddItem: (item: PurchaseItem) => void;
  onUpdateItem: (index: number, item: PurchaseItem) => void;
  onRemoveItem: (index: number) => void;
}

export const PurchaseOrderItems: React.FC<PurchaseOrderItemsProps> = ({
  items,
  onAddItem,
  onUpdateItem,
  onRemoveItem
}) => {
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<{ item: PurchaseItem, index: number } | null>(null);
  
  const handleAddItem = () => {
    setEditingItem(null);
    setShowItemDialog(true);
  };
  
  const handleEditItem = (item: PurchaseItem, index: number) => {
    setEditingItem({ item, index });
    setShowItemDialog(true);
  };
  
  const handleSaveItem = (item: PurchaseItem) => {
    if (editingItem) {
      onUpdateItem(editingItem.index, item);
    } else {
      onAddItem(item);
    }
    setShowItemDialog(false);
    setEditingItem(null);
  };
  
  const handleCloseDialog = () => {
    setShowItemDialog(false);
    setEditingItem(null);
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>الأصناف</CardTitle>
        <Button onClick={handleAddItem}>
          <Plus className="ml-2 h-4 w-4" />
          إضافة صنف
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>رمز الصنف</TableHead>
                <TableHead>اسم الصنف</TableHead>
                <TableHead>الكمية</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>الخصم</TableHead>
                <TableHead>الضريبة</TableHead>
                <TableHead>المجموع</TableHead>
                <TableHead className="text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center text-muted-foreground">
                    لا توجد أصناف بعد. انقر على إضافة صنف لإضافة صنف جديد.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{formatCurrency(item.price)}</TableCell>
                    <TableCell>
                      {item.discount ? 
                        `${item.discount}${item.discountType === 'percentage' ? '%' : ' ر.س'}` : 
                        '-'}
                    </TableCell>
                    <TableCell>{item.tax ? `${item.tax}%` : '-'}</TableCell>
                    <TableCell className="font-semibold">{formatCurrency(item.total)}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditItem(item, index)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onRemoveItem(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      {showItemDialog && (
        <PurchaseItemDialog
          open={showItemDialog}
          onClose={handleCloseDialog}
          onSave={handleSaveItem}
          initialItem={editingItem?.item}
          isEditing={!!editingItem}
        />
      )}
    </Card>
  );
};
