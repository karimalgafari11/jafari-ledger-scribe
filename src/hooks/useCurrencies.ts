
import { useState } from "react";
import { Currency } from "@/types/definitions";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

// بيانات تجريبية للعملات
const initialCurrencies: Currency[] = [
  {
    id: uuid(),
    code: "SAR",
    name: "ريال سعودي",
    country: "المملكة العربية السعودية",
    symbol: "﷼",
    isDefault: true,
    isActive: true,
  },
  {
    id: uuid(),
    code: "USD",
    name: "دولار أمريكي",
    country: "الولايات المتحدة الأمريكية",
    symbol: "$",
    isDefault: false,
    isActive: true,
  },
  {
    id: uuid(),
    code: "EUR",
    name: "يورو",
    country: "الاتحاد الأوروبي",
    symbol: "€",
    isDefault: false,
    isActive: true,
  },
  {
    id: uuid(),
    code: "AED",
    name: "درهم إماراتي",
    country: "الإمارات العربية المتحدة",
    symbol: "د.إ",
    isDefault: false,
    isActive: true,
  },
];

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>(initialCurrencies);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // البحث في العملات
  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.code.includes(searchTerm.toUpperCase()) ||
      currency.name.includes(searchTerm) ||
      currency.country.includes(searchTerm)
  );

  // إضافة عملة جديدة
  const createCurrency = (currency: Omit<Currency, "id">) => {
    setIsLoading(true);
    setTimeout(() => {
      const newCurrency: Currency = {
        ...currency,
        id: uuid(),
      };
      
      // إذا كانت العملة الجديدة هي العملة الافتراضية، نقوم بإلغاء الافتراضي من العملات الأخرى
      if (newCurrency.isDefault) {
        setCurrencies(
          currencies.map((c) => ({
            ...c,
            isDefault: false,
          }))
        );
      }
      
      setCurrencies([...currencies, newCurrency]);
      setIsLoading(false);
      toast.success("تم إضافة العملة بنجاح");
    }, 500);
  };

  // تعديل عملة موجودة
  const updateCurrency = (id: string, updates: Partial<Currency>) => {
    setIsLoading(true);
    setTimeout(() => {
      // إذا تم جعل العملة افتراضية، نلغي الافتراضي من باقي العملات
      if (updates.isDefault) {
        setCurrencies(
          currencies.map((currency) => ({
            ...currency,
            isDefault: false,
          }))
        );
      }
      
      setCurrencies(
        currencies.map((currency) =>
          currency.id === id
            ? { ...currency, ...updates }
            : currency
        )
      );
      setIsLoading(false);
      toast.success("تم تحديث بيانات العملة بنجاح");
    }, 500);
  };

  // حذف عملة
  const deleteCurrency = (id: string) => {
    const currencyToDelete = currencies.find((c) => c.id === id);
    
    // لا يمكن حذف العملة الافتراضية
    if (currencyToDelete?.isDefault) {
      toast.error("لا يمكن حذف العملة الافتراضية");
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setCurrencies(currencies.filter((currency) => currency.id !== id));
      setIsLoading(false);
      toast.success("تم حذف العملة بنجاح");
    }, 500);
  };

  // تفعيل/تعطيل عملة
  const toggleCurrencyStatus = (id: string) => {
    const currencyToToggle = currencies.find((c) => c.id === id);
    
    // لا يمكن تعطيل العملة الافتراضية
    if (currencyToToggle?.isDefault && currencyToToggle.isActive) {
      toast.error("لا يمكن تعطيل العملة الافتراضية");
      return;
    }
    
    setCurrencies(
      currencies.map((currency) =>
        currency.id === id
          ? { ...currency, isActive: !currency.isActive }
          : currency
      )
    );
    toast.success("تم تغيير حالة العملة بنجاح");
  };

  // جعل عملة هي الافتراضية
  const setDefaultCurrency = (id: string) => {
    setCurrencies(
      currencies.map((currency) => ({
        ...currency,
        isDefault: currency.id === id,
      }))
    );
    toast.success("تم تحديد العملة الافتراضية بنجاح");
  };

  return {
    currencies,
    filteredCurrencies,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedCurrency,
    setSelectedCurrency,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createCurrency,
    updateCurrency,
    deleteCurrency,
    toggleCurrencyStatus,
    setDefaultCurrency,
  };
};
