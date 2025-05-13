
import { InventoryCount } from "@/types/inventory";

export const mockInventoryCounts: InventoryCount[] = [
  {
    id: "1",
    name: "جرد شهري للمستودع الرئيسي",
    date: "2025-04-20",  // Changed from Date to string format
    warehouseId: "1",
    warehouseName: "المستودع الرئيسي",
    status: "completed",
    items: [
      {
        id: "1",
        countId: "1",
        productId: "1",
        itemId: "1",  // Added for compatibility
        itemName: "قميص قطني",  // Added for compatibility
        expectedQuantity: 25,
        actualQuantity: 23,
        difference: -2,
        notes: "وجود عينتين تالفتين"
      },
      {
        id: "2",
        countId: "1",
        productId: "2",
        itemId: "2",
        itemName: "بنطلون جينز",
        expectedQuantity: 15,
        actualQuantity: 15,
        difference: 0,
        notes: ""
      },
      {
        id: "3",
        countId: "1",
        productId: "3",
        itemId: "3",
        itemName: "حذاء رياضي",
        expectedQuantity: 8,
        actualQuantity: 7,
        difference: -1,
        notes: "فقدان قطعة واحدة"
      }
    ],
    notes: "جرد شهري للمستودع الرئيسي",
    createdBy: "user1",
    createdAt: "2025-04-20T10:00:00"
  },
  {
    id: "2",
    name: "جرد نصف شهري لفرع الرياض",
    date: "2025-04-15",  // Changed from Date to string format
    warehouseId: "2",
    warehouseName: "فرع الرياض",
    status: "completed",
    items: [
      {
        id: "4",
        countId: "2",
        productId: "1",
        itemId: "1",
        itemName: "قميص قطني",
        expectedQuantity: 10,
        actualQuantity: 10,
        difference: 0,
        notes: ""
      },
      {
        id: "5",
        countId: "2",
        productId: "2",
        itemId: "2",
        itemName: "بنطلون جينز",
        expectedQuantity: 8,
        actualQuantity: 9,
        difference: 1,
        notes: "وجود قطعة إضافية غير مسجلة"
      }
    ],
    notes: "جرد نصف شهري لفرع الرياض",
    createdBy: "user2",
    createdAt: "2025-04-15T11:00:00"
  },
  {
    id: "3",
    name: "جرد مجدول قيد التنفيذ",
    date: "2025-04-10",  // Changed from Date to string format
    warehouseId: "3",
    warehouseName: "فرع جدة",
    status: "draft",
    items: [
      {
        id: "6",
        countId: "3",
        productId: "4",
        itemId: "4",
        itemName: "ساعة يد",
        expectedQuantity: 5,
        actualQuantity: 0,
        difference: -5,
        notes: "لم يتم الإحصاء بعد"
      },
      {
        id: "7",
        countId: "3",
        productId: "5",
        itemId: "5",
        itemName: "نظارة شمسية",
        expectedQuantity: 12,
        actualQuantity: 0,
        difference: -12,
        notes: "لم يتم الإحصاء بعد"
      }
    ],
    notes: "جرد مجدول قيد التنفيذ",
    createdBy: "user3",
    createdAt: "2025-04-10T09:00:00"
  }
];
