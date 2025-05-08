import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";

interface DateRangeSelectorProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
}

export const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  dateRange,
  onDateRangeChange,
}) => {
  const handlePresetRange = (preset: string) => {
    const today = new Date();
    const from = new Date();
    
    switch (preset) {
      case 'today':
        onDateRangeChange({ from: today, to: today });
        break;
      case 'yesterday':
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        onDateRangeChange({ from: yesterday, to: yesterday });
        break;
      case 'thisWeek':
        from.setDate(today.getDate() - today.getDay());
        onDateRangeChange({ from, to: today });
        break;
      case 'lastWeek':
        const lastWeekEnd = new Date();
        lastWeekEnd.setDate(today.getDate() - today.getDay() - 1);
        from.setDate(lastWeekEnd.getDate() - 6);
        onDateRangeChange({ from, to: lastWeekEnd });
        break;
      case 'thisMonth':
        from.setDate(1);
        onDateRangeChange({ from, to: today });
        break;
      case 'lastMonth':
        const lastMonthEnd = new Date();
        lastMonthEnd.setDate(0); // Last day of previous month
        from.setMonth(today.getMonth() - 1);
        from.setDate(1);
        onDateRangeChange({ from, to: lastMonthEnd });
        break;
      case 'thisYear':
        from.setMonth(0);
        from.setDate(1);
        onDateRangeChange({ from, to: today });
        break;
      case 'lastYear':
        const lastYearEnd = new Date();
        lastYearEnd.setMonth(0);
        lastYearEnd.setDate(0); // Last day of previous year
        from.setFullYear(today.getFullYear() - 1);
        from.setMonth(0);
        from.setDate(1);
        onDateRangeChange({ from, to: lastYearEnd });
        break;
      default:
        break;
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium mb-3 text-right">الفترة الزمنية</h3>
        <div className="flex flex-col gap-4">
          <DatePickerWithRange value={dateRange} onChange={onDateRangeChange} />
          
          <div className="grid grid-cols-4 gap-2 mt-2">
            <button
              onClick={() => handlePresetRange('today')}
              className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 text-center"
            >
              اليوم
            </button>
            <button
              onClick={() => handlePresetRange('yesterday')}
              className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 text-center"
            >
              أمس
            </button>
            <button
              onClick={() => handlePresetRange('thisWeek')}
              className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 text-center"
            >
              هذا الأسبوع
            </button>
            <button
              onClick={() => handlePresetRange('lastWeek')}
              className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 text-center"
            >
              الأسبوع الماضي
            </button>
            <button
              onClick={() => handlePresetRange('thisMonth')}
              className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 text-center"
            >
              هذا الشهر
            </button>
            <button
              onClick={() => handlePresetRange('lastMonth')}
              className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 text-center"
            >
              الشهر الماضي
            </button>
            <button
              onClick={() => handlePresetRange('thisYear')}
              className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 text-center"
            >
              هذا العام
            </button>
            <button
              onClick={() => handlePresetRange('lastYear')}
              className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200 text-center"
            >
              العام الماضي
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
