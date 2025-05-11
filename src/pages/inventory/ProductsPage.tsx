
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { useInventoryProductSettings } from "@/hooks/useInventoryProductSettings";
import { getDefaultProductColumns } from "@/components/inventory/ProductColumnDefinitions";
import { useProductPageActions } from "@/hooks/useProductPageActions";
import { ProductToolbarSection } from "@/components/inventory/products/ProductToolbarSection";
import { ProductGridSection } from "@/components/inventory/products/ProductGridSection";
import { ProductDetailsSection } from "@/components/inventory/products/ProductDetailsSection";

const ProductsPage = () => {
  // Define default columns
  const defaultColumns = getDefaultProductColumns();

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
  
  // Use the column settings hook
  const { visibleColumns, columnOrder, toggleColumnVisibility, updateColumnOrder } = 
    useInventoryProductSettings(defaultColumns);

  // Use product page actions hook
  const {
    showDetails,
    setShowDetails,
    selectedProduct,
    showExportDialog,
    setShowExportDialog,
    showShareDialog,
    setShowShareDialog,
    actions,
    handleBulkDelete,
    goToAddProduct
  } = useProductPageActions(deleteProduct, bulkDeleteProducts, products);

  // Apply column visibility and order
  const displayColumns = defaultColumns
    .filter(col => visibleColumns.includes(col.id))
    .sort((a, b) => {
      const aIndex = columnOrder.indexOf(a.id);
      const bIndex = columnOrder.indexOf(b.id);
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });

  // Add size to products data
  const enrichedProducts = products.map(product => ({
    ...product,
    size: product.size || (Math.random() > 0.5 ? "16mm" : "24mm"), // Placeholder for demo
  }));

  const onSelectAll = (selected: boolean) => {
    if (!selected) {
      clearSelectedProducts();
    } else {
      // Select all displayed products
      enrichedProducts.forEach(product => {
        if (!selectedProducts.includes(product.id)) {
          toggleProductSelection(product.id);
        }
      });
    }
  };

  return (
    <Layout>
      <Header title="إدارة المنتجات">
        {/* إضافة زر إضافة منتج بارز في الهيدر */}
        <Button 
          onClick={goToAddProduct}
          className="flex items-center gap-2 bg-primary hover:bg-primary/80 transition-colors text-white mr-4"
          size="lg"
        >
          <Plus className="h-5 w-5" />
          إضافة منتج جديد
        </Button>
      </Header>
      
      <div className="p-4 md:p-6 space-y-6">
        {/* تعديل هيكل الصفحة لإبراز شريط الأدوات */}
        <div className="flex flex-col gap-4 mb-6">
          {/* شريط البحث والأدوات */}
          <ProductToolbarSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}
            selectedProducts={selectedProducts}
            handleBulkDelete={handleBulkDelete}
            bulkDeleteProducts={bulkDeleteProducts}
            setShowExportDialog={setShowExportDialog}
            setShowShareDialog={setShowShareDialog}
            goToAddProduct={goToAddProduct}
          />
          
          {/* إدارة الأعمدة وعرض البيانات */}
          <ProductGridSection
            products={enrichedProducts}
            displayColumns={displayColumns}
            actions={actions}
            selectedProducts={selectedProducts}
            toggleProductSelection={toggleProductSelection}
            onSelectAll={onSelectAll}
            defaultColumns={defaultColumns}
            visibleColumns={visibleColumns}
            columnOrder={columnOrder}
            toggleColumnVisibility={toggleColumnVisibility}
            updateColumnOrder={updateColumnOrder}
          />
        </div>
      </div>

      {/* مكونات الحوار والتفاصيل */}
      <ProductDetailsSection
        showDetails={showDetails}
        setShowDetails={setShowDetails}
        selectedProduct={selectedProduct}
        showExportDialog={showExportDialog}
        setShowExportDialog={setShowExportDialog}
        showShareDialog={showShareDialog}
        setShowShareDialog={setShowShareDialog}
        products={enrichedProducts}
        selectedProducts={selectedProducts}
        defaultColumns={defaultColumns}
        visibleColumns={visibleColumns}
      />
    </Layout>
  );
};

export default ProductsPage;
