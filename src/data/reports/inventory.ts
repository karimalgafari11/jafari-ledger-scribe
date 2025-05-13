
import { Report } from "@/types/custom-reports";

export const inventoryReports: Report[] = [
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
  }
];
