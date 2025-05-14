
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CashRegisterTable } from "./CashRegisterTable";
import { CashRegisterToolbar } from "./CashRegisterToolbar";
import { useCashRegister } from "@/hooks/useCashRegister";

export const CashRegistersModule = () => {
  const {
    filteredRegisters,
    isLoading,
    searchTerm,
    setSearchTerm,
    createCashRegister,
    updateCashRegister,
    deleteCashRegister,
    toggleCashRegisterStatus,
    selectedRegister,
    setSelectedRegister,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    generateCashRegisterCode,
  } = useCashRegister();

  const handleEdit = (register: typeof selectedRegister) => {
    setSelectedRegister(register);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (register: typeof selectedRegister) => {
    setSelectedRegister(register);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateSubmit = (data: any) => {
    createCashRegister(data);
    setIsCreateDialogOpen(false);
  };

  const handleEditSubmit = (data: any) => {
    if (selectedRegister) {
      updateCashRegister(selectedRegister.id, data);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteSubmit = () => {
    if (selectedRegister) {
      deleteCashRegister(selectedRegister.id);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة صناديق النقدية</CardTitle>
      </CardHeader>
      <CardContent>
        <CashRegisterToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddCashRegister={() => setIsCreateDialogOpen(true)}
        />

        <CashRegisterTable
          registers={filteredRegisters}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={toggleCashRegisterStatus}
        />
      </CardContent>
    </Card>
  );
};
