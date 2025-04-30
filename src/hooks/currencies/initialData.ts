
import { Currency } from "@/types/definitions";

// بيانات تجريبية للعملات
export const initialCurrencies: Currency[] = [
  {
    id: "1",
    code: "SAR",
    name: "ريال سعودي",
    symbol: "ر.س",
    isDefault: true,
    isActive: true,
    exchangeRate: 1, // سعر الصرف بالنسبة للعملة الافتراضية
    decimalPlaces: 2,
    country: "المملكة العربية السعودية",
  },
  {
    id: "2",
    code: "USD",
    name: "دولار أمريكي",
    symbol: "$",
    isDefault: false,
    isActive: true,
    exchangeRate: 0.2666, // سعر الصرف بالنسبة للعملة الافتراضية
    decimalPlaces: 2,
    country: "الولايات المتحدة الأمريكية",
  },
  {
    id: "3",
    code: "EUR",
    name: "يورو",
    symbol: "€",
    isDefault: false,
    isActive: true,
    exchangeRate: 0.2434, // سعر الصرف بالنسبة للعملة الافتراضية
    decimalPlaces: 2,
    country: "الاتحاد الأوروبي",
  },
  {
    id: "4",
    code: "AED",
    name: "درهم إماراتي",
    symbol: "د.إ",
    isDefault: false,
    isActive: true,
    exchangeRate: 0.9792, // سعر الصرف بالنسبة للعملة الافتراضية
    decimalPlaces: 2,
    country: "الإمارات العربية المتحدة",
  },
];
