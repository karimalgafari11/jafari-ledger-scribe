
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ArrowUpDown, Eye } from "lucide-react";
import { CashRegister } from "@/types/definitions";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CashRegisterTableProps {
  registers: CashRegister[];
  onEditRegister: (register: CashRegister) => void;
  onDeleteRegister: (register: CashRegister) => void;
  onViewTransactions?: (register: CashRegister) => void;
  isLoading?: boolean;
}

export const CashRegisterTable = ({
  registers,
  onEditRegister,
  onDeleteRegister,
  onViewTransactions,
  isLoading = false,
}: CashRegisterTableProps) => {
  if (isLoading) {
    return <div className="py-4 text-center">جاري التحميل...</div>;
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
            <TableHead className="text-left">الرصيد الحالي</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead className="text-center w-[120px]">الإجراءات</TableHead>
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
                <TableCell className="font-medium">{register.code}</TableCell>
                <TableCell>{register.name}</TableCell>
                <TableCell>{register.branchName}</TableCell>
                <TableCell>{register.currencyCode}</TableCell>
                <TableCell className="text-left font-medium">
                  {register.balance.toLocaleString()} {register.currencyCode}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={register.isActive ? "default" : "secondary"}
                    className={`${register.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    {register.isActive ? "نشط" : "غير نشط"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center space-x-1 rtl:space-x-reverse">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <ArrowUpDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onViewTransactions && (
                          <DropdownMenuItem onClick={() => onViewTransactions(register)}>
                            <Eye className="ml-2 h-4 w-4" />
                            عرض العمليات
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem onClick={() => onEditRegister(register)}>
                          <Edit className="ml-2 h-4 w-4" />
                          تعديل
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDeleteRegister(register)} className="text-red-600">
                          <Trash2 className="ml-2 h-4 w-4" />
                          حذف
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
