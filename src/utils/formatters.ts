
/**
 * تنسيق المبالغ المالية بالعملة
 */
export const formatCurrency = (amount: number, currency = 'ريال'): string => {
  try {
    const formatter = new Intl.NumberFormat('ar-SA', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    return `${formatter.format(amount)} ${currency}`;
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${amount.toFixed(2)} ${currency}`;
  }
};

/**
 * تنسيق التواريخ
 */
export const formatDate = (date: Date | string): string => {
  try {
    const dateObj = new Date(date);
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
 * تنسيق الأرقام
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
 * اختصار النص إذا كان طويلاً
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

/**
 * تنسيق وقت مضى منذ تاريخ معين
 */
export const timeAgo = (date: Date | string): string => {
  const dateObj = new Date(date);
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
};
