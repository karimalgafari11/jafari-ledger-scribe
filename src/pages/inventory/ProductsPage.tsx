
import { useState } from "react";
import { Header } from "@/components/Header";
import { ProductsTable } from "@/components/inventory/ProductsTable";
import { ProductsToolbar } from "@/components/inventory/ProductsToolbar";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { toast } from "sonner";

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
    clearSelectedProducts,
  } = useInventoryProducts();

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success("تم حذف المنتج بنجاح");
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      toast.error("الرجاء تحديد المنتجات للحذف");
      return;
    }
    
    bulkDeleteProducts();
    toast.success(`تم حذف ${selectedProducts.length} منتج بنجاح`);
  };

  const handleExport = (type: 'pdf' | 'excel') => {
    toast.info(`جاري تصدير البيانات بصيغة ${type}...`);
  };

  const handleShare = () => {
    toast.info("جاري مشاركة البيانات عبر واتساب...");
  };

  const handleViewDetails = (id: string) => {
    toast.info(`عرض تفاصيل المنتج: ${id}`);
  };

  const handleEdit = (id: string) => {
    toast.info(`تحرير المنتج: ${id}`);
  };

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <Header title="إدارة الأصناف" showBack={true} />
      </div>

      <main className="p-6">
        <ProductsToolbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          selectedCount={selectedProducts.length}
          onBulkDelete={handleBulkDelete}
          onExport={handleExport}
          onShare={handleShare}
        />
        
        <ProductsTable 
          products={products} 
          onDelete={handleDelete}
          onEdit={handleEdit}
          onViewDetails={handleViewDetails}
          selectedProducts={selectedProducts}
          onToggleSelection={toggleProductSelection}
        />
      </main>
    </div>
  );
};

export default ProductsPage;
