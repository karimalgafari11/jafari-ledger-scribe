
import { Language } from "@/contexts/AppContext";

/**
 * Format currency amounts
 */
export const formatCurrency = (amount: number, currency = 'SAR', language: Language = 'ar'): string => {
  try {
    const locale = language === 'ar' ? 'ar-SA' : 'en-US';
    const currencyText = language === 'ar' ? 'ريال' : 'SAR';
    
    const formatter = new Intl.NumberFormat(locale, {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    if (language === 'ar') {
      return `${formatter.format(amount)} ${currencyText}`;
    } else {
      return `${currencyText} ${formatter.format(amount)}`;
    }
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${amount.toFixed(2)} ${currency}`;
  }
};

/**
 * Format dates
 */
export const formatDate = (date: Date | string, language: Language = 'ar'): string => {
  try {
    const dateObj = new Date(date);
    const locale = language === 'ar' ? 'ar-SA' : 'en-US';
    
    return new Intl.DateTimeFormat(locale, {
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
export const formatNumber = (num: number, language: Language = 'ar'): string => {
  try {
    const locale = language === 'ar' ? 'ar-SA' : 'en-US';
    return new Intl.NumberFormat(locale).format(num);
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
export const timeAgo = (date: Date | string, language: Language = 'ar'): string => {
  const dateObj = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);
  
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (language === 'ar') {
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
  } else {
    if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
    if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }
    if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
    return 'just now';
  }
};
