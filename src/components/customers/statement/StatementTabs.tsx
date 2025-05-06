
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { StatementContent } from "./StatementContent";
import { StatementSummary } from "./StatementSummary";
import { StatementSettings } from "./StatementSettings";
import { QuickActionsSidebar } from "./QuickActionsSidebar";
import { Customer } from "@/types/customers";
import { Transaction } from "@/types/transactions";
import { DateRange } from "react-day-picker";

interface StatementTabsProps {
  customer: Customer;
  transactions: Transaction[];
  dateRange: DateRange;
  selectedTypes: (Transaction["type"] | "all")[];
  handleTypeFilterChange: (types: (Transaction["type"] | "all")[]) => void;
  handleDateRangeChange: (range: DateRange) => void;
  handlePrint: () => void;
  handleDownload: () => void;
  handleShare: () => void;
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export const StatementTabs = ({
  customer,
  transactions,
  dateRange,
  selectedTypes,
  handleTypeFilterChange,
  handleDateRangeChange,
  handlePrint,
  handleDownload,
  handleShare,
  currentPage,
  totalPages,
  handlePageChange
}: StatementTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>("statement");

  return (
    <Tabs defaultValue="statement" className="mt-6" onValueChange={setActiveTab} value={activeTab}>
      <div className="flex items-center justify-between mb-4">
        <TabsList className="bg-white">
          <TabsTrigger value="statement" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            كشف الحساب
          </TabsTrigger>
          <TabsTrigger value="summary" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            الملخص
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            إعدادات
          </TabsTrigger>
        </TabsList>
        
        <div className="text-sm text-gray-500">
          الفترة: {format(dateRange.from, "dd/MM/yyyy", { locale: ar })} - {format(dateRange.to, "dd/MM/yyyy", { locale: ar })}
        </div>
      </div>
        
      <TabsContent value="statement" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <QuickActionsSidebar
              customer={customer}
              dateRange={dateRange}
              onDateRangeChange={handleDateRangeChange}
              selectedTypes={selectedTypes}
              onFilterChange={handleTypeFilterChange}
              onPrint={handlePrint}
              onDownload={handleDownload}
              onShare={handleShare}
            />
          </div>
          
          <div className="md:col-span-2">
            <StatementContent 
              transactions={transactions} 
              customer={customer}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="summary">
        <StatementSummary transactions={transactions} />
      </TabsContent>
      
      <TabsContent value="settings">
        <StatementSettings />
      </TabsContent>
    </Tabs>
  );
};
