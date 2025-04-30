
import { toast } from "sonner";
import { v4 as uuid } from "uuid";
import { Currency } from "@/types/definitions";

// إضافة عملة جديدة
export const createCurrency = (
  currency: Omit<Currency, "id">,
  currencies: Currency[]
): { success: boolean; updatedCurrencies?: Currency[] } => {
  // التحقق من تكرار الرمز
  if (currencies.some(c => c.code === currency.code)) {
    toast.error("رمز العملة موجود مسبقاً");
    return { success: false };
  }
  
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
  
  toast.success("تم إضافة العملة بنجاح");
  return { 
    success: true,
    updatedCurrencies: [...updatedCurrencies, newCurrency]
  };
};

// تعديل عملة موجودة
export const updateCurrency = (
  id: string,
  updates: Partial<Currency>,
  currencies: Currency[]
): { success: boolean; updatedCurrencies?: Currency[] } => {
  // التحقق من تكرار الرمز
  if (updates.code && currencies.some(c => c.code === updates.code && c.id !== id)) {
    toast.error("رمز العملة موجود مسبقاً");
    return { success: false };
  }
  
  // إذا كانت التحديثات تتضمن جعل العملة افتراضية، نزيل الإفتراضية من العملات الأخرى
  let updatedCurrencies: Currency[];
  
  if (updates.isDefault) {
    updatedCurrencies = currencies.map(c => ({
      ...c,
      isDefault: c.id === id,
    }));
    
    toast.success("تم تحديث بيانات العملة بنجاح");
    return { success: true, updatedCurrencies };
  } else {
    const currentCurrency = currencies.find(c => c.id === id);
    
    // لا يمكن إلغاء افتراضية العملة الافتراضية الحالية
    if (currentCurrency?.isDefault && updates.isDefault === false) {
      toast.error("يجب أن تكون هناك عملة افتراضية واحدة على الأقل");
      return { success: false };
    }
    
    updatedCurrencies = currencies.map(c => (c.id === id ? { ...c, ...updates } : c));
    toast.success("تم تحديث بيانات العملة بنجاح");
    return { success: true, updatedCurrencies };
  }
};

// حذف عملة
export const deleteCurrency = (
  id: string,
  currencies: Currency[]
): { success: boolean; updatedCurrencies?: Currency[] } => {
  // التحقق من أن العملة ليست افتراضية
  const currencyToDelete = currencies.find(c => c.id === id);
  
  if (currencyToDelete?.isDefault) {
    toast.error("لا يمكن حذف العملة الافتراضية");
    return { success: false };
  }
  
  const updatedCurrencies = currencies.filter(c => c.id !== id);
  toast.success("تم حذف العملة بنجاح");
  return { success: true, updatedCurrencies };
};

// تغيير العملة الافتراضية
export const setDefaultCurrency = (
  id: string,
  currencies: Currency[]
): { success: boolean; updatedCurrencies: Currency[] } => {
  const updatedCurrencies = currencies.map(c => ({
    ...c,
    isDefault: c.id === id,
  }));
  
  toast.success("تم تغيير العملة الافتراضية بنجاح");
  return { success: true, updatedCurrencies };
};

// تفعيل/تعطيل عملة
export const toggleCurrencyStatus = (
  id: string,
  currencies: Currency[]
): { success: boolean; updatedCurrencies?: Currency[] } => {
  const currency = currencies.find(c => c.id === id);
  
  // لا يمكن تعطيل العملة الافتراضية
  if (currency?.isDefault) {
    toast.error("لا يمكن تعطيل العملة الافتراضية");
    return { success: false };
  }
  
  const updatedCurrencies = currencies.map(c =>
    c.id === id
      ? { ...c, isActive: !c.isActive }
      : c
  );
  
  toast.success("تم تغيير حالة العملة بنجاح");
  return { success: true, updatedCurrencies };
};
