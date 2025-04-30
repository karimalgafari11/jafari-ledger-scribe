
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
    rate: 0.267,
    date: new Date(),
    isManual: true,
  },
  {
    id: uuid(),
    sourceCurrencyId: "1", // SAR
    targetCurrencyId: "3", // EUR
    rate: 0.24,
    date: new Date(),
    isManual: true,
  },
  {
    id: uuid(),
    sourceCurrencyId: "1", // SAR
    targetCurrencyId: "4", // AED
    rate: 0.98,
    date: new Date(),
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
    setTimeout(() => {
      const newRate: ExchangeRate = {
        ...rate,
        id: uuid(),
      };
      setExchangeRates([...exchangeRates, newRate]);
      setIsLoading(false);
      toast.success("تم إضافة سعر الصرف بنجاح");
    }, 500);
  };

  // تعديل سعر صرف موجود
  const updateExchangeRate = (id: string, updates: Partial<ExchangeRate>) => {
    setIsLoading(true);
    setTimeout(() => {
      setExchangeRates(
        exchangeRates.map((rate) =>
          rate.id === id
            ? { ...rate, ...updates }
            : rate
        )
      );
      setIsLoading(false);
      toast.success("تم تحديث سعر الصرف بنجاح");
    }, 500);
  };

  // حذف سعر صرف
  const deleteExchangeRate = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setExchangeRates(exchangeRates.filter((rate) => rate.id !== id));
      setIsLoading(false);
      toast.success("تم حذف سعر الصرف بنجاح");
    }, 500);
  };

  // تحديث أسعار الصرف تلقائيًا (يمكن تنفيذه من خلال API حقيقي)
  const updateExchangeRatesAutomatically = () => {
    setIsLoading(true);
    setTimeout(() => {
      // هنا يمكن تنفيذ طلب API لجلب أحدث أسعار الصرف
      // ولكن سنقوم فقط بمحاكاة ذلك بتحديث أسعار الصرف الحالية بقيم عشوائية
      setExchangeRates(
        exchangeRates.map((rate) => ({
          ...rate,
          rate: parseFloat((rate.rate * (0.95 + Math.random() * 0.1)).toFixed(4)),
          date: new Date(),
          isManual: false,
        }))
      );
      setIsLoading(false);
      toast.success("تم تحديث أسعار الصرف تلقائيًا");
    }, 1500);
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
