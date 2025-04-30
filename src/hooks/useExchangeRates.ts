import { useState, useEffect } from "react";
import { ExchangeRate } from "@/types/definitions";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";
import { updateExchangeRatesFromAPI, getExchangeRateHistory } from "@/services/exchangeRateService";
import { useCurrencies } from "@/hooks/useCurrencies";

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
  const [historyData, setHistoryData] = useState<{date: string; rate: number}[]>([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  
  const { currencies } = useCurrencies();

  // Function to load historical data for a currency pair
  const loadExchangeRateHistory = async (sourceCurrencyId: string, targetCurrencyId: string, days: number = 30) => {
    setIsHistoryLoading(true);
    
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const history = await getExchangeRateHistory(
        sourceCurrencyId,
        targetCurrencyId,
        startDate,
        endDate
      );
      
      setHistoryData(history);
    } catch (error) {
      console.error("Error loading exchange rate history:", error);
      toast.error("حدث خطأ أثناء تحميل تاريخ أسعار الصرف");
    } finally {
      setIsHistoryLoading(false);
    }
  };

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

  // تحديث أسعار الصرف تلقائيًا من مصدر خارجي
  const updateExchangeRatesAutomatically = async () => {
    setIsLoading(true);
    
    try {
      // Call the exchange rate service to update rates
      const result = await updateExchangeRatesFromAPI(currencies, exchangeRates);
      setExchangeRates(result.updatedRates);
      
      // Return rate changes for potential journal entry creation
      return result;
    } catch (error) {
      console.error("Error updating exchange rates:", error);
      toast.error("حدث خطأ أثناء تحديث أسعار الصرف");
      return { 
        updatedRates: exchangeRates,
        rateChanges: []
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Get recent changes for statistics
  const getRecentChanges = () => {
    // Group by currency pair and get the latest change
    const currencyPairs = new Map<string, { oldRate: number; newRate: number; date: string }>();
    
    // Simulate recent changes (in a real app, this would come from history table)
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * exchangeRates.length);
      const rate = exchangeRates[randomIndex];
      
      // Find source and target currencies
      const sourceCurrency = currencies.find(c => c.id === rate.sourceCurrencyId)?.code || 
                            rate.sourceCurrencyId;
      const targetCurrency = currencies.find(c => c.id === rate.targetCurrencyId)?.code || 
                            rate.targetCurrencyId;
      
      const pair = `${sourceCurrency}/${targetCurrency}`;
      
      // Generate random previous rate with small difference
      const oldRate = rate.rate * (1 - (Math.random() * 0.02 - 0.01)); // -1% to +1%
      
      currencyPairs.set(pair, {
        oldRate,
        newRate: rate.rate,
        date: new Date(Date.now() - Math.random() * 7 * 86400000).toISOString() // Random day in last week
      });
    }
    
    // Convert to array for display
    return Array.from(currencyPairs.entries()).map(([currencyPair, data]) => ({
      currencyPair,
      oldRate: data.oldRate,
      newRate: data.newRate,
      percentageChange: ((data.newRate - data.oldRate) / data.oldRate) * 100,
      date: data.date
    }));
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
    loadExchangeRateHistory,
    historyData,
    isHistoryLoading,
    getRecentChanges
  };
};
