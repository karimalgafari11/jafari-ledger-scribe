
import * as React from "react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date: Date | null;
  onDateChange: (date: Date | null) => void;
  className?: string;
  placeholder?: string;
}

export function DatePicker({
  date,
  onDateChange,
  className,
  placeholder = "اختر تاريخاً"
}: DatePickerProps) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal rtl:text-right",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "dd/MM/yyyy", { locale: ar }) : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={onDateChange}
            initialFocus
            locale={ar}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DatePicker;
