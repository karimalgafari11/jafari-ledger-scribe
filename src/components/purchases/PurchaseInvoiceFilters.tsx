
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Search, Filter, X, Calendar } from 'lucide-react';
import { DateRange } from 'react-day-picker';

interface PurchaseInvoiceFiltersProps {
  // في المستقبل سنضيف خصائص للفلاتر مثل:
  // filter: PurchaseInvoiceFilter;
  // onChange: (filter: PurchaseInvoiceFilter) => void;
}

export const PurchaseInvoiceFilters: React.FC<PurchaseInvoiceFiltersProps> = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showFilters, setShowFilters] = useState(false);

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter(undefined);
    setDateRange(undefined);
  };

  const handleDateChange = (value: DateRange | undefined) => {
    setDateRange(value);
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {/* حقل البحث الرئيسي */}
        <div className="flex-1 relative min-w-[200px]">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث في الفواتير..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-3 pr-9"
          />
        </div>

        {/* أزرار الفلاتر */}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="h-4 w-4" />
          الفلاتر
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleClearFilters}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          مسح الفلاتر
        </Button>
      </div>

      {/* منطقة الفلاتر الموسعة - تظهر عند الضغط على زر الفلاتر */}
      {showFilters && (
        <Card className="p-4 mt-2 bg-muted/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">حالة الفاتورة</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الحالات" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="draft">مسودة</SelectItem>
                  <SelectItem value="pending">معلقة</SelectItem>
                  <SelectItem value="paid">مدفوعة</SelectItem>
                  <SelectItem value="overdue">متأخرة</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">الفترة الزمنية</label>
              <DatePickerWithRange 
                className="w-full" 
                date={dateRange}
                onDateChange={handleDateChange}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">المورد</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="جميع الموردين" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الموردين</SelectItem>
                  {/* سيتم إضافة قائمة الموردين هنا لاحقًا */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
