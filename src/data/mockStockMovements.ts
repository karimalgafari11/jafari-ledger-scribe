
import { StockMovement } from "@/types/inventory";

export const mockStockMovements: StockMovement[] = [
  {
    id: "1",
    date: new Date(2025, 3, 25),
    type: "inbound",
    itemId: "1",
    itemName: "قميص قطني",
    quantity: 15,
    sourceWarehouse: "المورد الرئيسي",
    destinationWarehouse: "المستودع الرئيسي",
    notes: "استلام طلبية شهرية"
  },
  {
    id: "2",
    date: new Date(2025, 3, 24),
    type: "outbound",
    itemId: "2",
    itemName: "بنطلون جينز",
    quantity: 5,
    sourceWarehouse: "المستودع الرئيسي",
    destinationWarehouse: "فرع الرياض",
    notes: "طلب عادي من الفرع"
  },
  {
    id: "3",
    date: new Date(2025, 3, 23),
    type: "transfer",
    itemId: "3",
    itemName: "حذاء رياضي",
    quantity: 3,
    sourceWarehouse: "المستودع الرئيسي",
    destinationWarehouse: "فرع جدة",
    notes: "نقل مخزون بين الفروع"
  },
  {
    id: "4",
    date: new Date(2025, 3, 22),
    type: "inbound",
    itemId: "4",
    itemName: "ساعة يد",
    quantity: 10,
    sourceWarehouse: "المورد الثانوي",
    destinationWarehouse: "المستودع الرئيسي",
    notes: "طلبية خاصة"
  },
  {
    id: "5",
    date: new Date(2025, 3, 21),
    type: "outbound",
    itemId: "5",
    itemName: "نظارة شمسية",
    quantity: 8,
    sourceWarehouse: "المستودع الرئيسي",
    destinationWarehouse: "فرع الدمام",
    notes: "طلب عاجل"
  },
  {
    id: "6",
    date: new Date(2025, 3, 20),
    type: "transfer",
    itemId: "6",
    itemName: "حقيبة ظهر",
    quantity: 4,
    sourceWarehouse: "فرع الرياض",
    destinationWarehouse: "فرع جدة",
    notes: "إعادة توزيع المخزون"
  },
  {
    id: "7",
    date: new Date(2025, 3, 19),
    type: "inbound",
    itemId: "7",
    itemName: "سماعات لاسلكية",
    quantity: 20,
    sourceWarehouse: "المورد الرئيسي",
    destinationWarehouse: "المستودع الرئيسي",
    notes: "وصول طلبية جديدة"
  }
];
