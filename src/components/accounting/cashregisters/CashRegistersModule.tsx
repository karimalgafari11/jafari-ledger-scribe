
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CashRegisterTable } from "./CashRegisterTable";
import { CashRegisterToolbar } from "./CashRegisterToolbar";
import { useCashRegister } from "@/hooks/useCashRegister";
import { CashRegisterDialog } from "./CashRegisterDialog";
import { DeleteCashRegisterDialog } from "./DeleteCashRegisterDialog";
import { CashRegister } from "@/types/definitions";

export const CashRegistersModule = () => {
  const {
    filteredRegisters,
    isLoading,
    searchTerm,
    setSearchTerm,
    createRegister,
    updateRegister,
    deleteRegister,
    selectedRegister,
    setSelectedRegister,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
  } = useCashRegister();

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleOpenEditDialog = (register: CashRegister) => {
    setSelectedRegister(register);
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (register: CashRegister) => {
    setSelectedRegister(register);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateRegister = (data: Omit<CashRegister, "id" | "createdAt" | "updatedAt">) => {
    createRegister(data);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateRegister = (data: Partial<CashRegister>) => {
    if (selectedRegister) {
      updateRegister(selectedRegister.id, data);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteRegister = () => {
    if (selectedRegister) {
      deleteRegister(selectedRegister.id);
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
          onAddRegister={handleOpenCreateDialog}
        />

        <CashRegisterTable
          registers={filteredRegisters}
          isLoading={isLoading}
          onEdit={handleOpenEditDialog}
          onDelete={handleOpenDeleteDialog}
        />
        
        <CashRegisterDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onSubmit={handleCreateRegister}
          register={null}
          mode="create"
        />
        
        <CashRegisterDialog
          isOpen={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          onSubmit={handleUpdateRegister}
          register={selectedRegister}
          mode="edit"
        />
        
        <DeleteCashRegisterDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onConfirm={handleDeleteRegister}
          register={selectedRegister}
        />
      </CardContent>
    </Card>
  );
};
