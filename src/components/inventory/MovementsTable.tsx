
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Trash2 } from "lucide-react";
import { StockMovement } from "@/types/inventory";

interface MovementsTableProps {
  movements: StockMovement[];
  onDelete: (id: string) => void;
  onViewDetails: (id: string) => void;
  onExport: (id: string) => void;
  selectedMovements: string[];
  onToggleSelection: (id: string) => void;
}

export function MovementsTable({
  movements,
  onDelete,
  onViewDetails,
  onExport,
  selectedMovements,
  onToggleSelection
}: MovementsTableProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const getMovementTypeBadge = (type: 'inbound' | 'outbound' | 'transfer') => {
    switch (type) {
      case 'inbound':
        return <Badge className="bg-green-600">وارد</Badge>;
      case 'outbound':
        return <Badge className="bg-red-600">صادر</Badge>;
      case 'transfer':
        return <Badge className="bg-blue-600">نقل</Badge>;
      default:
        return null;
    }
  };

  return (
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
                  movements.forEach(item => {
                    if (isChecked && !selectedMovements.includes(item.id)) {
                      onToggleSelection(item.id);
                    } else if (!isChecked && selectedMovements.includes(item.id)) {
                      onToggleSelection(item.id);
                    }
                  });
                }}
                checked={movements.length > 0 && selectedMovements.length === movements.length}
              />
            </TableHead>
            <TableHead className="text-center">التاريخ</TableHead>
            <TableHead className="text-center">نوع الحركة</TableHead>
            <TableHead className="text-center">الصنف</TableHead>
            <TableHead className="text-center">الكمية</TableHead>
            <TableHead className="text-center">المصدر</TableHead>
            <TableHead className="text-center">الوجهة</TableHead>
            <TableHead className="text-center">ملاحظات</TableHead>
            <TableHead className="text-center">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {movements.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-gray-500 text-lg">
                لا توجد حركات مخزون مسجلة
              </TableCell>
            </TableRow>
          ) : (
            movements.map(movement => (
              <TableRow key={movement.id}>
                <TableCell className="text-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={selectedMovements.includes(movement.id)}
                    onChange={() => onToggleSelection(movement.id)}
                  />
                </TableCell>
                <TableCell className="text-center">{formatDate(movement.date)}</TableCell>
                <TableCell className="text-center">{getMovementTypeBadge(movement.type)}</TableCell>
                <TableCell className="text-center font-medium">{movement.itemName}</TableCell>
                <TableCell className="text-center">{movement.quantity}</TableCell>
                <TableCell className="text-center">{movement.sourceWarehouse}</TableCell>
                <TableCell className="text-center">{movement.destinationWarehouse}</TableCell>
                <TableCell className="text-center">{movement.notes}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center space-x-1 rtl:space-x-reverse">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewDetails(movement.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onExport(movement.id)}
                    >
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(movement.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-100"
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
  );
}
