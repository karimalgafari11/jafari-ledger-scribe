
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { CashRegister } from "@/types/definitions";

interface CashRegisterTableProps {
  registers: CashRegister[];
  onEditRegister: (register: CashRegister) => void;
  onDeleteRegister: (register: CashRegister) => void;
  isLoading?: boolean;
}

export const CashRegisterTable = ({
  registers,
  onEditRegister,
  onDeleteRegister,
  isLoading = false,
}: CashRegisterTableProps) => {
  if (isLoading) {
    return <div className="py-4 text-center">جاري التحميل...</div>;
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الرمز</TableHead>
            <TableHead>اسم الصندوق</TableHead>
            <TableHead>الفرع</TableHead>
            <TableHead>العملة</TableHead>
            <TableHead>الرصيد الحالي</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                لا توجد صناديق نقدية
              </TableCell>
            </TableRow>
          ) : (
            registers.map((register) => (
              <TableRow key={register.id}>
                <TableCell>{register.code}</TableCell>
                <TableCell className="font-medium">{register.name}</TableCell>
                <TableCell>{register.branchName}</TableCell>
                <TableCell>{register.currencyCode}</TableCell>
                <TableCell>{register.balance.toLocaleString()} {register.currencyCode}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      register.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {register.isActive ? "نشط" : "غير نشط"}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditRegister(register)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteRegister(register)}
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
};
