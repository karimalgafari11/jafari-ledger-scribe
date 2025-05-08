
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { Search, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AdvancedReportFiltersProps {
  dateRange: { from: Date; to: Date };
  setDateRange: (range: { from: Date; to: Date }) => void;
  category: string;
  setCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  additionalFilters?: React.ReactNode;
  onApplyFilters: () => void;
  onResetFilters: () => void;
}

export const AdvancedReportFilters: React.FC<AdvancedReportFiltersProps> = ({
  dateRange,
  setDateRange,
  category,
  setCategory,
  searchQuery,
  setSearchQuery,
  additionalFilters,
  onApplyFilters,
  onResetFilters
}) => {
  // معالج تغيير البحث
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // معالج تغيير التصنيف
  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4" dir="rtl">
          <div>
            <Label htmlFor="dateRange" className="mb-2 block">الفترة الزمنية</Label>
            <DatePickerWithRange 
              value={dateRange} 
              onChange={setDateRange} 
              className="w-full"
            />
          </div>
          
          <div>
            <Label htmlFor="category" className="mb-2 block">التصنيف</Label>
            <Select 
              value={category} 
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="جميع التصنيفات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التصنيفات</SelectItem>
                <SelectItem value="financial">المالية</SelectItem>
                <SelectItem value="sales">المبيعات</SelectItem>
                <SelectItem value="inventory">المخزون</SelectItem>
                <SelectItem value="inventory-control">التحكم بالمخزون</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="search" className="mb-2 block">بحث</Label>
            <div className="relative">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-4 pr-10"
                placeholder="ابحث في التقارير..."
              />
            </div>
          </div>
          
          {additionalFilters && (
            <div>{additionalFilters}</div>
          )}
          
          <div className="md:col-span-3 lg:col-span-4 flex justify-end gap-2 mt-2">
            <Button 
              variant="outline" 
              onClick={onResetFilters} 
              size="sm"
              type="button"
            >
              <X className="ml-1 h-4 w-4" />
              إعادة ضبط
            </Button>
            <Button 
              onClick={onApplyFilters} 
              size="sm"
              type="button"
            >
              <Search className="ml-1 h-4 w-4" />
              تطبيق الفلترة
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
