
import React from "react";
import { Button } from "@/components/ui/button";
import { JournalStatus } from "@/types/journal";

interface JournalActiveFiltersProps {
  dateRange: {from?: Date; to?: Date};
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
  if (!dateRange.from && !dateRange.to && !status && !user && !period) {
    return null;
  }

  return (
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
        onClick={onResetFilters}
      >
        مسح الكل
      </Button>
    </div>
  );
};
