
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";
import { Currency } from "@/types/definitions";

// بيانات تجريبية للعملات
const initialCurrencies: Currency[] = [
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
      currency.name.includes(searchTerm) ||
      currency.code.includes(searchTerm)
  );

  // إضافة عملة جديدة
  const createCurrency = (currency: Omit<Currency, "id">) => {
    // التحقق من تكرار الرمز
    if (currencies.some(c => c.code === currency.code)) {
      toast.error("رمز العملة موجود مسبقاً");
      return false;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      // إذا كانت العملة الجديدة افتراضية، نزيل الإفتراضية من العملة الحالية الإفتراضية
      let updatedCurrencies = [...currencies];
      
      if (currency.isDefault) {
        updatedCurrencies = currencies.map(c => ({
          ...c,
          isDefault: false,
        }));
      }
      
      const newCurrency: Currency = {
        ...currency,
        id: uuid(),
      };
      
      setCurrencies([...updatedCurrencies, newCurrency]);
      setIsLoading(false);
      toast.success("تم إضافة العملة بنجاح");
    }, 500);
    
    return true;
  };

  // تعديل عملة موجودة
  const updateCurrency = (id: string, updates: Partial<Currency>) => {
    // التحقق من تكرار الرمز
    if (updates.code && currencies.some(c => c.code === updates.code && c.id !== id)) {
      toast.error("رمز العملة موجود مسبقاً");
      return false;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      // إذا كانت التحديثات تتضمن جعل العملة افتراضية، نزيل الإفتراضية من العملات الأخرى
      let updatedCurrencies = [...currencies];
      
      if (updates.isDefault) {
        updatedCurrencies = currencies.map(c => ({
          ...c,
          isDefault: c.id === id,
        }));
        
        setCurrencies(updatedCurrencies);
      } else {
        const currentCurrency = currencies.find(c => c.id === id);
        
        // لا يمكن إلغاء افتراضية العملة الافتراضية الحالية
        if (currentCurrency?.isDefault && updates.isDefault === false) {
          setIsLoading(false);
          toast.error("يجب أن تكون هناك عملة افتراضية واحدة على الأقل");
          return false;
        }
        
        setCurrencies(
          currencies.map(c => (c.id === id ? { ...c, ...updates } : c))
        );
      }
      
      setIsLoading(false);
      toast.success("تم تحديث بيانات العملة بنجاح");
    }, 500);
    
    return true;
  };

  // حذف عملة
  const deleteCurrency = (id: string) => {
    // التحقق من أن العملة ليست افتراضية
    const currencyToDelete = currencies.find(c => c.id === id);
    
    if (currencyToDelete?.isDefault) {
      toast.error("لا يمكن حذف العملة الافتراضية");
      return false;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setCurrencies(currencies.filter(c => c.id !== id));
      setIsLoading(false);
      toast.success("تم حذف العملة بنجاح");
    }, 500);
    
    return true;
  };

  // تغيير العملة الافتراضية
  const setDefaultCurrency = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrencies(
        currencies.map(c => ({
          ...c,
          isDefault: c.id === id,
        }))
      );
      setIsLoading(false);
      toast.success("تم تغيير العملة الافتراضية بنجاح");
    }, 500);
    
    return true;
  };

  // تفعيل/تعطيل عملة
  const toggleCurrencyStatus = (id: string) => {
    const currency = currencies.find(c => c.id === id);
    
    // لا يمكن تعطيل العملة الافتراضية
    if (currency?.isDefault) {
      toast.error("لا يمكن تعطيل العملة الافتراضية");
      return false;
    }
    
    setCurrencies(
      currencies.map(c =>
        c.id === id
          ? { ...c, isActive: !c.isActive }
          : c
      )
    );
    
    toast.success("تم تغيير حالة العملة بنجاح");
    return true;
  };

  // الحصول على العملة الافتراضية
  const getDefaultCurrency = () => {
    return currencies.find(c => c.isDefault) || currencies[0];
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
    setDefaultCurrency,
    toggleCurrencyStatus,
    getDefaultCurrency,
  };
};
