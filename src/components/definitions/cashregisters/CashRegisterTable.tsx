
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Check, X } from "lucide-react";
import { CashRegister } from "@/types/definitions";
import { Skeleton } from "@/components/ui/skeleton";

interface CashRegisterTableProps {
  registers: CashRegister[];
  isLoading: boolean;
  onEdit: (register: CashRegister) => void;
  onDelete: (register: CashRegister) => void;
  onToggleStatus: (id: string) => void;
}

export const CashRegisterTable: React.FC<CashRegisterTableProps> = ({
  registers,
  isLoading,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">الرمز</TableHead>
            <TableHead>اسم الصندوق</TableHead>
            <TableHead>الفرع</TableHead>
            <TableHead>العملة</TableHead>
            <TableHead>الرصيد</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="text-left">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                لا توجد صناديق نقدية مضافة
              </TableCell>
            </TableRow>
          ) : (
            registers.map((register) => (
              <TableRow key={register.id}>
                <TableCell className="font-medium">{register.code}</TableCell>
                <TableCell>{register.name}</TableCell>
                <TableCell>{register.branchName}</TableCell>
                <TableCell>{register.currencyCode}</TableCell>
                <TableCell>{register.balance.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={register.isActive ? "default" : "secondary"}
                    className="cursor-pointer"
                    onClick={() => onToggleStatus(register.id)}
                  >
                    {register.isActive ? "نشط" : "غير نشط"}
                  </Badge>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(register)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(register)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
