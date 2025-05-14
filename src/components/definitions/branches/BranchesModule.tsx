
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BranchesTable } from "./BranchesTable";
import { BranchesToolbar } from "./BranchesToolbar";
import { BranchDialog } from "./BranchDialog";
import { DeleteBranchDialog } from "./DeleteBranchDialog";
import { useBranches } from "@/hooks/useBranches";

export const BranchesModule = () => {
  const {
    filteredBranches,
    isLoading,
    searchTerm,
    setSearchTerm,
    selectedBranch,
    setSelectedBranch,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createBranch,
    updateBranch,
    deleteBranch,
    toggleBranchStatus,
    generateBranchCode,
  } = useBranches();

  const handleEdit = (branch: typeof selectedBranch) => {
    setSelectedBranch(branch);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (branch: typeof selectedBranch) => {
    setSelectedBranch(branch);
    setIsDeleteDialogOpen(true);
  };

  const handleCreateSubmit = (data: any) => {
    createBranch(data);
    setIsCreateDialogOpen(false);
  };

  const handleEditSubmit = (data: any) => {
    if (selectedBranch) {
      updateBranch(selectedBranch.id, data);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteSubmit = () => {
    if (selectedBranch) {
      deleteBranch(selectedBranch.id);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة الفروع</CardTitle>
      </CardHeader>
      <CardContent>
        <BranchesToolbar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddBranch={() => setIsCreateDialogOpen(true)}
        />

        <BranchesTable
          branches={filteredBranches}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleStatus={toggleBranchStatus}
        />

        <BranchDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          title="إضافة فرع جديد"
          branch={null}
          defaultValues={{
            code: generateBranchCode(),
            name: "",
            address: "",
            manager: "",
            phone: "",
            email: "",
            isActive: true,
            isMainBranch: false,
          }}
          onSubmit={handleCreateSubmit}
        />

        <BranchDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          title="تعديل بيانات الفرع"
          branch={selectedBranch}
          defaultValues={selectedBranch || {}}
          onSubmit={handleEditSubmit}
        />

        <DeleteBranchDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          branchName={selectedBranch?.name || ""}
          onConfirm={handleDeleteSubmit}
        />
      </CardContent>
    </Card>
  );
};
