
import React, { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, FilterX } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";

export const PurchaseInvoiceFilters: React.FC = () => {
  const [status, setStatus] = useState<string>("all");
  const [vendor, setVendor] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [paymentMethod, setPaymentMethod] = useState<string>("all");
  const [searchText, setSearchText] = useState<string>("");
  
  const resetFilters = () => {
    setStatus("all");
    setVendor("");
    setDateRange(undefined);
    setPaymentMethod("all");
    setSearchText("");
  };
  
  return (
    <div className="space-y-4">
      {/* صف أول: البحث والحالة وطريقة الدفع */}
      <div className="flex flex-wrap gap-2">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="بحث في الفواتير..."
              className="pl-10"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </div>
        </div>
        
        <div className="w-full sm:w-auto">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="حالة الفاتورة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="paid">مدفوعة</SelectItem>
              <SelectItem value="pending">معلقة</SelectItem>
              <SelectItem value="overdue">متأخرة</SelectItem>
              <SelectItem value="draft">مسودة</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-auto">
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger className="w-full sm:w-[160px]">
              <SelectValue placeholder="طريقة الدفع" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الطرق</SelectItem>
              <SelectItem value="cash">نقداً</SelectItem>
              <SelectItem value="credit">آجل</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* صف ثاني: المورد ونطاق التاريخ وإعادة الضبط */}
      <div className="flex flex-wrap gap-2 items-start">
        <div className="w-full sm:w-[200px]">
          <Select value={vendor} onValueChange={setVendor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر المورد" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">جميع الموردين</SelectItem>
              <SelectItem value="v1">شركة السعيد للتجارة</SelectItem>
              <SelectItem value="v2">مؤسسة النور للمقاولات</SelectItem>
              <SelectItem value="v3">مؤسسة الأمانة للتوريدات</SelectItem>
              <SelectItem value="v4">شركة تقنيات المستقبل</SelectItem>
              <SelectItem value="v5">مصنع الجودة للمنتجات الورقية</SelectItem>
              <SelectItem value="v6">شركة الأدوات الصناعية</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-auto">
          <DatePickerWithRange
            className="w-full sm:w-[300px]"
            date={dateRange}
            onDateChange={setDateRange}
          />
        </div>
        
        <Button
          variant="ghost"
          onClick={resetFilters}
          className="mr-auto"
        >
          <FilterX className="ml-1 h-4 w-4" />
          إعادة ضبط الفلاتر
        </Button>
      </div>
    </div>
  );
};
