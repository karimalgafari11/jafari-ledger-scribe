
import { useState } from "react";
import { Currency } from "@/types/definitions";
import { initialCurrencies } from "./currencies/initialData";
import { useCurrencyDialogs } from "./currencies/useCurrencyDialogs";
import { 
  createCurrency, 
  updateCurrency, 
  deleteCurrency,
  setDefaultCurrency as setDefaultCurrencyUtil,
  toggleCurrencyStatus as toggleCurrencyStatusUtil
} from "./currencies/currencyUtils";

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<Currency[]>(initialCurrencies);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const {
    selectedCurrency,
    setSelectedCurrency,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen
  } = useCurrencyDialogs();

  // البحث في العملات
  const filteredCurrencies = currencies.filter(
    (currency) =>
      currency.name.includes(searchTerm) ||
      currency.code.includes(searchTerm)
  );

  // إضافة عملة جديدة
  const handleCreateCurrency = (currency: Omit<Currency, "id">) => {
    setIsLoading(true);
    setTimeout(() => {
      const result = createCurrency(currency, currencies);
      if (result.success && result.updatedCurrencies) {
        setCurrencies(result.updatedCurrencies);
      }
      setIsLoading(false);
    }, 500);
    
    return true;
  };

  // تعديل عملة موجودة
  const handleUpdateCurrency = (id: string, updates: Partial<Currency>) => {
    setIsLoading(true);
    setTimeout(() => {
      const result = updateCurrency(id, updates, currencies);
      if (result.success && result.updatedCurrencies) {
        setCurrencies(result.updatedCurrencies);
      }
      setIsLoading(false);
    }, 500);
    
    return true;
  };

  // حذف عملة
  const handleDeleteCurrency = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const result = deleteCurrency(id, currencies);
      if (result.success && result.updatedCurrencies) {
        setCurrencies(result.updatedCurrencies);
      }
      setIsLoading(false);
    }, 500);
    
    return true;
  };

  // تغيير العملة الافتراضية
  const handleSetDefaultCurrency = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      const result = setDefaultCurrencyUtil(id, currencies);
      if (result.success) {
        setCurrencies(result.updatedCurrencies);
      }
      setIsLoading(false);
    }, 500);
    
    return true;
  };

  // تفعيل/تعطيل عملة
  const handleToggleCurrencyStatus = (id: string) => {
    const result = toggleCurrencyStatusUtil(id, currencies);
    if (result.success && result.updatedCurrencies) {
      setCurrencies(result.updatedCurrencies);
    }
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
    createCurrency: handleCreateCurrency,
    updateCurrency: handleUpdateCurrency,
    deleteCurrency: handleDeleteCurrency,
    setDefaultCurrency: handleSetDefaultCurrency,
    toggleCurrencyStatus: handleToggleCurrencyStatus,
    getDefaultCurrency,
  };
};
