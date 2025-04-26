
import React from "react";
import { Header } from "@/components/Header";
import { DataGrid } from "@/components/inventory/DataGrid";
import { ReorderToolbar } from "@/components/inventory/ReorderToolbar";
import { useReorderLevels } from "@/hooks/useReorderLevels";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ColumnDefinition } from "@/components/inventory/DataGrid";

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
    clearSelectedItems();
  };

  const handleFilterChange = (filters: any) => {
    setWarehouseFilter(filters.warehouse);
  };

  const columns: ColumnDefinition[] = [
    {
      id: "itemName",
      header: "الصنف",
      accessorKey: "itemName",
      width: "200px",
      isSortable: true
    },
    {
      id: "warehouseName",
      header: "المستودع",
      accessorKey: "warehouseName",
      width: "180px",
      isSortable: true
    },
    {
      id: "availableQuantity",
      header: "الكمية المتاحة",
      accessorKey: "availableQuantity",
      width: "150px",
      isSortable: true,
      cell: (value, row) => (
        <span className={`${value === 0 ? 'font-bold text-red-600' : 'text-orange-600'}`}>
          {value}
        </span>
      )
    },
    {
      id: "reorderThreshold",
      header: "حد إعادة الطلب",
      accessorKey: "reorderThreshold",
      width: "150px",
      isSortable: true
    },
    {
      id: "suggestedOrderQuantity",
      header: "الكمية المقترحة للطلب",
      accessorKey: "suggestedOrderQuantity",
      width: "180px",
      isSortable: true,
      cell: (value) => (
        <span className="text-green-600 font-medium">{value}</span>
      )
    }
  ];

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
        
        {reorderItems.length > 0 && (
          <div className="mb-4 flex justify-end">
            <Button 
              onClick={handleCreateOrder}
              disabled={selectedItems.length === 0}
              className="gap-2 bg-teal hover:bg-teal-dark"
            >
              إنشاء طلب شراء للمنتجات المحددة
            </Button>
          </div>
        )}
        
        <DataGrid
          data={reorderItems}
          columns={columns}
          selectable={true}
          selectedRows={selectedItems}
          onToggleSelection={toggleItemSelection}
          onSelectAll={(selected) => {
            if (selected) {
              reorderItems.forEach(item => {
                if (!selectedItems.includes(item.itemId)) {
                  toggleItemSelection(item.itemId);
                }
              });
            } else {
              clearSelectedItems();
            }
          }}
          idField="itemId"
          emptyMessage="لا توجد أصناف تحتاج لإعادة طلب"
        />
      </main>
    </div>
  );
};

export default ReorderPage;
