
// src/data/mockWarehouses.ts
export interface Warehouse {
  id: string;
  name: string;
  code: string;
  location: string;
  isActive: boolean;
}

export const mockWarehouses: Warehouse[] = [
  {
    id: "wh-001",
    name: "المخزن الرئيسي",
    code: "MN",
    location: "الرياض - حي العليا",
    isActive: true,
  },
  {
    id: "wh-002",
    name: "مخزن الفرع الأول",
    code: "BR1",
    location: "الرياض - حي النسيم",
    isActive: true,
  },
  {
    id: "wh-003",
    name: "مخزن الفرع الثاني",
    code: "BR2",
    location: "جدة - حي الروضة",
    isActive: true,
  },
  {
    id: "wh-004",
    name: "مخزن المنتجات الخاصة",
    code: "SP",
    location: "الدمام - المنطقة الصناعية",
    isActive: true,
  }
];
