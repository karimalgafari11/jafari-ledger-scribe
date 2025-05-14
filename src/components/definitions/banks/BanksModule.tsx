
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BanksTable } from "./BanksTable";
import { BanksToolbar } from "./BanksToolbar";
import { useBanks } from "@/hooks/useBanks";

export const BanksModule = () => {
  const {
    filteredBanks,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedBank,
    setSelectedBank,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    updateBank,
    deleteBank,
    toggleBankStatus,
  } = useBanks();

  const handleEdit = (bank: typeof selectedBank) => {
    setSelectedBank(bank);
    // Additional edit logic here
    console.log("تعديل البنك", bank);
  };

  const handleDelete = (bank: typeof selectedBank) => {
    setSelectedBank(bank);
    // Additional delete logic here
    console.log("حذف البنك", bank);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة البنوك</CardTitle>
      </CardHeader>
      <CardContent>
        <BanksToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddBank={() => setIsCreateDialogOpen(true)}
        />

        <BanksTable
          banks={filteredBanks}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={toggleBankStatus}
        />
      </CardContent>
    </Card>
  );
};
