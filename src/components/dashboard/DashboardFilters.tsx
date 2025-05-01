
import React from "react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
      <DatePickerWithRange
        value={date}
        onChange={onDateChange}
        className="min-w-[260px]"
      />
      <div className="flex gap-2">
        <Select value={branch} onValueChange={onBranchChange}>
          <SelectTrigger className="w-[150px]">
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
          <SelectTrigger className="w-[150px]">
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
