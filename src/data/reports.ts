
import { Report } from "@/types/custom-reports";

export const allReports: Report[] = [
  {
    id: "1",
    name: "الميزانية العمومية",
    title: "الميزانية العمومية",
    description: "يعرض الأصول والخصوم وحقوق الملكية",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "2",
    name: "قائمة الدخل",
    title: "قائمة الدخل",
    description: "يعرض الإيرادات والمصروفات وصافي الربح أو الخسارة",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "3",
    name: "التدفقات المالية",
    title: "التدفقات المالية",
    description: "يعرض حركة النقد الداخل والخارج",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "4",
    name: "دفتر الأستاذ",
    title: "دفتر الأستاذ",
    description: "يسجل جميع العمليات المحاسبية",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "5",
    name: "كشف الحساب",
    title: "كشف الحساب",
    description: "تفاصيل حسابات العملاء أو الموردين",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "6",
    name: "ميزان المراجعة",
    title: "ميزان المراجعة",
    description: "توازن الأرصدة المدينة والدائنة",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "7",
    name: "معلومات المحفظة",
    title: "معلومات المحفظة",
    description: "يعرض تفاصيل المحفظة المالية",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  {
    id: "8",
    name: "توزيع المصروفات",
    title: "توزيع المصروفات",
    description: "تحليل المصاريف حسب الفئات",
    date: "2023/04/25",
    favorite: false,
    category: 'financial'
  },
  
  // Sales Reports
  {
    id: "9",
    name: "الفواتير",
    title: "الفواتير",
    description: "تسجيل الفواتير الصادرة للعملاء عند البيع",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  {
    id: "10",
    name: "عروض الأسعار",
    title: "عروض الأسعار",
    description: "إنشاء وإدارة عروض الأسعار",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  {
    id: "11",
    name: "أوامر البيع",
    title: "أوامر البيع",
    description: "إدارة أوامر البيع المعتمدة",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  {
    id: "12",
    name: "الإيصالات",
    title: "الإيصالات",
    description: "تسجيل المبالغ المستلمة من العملاء",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  {
    id: "13",
    name: "مرتجعات المبيعات",
    title: "مرتجعات المبيعات",
    description: "تسجيل المرتجعات المالية",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  {
    id: "14",
    name: "العملاء",
    title: "العملاء",
    description: "إدارة قاعدة بيانات العملاء",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  {
    id: "15",
    name: "تقارير المبيعات",
    title: "تقارير المبيعات",
    description: "تقارير تحليلية حسب المنتج، العميل، أو المنطقة",
    date: "2023/04/25",
    favorite: false,
    category: 'sales'
  },
  
  // Inventory Reports
  {
    id: "16",
    name: "حركة المخزون",
    title: "حركة المخزون",
    description: "تفاصيل دخول وخروج المخزون",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory'
  },
  {
    id: "17",
    name: "المخزون الحالي",
    title: "المخزون الحالي",
    description: "كمية وقيمة الأصناف الحالية",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory'
  },
  {
    id: "18",
    name: "الأصناف الراكدة",
    title: "الأصناف الراكدة",
    description: "المنتجات ذات الحركة البطيئة",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory'
  },
  {
    id: "19",
    name: "مستويات إعادة الطلب",
    title: "مستويات إعادة الطلب",
    description: "تنبيه بالأصناف التي تحتاج إلى إعادة طلب",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory'
  },
  {
    id: "20",
    name: "تقييم المخزون",
    title: "تقييم المخزون",
    description: "تقدير القيمة الإجمالية للمخزون الحالي",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory'
  },
  
  // Inventory Control Reports
  {
    id: "21",
    name: "الجرد الفعلي",
    title: "الجرد الفعلي",
    description: "مقارنة بين الجرد الفعلي والمسجل",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory-control'
  },
  {
    id: "22",
    name: "الفروقات المخزنية",
    title: "الفروقات المخزنية",
    description: "الفروقات بين الكميات المتوقعة والفعلية",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory-control'
  },
  {
    id: "23",
    name: "المخزون التالف أو المفقود",
    title: "المخزون التالف أو المفقود",
    description: "تسجيل التالف والمفقود من المخزون",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory-control'
  },
  {
    id: "24",
    name: "أوامر التحويل الداخلي",
    title: "أوامر التحويل الداخلي",
    description: "تسجيل نقل البضائع بين المستودعات",
    date: "2023/04/25",
    favorite: false,
    category: 'inventory-control'
  }
];
