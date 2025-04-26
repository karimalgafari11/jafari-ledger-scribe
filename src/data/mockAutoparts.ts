
import { AutoPart, PartCategory, Supplier } from "@/types/autoparts";

export const mockPartCategories: PartCategory[] = [
  { id: "1", name: "محرك", description: "قطع غيار المحرك" },
  { id: "2", name: "فرامل", description: "نظام الفرامل" },
  { id: "3", name: "تعليق", description: "نظام التعليق" },
  { id: "4", name: "كهرباء", description: "النظام الكهربائي" },
  { id: "5", name: "فلاتر", description: "فلاتر مختلفة" }
];

export const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "شركة القطع الأصلية",
    contact: "أحمد محمد",
    phone: "0501234567",
    email: "ahmed@original-parts.com",
    address: "الرياض - المنطقة الصناعية",
    isActive: true
  },
  {
    id: "2",
    name: "مؤسسة قطع الخليج",
    contact: "خالد عبدالله",
    phone: "0559876543",
    email: "khalid@gulf-parts.com",
    address: "جدة - شارع الصناعة",
    isActive: true
  }
];

export const mockAutoParts: AutoPart[] = [
  {
    id: "1",
    code: "ENG-001",
    name: "فلتر زيت",
    category: "فلاتر",
    brand: "تويوتا",
    model: "كامري",
    price: 45.00,
    quantity: 100,
    reorderLevel: 20,
    location: "A1-01",
    isActive: true,
    description: "فلتر زيت أصلي"
  },
  {
    id: "2",
    code: "BRK-001",
    name: "فحمات فرامل أمامية",
    category: "فرامل",
    brand: "تويوتا",
    model: "كامري",
    price: 220.00,
    quantity: 40,
    reorderLevel: 10,
    location: "B2-05",
    isActive: true
  },
  {
    id: "3",
    code: "ENG-002",
    name: "طقم بواجي",
    category: "محرك",
    brand: "دينسو",
    model: "متعدد",
    price: 180.00,
    quantity: 50,
    reorderLevel: 15,
    location: "A2-03",
    isActive: true
  },
  {
    id: "4",
    code: "SUS-001",
    name: "مساعدات أمامية",
    category: "تعليق",
    brand: "كيا",
    model: "سورينتو",
    price: 450.00,
    quantity: 20,
    reorderLevel: 8,
    location: "C1-02",
    isActive: true
  },
  {
    id: "5",
    code: "ELE-001",
    name: "بطارية 70 أمبير",
    category: "كهرباء",
    brand: "فارتا",
    model: "متعدد",
    price: 380.00,
    quantity: 30,
    reorderLevel: 10,
    location: "D1-01",
    isActive: true
  }
];
