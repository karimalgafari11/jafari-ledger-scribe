
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { AccountFilters } from "./AccountFilters";
import { ReportDialog } from "./ReportDialog";
import { Input } from "@/components/ui/input";
import { Account } from "@/types/accounts";
import { useAccountDialogs } from "./AccountDialogsContext";

interface AccountPageHeaderProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterType: string;
  minBalance: string;
  maxBalance: string;
  onFilterChange: (type: string, min: string, max: string) => void;
  onResetFilters: () => void;
  accounts: Account[];
  onGenerateReport: (type: string) => Promise<void>;
  onAddAccount?: () => void; // Make this optional since we'll use context
}

export const AccountPageHeader: React.FC<AccountPageHeaderProps> = ({
  onSearch,
  filterType,
  minBalance,
  maxBalance,
  onFilterChange,
  onResetFilters,
  accounts,
  onGenerateReport
}) => {
  const { setIsAddDialogOpen } = useAccountDialogs();

  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="بحث في الحسابات..."
            className="pl-10 rtl"
            onChange={onSearch}
          />
        </div>
        <div className="flex space-x-2 rtl">
          <Button
            variant="default"
            onClick={() => setIsAddDialogOpen(true)}
          >
            إضافة حساب جديد
          </Button>
          <AccountFilters
            filterType={filterType}
            minBalance={minBalance}
            maxBalance={maxBalance}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
          />
          <ReportDialog
            accounts={accounts}
            onGenerate={onGenerateReport}
          />
        </div>
      </div>
    </div>
  );
};
