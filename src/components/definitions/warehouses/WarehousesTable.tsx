
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Warehouse } from "@/types/definitions";
import { Edit, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface WarehousesTableProps {
  warehouses: Warehouse[];
  isLoading: boolean;
  onEdit: (warehouse: Warehouse) => void;
  onDelete: (warehouse: Warehouse) => void;
  onToggleStatus: (id: string) => void;
}

export const WarehousesTable = ({
  warehouses,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
}: WarehousesTableProps) => {
  const getWarehouseTypeLabel = (type: 'main' | 'sub' | 'external') => {
    switch (type) {
      case 'main':
        return "رئيسي";
      case 'sub':
        return "فرعي";
      case 'external':
        return "خارجي";
      default:
        return "";
    }
  };

  const getWarehouseTypeColor = (type: 'main' | 'sub' | 'external') => {
    switch (type) {
      case 'main':
        return "bg-blue-100 text-blue-800 border-blue-200";
      case 'sub':
        return "bg-green-100 text-green-800 border-green-200";
      case 'external':
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="rounded-md border">
        <Table dir="rtl">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">الكود</TableHead>
              <TableHead className="min-w-[150px]">الاسم</TableHead>
              <TableHead>الفرع</TableHead>
              <TableHead>النوع</TableHead>
              <TableHead>التحكم بالمخزون</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="text-center">إدارة</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  جاري التحميل...
                </TableCell>
              </TableRow>
            ) : warehouses.length > 0 ? (
              warehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell className="font-medium">{warehouse.code}</TableCell>
                  <TableCell>{warehouse.name}</TableCell>
                  <TableCell>{warehouse.branchName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getWarehouseTypeColor(warehouse.type)}>
                      {getWarehouseTypeLabel(warehouse.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {warehouse.inventoryControl === 'automatic' ? "آلي" : "يدوي"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={warehouse.isActive}
                        onCheckedChange={() => onToggleStatus(warehouse.id)}
                      />
                      <Badge 
                        variant={warehouse.isActive ? "outline" : "secondary"}
                        className={warehouse.isActive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                      >
                        {warehouse.isActive ? "نشط" : "غير نشط"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(warehouse)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(warehouse)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  لا توجد مستودعات مسجلة
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
