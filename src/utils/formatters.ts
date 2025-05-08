
/**
 * تنسيق التاريخ إلى صيغة عربية
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * تنسيق المبلغ المالي
 */
export function formatCurrency(amount: number): string {
  return amount.toLocaleString('ar-SA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });
}

/**
 * تنسيق النسبة المئوية
 */
export function formatPercent(value: number): string {
  return `${value.toLocaleString('ar-SA', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1
  })}%`;
}

/**
 * تنسيق الرقم
 */
export function formatNumber(value: number): string {
  return value.toLocaleString('ar-SA');
}

/**
 * تحويل الرقم إلى صيغة مختصرة (مثلاً: 1K, 1M)
 */
export function formatShortNumber(value: number): string {
  if (value >= 1000000) {
    return `${(value / 1000000).toLocaleString('ar-SA', { maximumFractionDigits: 1 })} M`;
  } else if (value >= 1000) {
    return `${(value / 1000).toLocaleString('ar-SA', { maximumFractionDigits: 1 })} K`;
  } else {
    return value.toLocaleString('ar-SA');
  }
}

/**
 * تنسيق الوقت إلى صيغة عربية
 */
export function formatTime(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleTimeString('ar-SA', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * تنسيق التاريخ والوقت
 */
export function formatDateTime(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

/**
 * تنسيق المدة الزمنية (بالأيام، الساعات، إلخ)
 */
export function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} يوم`;
  } else if (hours > 0) {
    return `${hours} ساعة`;
  } else if (minutes > 0) {
    return `${minutes} دقيقة`;
  } else {
    return `${seconds} ثانية`;
  }
}
