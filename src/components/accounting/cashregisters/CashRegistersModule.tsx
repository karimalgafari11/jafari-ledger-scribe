
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CashRegisterTable } from "./CashRegisterTable";
import { CashRegisterToolbar } from "./CashRegisterToolbar";
import { CashRegisterDialog } from "./CashRegisterDialog";
import { DeleteCashRegisterDialog } from "./DeleteCashRegisterDialog";
import { useCashRegister } from "@/hooks/useCashRegister";
import { useToast } from "@/hooks/use-toast";
import { CashRegister } from "@/types/definitions";

export const CashRegistersModule = () => {
  const {
    filteredRegisters,
    isLoading,
    searchTerm,
    setSearchTerm,
    createCashRegister,
    updateCashRegister,
    deleteCashRegister,
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
  
  const { toast } = useToast();

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

  const handleViewTransactions = (register: CashRegister) => {
    // يمكن تنفيذ عملية عرض عمليات الصندوق هنا
    toast({
      title: "عمليات الصندوق",
      description: `تم اختيار عرض عمليات الصندوق: ${register.name}`,
    });
  };

  const handleCreateRegister = (data: Omit<CashRegister, "id" | "createdAt" | "updatedAt">) => {
    createCashRegister(data);
    setIsCreateDialogOpen(false);
    toast({
      title: "تمت الإضافة بنجاح",
      description: "تم إضافة صندوق جديد بنجاح",
    });
  };

  const handleUpdateRegister = (data: Partial<CashRegister>) => {
    if (selectedRegister) {
      updateCashRegister(selectedRegister.id, data);
      setIsEditDialogOpen(false);
      toast({
        title: "تم التعديل بنجاح",
        description: "تم تعديل بيانات الصندوق بنجاح",
      });
    }
  };

  const handleDeleteRegister = () => {
    if (selectedRegister) {
      deleteCashRegister(selectedRegister.id);
      setIsDeleteDialogOpen(false);
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الصندوق بنجاح",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="mb-6">
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
          onEditRegister={handleOpenEditDialog}
          onDeleteRegister={handleOpenDeleteDialog}
          onViewTransactions={handleViewTransactions}
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
