
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrenciesTable } from "./CurrenciesTable";
import { CurrenciesToolbar } from "./CurrenciesToolbar";
import { useCurrencies } from "@/hooks/useCurrencies";
import { CurrencyDialog } from "./CurrencyDialog";
import { DeleteCurrencyDialog } from "./DeleteCurrencyDialog";
import { Currency } from "@/types/definitions";

export const CurrenciesModule = () => {
  const {
    filteredCurrencies,
    isLoading,
    searchTerm,
    setSearchTerm,
    createCurrency,
    updateCurrency,
    deleteCurrency,
    toggleCurrencyStatus,
    setDefaultCurrency,
    selectedCurrency,
    setSelectedCurrency,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
  } = useCurrencies();

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleOpenEditDialog = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (currency: Currency) => {
    setSelectedCurrency(currency);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateCurrency = (data: Omit<Currency, "id">) => {
    createCurrency(data);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateCurrency = (data: Partial<Currency>) => {
    if (selectedCurrency) {
      updateCurrency(selectedCurrency.id, data);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteCurrency = () => {
    if (selectedCurrency) {
      deleteCurrency(selectedCurrency.id);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleSetDefaultCurrency = (id: string) => {
    setDefaultCurrency(id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة العملات</CardTitle>
      </CardHeader>
      <CardContent>
        <CurrenciesToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddCurrency={handleOpenCreateDialog}
        />

        <CurrenciesTable
          currencies={filteredCurrencies}
          isLoading={isLoading}
          onEdit={handleOpenEditDialog}
          onDelete={handleOpenDeleteDialog}
          onToggleStatus={toggleCurrencyStatus}
          onSetDefault={handleSetDefaultCurrency}
        />
        
        <CurrencyDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onSubmit={handleCreateCurrency}
          currency={null}
          mode="create"
        />
        
        <CurrencyDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={handleUpdateCurrency}
          currency={selectedCurrency}
          mode="edit"
        />
        
        <DeleteCurrencyDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteCurrency}
          currency={selectedCurrency}
        />
      </CardContent>
    </Card>
  );
};
