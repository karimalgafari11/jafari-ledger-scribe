import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DateRange } from "react-day-picker";
import { EmptyStatementNotice } from "@/components/customers/statement/EmptyStatementNotice";
import { Customer } from "@/types/customers";

interface Transaction {
  id: string;
  date: Date;
  description: string;
  type: string;
  amount: number;
  balance: number;
}

interface VendorTransactionsTableProps {
  transactions: Transaction[];
  dateRange: DateRange;
  onDateRangeChange: (dateRange: DateRange) => void;
  vendorAsCustomer: Customer;
  onResetDateRange: () => void;
}

export const VendorTransactionsTable: React.FC<VendorTransactionsTableProps> = ({
  transactions,
  dateRange,
  onDateRangeChange,
  vendorAsCustomer,
  onResetDateRange,
}) => {
  return (
    <Card className="mt-6">
      <CardHeader className="flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg font-medium">كشف حساب {vendorAsCustomer.name}</CardTitle>
        <div className="w-64">
          <DatePickerWithRange value={dateRange} onChange={onDateRangeChange} />
        </div>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader className="p-3 border border-gray-200">التاريخ</TableHeader>
                  <TableHeader className="p-3 border border-gray-200">البيان</TableHeader>
                  <TableHeader className="p-3 border border-gray-200">نوع الحركة</TableHeader>
                  <TableHeader className="p-3 border border-gray-200">المبلغ</TableHeader>
                  <TableHeader className="p-3 border border-gray-200">الرصيد</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map(transaction => (
                  <TableRow key={transaction.id} className="hover:bg-gray-50">
                    <TableCell className="p-3 border border-gray-200">
                      {transaction.date.toLocaleDateString('ar-SA')}
                    </TableCell>
                    <TableCell className="p-3 border border-gray-200">{transaction.description}</TableCell>
                    <TableCell className="p-3 border border-gray-200">
                      {transaction.type === 'purchase' && 'فاتورة مشتريات'}
                      {transaction.type === 'payment' && 'دفعة سداد'}
                      {transaction.type === 'return' && 'مرتجع بضاعة'}
                    </TableCell>
                    <TableCell className={`p-3 border border-gray-200 ${
                      transaction.amount < 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {Math.abs(transaction.amount).toLocaleString()} ريال
                      {transaction.amount < 0 ? ' (خصم)' : ''}
                    </TableCell>
                    <TableCell className="p-3 border border-gray-200 font-medium">
                      {transaction.balance.toLocaleString()} ريال
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyStatementNotice 
            customer={vendorAsCustomer}
            onDateRangeReset={onResetDateRange} 
          />
        )}
      </CardContent>
    </Card>
  );
};
