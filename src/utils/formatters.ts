
/**
 * Formats a number as currency (SAR)
 */
export function formatCurrency(amount: number): string {
  return amount.toFixed(2) + " ر.س";
}

/**
 * Formats a date as a string (YYYY-MM-DD)
 */
export function formatDate(date: Date | string): string {
  const d = date instanceof Date ? date : new Date(date);
  return d.toISOString().split('T')[0];
}
