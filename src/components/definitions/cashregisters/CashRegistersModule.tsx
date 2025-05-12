
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CashRegisterTable } from "./CashRegisterTable";
import { CashRegisterToolbar } from "./CashRegisterToolbar";
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
  
  const { toast } = useToast();

  const handleEdit = (register: CashRegister) => {
    setSelectedRegister(register);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (register: CashRegister) => {
    setSelectedRegister(register);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateSubmit = (data: any) => {
    createCashRegister(data);
    setIsCreateDialogOpen(false);
    toast({
      title: "تمت الإضافة بنجاح",
      description: "تم إضافة صندوق جديد بنجاح",
    });
  };

  const handleEditSubmit = (data: any) => {
    if (selectedRegister) {
      updateCashRegister(selectedRegister.id, data);
      setIsEditDialogOpen(false);
      toast({
        title: "تم التعديل بنجاح",
        description: "تم تعديل بيانات الصندوق بنجاح",
      });
    }
  };

  const handleDeleteSubmit = () => {
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

  const handleViewTransactions = (register: CashRegister) => {
    // يمكن تنفيذ عملية عرض عمليات الصندوق هنا
    toast({
      title: "عمليات الصندوق",
      description: `تم اختيار عرض عمليات الصندوق: ${register.name}`,
    });
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
          onViewTransactions={handleViewTransactions}
        />
        
        {/* نحتاج لإضافة مكونات الحوارات هنا */}
      </CardContent>
    </Card>
  );
};
