
import { FinancialMetric, FinancialRatio } from '@/types/financial-analysis';
import { ChartDataItem, FinancialChartData, EfficiencyRatios, ProfitabilityRatios } from './types';

// بيانات وهمية للمؤشرات المالية
export const mockFinancialMetrics: FinancialMetric[] = [
  {
    id: '1',
    name: 'الدخل الصافي',
    value: 254800,
    unit: 'ر.س',
    trend: 'up',
    percentChange: 15.4,
    category: 'profit',
    period: 'شهري'
  },
  {
    id: '2',
    name: 'إجمالي المبيعات',
    value: 945000,
    unit: 'ر.س',
    trend: 'up',
    percentChange: 8.7,
    category: 'sales',
    period: 'شهري'
  },
  {
    id: '3',
    name: 'المصروفات التشغيلية',
    value: 685300,
    unit: 'ر.س',
    trend: 'down',
    percentChange: -3.2,
    category: 'expenses',
    period: 'شهري'
  },
  {
    id: '4',
    name: 'متوسط قيمة الطلب',
    value: 3450,
    unit: 'ر.س',
    trend: 'up',
    percentChange: 5.8,
    category: 'sales',
    period: 'شهري'
  },
  {
    id: '5',
    name: 'نسبة هامش الربح',
    value: 27,
    unit: '%',
    trend: 'up',
    percentChange: 1.5,
    category: 'profit',
    period: 'شهري'
  },
  {
    id: '6',
    name: 'التدفق النقدي التشغيلي',
    value: 357900,
    unit: 'ر.س',
    trend: 'up',
    percentChange: 12.7,
    category: 'cash',
    period: 'شهري'
  }
];

// بيانات وهمية للنسب المالية
export const mockFinancialRatios: FinancialRatio[] = [
  {
    id: '1',
    name: 'نسبة السيولة',
    value: 2.5,
    industry: 1.8,
    trend: 'up',
    description: 'قدرة الشركة على تغطية التزاماتها قصيرة الأجل',
    formula: 'الأصول المتداولة / الالتزامات المتداولة',
    lastPeriod: 2.3
  },
  {
    id: '2',
    name: 'نسبة الديون',
    value: 0.35,
    industry: 0.42,
    trend: 'down',
    description: 'نسبة تمويل الأصول عن طريق الديون',
    formula: 'إجمالي الديون / إجمالي الأصول',
    lastPeriod: 0.38
  },
  {
    id: '3',
    name: 'العائد على الأصول',
    value: 0.18,
    industry: 0.12,
    trend: 'up',
    description: 'كفاءة استخدام الأصول لتحقيق الأرباح',
    formula: 'صافي الربح / إجمالي الأصول',
    lastPeriod: 0.14
  },
  {
    id: '4',
    name: 'دوران المخزون',
    value: 12.4,
    industry: 10.8,
    trend: 'up',
    description: 'عدد مرات بيع واستبدال المخزون خلال الفترة',
    formula: 'تكلفة البضاعة المباعة / متوسط المخزون',
    lastPeriod: 11.2
  }
];

// Define insights as an array of strings
export const insightsData: string[] = [
  "تحليل مالي شامل للفترة الحالية يظهر تحسناً بنسبة 15% في صافي الربح مقارنة بالفترة السابقة"
];

export const mockRecommendations: string[] = [
  'زيادة الاستثمار في قنوات التسويق الرقمي لتحسين المبيعات عبر الإنترنت',
  'مراجعة استراتيجية التسعير للمنتجات منخفضة الأداء لتحسين هوامش الربح',
  'تخفيض تكاليف التشغيل من خلال أتمتة العمليات الإدارية',
  'تعزيز برامج ولاء العملاء لزيادة معدل تكرار الشراء',
  'إعادة التفاوض مع الموردين لتخفيض تكاليف المواد الخام'
];
