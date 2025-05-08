
import { generateMockInsights } from '@/data/mockFinancialData';

// Import and re-export the generateMockInsights function to maintain compatibility
export { generateMockInsights };

// Add any additional insight-related functions here that might be needed in the future

/**
 * Generate financial recommendations for businesses
 * @returns Array of recommendation strings
 */
export function generateFinancialRecommendations(): string[] {
  return [
    'زيادة الاستثمار في قنوات التسويق الرقمي لتحسين المبيعات عبر الإنترنت',
    'مراجعة استراتيجية التسعير للمنتجات منخفضة الأداء لتحسين هوامش الربح',
    'تخفيض تكاليف التشغيل من خلال أتمتة العمليات الإدارية',
    'تعزيز برامج ولاء العملاء لزيادة معدل تكرار الشراء',
    'إعادة التفاوض مع الموردين لتخفيض تكاليف المواد الخام'
  ];
}
