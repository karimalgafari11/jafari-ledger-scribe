
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { JournalStatus } from "@/types/journal";
import { JournalSearch } from "./toolbar/JournalSearch";
import { JournalFilterPopover } from "./toolbar/JournalFilterPopover";
import { JournalActiveFilters } from "./toolbar/JournalActiveFilters";

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

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex flex-col md:flex-row gap-4">
        <JournalSearch 
          searchTerm={searchTerm}
          onSearch={handleSearch}
        />

        <div className="flex gap-2">
          <JournalFilterPopover
            dateRange={filterDate}
            status={filterStatus}
            user={filterUser}
            period={filterPeriod}
            onApplyFilters={onFilterChange}
            onResetFilters={onResetFilters}
          />
          
          {selectedCount > 0 && (
            <Button variant="destructive" onClick={onBulkDelete}>
              <Trash2 className="ml-1 h-4 w-4" />
              حذف ({selectedCount})
            </Button>
          )}
        </div>
      </div>
      
      <JournalActiveFilters
        dateRange={filterDate}
        status={filterStatus}
        user={filterUser}
        period={filterPeriod}
        onResetFilters={onResetFilters}
      />
    </div>
  );
};
