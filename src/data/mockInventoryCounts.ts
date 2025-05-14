
import { InventoryCount } from "@/types/inventory";

export const mockInventoryCounts: InventoryCount[] = [
  {
    id: "1",
    date: new Date(2025, 3, 20),
    warehouseId: "1",
    warehouseName: "المستودع الرئيسي",
    status: "completed",
    items: [
      {
        itemId: "1",
        itemName: "قميص قطني",
        expectedQuantity: 25,
        actualQuantity: 23,
        difference: -2,
        notes: "وجود عينتين تالفتين"
      },
      {
        itemId: "2",
        itemName: "بنطلون جينز",
        expectedQuantity: 15,
        actualQuantity: 15,
        difference: 0,
        notes: ""
      },
      {
        itemId: "3",
        itemName: "حذاء رياضي",
        expectedQuantity: 8,
        actualQuantity: 7,
        difference: -1,
        notes: "فقدان قطعة واحدة"
      }
    ],
    notes: "جرد شهري للمستودع الرئيسي"
  },
  {
    id: "2",
    date: new Date(2025, 3, 15),
    warehouseId: "2",
    warehouseName: "فرع الرياض",
    status: "completed",
    items: [
      {
        itemId: "1",
        itemName: "قميص قطني",
        expectedQuantity: 10,
        actualQuantity: 10,
        difference: 0,
        notes: ""
      },
      {
        itemId: "2",
        itemName: "بنطلون جينز",
        expectedQuantity: 8,
        actualQuantity: 9,
        difference: 1,
        notes: "وجود قطعة إضافية غير مسجلة"
      }
    ],
    notes: "جرد نصف شهري لفرع الرياض"
  },
  {
    id: "3",
    date: new Date(2025, 3, 10),
    warehouseId: "3",
    warehouseName: "فرع جدة",
    status: "draft",
    items: [
      {
        itemId: "4",
        itemName: "ساعة يد",
        expectedQuantity: 5,
        actualQuantity: 0,
        difference: -5,
        notes: "لم يتم الإحصاء بعد"
      },
      {
        itemId: "5",
        itemName: "نظارة شمسية",
        expectedQuantity: 12,
        actualQuantity: 0,
        difference: -12,
        notes: "لم يتم الإحصاء بعد"
      }
    ],
    notes: "جرد مجدول قيد التنفيذ"
  }
];
