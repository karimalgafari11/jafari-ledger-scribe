
import { Product } from "@/types/inventory";
import { v4 as uuidv4 } from "uuid";

// إنشاء قائمة من المنتجات المزيفة للعرض التجريبي
export const mockProducts: Product[] = [
  {
    id: uuidv4(),
    name: "لاب توب ديل XPS",
    code: "LP001",
    description: "لاب توب ديل XPS 13 بوصة",
    price: 5499.99,
    costPrice: 4500,
    quantity: 15,
    category: "إلكترونيات",
    unit: "قطعة",
    barcode: "123456789012"
  },
  {
    id: uuidv4(),
    name: "آيفون 15 برو",
    code: "PH002",
    description: "هاتف آيفون 15 برو ماكس",
    price: 4999.99,
    costPrice: 4000,
    quantity: 30,
    category: "جوالات",
    unit: "قطعة",
    barcode: "987654321098"
  },
  {
    id: uuidv4(),
    name: "سماعات سوني",
    code: "AU003",
    description: "سماعات سوني لاسلكية",
    price: 799.99,
    costPrice: 450,
    quantity: 50,
    category: "إلكترونيات",
    unit: "قطعة",
    barcode: "345678901234"
  },
  {
    id: uuidv4(),
    name: "شاشة سامسونج",
    code: "DS004",
    description: "شاشة سامسونج 4K 55 بوصة",
    price: 2999.99,
    costPrice: 2400,
    quantity: 10,
    category: "إلكترونيات",
    unit: "قطعة",
    barcode: "567890123456"
  },
  {
    id: uuidv4(),
    name: "ماوس لاسلكي",
    code: "MS005",
    description: "ماوس لاسلكي لوجيتيك",
    price: 149.99,
    costPrice: 80,
    quantity: 100,
    category: "إكسسوارات",
    unit: "قطعة",
    barcode: "678901234567"
  },
  {
    id: uuidv4(),
    name: "لوحة مفاتيح ميكانيكية",
    code: "KB006",
    description: "لوحة مفاتيح ميكانيكية للألعاب",
    price: 299.99,
    costPrice: 180,
    quantity: 45,
    category: "إكسسوارات",
    unit: "قطعة",
    barcode: "789012345678"
  },
  {
    id: uuidv4(),
    name: "طابعة ليزر",
    code: "PR007",
    description: "طابعة ليزر ملون",
    price: 899.99,
    costPrice: 700,
    quantity: 20,
    category: "إلكترونيات",
    unit: "قطعة",
    barcode: "890123456789"
  },
  {
    id: uuidv4(),
    name: "ساعة أبل",
    code: "WT008",
    description: "ساعة أبل الإصدار 8",
    price: 1999.99,
    costPrice: 1500,
    quantity: 25,
    category: "إكسسوارات",
    unit: "قطعة",
    barcode: "901234567890"
  },
  {
    id: uuidv4(),
    name: "تابليت سامسونج",
    code: "TB009",
    description: "تابليت سامسونج جالاكسي تاب",
    price: 1499.99,
    costPrice: 1100,
    quantity: 35,
    category: "إلكترونيات",
    unit: "قطعة",
    barcode: "012345678901"
  },
  {
    id: uuidv4(),
    name: "شاحن لاسلكي",
    code: "CH010",
    description: "شاحن لاسلكي سريع",
    price: 129.99,
    costPrice: 60,
    quantity: 80,
    category: "إكسسوارات",
    unit: "قطعة",
    barcode: "234567890123"
  }
];
