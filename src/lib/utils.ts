
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatCurrency as formatCurrencyOriginal } from "@/utils/formatters";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Re-export the formatCurrency function from formatters
export const formatCurrency = formatCurrencyOriginal;
