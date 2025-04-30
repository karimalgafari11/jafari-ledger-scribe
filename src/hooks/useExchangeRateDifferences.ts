
import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { toast } from "sonner";
import { ExchangeRateDifference } from "@/types/exchangeRateTypes";
import { JournalEntry } from "@/types/journal";
import { useExchangeRates } from "@/hooks/useExchangeRates";
import { useCurrencies } from "@/hooks/useCurrencies";

// Initial mock data
const initialDifferences: ExchangeRateDifference[] = [
  {
    id: uuid(),
    sourceCurrencyId: "SAR",
    targetCurrencyId: "USD",
    originalAmount: 10000,
    originalRate: 0.2666,
    newRate: 0.2671,
    differenceAmount: 5.00,
    date: new Date().toISOString(),
    processed: false,
    createdAt: new Date()
  },
  {
    id: uuid(),
    sourceCurrencyId: "EUR",
    targetCurrencyId: "SAR",
    originalAmount: 5000,
    originalRate: 4.1085,
    newRate: 4.1025,
    differenceAmount: -30.00,
    date: new Date(Date.now() - 86400000).toISOString(), // yesterday
    processed: true,
    journalEntryId: "mock-journal-1",
    createdAt: new Date(Date.now() - 86400000)
  }
];

export const useExchangeRateDifferences = () => {
  const [differences, setDifferences] = useState<ExchangeRateDifference[]>(initialDifferences);
  const [isLoading, setIsLoading] = useState(false);
  
  const { exchangeRates, updateExchangeRatesAutomatically } = useExchangeRates();
  const { currencies } = useCurrencies();

  // Process difference and mark it as processed
  const processDifference = (id: string, journalEntryId: string) => {
    setDifferences(prev => 
      prev.map(diff => 
        diff.id === id 
          ? { ...diff, processed: true, journalEntryId }
          : diff
      )
    );
  };

  // Calculate differences based on the latest exchange rates
  const calculateDifferences = async () => {
    setIsLoading(true);
    
    try {
      // This would normally call updateExchangeRatesAutomatically() which gets 
      // the latest rates from an external API
      
      // Simulate getting updated rates with some changes
      const result = await updateExchangeRatesAutomatically();
      
      // Generate differences from rate changes
      const newDifferences: ExchangeRateDifference[] = [];
      
      // Assume we have some open foreign currency transactions (invoices, payments, etc.)
      // that need to be revalued at the new rates
      const openTransactions = [
        { id: uuid(), type: 'invoice', sourceCurrency: 'USD', targetCurrency: 'SAR', amount: 10000 },
        { id: uuid(), type: 'payment', sourceCurrency: 'EUR', targetCurrency: 'SAR', amount: 5000 },
      ];
      
      // For each significant exchange rate change, create difference records
      for (const transaction of openTransactions) {
        // Find the relevant currencies
        const sourceCurrency = currencies.find(c => c.code === transaction.sourceCurrency);
        const targetCurrency = currencies.find(c => c.code === transaction.targetCurrency);
        
        if (!sourceCurrency || !targetCurrency) continue;
        
        // Find the exchange rate between these currencies
        const exchangeRate = exchangeRates.find(
          r => r.sourceCurrencyId === sourceCurrency.id && r.targetCurrencyId === targetCurrency.id
        );
        
        if (!exchangeRate) continue;
        
        // Create a simulated previous rate with a slight difference
        const previousRate = exchangeRate.rate * (1 - (Math.random() * 0.01)); // Up to 1% difference
        
        // Calculate the difference
        const differenceAmount = transaction.amount * (exchangeRate.rate - previousRate);
        
        // Only create differences for significant changes
        if (Math.abs(differenceAmount) > 1) {
          newDifferences.push({
            id: uuid(),
            transactionId: transaction.id,
            transactionType: transaction.type,
            sourceCurrencyId: sourceCurrency.code,
            targetCurrencyId: targetCurrency.code,
            originalAmount: transaction.amount,
            originalRate: previousRate,
            newRate: exchangeRate.rate,
            differenceAmount,
            date: new Date().toISOString(),
            processed: false,
            createdAt: new Date()
          });
        }
      }
      
      if (newDifferences.length > 0) {
        setDifferences(prev => [...prev, ...newDifferences]);
        toast.success(`تم العثور على ${newDifferences.length} فرق جديد في أسعار الصرف`);
      } else {
        toast.info("لم يتم العثور على فروقات جديدة في أسعار الصرف");
      }
    } catch (error) {
      console.error("Error calculating differences:", error);
      toast.error("حدث خطأ أثناء حساب فروقات أسعار الصرف");
    } finally {
      setIsLoading(false);
    }
  };

  // Create journal entry from difference
  const createJournalEntry = async (difference: ExchangeRateDifference): Promise<Omit<JournalEntry, "id" | "createdAt" | "updatedAt">> => {
    // Get currency names for the description
    const sourceCurrency = currencies.find(c => c.code === difference.sourceCurrencyId)?.name || difference.sourceCurrencyId;
    const targetCurrency = currencies.find(c => c.code === difference.targetCurrencyId)?.name || difference.targetCurrencyId;
    
    // Prepare journal entry data
    const entryData: Omit<JournalEntry, "id" | "createdAt" | "updatedAt"> = {
      entryNumber: `FX-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      description: `فرق سعر صرف بين ${sourceCurrency} و ${targetCurrency}`,
      status: 'approved',
      createdBy: 'النظام',
      lines: [],
      totalDebit: 0,
      totalCredit: 0,
    };
    
    // Generate journal entry lines based on whether the difference is positive or negative
    const absAmount = Math.abs(difference.differenceAmount);
    
    if (difference.differenceAmount > 0) {
      // Positive difference (gain)
      entryData.lines = [
        {
          id: uuid(),
          accountId: "1050", // Example account ID for cash or receivables
          accountName: "النقد والمدينون",
          description: `أرباح فروق عملة - ${sourceCurrency} إلى ${targetCurrency}`,
          debit: absAmount,
          credit: 0
        },
        {
          id: uuid(),
          accountId: "4200", // Example account ID for foreign exchange gains
          accountName: "أرباح فروقات أسعار الصرف",
          description: `أرباح تقييم عملة ${difference.transactionType || ''}`,
          debit: 0,
          credit: absAmount
        }
      ];
    } else {
      // Negative difference (loss)
      entryData.lines = [
        {
          id: uuid(),
          accountId: "5200", // Example account ID for foreign exchange losses
          accountName: "خسائر فروقات أسعار الصرف",
          description: `خسائر تقييم عملة ${difference.transactionType || ''}`,
          debit: absAmount,
          credit: 0
        },
        {
          id: uuid(),
          accountId: "1050", // Example account ID for cash or receivables
          accountName: "النقد والمدينون",
          description: `خسائر فروق عملة - ${sourceCurrency} إلى ${targetCurrency}`,
          debit: 0,
          credit: absAmount
        }
      ];
    }
    
    // Set totals
    entryData.totalDebit = entryData.lines.reduce((sum, line) => sum + line.debit, 0);
    entryData.totalCredit = entryData.lines.reduce((sum, line) => sum + line.credit, 0);
    
    // Add a small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return entryData;
  };

  // Get summary statistics
  const getDifferencesSummary = () => {
    const totalDifferences = differences.length;
    const processedDifferences = differences.filter(d => d.processed).length;
    const pendingDifferences = totalDifferences - processedDifferences;
    
    const totalAmount = differences.reduce((sum, diff) => sum + diff.differenceAmount, 0);
    const gainAmount = differences
      .filter(diff => diff.differenceAmount > 0)
      .reduce((sum, diff) => sum + diff.differenceAmount, 0);
    const lossAmount = differences
      .filter(diff => diff.differenceAmount < 0)
      .reduce((sum, diff) => sum + diff.differenceAmount, 0);
    
    return {
      totalDifferences,
      processedDifferences,
      pendingDifferences,
      totalAmount,
      gainAmount,
      lossAmount
    };
  };

  return {
    differences,
    isLoading,
    processDifference,
    calculateDifferences,
    createJournalEntry,
    getDifferencesSummary
  };
};
