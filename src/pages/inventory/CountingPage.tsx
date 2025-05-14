
import React from "react";
import { Header } from "@/components/Header";
import { DataGrid } from "@/components/inventory/DataGrid";
import { CountingForm } from "@/components/inventory/CountingForm";
import { useInventoryCounting } from "@/hooks/useInventoryCounting";
import { toast } from "sonner";
import { createCountingActions } from "@/components/inventory/CountingActions";
import { createCountingColumns } from "@/components/inventory/CountingColumns";
import { CountingToolbar } from "@/components/inventory/CountingToolbar";
import { Layout } from "@/components/Layout";

const CountingPage = () => {
  const {
    counts,
    searchQuery,
    setSearchQuery,
    warehouseFilter,
    setWarehouseFilter,
    statusFilter,
    setStatusFilter,
    isCreatingCount,
    startNewCount,
    cancelNewCount,
    newCountWarehouse,
    setNewCountWarehouse,
    newCountItems,
    setNewCountItems,
    updateItemCount,
    saveNewCount,
    completeCount
  } = useInventoryCounting();

  const handleExport = (id: string) => {
    toast.info(`تصدير تقرير جرد قطع الغيار: ${id}`);
  };

  const handleComplete = (id: string) => {
    completeCount(id);
    toast.success("تم اعتماد الجرد بنجاح");
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const handleSaveCount = (notes: string) => {
    if (!newCountWarehouse) {
      toast.error("الرجاء تحديد المستودع");
      return;
    }
    
    if (newCountItems.length === 0) {
      toast.error("لا توجد قطع غيار للجرد");
      return;
    }
    
    saveNewCount(notes);
    toast.success("تم حفظ جرد قطع الغيار بنجاح");
  };

  const columns = createCountingColumns({ formatDate });
  const actions = createCountingActions({
    onViewDetails: id => toast.info(`عرض تفاصيل جرد قطع الغيار: ${id}`),
    onExport: handleExport,
    onComplete: handleComplete
  });

  const renderContent = () => {
    if (isCreatingCount) {
      return (
        <CountingForm 
          warehouseId=""
          warehouseName={newCountWarehouse}
          onWarehouseChange={setNewCountWarehouse}
          items={newCountItems}
          onItemCountChange={updateItemCount}
          onSave={handleSaveCount}
          onCancel={cancelNewCount}
        />
      );
    }
    
    return (
      <div className="space-y-6">
        <CountingToolbar 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          warehouseFilter={warehouseFilter}
          setWarehouseFilter={setWarehouseFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          onNewCount={startNewCount}
        />
        
        <DataGrid 
          data={counts} 
          columns={columns}
          actions={actions}
          emptyMessage="لا توجد عمليات جرد لقطع الغيار مسجلة"
        />
      </div>
    );
  };

  return (
    <Layout>
      <div className="h-screen overflow-y-auto bg-gray-50">
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <Header title="جرد قطع الغيار" showBack={true} />
        </div>

        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </Layout>
  );
};

export default CountingPage;
