
import React from "react";
import { Header } from "@/components/Header";
import { DataGrid } from "@/components/inventory/DataGrid";
import { MovementsToolbar } from "@/components/inventory/MovementsToolbar";
import { useStockMovements } from "@/hooks/useStockMovements";
import { toast } from "sonner";
import { Eye, FileText, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ar-SA', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  const columns = [
    {
      id: "date",
      header: "التاريخ",
      accessorKey: "date",
      width: "150px",
      isSortable: true,
      cell: (value: Date) => formatDate(value)
    },
    {
      id: "type",
      header: "نوع الحركة",
      accessorKey: "type",
      width: "120px",
      isSortable: true,
      cell: (value: 'inbound' | 'outbound' | 'transfer') => {
        let color;
        let label;
        
        switch(value) {
          case 'inbound':
            color = "bg-green-600";
            label = "وارد";
            break;
          case 'outbound':
            color = "bg-red-600";
            label = "صادر";
            break;
          case 'transfer':
            color = "bg-blue-600";
            label = "نقل";
            break;
        }
        
        return <Badge className={color}>{label}</Badge>;
      }
    },
    {
      id: "itemName",
      header: "الصنف",
      accessorKey: "itemName",
      width: "200px",
      isSortable: true
    },
    {
      id: "quantity",
      header: "الكمية",
      accessorKey: "quantity",
      width: "100px",
      isSortable: true
    },
    {
      id: "sourceWarehouse",
      header: "المصدر",
      accessorKey: "sourceWarehouse",
      width: "150px",
      isSortable: true
    },
    {
      id: "destinationWarehouse",
      header: "الوجهة",
      accessorKey: "destinationWarehouse",
      width: "150px",
      isSortable: true
    },
    {
      id: "notes",
      header: "ملاحظات",
      accessorKey: "notes",
      width: "200px"
    }
  ];

  const actions = [
    {
      icon: <Eye className="h-4 w-4" />,
      label: "عرض",
      onClick: (row: any) => handleViewDetails(row.id)
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "تصدير",
      onClick: (row: any) => handleExportMovement(row.id)
    },
    {
      icon: <Trash2 className="h-4 w-4" />,
      label: "حذف",
      onClick: (row: any) => handleDelete(row.id),
      variant: "ghost" as const // Using 'as const' to specify the literal type
    }
  ];

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
        
        <DataGrid 
          data={movements} 
          columns={columns}
          actions={actions}
          selectable={true}
          selectedRows={selectedMovements}
          onToggleSelection={toggleMovementSelection}
          onSelectAll={(selected) => {
            if (selected) {
              movements.forEach(movement => {
                if (!selectedMovements.includes(movement.id)) {
                  toggleMovementSelection(movement.id);
                }
              });
            } else {
              clearSelectedMovements();
            }
          }}
          emptyMessage="لا توجد حركات مخزون مسجلة"
        />
      </main>
    </div>
  );
};

export default StockMovementsPage;
