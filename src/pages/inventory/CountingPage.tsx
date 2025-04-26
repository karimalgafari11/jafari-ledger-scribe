
import React from "react";
import { Header } from "@/components/Header";
import { CountingTable } from "@/components/inventory/CountingTable";
import { CountingForm } from "@/components/inventory/CountingForm";
import { useInventoryCounting } from "@/hooks/useInventoryCounting";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const CountingPage = () => {
  const {
    counts,
    searchQuery,
    setSearchQuery,
    warehouseFilter,
    setWarehouseFilter,
    statusFilter,
    setStatusFilter,
    currentCount,
    viewCount,
    closeCountView,
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
    toast.info(`تصدير تقرير الجرد: ${id}`);
  };

  const handleComplete = (id: string) => {
    completeCount(id);
    toast.success("تم اعتماد الجرد بنجاح");
  };

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
        <div className="flex flex-col md:flex-row gap-4 justify-between rtl">
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="البحث..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 border rounded-md"
            />
            <select 
              value={warehouseFilter}
              onChange={(e) => setWarehouseFilter(e.target.value)}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">جميع المستودعات</option>
              <option value="المستودع الرئيسي">المستودع الرئيسي</option>
              <option value="فرع الرياض">فرع الرياض</option>
              <option value="فرع جدة">فرع جدة</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "draft" | "completed" | "")}
              className="px-4 py-2 border rounded-md"
            >
              <option value="">جميع الحالات</option>
              <option value="draft">مسودة</option>
              <option value="completed">مكتمل</option>
            </select>
          </div>
          
          <Button className="bg-teal hover:bg-teal-dark text-white gap-2" onClick={startNewCount}>
            <Plus size={18} />
            إنشاء جرد جديد
          </Button>
        </div>
        
        <CountingTable 
          counts={counts} 
          onViewDetails={viewCount}
          onExport={handleExport}
          onComplete={handleComplete}
        />
      </div>
    );
  };

  const handleSaveCount = (notes: string) => {
    if (!newCountWarehouse) {
      toast.error("الرجاء تحديد المستودع");
      return;
    }
    
    if (newCountItems.length === 0) {
      toast.error("لا توجد أصناف للجرد");
      return;
    }
    
    saveNewCount(notes);
    toast.success("تم حفظ الجرد بنجاح");
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="الجرد الفعلي" showBack={true} />
      </div>

      <main className="p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default CountingPage;
