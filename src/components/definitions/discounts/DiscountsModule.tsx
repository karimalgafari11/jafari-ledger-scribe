
import React, { useState } from "react";
import { DiscountsTable } from "./DiscountsTable";
import { DiscountsToolbar } from "./DiscountsToolbar";
import { useDiscounts } from "@/hooks/useDiscounts";
import { DiscountDialog } from "./DiscountDialog";
import { DeleteDiscountDialog } from "./DeleteDiscountDialog";
import { Discount } from "@/types/definitions";

export const DiscountsModule: React.FC = () => {
  const {
    discounts,
    filteredDiscounts,
    isLoading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    clearFilters,
    createDiscount,
    updateDiscount,
    deleteDiscount,
    toggleDiscountStatus,
    selectedDiscount,
    setSelectedDiscount,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
  } = useDiscounts();

  const handleOpenCreateDialog = () => {
    setIsCreateDialogOpen(true);
  };

  const handleOpenEditDialog = (discount: Discount) => {
    setSelectedDiscount(discount);
    setIsEditDialogOpen(true);
  };

  const handleOpenDeleteDialog = (discount: Discount) => {
    setSelectedDiscount(discount);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateDiscount = (data: Omit<Discount, "id">) => {
    createDiscount(data);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateDiscount = (data: Partial<Discount>) => {
    if (selectedDiscount) {
      updateDiscount(selectedDiscount.id, data);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteDiscount = () => {
    if (selectedDiscount) {
      deleteDiscount(selectedDiscount.id);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div>
      <DiscountsToolbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        clearFilters={clearFilters}
        onAddDiscount={handleOpenCreateDialog}
      />

      <DiscountsTable
        discounts={filteredDiscounts}
        isLoading={isLoading}
        onEdit={handleOpenEditDialog}
        onDelete={handleOpenDeleteDialog}
        onToggleStatus={toggleDiscountStatus}
      />

      <DiscountDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreateDiscount}
        discount={null}
        mode="create"
      />

      <DiscountDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleUpdateDiscount}
        discount={selectedDiscount}
        mode="edit"
      />

      <DeleteDiscountDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        discount={selectedDiscount}
        onDelete={handleDeleteDiscount}
        isLoading={isLoading}
      />
    </div>
  );
};
