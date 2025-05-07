
import { v4 as uuidv4 } from 'uuid';
import { 
  FinancialDecision,
  JournalEntrySuggestion,
  PricingSuggestion,
  ProvisionSuggestion,
  VarianceAnalysis
} from '@/types/ai-finance';

// Create mock data for display
const mockJournalEntrySuggestions: JournalEntrySuggestion[] = [
  {
    id: uuidv4(),
    type: 'journal_entry',
    title: 'تسجيل إهلاك لأصول ثابتة',
    description: 'اقتراح لتسجيل قيد الإهلاك الشهري للأصول الثابتة',
    impact: 12500, // Changed from object to number
    confidence: 92,
    suggestedActions: [
      'تسجيل القيد كما هو مقترح',
      'مراجعة نسب الإهلاك المطبقة',
    ],
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Changed to string
    status: 'suggested', // Changed from 'pending' to 'suggested'
    suggestedLines: [
      {
        accountId: '521',
        accountName: 'مصروف إهلاك الأصول الثابتة',
        debit: 12500,
        credit: 0,
        description: 'إهلاك أصول شهر يونيو'
      },
      {
        accountId: '126',
        accountName: 'مجمع إهلاك الأصول الثابتة',
        debit: 0,
        credit: 12500,
        description: 'إهلاك أصول شهر يونيو'
      }
    ],
    preventionReason: 'تسجيل قيد الإهلاك الشهري قبل إقفال الفترة المحاسبية لضمان تمثيل القوائم المالية للوضع الحقيقي للشركة'
  },
  {
    id: uuidv4(),
    type: 'journal_entry',
    title: 'تسوية حساب الصندوق',
    description: 'فرق بين الرصيد الدفتري والرصيد الفعلي للصندوق',
    impact: 750,
    confidence: 78,
    suggestedActions: [
      'تسجيل القيد كما هو مقترح',
      'إجراء جرد للصندوق للتأكد من الفرق',
    ],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'suggested',
    suggestedLines: [
      {
        accountId: '528',
        accountName: 'فروقات الصندوق',
        debit: 750,
        credit: 0,
        description: 'تسوية فرق الصندوق'
      },
      {
        accountId: '101',
        accountName: 'الصندوق',
        debit: 0,
        credit: 750,
        description: 'تسوية فرق الصندوق'
      }
    ],
    commonError: 'وجود فرق بين الرصيد الدفتري والرصيد الفعلي للصندوق بقيمة 750 ريال. قد يكون هناك خطأ في تسجيل المصروفات النثرية.',
    preventionReason: 'تسوية الفرق سيؤدي إلى تطابق السجلات المحاسبية مع الرصيد الفعلي للصندوق'
  },
];

const mockPricingSuggestions: PricingSuggestion[] = [
  {
    id: uuidv4(),
    type: 'pricing',
    title: 'زيادة سعر المنتج "قميص قطني"',
    description: 'اقتراح لزيادة سعر المنتج بناءً على ارتفاع الطلب وزيادة تكلفة المواد الخام',
    impact: 15000,
    confidence: 85,
    suggestedActions: [
      'تطبيق السعر الجديد',
      'تطبيق السعر الجديد تدريجياً',
      'مراجعة هامش الربح',
    ],
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    status: 'suggested',
    productId: 'P-1001',
    productName: 'قميص قطني',
    currentPrice: 120,
    suggestedPrice: 135,
    priceChangeReason: 'demand',
    demandFactor: 0.25,
    costFactor: 0.15,
    expectedRevenue: 85000
  },
  {
    id: uuidv4(),
    type: 'pricing',
    title: 'تخفيض سعر المنتج "بنطلون جينز"',
    description: 'اقتراح لتخفيض السعر بسبب انخفاض الطلب ووجود منافسة قوية',
    impact: -8000,
    confidence: 72,
    suggestedActions: [
      'تطبيق السعر الجديد',
      'عمل عرض ترويجي بالسعر الجديد',
    ],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'suggested',
    productId: 'P-1005',
    productName: 'بنطلون جينز',
    currentPrice: 180,
    suggestedPrice: 160,
    priceChangeReason: 'competition',
    demandFactor: -0.15,
    competitionFactor: -0.2,
    expectedRevenue: 56000
  },
];

const mockProvisionSuggestions: ProvisionSuggestion[] = [
  {
    id: uuidv4(),
    type: 'provision',
    title: 'زيادة مخصص الديون المشكوك في تحصيلها',
    description: 'اقتراح لزيادة المخصص بناءً على تحليل أعمار الديون',
    impact: 25000,
    confidence: 88,
    suggestedActions: [
      'تطبيق المخصص المقترح',
      'مراجعة أعمار الديون بالتفصيل',
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'suggested',
    accountId: '129',
    accountName: 'مخصص الديون المشكوك في تحصيلها',
    currentAmount: 50000,
    suggestedAmount: 75000,
    riskFactor: 65,
    category: 'bad_debts'
  },
];

const mockVarianceAnalyses: VarianceAnalysis[] = [
  {
    id: uuidv4(),
    type: 'variance',
    title: 'فروقات كبيرة في مصروفات الصيانة',
    description: 'تحليل لأسباب ارتفاع مصروفات الصيانة عن المتوقع بنسبة 32%',
    impact: 18500,
    confidence: 90,
    suggestedActions: [
      'مراجعة عقود الصيانة',
      'البحث عن موردين جدد بأسعار أفضل',
    ],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'suggested',
    accountId: '525',
    accountName: 'مصروفات الصيانة',
    expectedAmount: 58000,
    actualAmount: 76500,
    variance: 18500,
    variancePercentage: 31.9,
    explanation: 'يرجع الارتفاع في مصروفات الصيانة إلى عدة عوامل: 1) إصلاحات طارئة غير مجدولة للمعدات الرئيسية (12,000 ريال) 2) ارتفاع أسعار قطع الغيار بنسبة 15% مقارنة بالفترة السابقة 3) زيادة وتيرة الصيانة الدورية بسبب تقادم المعدات. يوصى بدراسة جدوى استبدال المعدات القديمة لتقليل تكاليف الصيانة المتكررة على المدى الطويل.',
    severity: 'high'
  },
  {
    id: uuidv4(),
    type: 'variance',
    title: 'انخفاض إيرادات المبيعات',
    description: 'تحليل لانخفاض إيرادات المبيعات عن المتوقع بنسبة 12%',
    impact: -45000,
    confidence: 86,
    suggestedActions: [
      'تحليل المبيعات حسب خطوط الإنتاج',
      'مراجعة استراتيجية التسعير',
      'تقييم أداء فريق المبيعات',
    ],
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'suggested',
    accountId: '411',
    accountName: 'إيرادات المبيعات',
    expectedAmount: 375000,
    actualAmount: 330000,
    variance: -45000,
    variancePercentage: 12,
    explanation: 'يعزى انخفاض المبيعات بشكل رئيسي إلى: 1) تراجع مبيعات المنتجات ذات الهامش العالي بنسبة 18% 2) تأخر إطلاق المنتجات الموسمية الجديدة 3) زيادة النشاط التسويقي للمنافسين الرئيسيين. يلاحظ أن هناك نمواً في فئة المنتجات الجديدة رغم الانخفاض العام، مما يشير إلى أهمية التركيز على توسيع هذه الفئة.',
    severity: 'medium'
  },
];

// Merge all decision types into one array
export const mockFinancialDecisions: FinancialDecision[] = [
  ...mockJournalEntrySuggestions,
  ...mockPricingSuggestions,
  ...mockProvisionSuggestions,
  ...mockVarianceAnalyses
].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Sort by newest
