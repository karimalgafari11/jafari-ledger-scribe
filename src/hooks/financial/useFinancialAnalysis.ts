
import { useState, useMemo, useCallback } from 'react';
import { FinancialMetric, FinancialRatio } from '@/types/financial-analysis';
import { generateMockInsights } from '@/data/mockFinancialData';
import { ChartData } from '@/types/custom-reports';
import { addDays, subDays } from 'date-fns';
import { toast } from 'sonner';

// Define AnalysisPeriod as enum and export it
export enum AnalysisPeriod {
  MONTH_3 = '3_months',
  MONTH_6 = '6_months',
  YEAR_1 = '1_year',
  YEAR_2 = '2_years'
}

// Define insights as an array of strings
const insightsData = [
  "تحليل مالي شامل للفترة الحالية يظهر تحسناً بنسبة 15% في صافي الربح مقارنة بالفترة السابقة"
];

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
  profitabilityData: ChartData;  
  cashflowData: ChartData;
  liquidityData: ChartData;
  debtRatios: ChartData;
  efficiencyRatios: {
    inventoryTurnover: ChartData;
    receivablesTurnover: ChartData;
    assetTurnover: ChartData;
    cashConversionCycle: ChartData;
  };
  profitabilityRatios: {
    grossMargin: ChartData;
    operatingMargin: ChartData;
    netMargin: ChartData;
    roa: ChartData;
  };
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

  // Create profitability data chart
  const profitabilityData: ChartData = {
    labels: ['منتج أ', 'منتج ب', 'منتج ج', 'منتج د', 'منتج هـ'],
    datasets: [
      {
        label: 'الربحية',
        data: [25, 18, 22, 17, 23],
        backgroundColor: [
          'rgba(37, 99, 235, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(139, 92, 246, 0.7)'
        ]
      }
    ]
  };

  // Create cashflow data chart
  const cashflowData: ChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'التدفقات الداخلة',
        data: [450000, 480000, 520000, 490000, 540000, 580000],
        backgroundColor: 'rgba(16, 185, 129, 0.7)'
      },
      {
        label: 'التدفقات الخارجة',
        data: [380000, 410000, 450000, 420000, 460000, 490000],
        backgroundColor: 'rgba(239, 68, 68, 0.7)'
      }
    ]
  };

  // Create liquidity data chart
  const liquidityData: ChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'نسبة التداول',
        data: [2.1, 2.2, 2.3, 2.4, 2.5, 2.5],
        borderColor: 'rgba(37, 99, 235, 1)'
      }
    ]
  };

  // Create debt ratios data chart
  const debtRatios: ChartData = {
    labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        label: 'نسبة الديون',
        data: [0.4, 0.39, 0.37, 0.36, 0.35, 0.35],
        borderColor: 'rgba(239, 68, 68, 1)'
      }
    ]
  };

  // Create efficiency ratio charts
  const efficiencyRatios = {
    inventoryTurnover: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'معدل دوران المخزون',
        data: [10.5, 11.2, 11.8, 12.1, 12.4, 12.4],
        borderColor: 'rgba(37, 99, 235, 1)'
      }]
    },
    receivablesTurnover: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'معدل دوران الذمم المدينة',
        data: [8.2, 8.4, 8.6, 8.9, 9.1, 9.3],
        borderColor: 'rgba(16, 185, 129, 1)'
      }]
    },
    assetTurnover: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'معدل دوران الأصول',
        data: [1.2, 1.3, 1.3, 1.4, 1.4, 1.5],
        borderColor: 'rgba(245, 158, 11, 1)'
      }]
    },
    cashConversionCycle: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'دورة التحويل النقدي',
        data: [45, 43, 40, 38, 36, 35],
        borderColor: 'rgba(139, 92, 246, 1)'
      }]
    }
  };

  // Create profitability ratio charts
  const profitabilityRatios = {
    grossMargin: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'هامش الربح الإجمالي',
        data: [35, 36, 36.5, 37, 37.5, 38],
        borderColor: 'rgba(37, 99, 235, 1)'
      }]
    },
    operatingMargin: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'هامش الربح التشغيلي',
        data: [22, 22.5, 23, 24, 25, 26],
        borderColor: 'rgba(16, 185, 129, 1)'
      }]
    },
    netMargin: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'هامش صافي الربح',
        data: [15, 16, 16.5, 17, 18, 19],
        borderColor: 'rgba(245, 158, 11, 1)'
      }]
    },
    roa: {
      labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
      datasets: [{
        label: 'العائد على الأصول',
        data: [8, 8.5, 9, 9.5, 10, 10.5],
        borderColor: 'rgba(139, 92, 246, 1)'
      }]
    }
  };

  return {
    salesAndMargin,
    revenueBySource,
    expensesByCategory,
    forecast,
    profitabilityData,
    cashflowData,
    liquidityData,
    debtRatios,
    efficiencyRatios,
    profitabilityRatios
  };
};

export const useFinancialAnalysis = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date()
  });
  
  const [selectedPeriod, setSelectedPeriod] = useState<AnalysisPeriod>(AnalysisPeriod.MONTH_3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // استخدام البيانات الوهمية
  const financialMetrics = useMemo(() => mockFinancialMetrics, []);
  const financialRatios = useMemo(() => mockFinancialRatios, []);
  
  // Make sure insights is explicitly typed as string[]
  const insights: string[] = useMemo(() => insightsData, []);
  
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
    selectedPeriod,
    setSelectedPeriod,
    refreshData,
    exportAnalysis,
    chartData,
    profitabilityData: chartData.profitabilityData,
    cashflowData: chartData.cashflowData,
    liquidityData: chartData.liquidityData,
    debtRatios: chartData.debtRatios,
    efficiencyRatios: chartData.efficiencyRatios,
    profitabilityRatios: chartData.profitabilityRatios,
    isLoading
  };
};
