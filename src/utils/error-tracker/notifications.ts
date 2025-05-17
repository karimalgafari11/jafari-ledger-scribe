
/**
 * إشعارات الخطأ
 */

/**
 * عرض إشعار للمستخدم عند حدوث خطأ
 */
export const showErrorNotification = (message: string): void => {
  if (typeof window !== 'undefined' && 'showErrorNotification' in window) {
    (window as any).showErrorNotification(message);
  }
};
