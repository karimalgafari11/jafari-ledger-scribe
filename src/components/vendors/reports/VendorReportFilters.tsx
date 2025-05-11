
import React from "react";
import { Search, FilterX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VendorReportFiltersProps {
  dateRange: { from: Date; to: Date };
  setDateRange: (range: { from: Date; to: Date }) => void;
  category: string;
  setCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

export const VendorReportFilters: React.FC<VendorReportFiltersProps> = ({
  dateRange,
  setDateRange,
  category,
  setCategory,
  searchQuery,
  setSearchQuery,
  applyFilters,
  resetFilters
}) => {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold text-lg mb-4">تصفية التقارير</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">نطاق التاريخ</label>
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            locale="ar"
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">فئة المشتريات</label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="جميع الفئات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الفئات</SelectItem>
              <SelectItem value="office-supplies">مستلزمات مكتبية</SelectItem>
              <SelectItem value="electronics">معدات إلكترونية</SelectItem>
              <SelectItem value="furniture">أثاث مكتبي</SelectItem>
              <SelectItem value="it-equipment">أجهزة وتقنية</SelectItem>
              <SelectItem value="paper-products">منتجات ورقية</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">بحث عن مورد</label>
          <div className="relative">
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="اسم المورد أو رقمه..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-10"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-2">
        <Button onClick={resetFilters} variant="outline" className="flex items-center">
          <FilterX className="ml-1 h-4 w-4" />
          إعادة ضبط
        </Button>
        <Button onClick={applyFilters}>تطبيق الفلترة</Button>
      </div>
    </div>
  );
};
