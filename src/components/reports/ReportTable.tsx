
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Expense } from "@/types/expenses";

interface ReportTableProps {
  expenses: Expense[];
}

export const ReportTable: React.FC<ReportTableProps> = ({ expenses }) => {
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">التاريخ</TableHead>
            <TableHead className="text-right">الوصف</TableHead>
            <TableHead className="text-right">التصنيف</TableHead>
            <TableHead className="text-right">طريقة الدفع</TableHead>
            <TableHead className="text-right">المبلغ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-4">
                لا توجد مصروفات لعرضها
              </TableCell>
            </TableRow>
          ) : (
            expenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="text-right">
                  {format(expense.date, "dd/MM/yyyy", { locale: ar })}
                </TableCell>
                <TableCell className="text-right">
                  {expense.description}
                </TableCell>
                <TableCell className="text-right">{expense.category}</TableCell>
                <TableCell className="text-right">
                  {expense.paymentMethod === "cash" && "نقداً"}
                  {expense.paymentMethod === "credit" && "بطاقة ائتمان"}
                  {expense.paymentMethod === "bank" && "تحويل بنكي"}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {expense.amount.toLocaleString("ar-SA")} ريال
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
