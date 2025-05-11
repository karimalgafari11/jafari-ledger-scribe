
import React from "react";
import { LedgerAccount } from "@/hooks/useLedgerEntries";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

interface LedgerAccountsListProps {
  accounts: LedgerAccount[];
  selectedAccountId: string | null;
  onSelectAccount: (accountId: string) => void;
}

export const LedgerAccountsList: React.FC<LedgerAccountsListProps> = ({
  accounts,
  selectedAccountId,
  onSelectAccount
}) => {
  // Group accounts by type
  const groupedAccounts = accounts.reduce((groups, account) => {
    const { type } = account;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(account);
    return groups;
  }, {} as Record<string, LedgerAccount[]>);

  // Order of account types to display
  const typeOrder = ['asset', 'liability', 'equity', 'revenue', 'expense'];
  
  // Display names for account types in Arabic
  const typeNames: Record<string, string> = {
    'asset': 'الأصول',
    'liability': 'الالتزامات',
    'equity': 'حقوق الملكية',
    'revenue': 'الإيرادات',
    'expense': 'المصروفات'
  };

  return (
    <ScrollArea className="h-[calc(100vh-240px)]">
      {typeOrder.map(type => (
        groupedAccounts[type] && (
          <div key={type} className="mb-4">
            <h3 className="font-semibold text-sm mb-2 px-2">{typeNames[type] || type}</h3>
            <div className="space-y-1">
              {groupedAccounts[type].map(account => (
                <div
                  key={account.id}
                  className={`px-2 py-1.5 text-sm cursor-pointer rounded-md flex justify-between items-center ${
                    selectedAccountId === account.id
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => onSelectAccount(account.id)}
                >
                  <div className="overflow-hidden">
                    <div className="font-medium truncate">{account.name}</div>
                    <div className="text-xs opacity-80">{account.number}</div>
                  </div>
                  <Badge 
                    variant={account.balance >= 0 ? "outline" : "destructive"}
                    className="text-[10px] h-5"
                  >
                    {account.balance.toLocaleString('ar-SA')}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </ScrollArea>
  );
};
