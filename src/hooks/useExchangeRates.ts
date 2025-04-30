
import { useState } from "react";
import { ExchangeRate } from "@/types/definitions";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";

// بيانات تجريبية لأسعار الصرف
const initialExchangeRates: ExchangeRate[] = [
  {
    id: uuid(),
    sourceCurrencyId: "1", // SAR
    targetCurrencyId: "2", // USD
    rate: 0.2666,
    date: new Date().toISOString(),
    isManual: false,
  },
  {
    id: uuid(),
    sourceCurrencyId: "1", // SAR
    targetCurrencyId: "3", // EUR
    rate: 0.2434,
    date: new Date().toISOString(),
    isManual: false,
  },
  {
    id: uuid(),
    sourceCurrencyId: "2", // USD
    targetCurrencyId: "3", // EUR
    rate: 0.9128,
    date: new Date().toISOString(),
    isManual: true,
  },
];

export const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>(initialExchangeRates);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRate, setSelectedRate] = useState<ExchangeRate | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // إضافة سعر صرف جديد
  const createExchangeRate = (rate: Omit<ExchangeRate, "id">) => {
    setIsLoading(true);
    
    // التأكد من عدم وجود سعر صرف للعملات نفسها
    const existingRate = exchangeRates.find(
      r => r.sourceCurrencyId === rate.sourceCurrencyId && 
           r.targetCurrencyId === rate.targetCurrencyId
    );
    
    if (existingRate) {
      toast.error("يوجد سعر صرف لهذه العملات بالفعل، يمكنك تعديله بدلاً من إضافة جديد");
      setIsLoading(false);
      return false;
    }
    
    setTimeout(() => {
      const newRate: ExchangeRate = {
        ...rate,
        id: uuid(),
        date: rate.date || new Date().toISOString(),
      };
      
      setExchangeRates([...exchangeRates, newRate]);
      toast.success("تم إضافة سعر الصرف بنجاح");
      setIsLoading(false);
    }, 500);
    
    return true;
  };

  // تعديل سعر صرف موجود
  const updateExchangeRate = (id: string, updates: Partial<ExchangeRate>) => {
    setIsLoading(true);
    
    // التأكد من عدم وجود تكرار في حالة تغيير العملات
    if (updates.sourceCurrencyId || updates.targetCurrencyId) {
      const targetRate = exchangeRates.find(r => r.id === id);
      
      if (targetRate) {
        const sourceCurrencyId = updates.sourceCurrencyId || targetRate.sourceCurrencyId;
        const targetCurrencyId = updates.targetCurrencyId || targetRate.targetCurrencyId;
        
        const existingRate = exchangeRates.find(
          r => r.id !== id && 
               r.sourceCurrencyId === sourceCurrencyId && 
               r.targetCurrencyId === targetCurrencyId
        );
        
        if (existingRate) {
          toast.error("يوجد سعر صرف لهذه العملات بالفعل");
          setIsLoading(false);
          return false;
        }
      }
    }
    
    setTimeout(() => {
      setExchangeRates(
        exchangeRates.map((rate) =>
          rate.id === id
            ? { ...rate, ...updates, date: new Date().toISOString() }
            : rate
        )
      );
      toast.success("تم تحديث سعر الصرف بنجاح");
      setIsLoading(false);
    }, 500);
    
    return true;
  };

  // حذف سعر صرف
  const deleteExchangeRate = (id: string) => {
    setIsLoading(true);
    
    setTimeout(() => {
      setExchangeRates(exchangeRates.filter((rate) => rate.id !== id));
      toast.success("تم حذف سعر الصرف بنجاح");
      setIsLoading(false);
    }, 500);
    
    return true;
  };

  // تحديث أسعار الصرف تلقائيًا
  const updateExchangeRatesAutomatically = () => {
    setIsLoading(true);
    
    // محاكاة طلب تحديث أسعار الصرف من API خارجي
    setTimeout(() => {
      const updatedRates = exchangeRates.map(rate => {
        // تحديث الأسعار التلقائية فقط
        if (!rate.isManual) {
          // إضافة تغيير عشوائي صغير للسعر للمحاكاة
          const randomChange = Math.random() * 0.01 - 0.005; // -0.5% to +0.5%
          return {
            ...rate,
            rate: Math.max(0.001, rate.rate + rate.rate * randomChange),
            date: new Date().toISOString(),
          };
        }
        
        return rate;
      });
      
      setExchangeRates(updatedRates);
      toast.success("تم تحديث أسعار الصرف التلقائية بنجاح");
      setIsLoading(false);
    }, 1000);
  };

  return {
    exchangeRates,
    isLoading,
    selectedRate,
    setSelectedRate,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    createExchangeRate,
    updateExchangeRate,
    deleteExchangeRate,
    updateExchangeRatesAutomatically,
  };
};
