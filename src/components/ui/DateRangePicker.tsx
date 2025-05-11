
import * as React from "react";
import { addDays, format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
  locale?: string;
  placeholder?: string;
  className?: string;
}

export function DateRangePicker({
  value,
  onChange,
  locale = "en-US",
  placeholder = "Select date range",
  className,
}: DateRangePickerProps) {
  const localeObj = locale.startsWith("ar") ? ar : undefined;
  
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-right font-normal",
              !value?.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="ml-2 h-4 w-4" />
            {value?.from ? (
              value.to ? (
                <>
                  {format(value.from, "LLL dd, y", { locale: localeObj })} -{" "}
                  {format(value.to, "LLL dd, y", { locale: localeObj })}
                </>
              ) : (
                format(value.from, "LLL dd, y", { locale: localeObj })
              )
            ) : (
              placeholder
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={value?.from}
            selected={value}
            onSelect={onChange}
            numberOfMonths={2}
            locale={localeObj}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
