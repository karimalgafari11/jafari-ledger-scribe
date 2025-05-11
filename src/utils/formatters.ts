
/**
 * تنسيق العملة بالآلاف والفواصل
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString('ar-SA');
}

/**
 * تنسيق الأرقام بالفواصل العشرية
 */
export function formatNumber(amount: number): string {
  return amount.toLocaleString('ar-SA');
}

/**
 * تنسيق التاريخ بالعربية
 */
export function formatDate(date: Date | string): string {
  if (typeof date === 'string') {
    date = new Date(date);
  }
  return date.toLocaleDateString('ar-SA');
}

/**
 * تنسيق النص للعرض بالطول المحدد
 */
export function truncateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * تحويل النص إلى تنسيق العنوان (أول حرف كبير من كل كلمة)
 */
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
