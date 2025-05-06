
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, FileText, Printer } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";
import { Customer } from "@/types/customers";
import { DateRange } from "react-day-picker";
import { StatementFilter } from "@/components/customers/StatementFilter";
import { DateRangeSelector } from "@/components/customers/DateRangeSelector";
import { Transaction } from "@/types/transactions";

interface QuickActionsSidebarProps {
  customer: Customer;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  selectedTypes: (Transaction["type"] | "all")[];
  onFilterChange: (types: (Transaction["type"] | "all")[]) => void;
  onPrint: () => void;
  onDownload: () => void;
  onShare: () => void;
}

export const QuickActionsSidebar = ({
  customer,
  dateRange,
  onDateRangeChange,
  selectedTypes,
  onFilterChange,
  onPrint,
  onDownload,
  onShare
}: QuickActionsSidebarProps) => {
  return (
    <div className="space-y-6 sticky top-24">
      <DateRangeSelector 
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
      />
      <StatementFilter 
        selectedTypes={selectedTypes}
        onFilterChange={onFilterChange}
      />
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button variant="outline" className="w-full flex justify-start gap-2" onClick={onPrint}>
            <Printer size={16} />
            طباعة الكشف
          </Button>
          <Button variant="outline" className="w-full flex justify-start gap-2" onClick={onDownload}>
            <FileText size={16} />
            تصدير PDF
          </Button>
          <Button variant="outline" className="w-full flex justify-start gap-2" onClick={onShare}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37069C15.0227 5.37069 15.0227 5.37069 15.0227 5.37069L9.08261 8.36066C8.54305 7.54129 7.6582 7 6.66667 7C5.19391 7 4 8.19391 4 9.66667C4 11.1394 5.19391 12.3333 6.66667 12.3333C7.6582 12.3333 8.54305 11.792 9.08261 10.9727L15.0227 13.9626C15.0077 14.0842 15 14.2078 15 14.3333C15 15.9902 16.3431 17.3333 18 17.3333C19.6569 17.3333 21 15.9902 21 14.3333C21 12.6765 19.6569 11.3333 18 11.3333C17.0116 11.3333 16.1267 11.8872 15.5871 12.7066L9.64709 9.7167C9.64709 9.7167 9.64709 9.7167 9.64709 9.7167C9.6621 9.5952 9.66667 9.47149 9.66667 9.34717C9.66667 9.22285 9.6621 9.09913 9.64709 8.97762C9.64709 8.97762 9.64709 8.97762 9.64709 8.97762L15.5871 5.98765C16.1267 6.80712 17.0116 7.36095 18 7.36095C18 7.36095 18 8 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            مشاركة عبر واتساب
          </Button>
        </CardContent>
      </Card>
      
      {customer.balance > 0 && (
        <Card className="bg-amber-50 border border-amber-200">
          <CardContent className="pt-4 pb-3">
            <div className="flex gap-2 items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-700">يوجد رصيد مستحق</h3>
                <p className="text-sm text-amber-600 mt-1">
                  يرجى متابعة تحصيل المبلغ المستحق وقدره {formatCurrency(customer.balance)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
