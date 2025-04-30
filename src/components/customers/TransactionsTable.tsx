
import { Transaction } from "@/types/transactions";
import { formatCurrency, formatDate } from "@/utils/formatters";

interface TransactionsTableProps {
  transactions: Transaction[];
  totalBalance: number;
}

export const TransactionsTable = ({ transactions, totalBalance }: TransactionsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rtl">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-right">التاريخ</th>
            <th className="border p-2 text-right">المرجع</th>
            <th className="border p-2 text-right">الوصف</th>
            <th className="border p-2 text-right">الخصم</th>
            <th className="border p-2 text-right">الإضافة</th>
            <th className="border p-2 text-right">الرصيد</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-50">
            <td className="border p-2" colSpan={5}>الرصيد الافتتاحي</td>
            <td className="border p-2 font-bold">0.00</td>
          </tr>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="hover:bg-gray-50">
              <td className="border p-2">{formatDate(transaction.date.toISOString())}</td>
              <td className="border p-2">{transaction.reference}</td>
              <td className="border p-2">{transaction.description}</td>
              <td className="border p-2 text-red-600">
                {transaction.debit > 0 ? formatCurrency(transaction.debit) : ''}
              </td>
              <td className="border p-2 text-green-600">
                {transaction.credit > 0 ? formatCurrency(transaction.credit) : ''}
              </td>
              <td className="border p-2 font-medium">{formatCurrency(transaction.balance)}</td>
            </tr>
          ))}
          <tr className="bg-gray-100 font-bold">
            <td className="border p-2" colSpan={3}>الإجمالي</td>
            <td className="border p-2 text-red-600">{formatCurrency(transactions.reduce((sum, t) => sum + t.debit, 0))}</td>
            <td className="border p-2 text-green-600">{formatCurrency(transactions.reduce((sum, t) => sum + t.credit, 0))}</td>
            <td className="border p-2">{formatCurrency(totalBalance)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
