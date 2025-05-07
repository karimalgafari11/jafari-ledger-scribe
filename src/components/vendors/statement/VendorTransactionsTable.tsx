
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-right">
                  <th className="p-3 border border-gray-200">التاريخ</th>
                  <th className="p-3 border border-gray-200">البيان</th>
                  <th className="p-3 border border-gray-200">نوع الحركة</th>
                  <th className="p-3 border border-gray-200">المبلغ</th>
                  <th className="p-3 border border-gray-200">الرصيد</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="p-3 border border-gray-200">
                      {transaction.date.toLocaleDateString('ar-SA')}
                    </td>
                    <td className="p-3 border border-gray-200">{transaction.description}</td>
                    <td className="p-3 border border-gray-200">
                      {transaction.type === 'purchase' && 'فاتورة مشتريات'}
                      {transaction.type === 'payment' && 'دفعة سداد'}
                      {transaction.type === 'return' && 'مرتجع بضاعة'}
                    </td>
                    <td className={`p-3 border border-gray-200 ${
                      transaction.amount < 0 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {Math.abs(transaction.amount).toLocaleString()} ريال
                      {transaction.amount < 0 ? ' (خصم)' : ''}
                    </td>
                    <td className="p-3 border border-gray-200 font-medium">
                      {transaction.balance.toLocaleString()} ريال
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
