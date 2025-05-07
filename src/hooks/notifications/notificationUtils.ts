
import { NotificationTemplate } from '@/types/notifications';

/**
 * Calculates the discount amount based on discount type and value
 */
export const calculateDiscount = (amount: number, type: 'percentage' | 'fixed', value: number): number => {
  if (type === 'percentage') {
    return amount * (value / 100);
  } else {
    return Math.min(value, amount); // Fixed discount cannot exceed the amount
  }
};

/**
 * Finds a template by its ID
 */
export const findTemplateById = (templates: NotificationTemplate[], templateId: string): NotificationTemplate | undefined => {
  return templates.find(t => t.id === templateId);
};
