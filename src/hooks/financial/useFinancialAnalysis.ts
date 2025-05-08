import { useState, useMemo, useCallback } from 'react';
import { FinancialMetric, FinancialRatio, AnalysisPeriod } from '@/types/financial-analysis';
import { generateMockInsights } from '@/data/mockFinancialData';
import { ChartData } from '@/components/ui/charts';
import { addDays, subDays } from 'date-fns';
import { toast } from 'sonner';

// بيانات وهمية للمؤشرات المالية
const mockFinancialMetrics: FinancialMetric[] = [
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
const mockFinancialRatios: FinancialRatio[] = [
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

// إنشاء بيانات المخططات الوهمية
const createMockChartData = (): {
  salesAndMargin: ChartData;
  revenueBySource: ChartData;
  expensesByCategory: ChartData;
  forecast: ChartData;
} => {
  // مخطط المبيعات وهامش الربح
  const salesAndMargin: ChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'المبيعات',
        data: [840000, 870000, 920000, 910000, 930000, 945000],
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderColor: 'rgba(37, 99, 235, 1)'
      },
      {
        label: 'هامش الربح',
        data: [24, 24.5, 25.2, 25.8, 26.3, 27],
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 1)'
      }
    ]
  };

  // مخطط الإيرادات حسب المصدر
  const revenueBySource: ChartData = {
    labels: ['المبيعات المباشرة', 'التجارة الإلكترونية', 'قنوات التوزيع', 'المشتريات الكبيرة', 'أخرى'],
    datasets: [
      {
        label: 'الإيرادات',
        data: [350000, 280000, 160000, 90000, 65000],
        backgroundColor: [
          'rgba(37, 99, 235, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)'
        ],
        borderColor: [
          'rgba(37, 99, 235, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)'
        ]
      }
    ]
  };

  // مخطط المصروفات حسب الفئة
  const expensesByCategory: ChartData = {
    labels: ['الرواتب', 'الإيجار', 'المرافق', 'التسويق', 'المخزون', 'أخرى'],
    datasets: [
      {
        label: 'المصروفات',
        data: [310000, 85000, 43000, 78000, 145000, 24300],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(37, 99, 235, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(107, 114, 128, 0.7)'
        ]
      }
    ]
  };

  // مخطط التوقعات
  const forecast: ChartData = {
    labels: ['يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'],
    datasets: [
      {
        label: 'المبيعات المتوقعة',
        data: [980000, 1025000, 1090000, 1180000, 1350000, 1450000],
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderColor: 'rgba(37, 99, 235, 1)'
      },
      {
        label: 'الحد الأدنى (نطاق الثقة)',
        data: [930000, 970000, 1010000, 1100000, 1250000, 1350000],
        backgroundColor: 'rgba(37, 99, 235, 0)',
        borderColor: 'rgba(37, 99, 235, 0.3)',
        borderDash: [5, 5]
      },
      {
        label: 'الحد الأقصى (نطاق الثقة)',
        data: [1030000, 1080000, 1170000, 1260000, 1450000, 1550000],
        backgroundColor: 'rgba(37, 99, 235, 0)',
        borderColor: 'rgba(37, 99, 235, 0.3)',
        borderDash: [5, 5]
      }
    ]
  };

  return {
    salesAndMargin,
    revenueBySource,
    expensesByCategory,
    forecast
  };
};

export const useFinancialAnalysis = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date()
  });
  
  const [period, setPeriod] = useState<AnalysisPeriod>('monthly');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // استخدام البيانات الوهمية
  const financialMetrics = useMemo(() => mockFinancialMetrics, []);
  const financialRatios = useMemo(() => mockFinancialRatios, []);
  const insights = useMemo(() => generateMockInsights(), []);
  const recommendations = useMemo(
    () => [
      'زيادة الاستثمار في قنوات التسويق الرقمي لتحسين المبيعات عبر الإنترنت',
      'مراجعة استراتيجية التسعير للمنتجات منخفضة الأداء لتحسين هوامش الربح',
      'تخفيض تكاليف التشغيل من خلال أتمتة العمليات الإدارية',
      'تعزيز برامج ولاء العملاء لزيادة معدل تكرار الشراء',
      'إعادة التفاوض مع الموردين لتخفيض تكاليف المواد الخام'
    ],
    []
  );
  const chartData = useMemo(() => createMockChartData(), []);
  
  const refreshData = useCallback(() => {
    setIsLoading(true);
    
    // محاكاة لعملية تحديث البيانات من الخادم
    setTimeout(() => {
      setIsLoading(false);
      toast.success('تم تحديث البيانات المالية بنجاح');
    }, 1000);
  }, []);
  
  const exportAnalysis = useCallback(() => {
    toast.success('جاري تصدير التحليل المالي...');
    
    // محاكاة لعملية التصدير
    setTimeout(() => {
      toast.success('تم تصدير التحليل المالي بنجاح');
    }, 1500);
  }, []);

  return {
    financialMetrics,
    financialRatios,
    insights,
    recommendations,
    dateRange,
    setDateRange,
    period,
    setPeriod,
    refreshData,
    exportAnalysis,
    chartData,
    isLoading
  };
};
