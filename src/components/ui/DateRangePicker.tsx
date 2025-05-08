
import React from "react";
import { DatePickerWithRange } from "./date-picker-with-range";
import { DateRange } from "react-day-picker";

export interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
  align?: "start" | "center" | "end";
}

export function DateRangePicker({ value, onChange, className, align = "center" }: DateRangePickerProps) {
  return <DatePickerWithRange 
    value={value} 
    onChange={onChange} 
    className={className}
    align={align}
  />;
}
