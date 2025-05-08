
import { useState, useMemo, useCallback } from 'react';
import { KpiCard, ExecutiveSummary } from '@/types/executive-dashboard';
import { FinancialMetric, FinancialRatio } from '@/types/financial-analysis';
import { subDays } from 'date-fns';
import { SystemAlert } from '@/types/ai';
import { toast } from 'sonner';

// بيانات وهمية لمؤشرات الأداء الرئيسية
const mockKpis: KpiCard[] = [
  {
    id: 'k1',
    title: 'إجمالي الإيرادات',
    value: '1,458,500 ر.س',
    previousValue: '1,256,300 ر.س',
    percentChange: 16.1,
    status: 'up',
    icon: 'dollar',
    description: 'مقارنة بالفترة السابقة'
  },
  {
    id: 'k2',
    title: 'صافي الربح',
    value: '305,200 ر.س',
    previousValue: '245,800 ر.س',
    percentChange: 24.2,
    status: 'up',
    icon: 'dollar',
    description: 'مقارنة بالفترة السابقة'
  },
  {
    id: 'k3',
    title: 'هامش الربح',
    value: '20.9%',
    previousValue: '19.6%',
    percentChange: 1.3,
    status: 'up',
    icon: 'percent',
    description: 'مقارنة بالفترة السابقة'
  },
  {
    id: 'k4',
    title: 'العملاء الجدد',
    value: '156',
    previousValue: '132',
    percentChange: 18.2,
    status: 'up',
    icon: 'users',
    description: 'مقارنة بالفترة السابقة'
  }
];

// بيانات وهمية للتحليل المالي
const mockFinancialMetrics: FinancialMetric[] = [
  {
    id: 'm1',
    name: 'النمو في المبيعات',
    value: 16.1,
    unit: '%',
    trend: 'up',
    percentChange: 3.2,
    category: 'growth',
    period: 'شهري'
  },
  {
    id: 'm2',
    name: 'نسبة التكاليف للمبيعات',
    value: 68.3,
    unit: '%',
    trend: 'down',
    percentChange: -1.5,
    category: 'efficiency',
    period: 'شهري'
  },
  {
    id: 'm3',
    name: 'متوسط قيمة الطلبية',
    value: 1850,
    unit: 'ر.س',
    trend: 'up',
    percentChange: 5.3,
    category: 'sales',
    period: 'شهري'
  },
  {
    id: 'm4',
    name: 'معدل تكرار الشراء',
    value: 3.2,
    unit: '',
    trend: 'up',
    percentChange: 0.8,
    category: 'customer',
    period: 'شهري'
  },
  {
    id: 'm5',
    name: 'معدل اكتساب العملاء',
    value: 12.5,
    unit: '%',
    trend: 'up',
    percentChange: 2.1,
    category: 'customer',
    period: 'شهري'
  },
  {
    id: 'm6',
    name: 'تكلفة اكتساب العميل',
    value: 320,
    unit: 'ر.س',
    trend: 'down',
    percentChange: -5.2,
    category: 'marketing',
    period: 'شهري'
  }
];

// بيانات وهمية للنسب المالية
const mockFinancialRatios: FinancialRatio[] = [
  {
    id: 'r1',
    name: 'نسبة السيولة',
    value: 2.3,
    industry: 2.1,
    trend: 'up',
    description: 'قدرة الشركة على تغطية التزاماتها قصيرة الأجل',
    formula: 'الأصول المتداولة / الالتزامات المتداولة',
    lastPeriod: 2.1
  },
  {
    id: 'r2',
    name: 'نسبة الديون',
    value: 0.38,
    industry: 0.45,
    trend: 'down',
    description: 'نسبة تمويل الأصول عن طريق الديون',
    formula: 'إجمالي الديون / إجمالي الأصول',
    lastPeriod: 0.41
  },
  {
    id: 'r3',
    name: 'العائد على الأصول',
    value: 0.15,
    industry: 0.12,
    trend: 'up',
    description: 'كفاءة استخدام الأصول لتحقيق الأرباح',
    formula: 'صافي الربح / إجمالي الأصول',
    lastPeriod: 0.13
  },
  {
    id: 'r4',
    name: 'العائد على حقوق الملكية',
    value: 0.25,
    industry: 0.21,
    trend: 'up',
    description: 'العائد على استثمارات المساهمين',
    formula: 'صافي الربح / حقوق الملكية',
    lastPeriod: 0.22
  }
];

// بيانات وهمية للملخص التنفيذي
const mockExecutiveSummary: ExecutiveSummary = {
  financialHealth: 'good',
  topMetrics: [
    {
      id: 'tm1',
      name: 'معدل النمو في الإيرادات',
      value: 16.1,
      unit: '%',
      trend: 'up',
      percentChange: 3.2,
      category: 'growth',
      period: 'شهري'
    },
    {
      id: 'tm2',
      name: 'هامش صافي الربح',
      value: 20.9,
      unit: '%',
      trend: 'up',
      percentChange: 1.3,
      category: 'profit',
      period: 'شهري'
    },
    {
      id: 'tm3',
      name: 'نسبة الاحتفاظ بالعملاء',
      value: 85,
      unit: '%',
      trend: 'up',
      percentChange: 2.5,
      category: 'customer',
      period: 'شهري'
    }
  ],
  keyInsights: [
    'أظهرت المبيعات نمواً بنسبة 16.1% مقارنة بالفترة السابقة، مدفوعة بشكل رئيسي بمبيعات القطاع الإلكتروني',
    'تحسن هامش الربح بنسبة 1.3% نتيجة لتحسينات في سلسلة التوريد وخفض تكاليف التشغيل',
    'زيادة متوسط قيمة الطلبية بنسبة 5.3% نتيجة استراتيجية البيع المتقاطع الجديدة',
    'انخفاض تكلفة اكتساب العملاء بنسبة 5.2% مع زيادة معدل التحويل في الحملات الرقمية'
  ],
  recommendations: [
    'زيادة الاستثمار في قنوات التسويق الرقمي التي أظهرت أعلى معدل عائد على الاستثمار',
    'توسيع نطاق برنامج ولاء العملاء ليشمل مزايا إضافية للعملاء الأكثر ربحية',
    'إعادة هيكلة سياسة التسعير للمنتجات ذات الهامش المنخفض لتحسين الربحية الإجمالية',
    'تطبيق أتمتة العمليات في الإدارات ذات التكلفة العالية لتحسين الكفاءة التشغيلية'
  ],
  risks: [
    'زيادة المنافسة في السوق قد تؤثر على حصتنا السوقية في الربع القادم',
    'تقلبات أسعار المواد الخام قد تؤدي إلى زيادة تكاليف الإنتاج',
    'تأخر شحنات التوريد قد يؤثر على مستويات المخزون للمنتجات الرئيسية'
  ],
  opportunities: [
    'فرص التوسع في أسواق جديدة مع ارتفاع الطلب في المنطقة الشرقية',
    'إطلاق خط منتجات جديد لتلبية احتياجات شريحة العملاء المتنامية',
    'تحسين كفاءة سلسلة التوريد من خلال شراكات استراتيجية مع موردين رئيسيين'
  ]
};

// بيانات وهمية للتنبيهات
const mockAlerts: SystemAlert[] = [
  {
    id: 'a1',
    title: 'انخفاض مستوى المخزون',
    message: '5 منتجات رئيسية وصلت إلى مستوى إعادة الطلب',
    type: 'inventory',
    severity: 'high',
    timestamp: new Date(),
    read: false,
    actionRequired: true,
    actionLink: '/inventory/reorder'
  },
  {
    id: 'a2',
    title: 'تجاوز الميزانية',
    message: 'تجاوزت تكاليف التسويق الميزانية المخططة بنسبة 12%',
    type: 'budget',
    severity: 'medium',
    timestamp: new Date(),
    read: false,
    actionRequired: false
  },
  {
    id: 'a3',
    title: 'فواتير متأخرة الدفع',
    message: '8 فواتير تجاوزت موعد استحقاقها بأكثر من 30 يوماً',
    type: 'financial',
    severity: 'high',
    timestamp: new Date(),
    read: false,
    actionRequired: true,
    actionLink: '/receivables'
  },
  {
    id: 'a4',
    title: 'انخفاض في معدل التحويل',
    message: 'انخفاض في معدل تحويل المبيعات بنسبة 5% في الأسبوع الماضي',
    type: 'sales',
    severity: 'medium',
    timestamp: new Date(),
    read: true,
    actionRequired: false
  }
];

// بيانات وهمية لإحصائيات المشاريع
const mockProjectStats = {
  totalProjects: 15,
  activeProjects: 8,
  completedProjects: 5,
  overdueProjects: 2,
  totalBudget: 1850000,
  spentBudget: 1120000,
  statusChart: {
    labels: ['نشط', 'متوقف', 'تخطيط', 'مكتمل', 'ملغي'],
    datasets: [{
      label: 'حالة المشاريع',
      data: [8, 2, 3, 5, 1],
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(255, 99, 132, 0.7)'
      ]
    }]
  },
  budgetChart: {
    labels: ['مشروع 1', 'مشروع 2', 'مشروع 3', 'مشروع 4', 'مشروع 5'],
    datasets: [
      {
        label: 'الميزانية',
        data: [350000, 200000, 500000, 180000, 300000],
        backgroundColor: 'rgba(54, 162, 235, 0.7)'
      },
      {
        label: 'التكلفة الفعلية',
        data: [300000, 180000, 300000, 150000, 190000],
        backgroundColor: 'rgba(255, 99, 132, 0.7)'
      }
    ]
  }
};

// بيانات وهمية للمخططات البيانية
const mockSalesTrends = {
  labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
  datasets: [
    {
      label: 'المبيعات',
      data: [1250000, 1320000, 1450000, 1380000, 1410000, 1458500],
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      borderColor: 'rgba(37, 99, 235, 1)'
    },
    {
      label: 'المصروفات',
      data: [980000, 1050000, 1120000, 1090000, 1130000, 1153300],
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 1)'
    }
  ]
};

const mockCashflow = {
  labels: ['يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو'],
  datasets: [
    {
      label: 'التدفقات النقدية الواردة',
      data: [1300000, 1350000, 1480000, 1420000, 1460000, 1520000],
      backgroundColor: 'rgba(16, 185, 129, 0.7)'
    },
    {
      label: 'التدفقات النقدية الصادرة',
      data: [1050000, 1120000, 1180000, 1150000, 1190000, 1210000],
      backgroundColor: 'rgba(239, 68, 68, 0.7)'
    }
  ]
};

const mockProfitability = {
  labels: ['المنتج أ', 'المنتج ب', 'المنتج ج', 'المنتج د', 'المنتج هـ'],
  datasets: [
    {
      label: 'الربحية',
      data: [35, 25, 20, 15, 5],
      backgroundColor: [
        'rgba(37, 99, 235, 0.7)',
        'rgba(16, 185, 129, 0.7)',
        'rgba(245, 158, 11, 0.7)',
        'rgba(139, 92, 246, 0.7)',
        'rgba(239, 68, 68, 0.7)'
      ]
    }
  ]
};

export const useExecutiveDashboard = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date()
  });
  
  // استخدام البيانات الوهمية
  const kpis = useMemo(() => mockKpis, []);
  const financialMetrics = useMemo(() => mockFinancialMetrics, []);
  const financialRatios = useMemo(() => mockFinancialRatios, []);
  const executiveSummary = useMemo(() => mockExecutiveSummary, []);
  const alerts = useMemo(() => mockAlerts, []);
  const projectStats = useMemo(() => mockProjectStats, []);
  const salesTrends = useMemo(() => mockSalesTrends, []);
  const cashflow = useMemo(() => mockCashflow, []);
  const profitability = useMemo(() => mockProfitability, []);
  
  // تحديث لوحة المعلومات
  const refreshDashboard = useCallback(() => {
    toast.success('جاري تحديث البيانات...');
    
    // محاكاة لعملية تحديث البيانات
    setTimeout(() => {
      toast.success('تم تحديث البيانات بنجاح');
    }, 1500);
  }, []);
  
  // مشاركة لوحة المعلومات
  const shareDashboard = useCallback((method: 'email' | 'export') => {
    if (method === 'email') {
      toast.success('جاري إرسال لوحة المعلومات عبر البريد الإلكتروني...');
    } else {
      toast.success('جاري تصدير لوحة المعلومات...');
    }
    
    // محاكاة لعملية المشاركة
    setTimeout(() => {
      toast.success('تمت العملية بنجاح');
    }, 1500);
  }, []);
  
  // تصدير لوحة المعلومات
  const exportDashboard = useCallback(() => {
    toast.success('جاري تصدير لوحة المعلومات...');
    
    // محاكاة لعملية التصدير
    setTimeout(() => {
      toast.success('تم تصدير لوحة المعلومات بنجاح');
    }, 1500);
  }, []);

  return {
    kpis,
    financialMetrics,
    financialRatios,
    executiveSummary,
    alerts,
    projectStats,
    salesTrends,
    cashflow,
    profitability,
    dateRange,
    setDateRange,
    refreshDashboard,
    shareDashboard,
    exportDashboard
  };
};
