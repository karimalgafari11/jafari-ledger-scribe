
import React from "react";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AccountFilters } from "./AccountFilters";
import { ReportDialog } from "./ReportDialog";
import { Account } from "@/types/accounts";

interface AccountPageHeaderProps {
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddAccount: () => void;
  filterType: string;
  minBalance: string;
  maxBalance: string;
  onFilterChange: (type: string, min: string, max: string) => void;
  onResetFilters: () => void;
  accounts: Account[];
  onGenerateReport: (type: string) => Promise<void>;
}

export const AccountPageHeader: React.FC<AccountPageHeaderProps> = ({
  onSearch,
  onAddAccount,
  filterType,
  minBalance,
  maxBalance,
  onFilterChange,
  onResetFilters,
  accounts,
  onGenerateReport,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4 w-1/2">
        <SearchBar placeholder="البحث في الحسابات..." onChange={onSearch} />
        
        <AccountFilters
          filterType={filterType}
          minBalance={minBalance}
          maxBalance={maxBalance}
          onFilterChange={onFilterChange}
          onReset={onResetFilters}
          isFiltered={!!(filterType || minBalance || maxBalance)}
        />

        <ReportDialog
          accounts={accounts}
          onGenerate={onGenerateReport}
        />
      </div>

      <Button onClick={onAddAccount}>
        <Plus className="ml-2 h-4 w-4" />
        إضافة حساب
      </Button>
    </div>
  );
};
