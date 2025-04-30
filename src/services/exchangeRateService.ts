
import { toast } from "sonner";
import { ExchangeRate, Currency } from "@/types/definitions";

// API providers for exchange rates
type ExchangeRateProvider = "manual" | "openexchangerates" | "currencylayer" | "exchangerate-api";

// Exchange rate service configuration
interface ExchangeRateConfig {
  provider: ExchangeRateProvider;
  apiKey?: string;
  updateInterval: number; // in minutes
  baseCurrency: string;
}

// Default config
const defaultConfig: ExchangeRateConfig = {
  provider: "manual",
  updateInterval: 60, // 1 hour
  baseCurrency: "USD",
};

// Mock API for demonstration purposes
const fetchExchangeRates = async (baseCurrency: string): Promise<Record<string, number>> => {
  // In a real application, this would be an actual API call to a service
  // Using a realistic mock response
  
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock exchange rate data
  const mockRates: Record<string, number> = {
    "USD": 1,
    "EUR": 0.91,
    "SAR": 3.75,
    "AED": 3.67,
    "KWD": 0.31,
    "GBP": 0.77,
    "JPY": 148.75,
    "CNY": 7.22,
    "INR": 83.46,
    "CAD": 1.35,
    "EGP": 47.85
  };
  
  // Normalize to the base currency if it's not USD
  if (baseCurrency !== "USD" && mockRates[baseCurrency]) {
    const baseRate = mockRates[baseCurrency];
    const normalizedRates: Record<string, number> = {};
    
    for (const [currency, rate] of Object.entries(mockRates)) {
      normalizedRates[currency] = rate / baseRate;
    }
    
    return normalizedRates;
  }
  
  return mockRates;
};

// Format date for exchange rate history
const formatDateForExchangeRate = (date: Date): string => {
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
};

// Calculate exchange rate between two currencies
export const calculateExchangeRate = (
  sourceCurrency: Currency,
  targetCurrency: Currency,
  rates: Record<string, number>
): number => {
  if (sourceCurrency.code === targetCurrency.code) return 1;
  
  // If rates include both currencies directly
  if (rates[sourceCurrency.code] && rates[targetCurrency.code]) {
    return rates[targetCurrency.code] / rates[sourceCurrency.code];
  }
  
  // Default fallback (shouldn't reach here if rates are properly loaded)
  return sourceCurrency.exchangeRate / targetCurrency.exchangeRate;
};

// Convert amount between currencies
export const convertCurrency = (
  amount: number,
  sourceCurrency: Currency,
  targetCurrency: Currency,
  rates: Record<string, number>
): number => {
  const exchangeRate = calculateExchangeRate(sourceCurrency, targetCurrency, rates);
  return amount * exchangeRate;
};

// Update exchange rates from external API
export const updateExchangeRatesFromAPI = async (
  currencies: Currency[],
  currentRates: ExchangeRate[],
  config: ExchangeRateConfig = defaultConfig
): Promise<{
  updatedRates: ExchangeRate[];
  rateChanges: {
    sourceCurrency: string;
    targetCurrency: string;
    oldRate: number;
    newRate: number;
    difference: number;
    percentageChange: number;
  }[];
}> => {
  try {
    const baseCurrency = config.baseCurrency || "USD";
    const defaultCurrency = currencies.find(c => c.isDefault)?.code || baseCurrency;
    
    // Fetch rates from API (mock for now)
    const apiRates = await fetchExchangeRates(baseCurrency);
    
    // Track changes for journal entries
    const rateChanges: {
      sourceCurrency: string;
      targetCurrency: string;
      oldRate: number;
      newRate: number;
      difference: number;
      percentageChange: number;
    }[] = [];
    
    // Create updated rates
    const today = new Date();
    const updatedRates = [...currentRates];
    
    // Update existing rates and add new ones as needed
    for (const sourceCurrency of currencies) {
      if (!sourceCurrency.isActive) continue;
      
      for (const targetCurrency of currencies) {
        if (!targetCurrency.isActive || sourceCurrency.id === targetCurrency.id) continue;
        
        // Calculate the new rate based on the API data
        let newRate: number;
        
        if (apiRates[sourceCurrency.code] && apiRates[targetCurrency.code]) {
          newRate = apiRates[targetCurrency.code] / apiRates[sourceCurrency.code];
        } else {
          // Fallback if the API doesn't provide rates for these currencies
          newRate = targetCurrency.exchangeRate / sourceCurrency.exchangeRate;
        }
        
        // Round to 5 decimal places for consistency
        newRate = Math.round(newRate * 100000) / 100000;
        
        // Find existing rate pair
        const existingRateIndex = updatedRates.findIndex(
          rate => rate.sourceCurrencyId === sourceCurrency.id && 
                 rate.targetCurrencyId === targetCurrency.id
        );
        
        if (existingRateIndex >= 0) {
          // Update existing rate
          const oldRate = updatedRates[existingRateIndex].rate;
          
          // Only update if there's an actual change
          if (oldRate !== newRate) {
            const difference = newRate - oldRate;
            const percentageChange = (difference / oldRate) * 100;
            
            rateChanges.push({
              sourceCurrency: sourceCurrency.code,
              targetCurrency: targetCurrency.code,
              oldRate,
              newRate,
              difference,
              percentageChange
            });
            
            updatedRates[existingRateIndex] = {
              ...updatedRates[existingRateIndex],
              rate: newRate,
              date: today.toISOString(),
              isManual: false
            };
          }
        } else {
          // Only create new rate pairs with the default currency to avoid excessive entries
          if (sourceCurrency.code === defaultCurrency || targetCurrency.code === defaultCurrency) {
            // Add new rate
            updatedRates.push({
              id: crypto.randomUUID(), // Generate a new UUID
              sourceCurrencyId: sourceCurrency.id,
              targetCurrencyId: targetCurrency.id,
              rate: newRate,
              date: today.toISOString(),
              isManual: false
            });
            
            rateChanges.push({
              sourceCurrency: sourceCurrency.code,
              targetCurrency: targetCurrency.code,
              oldRate: 0,
              newRate,
              difference: newRate,
              percentageChange: 100
            });
          }
        }
      }
    }
    
    toast.success(`تم تحديث أسعار الصرف بنجاح (${rateChanges.length} معاملة)`);
    
    return {
      updatedRates,
      rateChanges
    };
  } catch (error) {
    console.error("Error updating exchange rates:", error);
    toast.error("حدث خطأ أثناء تحديث أسعار الصرف");
    
    return {
      updatedRates: currentRates,
      rateChanges: []
    };
  }
};

export const getExchangeRateHistory = async (
  sourceCurrencyId: string,
  targetCurrencyId: string,
  startDate: Date,
  endDate: Date
): Promise<{date: string; rate: number}[]> => {
  // In a real app, this would fetch from database/API
  // Mock implementation for demonstration purposes
  const result: {date: string; rate: number}[] = [];
  const currentDate = new Date(startDate);
  const volatility = 0.005; // 0.5% daily volatility (realistic for major pairs)
  let rate = 3.75; // Example: USD to SAR starting rate
  
  while (currentDate <= endDate) {
    // Random walk model for exchange rate simulation
    const randomChange = (Math.random() - 0.5) * volatility;
    rate = rate * (1 + randomChange);
    
    result.push({
      date: formatDateForExchangeRate(currentDate),
      rate: Math.round(rate * 10000) / 10000
    });
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return result;
};

export default {
  calculateExchangeRate,
  convertCurrency,
  updateExchangeRatesFromAPI,
  getExchangeRateHistory
};
