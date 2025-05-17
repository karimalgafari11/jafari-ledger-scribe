
import React from "react";
import { JournalStatus } from "@/types/journal";
import { Button } from "@/components/ui/button";
import { X, Calendar, User, Tag } from "lucide-react";
import { format } from "date-fns";
import { arSA } from "date-fns/locale";

interface JournalActiveFiltersProps {
  dateRange: { from?: Date; to?: Date };
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
  const hasActiveFilters =
    dateRange.from || dateRange.to || status || user || period;

  if (!hasActiveFilters) return null;

  const getStatusLabel = (status: JournalStatus | "") => {
    switch (status) {
      case "draft":
        return "مسودة";
      case "pending":
        return "معلق";
      case "approved":
        return "معتمد";
      case "canceled":
        return "ملغي";
      default:
        return "";
    }
  };

  const getUserLabel = (userId: string) => {
    switch (userId) {
      case "admin":
        return "مدير النظام";
      case "accountant":
        return "المحاسب";
      default:
        return "";
    }
  };

  const getPeriodLabel = (period: "day" | "week" | "month" | "") => {
    switch (period) {
      case "day":
        return "اليوم";
      case "week":
        return "هذا الأسبوع";
      case "month":
        return "هذا الشهر";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {(dateRange.from || dateRange.to) && (
        <div className="bg-blue-50 dark:bg-blue-900/10 text-blue-700 dark:text-blue-300 text-xs rounded-full px-3 py-1 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>
            {dateRange.from && dateRange.to
              ? `${format(dateRange.from, "dd/MM/yyyy", { locale: arSA })} - ${format(
                  dateRange.to,
                  "dd/MM/yyyy",
                  { locale: arSA }
                )}`
              : dateRange.from
              ? `من ${format(dateRange.from, "dd/MM/yyyy", { locale: arSA })}`
              : `إلى ${format(dateRange.to!, "dd/MM/yyyy", { locale: arSA })}`}
          </span>
        </div>
      )}

      {status && (
        <div className="bg-purple-50 dark:bg-purple-900/10 text-purple-700 dark:text-purple-300 text-xs rounded-full px-3 py-1 flex items-center gap-1">
          <Tag className="h-3 w-3" />
          <span>الحالة: {getStatusLabel(status)}</span>
        </div>
      )}

      {user && (
        <div className="bg-green-50 dark:bg-green-900/10 text-green-700 dark:text-green-300 text-xs rounded-full px-3 py-1 flex items-center gap-1">
          <User className="h-3 w-3" />
          <span>المستخدم: {getUserLabel(user)}</span>
        </div>
      )}

      {period && (
        <div className="bg-amber-50 dark:bg-amber-900/10 text-amber-700 dark:text-amber-300 text-xs rounded-full px-3 py-1 flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>الفترة: {getPeriodLabel(period)}</span>
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={onResetFilters}
        className="h-6 text-xs text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 gap-1"
      >
        <X className="h-3 w-3" />
        مسح الكل
      </Button>
    </div>
  );
};
