
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculatePercentageChange(currentValue: number | string, previousValue: number): string {
  // If current value is a string (like "1,000 ر.س"), extract the number
  const current = typeof currentValue === 'string' 
    ? parseFloat(currentValue.replace(/[^\d.-]/g, '')) 
    : currentValue;
    
  const change = ((current - previousValue) / previousValue) * 100;
  return change.toFixed(1);
}
