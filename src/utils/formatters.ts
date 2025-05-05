
/**
 * Format date string to localized format
 * @param dateString Date string in ISO format
 * @param locale Locale string (defaults to ar-SA)
 * @returns Formatted date string
 */
export const formatDate = (dateString: string, locale: string = 'ar-SA'): string => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format currency
 * @param amount Amount to format
 * @param currency Currency code (defaults to SAR)
 * @param locale Locale string (defaults to ar-SA)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number, 
  currency: string = 'SAR', 
  locale: string = 'ar-SA'
): string => {
  try {
    return amount.toLocaleString(locale, {
      style: 'currency',
      currency
    });
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${amount} ${currency}`;
  }
};

/**
 * Format number with thousand separators
 * @param num Number to format
 * @param locale Locale string (defaults to ar-SA)
 * @returns Formatted number string
 */
export const formatNumber = (
  num: number,
  locale: string = 'ar-SA'
): string => {
  try {
    return num.toLocaleString(locale);
  } catch (error) {
    console.error('Error formatting number:', error);
    return num.toString();
  }
};
