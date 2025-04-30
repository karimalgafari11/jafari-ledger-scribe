
import { Transaction } from "@/types/transactions";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TransactionsTableProps {
  transactions: Transaction[];
  totalBalance: number;
}

export const TransactionsTable = ({ transactions, totalBalance }: TransactionsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="text-right">التاريخ</TableHead>
            <TableHead className="text-right">المرجع</TableHead>
            <TableHead className="text-right">الوصف</TableHead>
            <TableHead className="text-right">الخصم</TableHead>
            <TableHead className="text-right">الإضافة</TableHead>
            <TableHead className="text-right">الرصيد</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-gray-50 border-t border-gray-200">
            <TableCell colSpan={5} className="font-medium">الرصيد الافتتاحي</TableCell>
            <TableCell className="font-bold">0.00</TableCell>
          </TableRow>
          
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} className="hover:bg-gray-50 border-t border-gray-200">
              <TableCell>{formatDate(transaction.date.toISOString())}</TableCell>
              <TableCell>{transaction.reference}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className="text-red-600">
                {transaction.debit > 0 ? formatCurrency(transaction.debit) : ''}
              </TableCell>
              <TableCell className="text-green-600">
                {transaction.credit > 0 ? formatCurrency(transaction.credit) : ''}
              </TableCell>
              <TableCell className="font-medium">{formatCurrency(transaction.balance)}</TableCell>
            </TableRow>
          ))}
          
        </TableBody>
        <TableFooter>
          <TableRow className="bg-gray-100 font-bold border-t-2 border-gray-300">
            <TableCell colSpan={3}>الإجمالي</TableCell>
            <TableCell className="text-red-600">{formatCurrency(transactions.reduce((sum, t) => sum + t.debit, 0))}</TableCell>
            <TableCell className="text-green-600">{formatCurrency(transactions.reduce((sum, t) => sum + t.credit, 0))}</TableCell>
            <TableCell>{formatCurrency(totalBalance)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
