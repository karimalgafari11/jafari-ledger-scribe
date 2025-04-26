
import { Product } from "@/types/inventory";

export const mockProducts: Product[] = [
  {
    id: "1",
    code: "P001",
    name: "قميص قطني",
    price: 59.99,
    category: "ملابس",
    quantity: 25,
    reorderLevel: 10,
    isActive: true
  },
  {
    id: "2",
    code: "P002",
    name: "بنطلون جينز",
    price: 89.99,
    category: "ملابس",
    quantity: 15,
    reorderLevel: 8,
    isActive: true
  },
  {
    id: "3",
    code: "P003",
    name: "حذاء رياضي",
    price: 129.99,
    category: "أحذية",
    quantity: 8,
    reorderLevel: 10,
    isActive: true
  },
  {
    id: "4",
    code: "P004",
    name: "ساعة يد",
    price: 249.99,
    category: "إكسسوارات",
    quantity: 5,
    reorderLevel: 5,
    isActive: true
  },
  {
    id: "5",
    code: "P005",
    name: "نظارة شمسية",
    price: 79.99,
    category: "إكسسوارات",
    quantity: 12,
    reorderLevel: 8,
    isActive: true
  },
  {
    id: "6",
    code: "P006",
    name: "حقيبة ظهر",
    price: 69.99,
    category: "حقائب",
    quantity: 7,
    reorderLevel: 10,
    isActive: true
  },
  {
    id: "7",
    code: "P007",
    name: "سماعات لاسلكية",
    price: 149.99,
    category: "إلكترونيات",
    quantity: 4,
    reorderLevel: 8,
    isActive: false
  },
  {
    id: "8",
    code: "P008",
    name: "شاحن متنقل",
    price: 49.99,
    category: "إلكترونيات",
    quantity: 0,
    reorderLevel: 15,
    isActive: true
  },
  {
    id: "9",
    code: "P009",
    name: "عطر رجالي",
    price: 199.99,
    category: "عطور",
    quantity: 3,
    reorderLevel: 5,
    isActive: true
  },
  {
    id: "10",
    code: "P010",
    name: "محفظة جلدية",
    price: 39.99,
    category: "إكسسوارات",
    quantity: 18,
    reorderLevel: 10,
    isActive: true
  }
];
