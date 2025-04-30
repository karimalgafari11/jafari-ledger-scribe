
import { Product } from "@/types/inventory";

export const mockProducts: Product[] = [
  {
    id: "1",
    code: "ENG-001",
    name: "فلتر زيت",
    price: 45.99,
    category: "فلاتر",
    quantity: 25,
    reorderLevel: 10,
    isActive: true
  },
  {
    id: "2",
    code: "BRK-001",
    name: "فحمات فرامل أمامية",
    price: 89.99,
    category: "فرامل",
    quantity: 15,
    reorderLevel: 8,
    isActive: true
  },
  {
    id: "3",
    code: "ENG-002",
    name: "طقم بواجي",
    price: 129.99,
    category: "محرك",
    quantity: 8,
    reorderLevel: 10,
    isActive: true
  },
  {
    id: "4",
    code: "SUS-001",
    name: "مساعدات أمامية",
    price: 249.99,
    category: "تعليق",
    quantity: 5,
    reorderLevel: 5,
    isActive: true
  },
  {
    id: "5",
    code: "ELE-001",
    name: "بطارية 70 أمبير",
    price: 379.99,
    category: "كهرباء",
    quantity: 12,
    reorderLevel: 8,
    isActive: true
  },
  {
    id: "6",
    code: "ACC-001",
    name: "مساحات زجاج أمامية",
    price: 69.99,
    category: "إكسسوارات",
    quantity: 7,
    reorderLevel: 10,
    isActive: true
  },
  {
    id: "7",
    code: "ELE-002",
    name: "دينامو",
    price: 429.99,
    category: "كهرباء",
    quantity: 4,
    reorderLevel: 8,
    isActive: false
  },
  {
    id: "8",
    code: "ENG-003",
    name: "مضخة ماء",
    price: 159.99,
    category: "محرك",
    quantity: 0,
    reorderLevel: 15,
    isActive: true
  },
  {
    id: "9",
    code: "OIL-001",
    name: "زيت محرك 5 لتر",
    price: 199.99,
    category: "زيوت",
    quantity: 3,
    reorderLevel: 5,
    isActive: true
  },
  {
    id: "10",
    code: "BRK-002",
    name: "أقراص فرامل خلفية",
    price: 119.99,
    category: "فرامل",
    quantity: 18,
    reorderLevel: 10,
    isActive: true
  }
];
