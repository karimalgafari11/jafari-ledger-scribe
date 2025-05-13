
/**
 * Format currency amounts
 */
export const formatCurrency = (amount: number, currency = 'SAR'): string => {
  try {
    const formatter = new Intl.NumberFormat('ar-SA', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    return `${formatter.format(amount)} ريال`;
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${amount.toFixed(2)} ${currency}`;
  }
};

/**
 * Format dates
 */
export const formatDate = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    
    return new Intl.DateTimeFormat('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  } catch (error) {
    console.error('Error formatting date:', error);
    return String(date);
  }
};

/**
 * Format numbers
 */
export const formatNumber = (num: number): string => {
  try {
    return new Intl.NumberFormat('ar-SA').format(num);
  } catch (error) {
    console.error('Error formatting number:', error);
    return String(num);
  }
};

/**
 * Truncate text if it's too long
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

/**
 * Format time ago from a date
 */
export const timeAgo = (date: Date | string): string => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
    
    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `منذ ${days} ${days === 1 ? 'يوم' : 'أيام'}`;
    }
    if (hours > 0) {
      return `منذ ${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
    }
    if (minutes > 0) {
      return `منذ ${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`;
    }
    return 'منذ لحظات';
  } catch (error) {
    console.error('Error calculating time ago:', error);
    return String(date);
  }
};
