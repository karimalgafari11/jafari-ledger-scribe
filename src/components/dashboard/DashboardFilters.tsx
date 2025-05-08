
import React from "react";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardFiltersProps {
  date: DateRange;
  onDateChange: (date: DateRange) => void;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  onPeriodChange: (value: any) => void;
  branch: string;
  onBranchChange: (value: string) => void;
  department?: string;
  onDepartmentChange?: (value: string) => void;
}

const DashboardFilters: React.FC<DashboardFiltersProps> = ({
  date,
  onDateChange,
  period,
  onPeriodChange,
  branch,
  onBranchChange,
  department,
  onDepartmentChange
}) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex ${isMobile ? 'flex-col gap-2' : 'flex-col sm:flex-row gap-4'} mt-4 md:mt-0`}>
      <DatePickerWithRange
        value={date}
        onChange={onDateChange}
        className={`${isMobile ? 'w-full' : 'min-w-[260px]'}`}
      />
      <div className={`flex ${isMobile ? 'gap-1 w-full' : 'gap-2'}`}>
        <Select value={branch} onValueChange={onBranchChange}>
          <SelectTrigger className={`${isMobile ? 'w-full text-sm' : 'w-[150px]'}`}>
            <SelectValue placeholder="كل الفروع" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">كل الفروع</SelectItem>
            <SelectItem value="branch1">الفرع الرئيسي</SelectItem>
            <SelectItem value="branch2">الفرع الشمالي</SelectItem>
            <SelectItem value="branch3">الفرع الغربي</SelectItem>
          </SelectContent>
        </Select>
        <Select value={period} onValueChange={onPeriodChange}>
          <SelectTrigger className={`${isMobile ? 'w-full text-sm' : 'w-[150px]'}`}>
            <SelectValue placeholder="فترة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">يومي</SelectItem>
            <SelectItem value="weekly">أسبوعي</SelectItem>
            <SelectItem value="monthly">شهري</SelectItem>
            <SelectItem value="quarterly">ربع سنوي</SelectItem>
            <SelectItem value="yearly">سنوي</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DashboardFilters;
