import { useState } from "react";
import { Header } from "@/components/Header";
import { DataGrid } from "@/components/inventory/DataGrid";
import { ProductsToolbar } from "@/components/inventory/ProductsToolbar";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { toast } from "sonner";
import { Eye, Pencil, Trash2 } from "lucide-react";
const ProductsPage = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    filterOptions,
    setFilterOptions,
    deleteProduct,
    bulkDeleteProducts,
    selectedProducts,
    toggleProductSelection,
    clearSelectedProducts
  } = useInventoryProducts();
  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success("تم حذف القطعة بنجاح");
  };
  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      toast.error("الرجاء تحديد قطع الغيار للحذف");
      return;
    }
    bulkDeleteProducts();
    toast.success(`تم حذف ${selectedProducts.length} قطعة بنجاح`);
  };
  const handleExport = (type: 'pdf' | 'excel') => {
    toast.info(`جاري تصدير البيانات بصيغة ${type}...`);
  };
  const handleShare = () => {
    toast.info("جاري مشاركة البيانات عبر واتساب...");
  };
  const handleViewDetails = (id: string) => {
    toast.info(`عرض تفاصيل قطعة الغيار: ${id}`);
  };
  const handleEdit = (id: string) => {
    toast.info(`تحرير قطعة الغيار: ${id}`);
  };
  const columns = [{
    id: "code",
    header: "رقم القطعة",
    accessorKey: "code",
    width: "120px",
    isSortable: true
  }, {
    id: "name",
    header: "اسم القطعة",
    accessorKey: "name",
    width: "200px",
    isSortable: true
  }, {
    id: "price",
    header: "السعر",
    accessorKey: "price",
    width: "120px",
    isSortable: true,
    cell: (value: number) => value.toFixed(2)
  }, {
    id: "category",
    header: "التصنيف",
    accessorKey: "category",
    width: "150px",
    isSortable: true
  }, {
    id: "quantity",
    header: "الكمية المتاحة",
    accessorKey: "quantity",
    width: "150px",
    isSortable: true,
    cell: (value: number, row: any) => {
      const isLow = value < row.reorderLevel;
      return <span className={`${value <= 0 ? 'text-red-700 font-bold' : isLow ? 'text-orange-500 font-bold' : ''}`}>{value}</span>;
    }
  }, {
    id: "isActive",
    header: "الحالة",
    accessorKey: "isActive",
    width: "100px",
    cell: (value: boolean) => <span className={`px-2 py-1 text-xs rounded-full ${value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {value ? 'متوفر' : 'غير متوفر'}
        </span>
  }];
  const actions = [{
    icon: <Eye className="h-4 w-4" />,
    label: "عرض",
    onClick: (row: any) => handleViewDetails(row.id)
  }, {
    icon: <Pencil className="h-4 w-4" />,
    label: "تحرير",
    onClick: (row: any) => handleEdit(row.id)
  }, {
    icon: <Trash2 className="h-4 w-4" />,
    label: "حذف",
    onClick: (row: any) => handleDelete(row.id),
    variant: "ghost" as const
  }];
  return <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="إدارة قطع الغيار" showBack={true} />
      </div>

      <main className="p-6 bg-cyan-100">
        <ProductsToolbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterOptions={filterOptions} setFilterOptions={setFilterOptions} selectedCount={selectedProducts.length} onBulkDelete={handleBulkDelete} onExport={handleExport} onShare={handleShare} />
        
        <DataGrid data={products} columns={columns} actions={actions} selectable={true} selectedRows={selectedProducts} onToggleSelection={toggleProductSelection} onSelectAll={selected => {
        if (selected) {
          products.forEach(product => {
            if (!selectedProducts.includes(product.id)) {
              toggleProductSelection(product.id);
            }
          });
        } else {
          clearSelectedProducts();
        }
      }} />
      </main>
    </div>;
};
export default ProductsPage;