
import { StockMovement } from "@/types/inventory";

export const mockStockMovements: StockMovement[] = [
  {
    id: "1",
    date: "2025-04-25", // Changed from Date to string
    productId: "1",
    productName: "قميص قطني",
    itemName: "قميص قطني",
    quantity: 15,
    type: "inbound",
    sourceWarehouse: "المورد الرئيسي",
    sourceWarehouseName: "المورد الرئيسي",
    destinationWarehouse: "المستودع الرئيسي",
    destinationWarehouseName: "المستودع الرئيسي",
    userId: "1",
    userName: "Admin",
    notes: "استلام طلبية شهرية",
    movementType: "purchase",
    createdAt: "2025-04-25"
  },
  {
    id: "2",
    date: "2025-04-24", // Changed from Date to string
    productId: "2",
    productName: "بنطلون جينز",
    itemName: "بنطلون جينز",
    quantity: 5,
    type: "outbound",
    sourceWarehouse: "المستودع الرئيسي",
    sourceWarehouseName: "المستودع الرئيسي",
    destinationWarehouse: "فرع الرياض",
    destinationWarehouseName: "فرع الرياض",
    userId: "1",
    userName: "Admin",
    notes: "طلب عادي من الفرع",
    movementType: "sale",
    createdAt: "2025-04-24"
  },
  {
    id: "3",
    date: "2025-04-23", // Changed from Date to string
    productId: "3",
    productName: "حذاء رياضي",
    itemName: "حذاء رياضي",
    quantity: 3,
    type: "transfer",
    sourceWarehouse: "المستودع الرئيسي",
    sourceWarehouseName: "المستودع الرئيسي",
    destinationWarehouse: "فرع جدة",
    destinationWarehouseName: "فرع جدة",
    userId: "1",
    userName: "Admin",
    notes: "نقل مخزون بين الفروع",
    movementType: "transfer",
    createdAt: "2025-04-23"
  },
  {
    id: "4",
    date: "2025-04-22", // Changed from Date to string
    productId: "4",
    productName: "ساعة يد",
    itemName: "ساعة يد",
    quantity: 10,
    type: "inbound",
    sourceWarehouse: "المورد الثانوي",
    sourceWarehouseName: "المورد الثانوي",
    destinationWarehouse: "المستودع الرئيسي",
    destinationWarehouseName: "المستودع الرئيسي",
    userId: "1",
    userName: "Admin",
    notes: "طلبية خاصة",
    movementType: "purchase",
    createdAt: "2025-04-22"
  },
  {
    id: "5",
    date: "2025-04-21", // Changed from Date to string
    productId: "5",
    productName: "نظارة شمسية",
    itemName: "نظارة شمسية",
    quantity: 8,
    type: "outbound",
    sourceWarehouse: "المستودع الرئيسي",
    sourceWarehouseName: "المستودع الرئيسي",
    destinationWarehouse: "فرع الدمام",
    destinationWarehouseName: "فرع الدمام",
    userId: "1",
    userName: "Admin",
    notes: "طلب عاجل",
    movementType: "sale",
    createdAt: "2025-04-21"
  },
  {
    id: "6",
    date: "2025-04-20", // Changed from Date to string
    productId: "6",
    productName: "حقيبة ظهر",
    itemName: "حقيبة ظهر",
    quantity: 4,
    type: "transfer",
    sourceWarehouse: "فرع الرياض",
    sourceWarehouseName: "فرع الرياض",
    destinationWarehouse: "فرع جدة",
    destinationWarehouseName: "فرع جدة",
    userId: "1",
    userName: "Admin",
    notes: "إعادة توزيع المخزون",
    movementType: "transfer",
    createdAt: "2025-04-20"
  },
  {
    id: "7",
    date: "2025-04-19", // Changed from Date to string
    productId: "7",
    productName: "سماعات لاسلكية",
    itemName: "سماعات لاسلكية",
    quantity: 20,
    type: "inbound",
    sourceWarehouse: "المورد الرئيسي",
    sourceWarehouseName: "المورد الرئيسي",
    destinationWarehouse: "المستودع الرئيسي",
    destinationWarehouseName: "المستودع الرئيسي",
    userId: "1",
    userName: "Admin",
    notes: "وصول طلبية جديدة",
    movementType: "purchase",
    createdAt: "2025-04-19"
  }
];
