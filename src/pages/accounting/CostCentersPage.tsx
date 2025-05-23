
import React from 'react';
import { Header } from '@/components/Header';
import { useCostCenters, CostCenter } from '@/hooks/useCostCenters';
import { CostCenterTree } from '@/components/accounting/costcenters/CostCenterTree';
import { CostCenterDialog } from '@/components/accounting/costcenters/CostCenterDialog';
import { DeleteCostCenterDialog } from '@/components/accounting/costcenters/DeleteCostCenterDialog';
import { CostCenterActions } from '@/components/accounting/costcenters/CostCenterActions';
import { Layout } from '@/components/Layout';

interface CostCentersPageProps {
  embedded?: boolean;
}

const CostCentersPage: React.FC<CostCentersPageProps> = ({ embedded = false }) => {
  const {
    costCenters,
    selectedCostCenter,
    setSelectedCostCenter,
    isCreateDialogOpen,
    setIsCreateDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    createCostCenter,
    updateCostCenter,
    deleteCostCenter,
    generateCostCenterCode,
  } = useCostCenters();

  const handleCreate = () => {
    setSelectedCostCenter(null);
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (center: CostCenter) => {
    setSelectedCostCenter(center);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (center: CostCenter) => {
    setSelectedCostCenter(center);
    setIsDeleteDialogOpen(true);
  };

  const handleAddChild = (parent: CostCenter) => {
    setSelectedCostCenter(parent);
    setIsCreateDialogOpen(true);
  };

  const handleCreateSubmit = (data: Omit<CostCenter, 'id' | 'createdAt' | 'updatedAt'>) => {
    createCostCenter({
      ...data,
      parentId: selectedCostCenter?.id || null
    });
    setIsCreateDialogOpen(false);
  };

  const handleEditSubmit = (data: Partial<CostCenter>) => {
    if (selectedCostCenter) {
      updateCostCenter(selectedCostCenter.id, data);
      setIsEditDialogOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedCostCenter) {
      const success = deleteCostCenter(selectedCostCenter.id);
      if (success) {
        setIsDeleteDialogOpen(false);
      }
    }
  };

  const createDefaultValues = {
    code: generateCostCenterCode(selectedCostCenter?.id || null),
    name: '',
    description: '',
    isActive: true,
    parentId: selectedCostCenter?.id || null
  };

  const content = (
    <>
      {!embedded && <Header title="مراكز الكلفة" showBack={true} />}
      
      <div className="flex-1 overflow-auto p-4">
        <CostCenterActions onCreateCostCenter={handleCreate} />
        
        <div className="bg-white rounded-md shadow p-6 mt-4">
          <h2 className="text-xl font-bold mb-4">شجرة مراكز الكلفة</h2>
          
          <CostCenterTree
            costCenters={costCenters}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddChild={handleAddChild}
          />
        </div>
        
        <CostCenterDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
          onSubmit={handleCreateSubmit}
          defaultValues={createDefaultValues}
          title={selectedCostCenter ? `إضافة مركز كلفة فرعي لـ ${selectedCostCenter.name}` : "إنشاء مركز كلفة جديد"}
          description={selectedCostCenter ? `إضافة مركز كلفة فرعي ضمن ${selectedCostCenter.name}` : "إضافة مركز كلفة جديد للنظام"}
          isCreating={true}
        />
        
        <CostCenterDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleEditSubmit}
          defaultValues={selectedCostCenter || {}}
          title="تعديل مركز الكلفة"
          description="تعديل بيانات مركز الكلفة"
          isCreating={false}
        />
        
        <DeleteCostCenterDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          onConfirm={handleDeleteConfirm}
          name={selectedCostCenter?.name || ''}
        />
      </div>
    </>
  );
  
  if (embedded) {
    return content;
  }

  return (
    <Layout>
      <div className="flex flex-col h-screen w-full overflow-hidden">
        {content}
      </div>
    </Layout>
  );
};

export default CostCentersPage;
