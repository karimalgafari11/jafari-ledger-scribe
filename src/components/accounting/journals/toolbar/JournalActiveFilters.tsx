
import React from "react";
import { Badge } from "@/components/ui/badge";
import { JournalStatus } from "@/types/journal";
import { X } from "lucide-react";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";
import { DateRange } from "react-day-picker";

interface JournalActiveFiltersProps {
  dateRange: DateRange | undefined;
  status: JournalStatus | "";
  user: string;
  period: "day" | "week" | "month" | "";
  onResetFilters: () => void;
}

export const JournalActiveFilters: React.FC<JournalActiveFiltersProps> = ({
  dateRange,
  status,
  user,
  period,
  onResetFilters,
}) => {
  const hasFilters = dateRange?.from || status || user || period;
  
  if (!hasFilters) return null;
  
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "draft": return "مسودة";
      case "pending": return "معلق";
      case "approved": return "معتمد";
      case "canceled": return "ملغي";
      default: return status;
    }
  };
  
  const getPeriodLabel = (period: string) => {
    switch (period) {
      case "day": return "اليوم";
      case "week": return "هذا الأسبوع";
      case "month": return "هذا الشهر";
      default: return period;
    }
  };
  
  const getDateRangeLabel = () => {
    if (!dateRange?.from) return null;
    
    if (dateRange.to) {
      return `من ${format(dateRange.from, "yyyy/MM/dd", { locale: arSA })} إلى ${format(dateRange.to, "yyyy/MM/dd", { locale: arSA })}`;
    }
    
    return `${format(dateRange.from, "yyyy/MM/dd", { locale: arSA })}`;
  };
  
  return (
    <div className="flex flex-wrap gap-2 items-center pt-3">
      <div className="text-sm text-gray-500 ml-2">الفلاتر النشطة:</div>
      
      {dateRange?.from && (
        <Badge variant="outline" className="gap-1 bg-gray-100 dark:bg-gray-800">
          التاريخ: {getDateRangeLabel()}
          <X className="h-3 w-3 cursor-pointer" onClick={() => {}} />
        </Badge>
      )}
      
      {period && (
        <Badge variant="outline" className="gap-1 bg-gray-100 dark:bg-gray-800">
          الفترة: {getPeriodLabel(period)}
          <X className="h-3 w-3 cursor-pointer" onClick={() => {}} />
        </Badge>
      )}
      
      {status && (
        <Badge variant="outline" className="gap-1 bg-gray-100 dark:bg-gray-800">
          الحالة: {getStatusLabel(status)}
          <X className="h-3 w-3 cursor-pointer" onClick={() => {}} />
        </Badge>
      )}
      
      {user && (
        <Badge variant="outline" className="gap-1 bg-gray-100 dark:bg-gray-800">
          المستخدم: {user === "admin" ? "مدير النظام" : user === "accountant" ? "المحاسب" : user}
          <X className="h-3 w-3 cursor-pointer" onClick={() => {}} />
        </Badge>
      )}
      
      <Badge 
        variant="outline" 
        className="gap-1 bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/40"
        onClick={onResetFilters}
      >
        إعادة تعيين الكل
        <X className="h-3 w-3" />
      </Badge>
    </div>
  );
};
