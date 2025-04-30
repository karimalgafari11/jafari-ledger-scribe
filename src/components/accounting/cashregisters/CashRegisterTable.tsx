
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CashRegister } from "@/types/definitions";
import { Edit, Trash2 } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface CashRegisterTableProps {
  registers: CashRegister[];
  isLoading: boolean;
  onEdit: (register: CashRegister) => void;
  onDelete: (register: CashRegister) => void;
}

export const CashRegisterTable = ({
  registers,
  isLoading,
  onEdit,
  onDelete,
}: CashRegisterTableProps) => {
  return (
    <div className="rounded-md border">
      <Table dir="rtl">
        <TableHeader>
          <TableRow>
            <TableHead>الرمز</TableHead>
            <TableHead>الإسم</TableHead>
            <TableHead>الفرع</TableHead>
            <TableHead>العملة</TableHead>
            <TableHead>الرصيد</TableHead>
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
          ) : registers.length > 0 ? (
            registers.map((register) => (
              <TableRow key={register.id}>
                <TableCell>{register.code}</TableCell>
                <TableCell>{register.name}</TableCell>
                <TableCell>{register.branchName}</TableCell>
                <TableCell>{register.currencyCode}</TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(register.balance, register.currencyCode)}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={register.isActive ? "outline" : "secondary"}
                    className={register.isActive ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                  >
                    {register.isActive ? "نشط" : "غير نشط"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(register)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(register)}
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
                لا توجد صناديق مسجلة
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
