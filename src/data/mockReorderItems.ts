
import { ReorderItem } from "@/types/inventory";

export const mockReorderItems: ReorderItem[] = [
  {
    itemId: "1",
    itemName: "قميص قطني",
    availableQuantity: 5,
    reorderThreshold: 10,
    suggestedOrderQuantity: 20,
    warehouseId: "1",
    warehouseName: "المستودع الرئيسي"
  },
  {
    itemId: "3",
    itemName: "حذاء رياضي",
    availableQuantity: 2,
    reorderThreshold: 10,
    suggestedOrderQuantity: 15,
    warehouseId: "1",
    warehouseName: "المستودع الرئيسي"
  },
  {
    itemId: "5",
    itemName: "نظارة شمسية",
    availableQuantity: 3,
    reorderThreshold: 8,
    suggestedOrderQuantity: 10,
    warehouseId: "1",
    warehouseName: "المستودع الرئيسي"
  },
  {
    itemId: "7",
    itemName: "سماعات لاسلكية",
    availableQuantity: 1,
    reorderThreshold: 8,
    suggestedOrderQuantity: 12,
    warehouseId: "2",
    warehouseName: "فرع الرياض"
  },
  {
    itemId: "8",
    itemName: "شاحن متنقل",
    availableQuantity: 0,
    reorderThreshold: 15,
    suggestedOrderQuantity: 25,
    warehouseId: "1",
    warehouseName: "المستودع الرئيسي"
  }
];
