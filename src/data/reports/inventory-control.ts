
import { Report } from "@/types/custom-reports";

export const inventoryControlReports: Report[] = [
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
