
import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter, PlusCircle, RefreshCw, FileText } from "lucide-react";
import { AccountFilters } from "./AccountFilters";
import { ReportDialog } from "./ReportDialog";
import { Input } from "@/components/ui/input";
import { Account } from "@/types/accounts";
import { useAccountDialogs } from "./AccountDialogsContext";
import { Badge } from "@/components/ui/badge";

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
  const isFiltered = !!(filterType || minBalance || maxBalance);

  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-2xl font-bold text-primary">دليل الحسابات</h2>
          <Badge variant="outline" className="ml-2">
            {accounts.length} حساب
          </Badge>
        </div>
        
        <div className="flex space-x-2 rtl">
          <Button
            variant="outline"
            size="sm"
            onClick={onResetFilters}
            className="flex items-center gap-1"
            disabled={!isFiltered}
          >
            <RefreshCw className="h-4 w-4" />
            إعادة تعيين
          </Button>
          
          <ReportDialog
            accounts={accounts}
            onGenerate={onGenerateReport}
          />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-2 bg-muted/30 p-4 rounded-lg shadow-sm">
        <div className="relative w-full sm:w-1/2 lg:w-2/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="البحث في الحسابات (الاسم، الرقم، النوع...)"
            className="pl-10 rtl pr-4 py-2 focus:ring-primary focus:border-primary bg-white"
            onChange={onSearch}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="default"
            onClick={() => setIsAddDialogOpen(true)}
            className="flex-1 sm:flex-none flex items-center gap-1 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
          >
            <PlusCircle className="h-4 w-4" />
            حساب جديد
          </Button>
          
          <AccountFilters
            filterType={filterType}
            minBalance={minBalance}
            maxBalance={maxBalance}
            onFilterChange={onFilterChange}
            onReset={onResetFilters}
            isFiltered={isFiltered}
          />
        </div>
      </div>
      
      {isFiltered && (
        <div className="flex items-center gap-2 text-sm bg-blue-50 border border-blue-100 rounded p-2">
          <Filter className="h-4 w-4 text-blue-500" />
          <span className="text-blue-700">
            تم تطبيق التصفية: 
            {filterType && <span className="mx-1 font-medium">{filterType === 'asset' ? 'أصول' : 
                                          filterType === 'liability' ? 'التزامات' : 
                                          filterType === 'equity' ? 'حقوق ملكية' : 
                                          filterType === 'revenue' ? 'إيرادات' : 
                                          filterType === 'expense' ? 'مصروفات' : filterType}</span>}
            {minBalance && <span className="mx-1">الرصيد الأدنى: {minBalance}</span>}
            {maxBalance && <span className="mx-1">الرصيد الأقصى: {maxBalance}</span>}
          </span>
        </div>
      )}
    </div>
  );
};
