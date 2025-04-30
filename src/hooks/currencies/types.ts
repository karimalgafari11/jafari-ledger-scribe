
import { Currency } from "@/types/definitions";

export interface CurrencyDialogState {
  isCreateDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  selectedCurrency: Currency | null;
}

export interface CurrencyHookState {
  currencies: Currency[];
  isLoading: boolean;
  searchTerm: string;
}
