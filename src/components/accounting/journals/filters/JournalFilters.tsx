
import React from "react";
import { JournalStatus } from "@/types/journal";
import { toast } from "sonner";
import { JournalToolbar } from "@/components/accounting/journals/JournalToolbar";

interface JournalFiltersProps {
  filterDate: {from?: Date; to?: Date};
  filterStatus: JournalStatus | "";
  filterUser: string;
  filterPeriod: "day" | "week" | "month" | "";
  onFilterChange: (
    dateRange: {from?: Date; to?: Date},
    status: JournalStatus | "",
    user: string,
    period: "day" | "week" | "month" | ""
  ) => void;
  onResetFilters: () => void;
  onSearch: (term: string) => void;
  onBulkDelete: () => void;
  selectedCount: number;
}

export const JournalFilters: React.FC<JournalFiltersProps> = ({
  filterDate,
  filterStatus,
  filterUser,
  filterPeriod,
  onFilterChange,
  onResetFilters,
  onSearch,
  onBulkDelete,
  selectedCount
}) => {
  const handleFilterChange = (
    dateRange: {from?: Date; to?: Date},
    status: JournalStatus | "",
    user: string,
    period: "day" | "week" | "month" | ""
  ) => {
    onFilterChange(dateRange, status, user, period);
    toast.success("تم تطبيق الفلترة بنجاح");
  };

  const handleResetFilters = () => {
    onResetFilters();
    toast.success("تم إعادة تعيين الفلترة");
  };

  return (
    <div>
      <JournalToolbar
        onSearch={onSearch}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        filterDate={filterDate}
        filterStatus={filterStatus}
        filterUser={filterUser}
        filterPeriod={filterPeriod}
        onBulkDelete={onBulkDelete}
        selectedCount={selectedCount}
      />
    </div>
  );
};
