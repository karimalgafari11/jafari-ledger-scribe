
import React from "react";
import { Transaction } from "@/types/transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface TransactionDetailsProps {
  transaction: Transaction;
}

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>تفاصيل العملية</CardTitle>
          <Badge variant={transaction.type === 'invoice' ? 'default' : transaction.type === 'payment' ? 'outline' : 'secondary'}>
            {transaction.type === 'invoice' ? 'فاتورة' : transaction.type === 'payment' ? 'دفعة' : 'مرتجع'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-muted-foreground">التاريخ</dt>
            <dd className="font-medium">{transaction.date.toLocaleDateString('ar-SA')}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">المرجع</dt>
            <dd className="font-medium">{transaction.reference}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-muted-foreground">البيان</dt>
            <dd className="font-medium">{transaction.description}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">مدين</dt>
            <dd className="font-medium text-green-600">{transaction.debit > 0 ? transaction.debit.toLocaleString('ar-SA') : '-'}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">دائن</dt>
            <dd className="font-medium text-red-600">{transaction.credit > 0 ? transaction.credit.toLocaleString('ar-SA') : '-'}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-muted-foreground">الرصيد</dt>
            <dd className="font-medium text-lg">{transaction.balance.toLocaleString('ar-SA')}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};
