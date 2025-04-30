
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

interface CashRegister {
  id: string;
  name: string;
  balance: number;
  location: string;
  responsiblePerson: string;
  lastTransaction: string;
  status: "active" | "inactive";
}

interface CashRegisterTableProps {
  registers: CashRegister[];
  onEditRegister: (register: CashRegister) => void;
  onDeleteRegister: (register: CashRegister) => void;
}

export const CashRegisterTable = ({
  registers,
  onEditRegister,
  onDeleteRegister,
}: CashRegisterTableProps) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>اسم الصندوق</TableHead>
            <TableHead>الرصيد الحالي</TableHead>
            <TableHead>الموقع</TableHead>
            <TableHead>المسؤول</TableHead>
            <TableHead>آخر معاملة</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registers.map((register) => (
            <TableRow key={register.id}>
              <TableCell className="font-medium">{register.name}</TableCell>
              <TableCell>{register.balance.toLocaleString()} ر.س</TableCell>
              <TableCell>{register.location}</TableCell>
              <TableCell>{register.responsiblePerson}</TableCell>
              <TableCell>{register.lastTransaction}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    register.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {register.status === "active" ? "نشط" : "غير نشط"}
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
