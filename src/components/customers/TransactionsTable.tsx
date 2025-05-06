
import { Transaction } from "@/types/transactions";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, CreditCard, RotateCcw, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface TransactionsTableProps {
  transactions: Transaction[];
  totalBalance: number;
}

export const TransactionsTable = ({ transactions, totalBalance }: TransactionsTableProps) => {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

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

  const getTransactionBadge = (type: string) => {
    switch (type) {
      case "invoice":
        return <Badge variant="outline" className="bg-blue-50 text-blue-500 border-blue-200">فاتورة</Badge>;
      case "payment":
        return <Badge variant="outline" className="bg-green-50 text-green-500 border-green-200">دفعة</Badge>;
      case "return":
        return <Badge variant="outline" className="bg-amber-50 text-amber-500 border-amber-200">مرتجع</Badge>;
      default:
        return null;
    }
  };

  const totalCredit = transactions.reduce((sum, t) => sum + t.credit, 0);
  const totalDebit = transactions.reduce((sum, t) => sum + t.debit, 0);

  const toggleRowExpand = (id: string) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table hoverable striped>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="w-10"></TableHead>
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
                <TableCell className="text-right"></TableCell>
                <TableCell className="text-right font-bold">0.00</TableCell>
              </TableRow>
              
              {transactions.map((transaction) => (
                <>
                  <TableRow 
                    key={transaction.id} 
                    className="hover:bg-gray-50 border-t border-gray-200 cursor-pointer"
                    onClick={() => toggleRowExpand(transaction.id)}
                  >
                    <TableCell className="text-center">
                      {expandedRow === transaction.id ? 
                        <ChevronUp size={16} className="text-gray-500" /> :
                        <ChevronDown size={16} className="text-gray-500" />
                      }
                    </TableCell>
                    <TableCell className="text-right">{formatDate(transaction.date.toISOString())}</TableCell>
                    <TableCell className="text-right font-medium">{transaction.reference}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {getTransactionBadge(transaction.type)}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{transaction.description}</TableCell>
                    <TableCell className="text-right text-red-600 font-medium">
                      {transaction.debit > 0 ? formatCurrency(transaction.debit) : ''}
                    </TableCell>
                    <TableCell className="text-right text-green-600 font-medium">
                      {transaction.credit > 0 ? formatCurrency(transaction.credit) : ''}
                    </TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(transaction.balance)}</TableCell>
                  </TableRow>
                  
                  {expandedRow === transaction.id && (
                    <TableRow className="bg-gray-50">
                      <TableCell colSpan={8} className="p-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <h5 className="text-xs font-medium text-gray-500">رقم المرجع</h5>
                            <p className="text-sm">{transaction.reference}</p>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-gray-500">نوع المعاملة</h5>
                            <div className="flex items-center gap-1 mt-1">
                              {getTransactionIcon(transaction.type)}
                              <p className="text-sm">{transaction.type === 'invoice' ? 'فاتورة' : transaction.type === 'payment' ? 'دفعة' : 'مرتجع'}</p>
                            </div>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-gray-500">التاريخ</h5>
                            <p className="text-sm">{formatDate(transaction.date.toISOString())}</p>
                          </div>
                          <div>
                            <h5 className="text-xs font-medium text-gray-500">الرصيد بعد المعاملة</h5>
                            <p className="text-sm font-bold">{formatCurrency(transaction.balance)}</p>
                          </div>
                          <div className="col-span-full">
                            <h5 className="text-xs font-medium text-gray-500">الوصف</h5>
                            <p className="text-sm">{transaction.description}</p>
                          </div>
                          <div className="col-span-full flex gap-2">
                            <button className="px-3 py-1 bg-blue-50 text-blue-600 rounded text-xs hover:bg-blue-100 transition-colors">
                              عرض التفاصيل
                            </button>
                            <button className="px-3 py-1 bg-gray-50 text-gray-600 rounded text-xs hover:bg-gray-100 transition-colors">
                              طباعة الإيصال
                            </button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
              
            </TableBody>
            <TableFooter>
              <TableRow className="bg-gray-100 font-bold border-t-2 border-gray-300">
                <TableCell colSpan={5} className="text-right">الإجمالي</TableCell>
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
