
/**
 * تنسيق المبلغ كعملة
 * @param amount المبلغ المراد تنسيقه
 * @param currency رمز العملة (الافتراضي: ر.س)
 * @returns المبلغ منسقًا مع رمز العملة
 */
export function formatCurrency(amount: number | string, currency: string = "ر.س"): string {
  let numericAmount: number;
  
  if (typeof amount === 'string') {
    // إزالة أي رموز غير رقمية
    const cleanedAmount = amount.replace(/[^\d.]/g, '');
    numericAmount = parseFloat(cleanedAmount);
  } else {
    numericAmount = amount;
  }
  
  // التحقق من أن المبلغ صالح
  if (isNaN(numericAmount)) {
    return `0 ${currency}`;
  }
  
  // تنسيق المبلغ
  const formattedAmount = numericAmount.toLocaleString('ar-SA');
  
  return `${formattedAmount} ${currency}`;
}

/**
 * تنسيق الرقم بتنسيق مناسب
 * @param value القيمة الرقمية المراد تنسيقها
 * @returns القيمة منسقة كرقم
 */
export function formatNumber(value: number | string): string {
  let numericValue: number;
  
  if (typeof value === 'string') {
    // إزالة أي رموز غير رقمية
    const cleanedValue = value.replace(/[^\d.]/g, '');
    numericValue = parseFloat(cleanedValue);
  } else {
    numericValue = value;
  }
  
  // التحقق من أن القيمة صالحة
  if (isNaN(numericValue)) {
    return '0';
  }
  
  // تنسيق الرقم
  return numericValue.toLocaleString('ar-SA');
}

/**
 * تنسيق التاريخ بالتنسيق المطلوب
 * @param date التاريخ المراد تنسيقه
 * @returns التاريخ منسقًا
 */
export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * حساب النسبة المئوية للتغيير
 * @param current القيمة الحالية
 * @param previous القيمة السابقة
 * @returns النسبة المئوية للتغيير
 */
export function calculatePercentageChange(current: number | string, previous: number | string): number {
  const currentValue = typeof current === 'string' ? parseFloat(current) : current;
  const previousValue = typeof previous === 'string' ? parseFloat(previous) : previous;
  
  if (previousValue === 0) return 0;
  
  const change = ((currentValue - previousValue) / previousValue) * 100;
  return Math.round(change * 10) / 10; // تقريب إلى رقم عشري واحد
}
