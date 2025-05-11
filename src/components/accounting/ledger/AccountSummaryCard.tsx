
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LedgerAccount } from "@/hooks/useLedgerEntries";

interface AccountSummaryCardProps {
  account: LedgerAccount;
  summary: {
    balance: number;
    totalDebit: number;
    totalCredit: number;
    entriesCount: number;
    lastTransaction?: Date;
  };
}

export const AccountSummaryCard: React.FC<AccountSummaryCardProps> = ({
  account,
  summary
}) => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">{account.name}</h2>
            <p className="text-sm text-muted-foreground">{account.number}</p>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-2 md:mt-0">
            <div className="bg-muted p-2 rounded-md text-center min-w-[120px]">
              <div className="text-lg font-bold">{summary.balance.toLocaleString('ar-SA')}</div>
              <div className="text-xs text-muted-foreground">الرصيد الحالي</div>
            </div>
            
            <div className="bg-muted p-2 rounded-md text-center min-w-[120px]">
              <div className="text-lg font-bold text-green-600">{summary.totalDebit.toLocaleString('ar-SA')}</div>
              <div className="text-xs text-muted-foreground">إجمالي المدين</div>
            </div>
            
            <div className="bg-muted p-2 rounded-md text-center min-w-[120px]">
              <div className="text-lg font-bold text-red-600">{summary.totalCredit.toLocaleString('ar-SA')}</div>
              <div className="text-xs text-muted-foreground">إجمالي الدائن</div>
            </div>
            
            <div className="bg-muted p-2 rounded-md text-center min-w-[120px]">
              <div className="text-lg font-bold">{summary.entriesCount}</div>
              <div className="text-xs text-muted-foreground">عدد الحركات</div>
            </div>
          </div>
        </div>
        
        {summary.lastTransaction && (
          <div className="mt-3 text-sm text-muted-foreground">
            آخر حركة: {summary.lastTransaction.toLocaleDateString('ar-SA')}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
