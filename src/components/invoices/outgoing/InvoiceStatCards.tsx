
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { InvoiceStatistics } from "@/hooks/invoices/useOutgoingInvoices";
import { Receipt, CheckCircle, AlertTriangle, Clock } from "lucide-react";

interface InvoiceStatCardsProps {
  statistics: InvoiceStatistics;
  isLoading: boolean;
}

export const InvoiceStatCards: React.FC<InvoiceStatCardsProps> = ({ statistics, isLoading }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* إجمالي الفواتير */}
      <Card className="overflow-hidden">
        <div className="bg-blue-50 py-2 px-4 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-blue-700">إجمالي الفواتير</h3>
            <Receipt className="h-4 w-4 text-blue-500" />
          </div>
        </div>
        <CardContent className="p-4">
          {isLoading ? (
            <>
              <Skeleton className="h-7 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </>
          ) : (
            <>
              <div className="text-2xl font-bold">
                {statistics.total.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                {statistics.totalAmount.toLocaleString()} ر.س
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* الفواتير المدفوعة */}
      <Card className="overflow-hidden">
        <div className="bg-green-50 py-2 px-4 border-b border-green-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-green-700">مدفوعة</h3>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </div>
        </div>
        <CardContent className="p-4">
          {isLoading ? (
            <>
              <Skeleton className="h-7 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </>
          ) : (
            <>
              <div className="text-2xl font-bold text-green-700">
                {statistics.paid.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                {statistics.paidAmount.toLocaleString()} ر.س
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* الفواتير المعلقة */}
      <Card className="overflow-hidden">
        <div className="bg-amber-50 py-2 px-4 border-b border-amber-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-amber-700">قيد الانتظار</h3>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
        </div>
        <CardContent className="p-4">
          {isLoading ? (
            <>
              <Skeleton className="h-7 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </>
          ) : (
            <>
              <div className="text-2xl font-bold text-amber-700">
                {statistics.pending.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                {statistics.pendingAmount.toLocaleString()} ر.س
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* الفواتير المتأخرة */}
      <Card className="overflow-hidden">
        <div className="bg-red-50 py-2 px-4 border-b border-red-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-red-700">متأخرة</h3>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </div>
        </div>
        <CardContent className="p-4">
          {isLoading ? (
            <>
              <Skeleton className="h-7 w-24 mb-2" />
              <Skeleton className="h-4 w-32" />
            </>
          ) : (
            <>
              <div className="text-2xl font-bold text-red-700">
                {statistics.overdue.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">
                {statistics.overdueAmount.toLocaleString()} ر.س
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
