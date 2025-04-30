
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface DateRangeSelectorProps {
  dateRange: {
    from: Date;
    to: Date;
  };
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

export const DateRangeSelector = ({ dateRange, onDateRangeChange }: DateRangeSelectorProps) => {
  return (
    <div className="flex flex-col mb-4 rtl">
      <h3 className="text-sm font-medium mb-2">تصفية حسب التاريخ</h3>
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start">
              <CalendarIcon className="ml-2 h-4 w-4" />
              {dateRange.from
                ? format(dateRange.from, "dd/MM/yyyy", { locale: ar })
                : "تاريخ البداية"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateRange.from}
              onSelect={(date) =>
                date && onDateRangeChange({ ...dateRange, from: date })
              }
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start">
              <CalendarIcon className="ml-2 h-4 w-4" />
              {dateRange.to
                ? format(dateRange.to, "dd/MM/yyyy", { locale: ar })
                : "تاريخ النهاية"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateRange.to}
              onSelect={(date) =>
                date && onDateRangeChange({ ...dateRange, to: date })
              }
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
