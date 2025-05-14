import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DatePicker } from "@/components/ui/date-picker";
import { ActivityAction } from "@/types/permissions";
import { FiltersType } from "@/types/definitions";
import { RefreshCw, Download, Search, Filter, X } from "lucide-react";

interface ActivityLogFiltersProps {
  filters: FiltersType;
  onFilterChange: (newFilters: Partial<FiltersType>) => void;
  onSearch: () => Promise<any>;
  onClear: () => void;
  onExport: (format: 'pdf' | 'excel' | 'csv') => Promise<boolean>;
  isLoading: boolean;
}

const ActivityLogFilters: React.FC<ActivityLogFiltersProps> = ({
  filters,
  onFilterChange,
  onClear,
  onSearch,
  onExport,
  isLoading
}) => {
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel' | 'csv'>('excel');
  const [showFilters, setShowFilters] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };
  
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="ml-2 h-4 w-4" />
            {showFilters ? 'إخفاء المرشحات' : 'عرض المرشحات'}
          </Button>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={onClear}
          >
            <RefreshCw className="ml-2 h-4 w-4" />
            إعادة تعيين
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Select 
            value={exportFormat}
            onValueChange={(value) => setExportFormat(value as any)}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="تنسيق التصدير" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excel">Excel</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
              <SelectItem value="csv">CSV</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExport(exportFormat)}
            disabled={isLoading}
          >
            <Download className="ml-2 h-4 w-4" />
            تصدير
          </Button>
          
          <Button
            onClick={() => onSearch()}
            disabled={isLoading}
          >
            <Search className="ml-2 h-4 w-4" />
            بحث
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="text-sm font-medium mb-2 block">المستخدم</label>
            <Input
              placeholder="اسم المستخدم"
              value={filters.userId}
              onChange={(e) => onFilterChange({userId: e.target.value})}
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">الإجراء</label>
            <Select 
              value={filters.action} 
              onValueChange={(value) => onFilterChange({action: value as ActivityAction | ''})}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الإجراء" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع الإجراءات</SelectItem>
                <SelectItem value="login">تسجيل دخول</SelectItem>
                <SelectItem value="logout">تسجيل خروج</SelectItem>
                <SelectItem value="create">إنشاء</SelectItem>
                <SelectItem value="update">تعديل</SelectItem>
                <SelectItem value="delete">حذف</SelectItem>
                <SelectItem value="view">عرض</SelectItem>
                <SelectItem value="export">تصدير</SelectItem>
                <SelectItem value="import">استيراد</SelectItem>
                <SelectItem value="approve">اعتماد</SelectItem>
                <SelectItem value="reject">رفض</SelectItem>
                <SelectItem value="backup">نسخ احتياطي</SelectItem>
                <SelectItem value="restore">استعادة</SelectItem>
                <SelectItem value="system">نظام</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">الوحدة</label>
            <Select 
              value={filters.module} 
              onValueChange={(value) => onFilterChange({module: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الوحدة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع الوحدات</SelectItem>
                <SelectItem value="accounting">المحاسبة</SelectItem>
                <SelectItem value="inventory">المخزون</SelectItem>
                <SelectItem value="sales">المبيعات</SelectItem>
                <SelectItem value="expenses">المصروفات</SelectItem>
                <SelectItem value="auth">المصادقة</SelectItem>
                <SelectItem value="reports">التقارير</SelectItem>
                <SelectItem value="settings">الإعدادات</SelectItem>
                <SelectItem value="admin">الإدارة</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">من تاريخ</label>
            <DatePicker
              date={filters.startDate}
              onDateChange={(date) => onFilterChange({startDate: date})}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">إلى تاريخ</label>
            <DatePicker
              date={filters.endDate}
              onDateChange={(date) => onFilterChange({endDate: date})}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">الحالة</label>
            <Select 
              value={filters.status} 
              onValueChange={(value) => onFilterChange({status: value as 'success' | 'failed' | 'warning' | 'info' | ''})}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">جميع الحالات</SelectItem>
                <SelectItem value="success">نجاح</SelectItem>
                <SelectItem value="failed">فشل</SelectItem>
                <SelectItem value="warning">تحذير</SelectItem>
                <SelectItem value="info">معلومات</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="md:col-span-2 lg:col-span-3 flex justify-end mt-4">
            <Button type="button" variant="outline" onClick={onClear} className="ml-2">
              <X className="ml-2 h-4 w-4" />
              مسح المرشحات
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Search className="ml-2 h-4 w-4" />
              بحث
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ActivityLogFilters;
