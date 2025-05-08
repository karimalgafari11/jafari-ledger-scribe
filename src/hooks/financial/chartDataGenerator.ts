
import { FinancialChartData } from './types';

// إنشاء بيانات المخططات الوهمية
export function createMockChartData(): FinancialChartData {
  // مخطط المبيعات وهامش الربح
  const salesAndMargin = {
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
  const revenueBySource = {
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
  const expensesByCategory = {
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
  const forecast = {
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
  const profitabilityData = {
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
  const cashflowData = {
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
  const liquidityData = {
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
  const debtRatios = {
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
}
