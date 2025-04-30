
import { useState } from "react";
import { Currency } from "@/types/definitions";
import { CurrencyDialogState } from "./types";

export const useCurrencyDialogs = () => {
  const [dialogState, setDialogState] = useState<CurrencyDialogState>({
    isCreateDialogOpen: false,
    isEditDialogOpen: false,
    isDeleteDialogOpen: false,
    selectedCurrency: null,
  });

  const setSelectedCurrency = (currency: Currency | null) => {
    setDialogState(prev => ({ ...prev, selectedCurrency: currency }));
  };

  const setIsCreateDialogOpen = (isOpen: boolean) => {
    setDialogState(prev => ({ ...prev, isCreateDialogOpen: isOpen }));
  };

  const setIsEditDialogOpen = (isOpen: boolean) => {
    setDialogState(prev => ({ ...prev, isEditDialogOpen: isOpen }));
  };

  const setIsDeleteDialogOpen = (isOpen: boolean) => {
    setDialogState(prev => ({ ...prev, isDeleteDialogOpen: isOpen }));
  };

  return {
    ...dialogState,
    setSelectedCurrency,
    setIsCreateDialogOpen,
    setIsEditDialogOpen,
    setIsDeleteDialogOpen,
  };
};
