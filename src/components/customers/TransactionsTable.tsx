
import { Transaction } from "@/types/transactions";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, CreditCard, RotateCcw } from "lucide-react";

interface TransactionsTableProps {
  transactions: Transaction[];
  totalBalance: number;
}

export const TransactionsTable = ({ transactions, totalBalance }: TransactionsTableProps) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "invoice":
        return <FileText size={16} className="text-blue-500" />;
      case "payment":
        return <CreditCard size={16} className="text-green-500" />;
      case "return":
        return <RotateCcw size={16} className="text-amber-500" />;
      default:
        return null;
    }
  };

  const totalCredit = transactions.reduce((sum, t) => sum + t.credit, 0);
  const totalDebit = transactions.reduce((sum, t) => sum + t.debit, 0);

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="text-right font-bold text-gray-700">التاريخ</TableHead>
                <TableHead className="text-right font-bold text-gray-700">المرجع</TableHead>
                <TableHead className="text-right font-bold text-gray-700">نوع المعاملة</TableHead>
                <TableHead className="text-right font-bold text-gray-700">الوصف</TableHead>
                <TableHead className="text-right font-bold text-gray-700">الخصم</TableHead>
                <TableHead className="text-right font-bold text-gray-700">الإضافة</TableHead>
                <TableHead className="text-right font-bold text-gray-700">الرصيد</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-gray-50 border-t border-gray-200">
                <TableCell colSpan={5} className="font-medium text-right">الرصيد الافتتاحي</TableCell>
                <TableCell className="text-right"></TableCell>
                <TableCell className="text-right font-bold">0.00</TableCell>
              </TableRow>
              
              {transactions.map((transaction) => (
                <TableRow key={transaction.id} className="hover:bg-gray-50 border-t border-gray-200">
                  <TableCell className="text-right">{formatDate(transaction.date.toISOString())}</TableCell>
                  <TableCell className="text-right">{transaction.reference}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {getTransactionIcon(transaction.type)}
                      <span>{transaction.type === 'invoice' ? 'فاتورة' : transaction.type === 'payment' ? 'دفعة' : 'مرتجع'}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{transaction.description}</TableCell>
                  <TableCell className="text-right text-red-600">
                    {transaction.debit > 0 ? formatCurrency(transaction.debit) : ''}
                  </TableCell>
                  <TableCell className="text-right text-green-600">
                    {transaction.credit > 0 ? formatCurrency(transaction.credit) : ''}
                  </TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(transaction.balance)}</TableCell>
                </TableRow>
              ))}
              
            </TableBody>
            <TableFooter>
              <TableRow className="bg-gray-100 font-bold border-t-2 border-gray-300">
                <TableCell colSpan={4} className="text-right">الإجمالي</TableCell>
                <TableCell className="text-right text-red-600">{formatCurrency(totalDebit)}</TableCell>
                <TableCell className="text-right text-green-600">{formatCurrency(totalCredit)}</TableCell>
                <TableCell className="text-right">{formatCurrency(totalBalance)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
