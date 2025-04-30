
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WarehousesTable } from "./WarehousesTable";
import { WarehousesToolbar } from "./WarehousesToolbar";
import { WarehouseDialog } from "./WarehouseDialog";
import { DeleteWarehouseDialog } from "./DeleteWarehouseDialog";
import { useWarehouses } from "@/hooks/useWarehouses";
import { useBranches } from "@/hooks/useBranches";

export const WarehousesModule = () => {
  const {
    filteredWarehouses,
    isLoading,
    searchTerm,
    setSearchTerm,
    branchFilter,
    setBranchFilter,
    selectedWarehouse,
    setSelectedWarehouse,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createWarehouse,
    updateWarehouse,
    deleteWarehouse,
    toggleWarehouseStatus,
    generateWarehouseCode,
  } = useWarehouses();
  
  const { branches } = useBranches();

  const handleEdit = (warehouse: typeof selectedWarehouse) => {
    setSelectedWarehouse(warehouse);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (warehouse: typeof selectedWarehouse) => {
    setSelectedWarehouse(warehouse);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateSubmit = (data: any) => {
    const selectedBranch = branches.find(b => b.id === data.branchId);
    
    createWarehouse({
      ...data,
      branchName: selectedBranch ? selectedBranch.name : ""
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditSubmit = (data: any) => {
    if (selectedWarehouse) {
      const selectedBranch = branches.find(b => b.id === data.branchId);
      
      updateWarehouse(selectedWarehouse.id, {
        ...data,
        branchName: selectedBranch ? selectedBranch.name : ""
      });
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteSubmit = () => {
    if (selectedWarehouse) {
      deleteWarehouse(selectedWarehouse.id);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة المستودعات</CardTitle>
      </CardHeader>
      <CardContent>
        <WarehousesToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          branchFilter={branchFilter}
          onBranchFilterChange={setBranchFilter}
          branches={branches}
          onAddWarehouse={() => setIsCreateDialogOpen(true)}
        />

        <WarehousesTable
          warehouses={filteredWarehouses}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={toggleWarehouseStatus}
        />

        <WarehouseDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          title="إضافة مستودع جديد"
          warehouse={null}
          defaultValues={{
            code: "",
            name: "",
            branchId: "",
            type: "main",
            address: "",
            inventoryControl: "automatic",
            isActive: true,
          }}
          branches={branches}
          onSubmit={handleCreateSubmit}
          generateWarehouseCode={generateWarehouseCode}
        />

        <WarehouseDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          title="تعديل بيانات المستودع"
          warehouse={selectedWarehouse}
          defaultValues={selectedWarehouse || {}}
          branches={branches}
          onSubmit={handleEditSubmit}
          generateWarehouseCode={generateWarehouseCode}
        />

        <DeleteWarehouseDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          warehouseName={selectedWarehouse?.name || ""}
          onConfirm={handleDeleteSubmit}
        />
      </CardContent>
    </Card>
  );
};
