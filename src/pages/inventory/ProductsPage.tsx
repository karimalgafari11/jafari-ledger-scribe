
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { ProductsToolbar } from "@/components/inventory/ProductsToolbar";
import { DataGrid } from "@/components/inventory/DataGrid";
import { ActionDefinition } from "@/components/inventory/types";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { Product } from "@/types/inventory";
import { useInventoryProductSettings } from "@/hooks/useInventoryProductSettings";
import { ColumnManager } from "@/components/inventory/ColumnManager";
import { ProductExportDialog } from "@/components/inventory/ProductExportDialog";
import { ProductShareDialog } from "@/components/inventory/ProductShareDialog";
import { ProductDetails } from "@/components/inventory/ProductDetails";
import { getDefaultProductColumns } from "@/components/inventory/ProductColumnDefinitions";
import { useProductActions } from "@/hooks/useProductActions";
import { Eye, Pencil, Trash2, FilePlus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  
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

  // Use product actions hook
  const { 
    handleViewProduct, 
    handleDeleteProduct, 
    handleDuplicateProduct, 
    handleBulkDelete,
    handleAddProduct 
  } = useProductActions(
    deleteProduct, 
    setSelectedProduct, 
    setShowDetails
  );

  const actions: ActionDefinition[] = [
    {
      icon: <Eye className="h-4 w-4" />,
      label: "عرض",
      onClick: (product: Product) => handleViewProduct(product),
    },
    {
      icon: <Pencil className="h-4 w-4" />,
      label: "تعديل",
      onClick: (product: Product) => navigate(`/inventory/products/edit/${product.id}`),
    },
    {
      icon: <Trash2 className="h-4 w-4" />,
      label: "حذف",
      onClick: (product: Product) => handleDeleteProduct(product.id),
      variant: "destructive",
    },
    {
      icon: <FilePlus className="h-4 w-4" />,
      label: "نسخ",
      onClick: (product: Product) => handleDuplicateProduct(product),
    },
  ];

  const onSelectAll = (selected: boolean) => {
    if (!selected) {
      clearSelectedProducts();
    } else {
      // Select all displayed products
      products.forEach(product => {
        if (!selectedProducts.includes(product.id)) {
          toggleProductSelection(product.id);
        }
      });
    }
  };

  // Add size to products data
  const enrichedProducts = products.map(product => ({
    ...product,
    size: product.size || (Math.random() > 0.5 ? "16mm" : "24mm"), // Placeholder for demo
  }));

  const goToAddProduct = () => navigate("/inventory/products/add");

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
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <ProductsToolbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              filterOptions={filterOptions}
              setFilterOptions={setFilterOptions}
              selectedCount={selectedProducts.length}
              onBulkDelete={() => handleBulkDelete(selectedProducts, bulkDeleteProducts)}
              onExport={() => setShowExportDialog(true)}
              onShare={() => setShowShareDialog(true)}
              onAddProduct={goToAddProduct}
            />
          </div>
          
          {/* إدارة الأعمدة */}
          <div className="flex justify-end">
            <ColumnManager 
              columns={defaultColumns}
              visibleColumns={visibleColumns}
              columnOrder={columnOrder}
              onVisibilityChange={toggleColumnVisibility}
              onOrderChange={updateColumnOrder}
            />
          </div>
        </div>

        <DataGrid
          data={enrichedProducts}
          columns={displayColumns}
          actions={actions}
          selectable={true}
          selectedRows={selectedProducts}
          onToggleSelection={toggleProductSelection}
          onSelectAll={onSelectAll}
          idField="id"
          emptyMessage="لا توجد منتجات متاحة"
          className="rounded-md overflow-hidden"
        />
      </div>

      {/* Product Details Dialog */}
      <ProductDetails 
        open={showDetails}
        onOpenChange={setShowDetails}
        product={selectedProduct}
      />

      {/* Export Dialog */}
      <ProductExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        products={enrichedProducts}
        selectedProducts={selectedProducts}
        columns={defaultColumns}
        visibleColumns={visibleColumns}
      />

      {/* Share Dialog */}
      <ProductShareDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        data={enrichedProducts}
        selectedProducts={selectedProducts}
      />
    </Layout>
  );
};

export default ProductsPage;
