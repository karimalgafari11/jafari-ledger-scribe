
import React from "react";
import { Header } from "@/components/Header";
import { ReorderTable } from "@/components/inventory/ReorderTable";
import { ReorderToolbar } from "@/components/inventory/ReorderToolbar";
import { useReorderLevels } from "@/hooks/useReorderLevels";
import { toast } from "sonner";

const ReorderPage = () => {
  const {
    reorderItems,
    searchQuery,
    setSearchQuery,
    warehouseFilter,
    setWarehouseFilter,
    selectedItems,
    toggleItemSelection,
    clearSelectedItems,
    createPurchaseOrder
  } = useReorderLevels();

  const handleExport = (type: 'excel') => {
    toast.info(`جاري تصدير البيانات بصيغة ${type}...`);
  };

  const handleShare = () => {
    toast.info("جاري مشاركة البيانات...");
  };

  const handleCreateOrder = () => {
    createPurchaseOrder();
    toast.success("تم إنشاء طلب شراء بنجاح");
  };

  const handleFilterChange = (filters: any) => {
    setWarehouseFilter(filters.warehouse);
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="مستويات إعادة الطلب" showBack={true} />
      </div>

      <main className="p-6">
        <ReorderToolbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          onFilterChange={handleFilterChange}
          onExport={handleExport}
          onShare={handleShare}
        />
        
        <ReorderTable 
          items={reorderItems} 
          selectedItems={selectedItems}
          onToggleSelection={toggleItemSelection}
          onCreateOrder={handleCreateOrder}
        />
      </main>
    </div>
  );
};

export default ReorderPage;
