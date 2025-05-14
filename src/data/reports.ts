import { Report } from "@/hooks/useReports";

export const allReports: Report[] = [
  {
    id: "1",
    title: "الميزانية العمومية",
    description: "يعرض الأصول والخصوم وحقوق الملكية",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "2",
    title: "قائمة الدخل",
    description: "يعرض الإيرادات والمصروفات وصافي الربح أو الخسارة",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "3",
    title: "التدفقات المالية",
    description: "يعرض حركة النقد الداخل والخارج",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "4",
    title: "دفتر الأستاذ",
    description: "يسجل جميع العمليات المحاسبية",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "5",
    title: "كشف الحساب",
    description: "تفاصيل حسابات العملاء أو الموردين",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "6",
    title: "ميزان المراجعة",
    description: "توازن الأرصدة المدينة والدائنة",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "7",
    title: "معلومات المحفظة",
    description: "يعرض تفاصيل المحفظة المالية",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "8",
    title: "توزيع المصروفات",
    description: "تحليل المصاريف حسب الفئات",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  
  // Sales Reports
  {
    id: "9",
    title: "الفواتير",
    description: "تسجيل الفواتير الصادرة للعملاء عند البيع",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  {
    id: "10",
    title: "عروض الأسعار",
    description: "إنشاء وإدارة عروض الأسعار",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  {
    id: "11",
    title: "أوامر البيع",
    description: "إدارة أوامر البيع المعتمدة",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  {
    id: "12",
    title: "الإيصالات",
    description: "تسجيل المبالغ المستلمة من العملاء",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  {
    id: "13",
    title: "مرتجعات المبيعات",
    description: "تسجيل المرتجعات المالية",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  {
    id: "14",
    title: "العملاء",
    description: "إدارة قاعدة بيانات العملاء",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  {
    id: "15",
    title: "تقارير المبيعات",
    description: "تقارير تحليلية حسب المنتج، العميل، أو المنطقة",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  
  // Inventory Reports
  {
    id: "16",
    title: "حركة المخزون",
    description: "تفاصيل دخول وخروج المخزون",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory'
  },
  {
    id: "17",
    title: "المخزون الحالي",
    description: "كمية وقيمة الأصناف الحالية",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory'
  },
  {
    id: "18",
    title: "الأصناف الراكدة",
    description: "المنتجات ذات الحركة البطيئة",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory'
  },
  {
    id: "19",
    title: "مستويات إعادة الطلب",
    description: "تنبيه بالأصناف التي تحتاج إلى إعادة طلب",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory'
  },
  {
    id: "20",
    title: "تقييم المخزون",
    description: "تقدير القيمة الإجمالية للمخزون الحالي",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory'
  },
  
  // Inventory Control Reports
  {
    id: "21",
    title: "الجرد الفعلي",
    description: "مقارنة بين الجرد الفعلي والمسجل",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory-control'
  },
  {
    id: "22",
    title: "الفروقات المخزنية",
    description: "الفروقات بين الكميات المتوقعة والفعلية",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory-control'
  },
  {
    id: "23",
    title: "المخزون التالف أو المفقود",
    description: "تسجيل التالف والمفقود من المخزون",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory-control'
  },
  {
    id: "24",
    title: "أوامر التحويل الداخلي",
    description: "تسجيل نقل البضائع بين المستودعات",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory-control'
  }
];
