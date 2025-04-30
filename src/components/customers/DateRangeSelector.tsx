
import React from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";

interface DateRangeSelectorProps {
  dateRange: {
    from: Date;
    to: Date;
  };
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
}

export const DateRangeSelector = ({ dateRange, onDateRangeChange }: DateRangeSelectorProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <h3 className="text-sm font-medium mb-3 text-right">تصفية حسب التاريخ</h3>
        <div className="flex gap-3 flex-row-reverse">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex flex-row-reverse justify-between w-40">
                <CalendarIcon className="ml-2 h-4 w-4" />
                {dateRange.from
                  ? format(dateRange.from, "dd/MM/yyyy", { locale: ar })
                  : "تاريخ البداية"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={dateRange.from}
                onSelect={(date) =>
                  date && onDateRangeChange({ ...dateRange, from: date })
                }
                initialFocus
                locale={ar}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <span className="flex items-center px-2 text-gray-500">إلى</span>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex flex-row-reverse justify-between w-40">
                <CalendarIcon className="ml-2 h-4 w-4" />
                {dateRange.to
                  ? format(dateRange.to, "dd/MM/yyyy", { locale: ar })
                  : "تاريخ النهاية"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={dateRange.to}
                onSelect={(date) =>
                  date && onDateRangeChange({ ...dateRange, to: date })
                }
                initialFocus
                locale={ar}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  );
};
