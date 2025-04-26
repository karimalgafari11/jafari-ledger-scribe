
import React from "react";
import { Header } from "@/components/Header";
import { MovementsTable } from "@/components/inventory/MovementsTable";
import { MovementsToolbar } from "@/components/inventory/MovementsToolbar";
import { useStockMovements } from "@/hooks/useStockMovements";
import { toast } from "sonner";

const StockMovementsPage = () => {
  const {
    movements,
    searchQuery,
    setSearchQuery,
    filterOptions,
    setFilterOptions,
    deleteMovement,
    selectedMovements,
    toggleMovementSelection,
    clearSelectedMovements,
  } = useStockMovements();

  const handleDelete = (id: string) => {
    deleteMovement(id);
    toast.success("تم حذف الحركة بنجاح");
  };

  const handleBulkDelete = () => {
    // In a real app, this would delete multiple movements
    toast.success(`تم حذف ${selectedMovements.length} حركة بنجاح`);
    clearSelectedMovements();
  };

  const handleExport = (type: 'pdf' | 'excel') => {
    toast.info(`جاري تصدير البيانات بصيغة ${type}...`);
  };

  const handleShare = () => {
    toast.info("جاري مشاركة البيانات...");
  };

  const handleViewDetails = (id: string) => {
    toast.info(`عرض تفاصيل الحركة: ${id}`);
  };
  
  const handleExportMovement = (id: string) => {
    toast.info(`تصدير الحركة: ${id}`);
  };
  
  const handleAddMovement = () => {
    toast.info("إضافة حركة مخزون جديدة");
  };

  const handleFilterChange = (filters: any) => {
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;
    
    setFilterOptions({
      type: filters.type,
      warehouse: filters.warehouse,
      startDate,
      endDate
    });
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="متابعة حركات المخزون" showBack={true} />
      </div>

      <main className="p-6">
        <MovementsToolbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          onFilterChange={handleFilterChange}
          selectedCount={selectedMovements.length}
          onBulkDelete={handleBulkDelete}
          onExport={handleExport}
          onShare={handleShare}
          onAddMovement={handleAddMovement}
        />
        
        <MovementsTable 
          movements={movements} 
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
          onExport={handleExportMovement}
          selectedMovements={selectedMovements}
          onToggleSelection={toggleMovementSelection}
        />
      </main>
    </div>
  );
};

export default StockMovementsPage;
