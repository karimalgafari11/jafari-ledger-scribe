
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Filter, Trash2 } from "lucide-react";
import { JournalStatus } from "@/types/journal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface JournalToolbarProps {
  onSearch: (term: string) => void;
  onFilterChange: (
    dateRange: {from?: Date; to?: Date},
    status: JournalStatus | "",
    user: string,
    period: "day" | "week" | "month" | ""
  ) => void;
  onResetFilters: () => void;
  onBulkDelete: () => void;
  filterDate: {from?: Date; to?: Date};
  filterStatus: JournalStatus | "";
  filterUser: string;
  filterPeriod: "day" | "week" | "month" | "";
  selectedCount: number;
}

export const JournalToolbar: React.FC<JournalToolbarProps> = ({
  onSearch,
  onFilterChange,
  onResetFilters,
  onBulkDelete,
  filterDate,
  filterStatus,
  filterUser,
  filterPeriod,
  selectedCount
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<{from?: Date; to?: Date}>(filterDate);
  const [status, setStatus] = useState<JournalStatus | "">(filterStatus);
  const [user, setUser] = useState(filterUser);
  const [period, setPeriod] = useState<"day" | "week" | "month" | "">(filterPeriod);
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  
  const handleApplyFilters = () => {
    onFilterChange(dateRange, status, user, period);
  };
  
  const handleResetFilters = () => {
    setDateRange({});
    setStatus("");
    setUser("");
    setPeriod("");
    onResetFilters();
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="بحث عن رقم القيد، اسم الحساب، المبلغ، أو الوصف..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10 pr-10"
          />
        </div>

        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="min-w-[120px]">
                <Filter className="ml-1 h-4 w-4" /> فلترة
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-96 p-4" align="end">
              <h3 className="text-lg font-medium mb-4">خيارات الفلترة</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>تاريخ القيد</Label>
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="text-xs">من</Label>
                        <CalendarComponent
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, from: date || undefined }))}
                          className="border rounded-md p-2"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">إلى</Label>
                        <CalendarComponent
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, to: date || undefined }))}
                          className="border rounded-md p-2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>حالة القيد</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={status}
                    onChange={(e) => setStatus(e.target.value as JournalStatus | "")}
                  >
                    <option value="">الكل</option>
                    <option value="draft">مسودة</option>
                    <option value="approved">معتمد</option>
                    <option value="canceled">ملغي</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>المستخدم</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                  >
                    <option value="">الكل</option>
                    <option value="أحمد محمد">أحمد محمد</option>
                    <option value="سارة أحمد">سارة أحمد</option>
                    <option value="محمد علي">محمد علي</option>
                    <option value="عمر خالد">عمر خالد</option>
                    <option value="ليلى محمد">ليلى محمد</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>الفترة الزمنية</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={period}
                    onChange={(e) => setPeriod(e.target.value as "day" | "week" | "month" | "")}
                  >
                    <option value="">الكل</option>
                    <option value="day">اليوم</option>
                    <option value="week">هذا الأسبوع</option>
                    <option value="month">هذا الشهر</option>
                  </select>
                </div>
                
                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={handleResetFilters}>إعادة تعيين</Button>
                  <Button onClick={handleApplyFilters}>تطبيق</Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          {selectedCount > 0 && (
            <Button variant="destructive" onClick={onBulkDelete}>
              <Trash2 className="ml-1 h-4 w-4" />
              حذف ({selectedCount})
            </Button>
          )}
        </div>
      </div>
      
      {(dateRange.from || dateRange.to || status || user || period) && (
        <div className="mt-4 flex flex-wrap gap-2">
          <div className="text-sm text-gray-500">الفلاتر النشطة:</div>
          {dateRange.from && (
            <div className="px-2 py-1 bg-gray-100 rounded-md text-xs flex items-center">
              من: {dateRange.from.toLocaleDateString('ar-SA')}
            </div>
          )}
          {dateRange.to && (
            <div className="px-2 py-1 bg-gray-100 rounded-md text-xs flex items-center">
              إلى: {dateRange.to.toLocaleDateString('ar-SA')}
            </div>
          )}
          {status && (
            <div className="px-2 py-1 bg-gray-100 rounded-md text-xs flex items-center">
              الحالة: {status === 'draft' ? 'مسودة' : status === 'approved' ? 'معتمد' : 'ملغي'}
            </div>
          )}
          {user && (
            <div className="px-2 py-1 bg-gray-100 rounded-md text-xs flex items-center">
              المستخدم: {user}
            </div>
          )}
          {period && (
            <div className="px-2 py-1 bg-gray-100 rounded-md text-xs flex items-center">
              الفترة: {
                period === 'day' ? 'اليوم' : 
                period === 'week' ? 'هذا الأسبوع' : 
                'هذا الشهر'
              }
            </div>
          )}
          <Button 
            variant="ghost" 
            className="h-6 px-2 text-xs"
            onClick={handleResetFilters}
          >
            مسح الكل
          </Button>
        </div>
      )}
    </div>
  );
};
