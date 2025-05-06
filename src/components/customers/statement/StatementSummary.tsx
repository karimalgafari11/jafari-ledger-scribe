
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/types/transactions";
import { formatCurrency } from "@/utils/formatters";

interface StatementSummaryProps {
  transactions: Transaction[];
}

export const StatementSummary = ({ transactions }: StatementSummaryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ملخص الحساب</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-blue-700 font-medium mb-1">إجمالي الفواتير</h3>
            <p className="text-2xl font-bold text-blue-900">
              {formatCurrency(transactions.filter(t => t.type === "invoice").reduce((sum, t) => sum + t.debit, 0))}
            </p>
            <p className="text-sm text-blue-600 mt-1">
              {transactions.filter(t => t.type === "invoice").length} فاتورة
            </p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-green-700 font-medium mb-1">إجمالي الدفعات</h3>
            <p className="text-2xl font-bold text-green-900">
              {formatCurrency(transactions.filter(t => t.type === "payment").reduce((sum, t) => sum + t.credit, 0))}
            </p>
            <p className="text-sm text-green-600 mt-1">
              {transactions.filter(t => t.type === "payment").length} دفعة
            </p>
          </div>
          
          <div className="bg-amber-50 rounded-lg p-4">
            <h3 className="text-amber-700 font-medium mb-1">إجمالي المرتجعات</h3>
            <p className="text-2xl font-bold text-amber-900">
              {formatCurrency(transactions.filter(t => t.type === "return").reduce((sum, t) => sum + t.credit, 0))}
            </p>
            <p className="text-sm text-amber-600 mt-1">
              {transactions.filter(t => t.type === "return").length} مرتجع
            </p>
          </div>
          
          <div className="md:col-span-2 lg:col-span-3">
            <h3 className="text-lg font-medium mb-2">حركات الحساب حسب النوع</h3>
            <div className="bg-white p-4 border rounded-lg">
              <div className="flex items-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ 
                    width: `${Math.round(transactions.filter(t => t.type === "invoice").length / transactions.length * 100)}%` 
                  }}></div>
                </div>
                <span className="text-sm text-gray-600 w-20 text-left pl-2">فواتير</span>
              </div>
              <div className="flex items-center mb-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ 
                    width: `${Math.round(transactions.filter(t => t.type === "payment").length / transactions.length * 100)}%` 
                  }}></div>
                </div>
                <span className="text-sm text-gray-600 w-20 text-left pl-2">دفعات</span>
              </div>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ 
                    width: `${Math.round(transactions.filter(t => t.type === "return").length / transactions.length * 100)}%` 
                  }}></div>
                </div>
                <span className="text-sm text-gray-600 w-20 text-left pl-2">مرتجعات</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
