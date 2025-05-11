
import React, { useState } from "react";
import { Search, Calendar, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { DateRange } from "react-day-picker";

interface LedgerFiltersProps {
  searchTerm: string;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPeriodSelect: (period: string) => void;
}

export const LedgerFilters: React.FC<LedgerFiltersProps> = ({
  searchTerm,
  onSearch,
  onPeriodSelect
}) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined
  });

  // Handle date range changes
  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range);
  };

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="بحث في المعاملات..."
          className="pr-10 pl-8"
          value={searchTerm}
          onChange={onSearch}
        />
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Select onValueChange={onPeriodSelect} defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <Calendar className="ml-2 h-4 w-4" />
            <SelectValue placeholder="الفترة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">جميع الفترات</SelectItem>
            <SelectItem value="today">اليوم</SelectItem>
            <SelectItem value="this-week">هذا الأسبوع</SelectItem>
            <SelectItem value="this-month">هذا الشهر</SelectItem>
            <SelectItem value="this-quarter">هذا الربع</SelectItem>
            <SelectItem value="this-year">هذا العام</SelectItem>
            <SelectItem value="custom">فترة مخصصة</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-1">
              <Filter className="h-4 w-4" />
              تصفية متقدمة
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">فترة مخصصة</h4>
                <div className="pt-2">
                  <DateRangePicker 
                    value={dateRange}
                    onChange={handleDateRangeChange}
                    locale="ar-SA"
                    placeholder="اختر الفترة الزمنية" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">نوع العملية</h4>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع العملية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الكل</SelectItem>
                    <SelectItem value="invoice">فاتورة</SelectItem>
                    <SelectItem value="payment">دفعة</SelectItem>
                    <SelectItem value="return">مرتجع</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end">
                <Button>تطبيق</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
