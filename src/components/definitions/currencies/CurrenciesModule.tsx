
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CurrenciesTable } from "./CurrenciesTable";
import { CurrenciesToolbar } from "./CurrenciesToolbar";
import { useCurrencies } from "@/hooks/useCurrencies";

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
  } = useCurrencies();

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة العملات</CardTitle>
      </CardHeader>
      <CardContent>
        <CurrenciesToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddCurrency={() => console.log("إضافة عملة جديدة")}
        />

        <CurrenciesTable
          currencies={filteredCurrencies}
          isLoading={isLoading}
          onEdit={(currency) => console.log("تعديل العملة", currency)}
          onDelete={(currency) => console.log("حذف العملة", currency)}
          onToggleStatus={(id) => toggleCurrencyStatus(id)}
        />
      </CardContent>
    </Card>
  );
};
