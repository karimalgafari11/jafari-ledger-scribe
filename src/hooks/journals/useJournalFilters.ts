
import { useState } from 'react';
import { JournalStatus } from '@/types/journal';
import { toast } from 'sonner';
import { DateRange } from 'react-day-picker';

export const useJournalFilters = () => {
  const [filterDate, setFilterDate] = useState<DateRange | undefined>(undefined);
  const [filterStatus, setFilterStatus] = useState<JournalStatus | "">("");
  const [filterUser, setFilterUser] = useState("");
  const [filterPeriod, setFilterPeriod] = useState<"day" | "week" | "month" | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (
    dateRange: DateRange | undefined,
    status: JournalStatus | "",
    user: string,
    period: "day" | "week" | "month" | ""
  ) => {
    setIsLoading(true);
    setFilterDate(dateRange);
    setFilterStatus(status);
    setFilterUser(user);
    setFilterPeriod(period);
    
    setTimeout(() => setIsLoading(false), 500);
    toast.success("تم تطبيق الفلترة بنجاح");
  };

  const handleResetFilters = () => {
    setFilterDate(undefined);
    setFilterStatus("");
    setFilterUser("");
    setFilterPeriod("");
    toast.success("تم إعادة تعيين الفلترة");
  };

  return {
    filterDate,
    filterStatus,
    filterUser,
    filterPeriod,
    isLoading,
    handleFilterChange,
    handleResetFilters,
  };
};
