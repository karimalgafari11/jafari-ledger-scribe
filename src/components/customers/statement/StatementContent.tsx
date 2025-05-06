
import { Transaction } from "@/types/transactions";
import { Customer } from "@/types/customers";
import { TransactionsTable } from "@/components/customers/TransactionsTable";
import { FileText } from "lucide-react";

interface StatementContentProps {
  transactions: Transaction[];
  customer: Customer;
}

export const StatementContent = ({ transactions, customer }: StatementContentProps) => {
  return (
    <>
      {transactions.length > 0 ? (
        <TransactionsTable 
          transactions={transactions} 
          totalBalance={customer.balance}
        />
      ) : (
        <div className="text-center py-12 bg-gray-50 border border-dashed border-gray-300 rounded-md">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">لا توجد معاملات في الفترة المحددة</p>
          <p className="text-gray-500 text-sm mt-1">يمكنك تغيير نطاق البحث لعرض المزيد من المعاملات</p>
        </div>
      )}
    </>
  );
};
