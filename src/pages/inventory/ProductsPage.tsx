import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { ProductsToolbar } from "@/components/inventory/ProductsToolbar";
import { DataGrid } from "@/components/inventory/DataGrid";
import { ColumnDefinition, ActionDefinition } from "@/components/inventory/types";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { Product } from "@/types/inventory";
import { useInventoryProductSettings } from "@/hooks/useInventoryProductSettings";
import { ColumnManager } from "@/components/inventory/ColumnManager";
import { ProductExportDialog } from "@/components/inventory/ProductExportDialog";
import { ProductShareDialog } from "@/components/inventory/ProductShareDialog";
import { Eye, Pencil, Trash2, FilePlus, ArrowUpDown, SlidersHorizontal, FileDown } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const navigate = useNavigate();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  
  // Define columns
  const defaultColumns: ColumnDefinition[] = [
    {
      id: "index",
      header: "الرقم التسلسلي",
      accessorKey: "index",
      cell: (value: any, row: any) => {
        const index = row.index || 0;
        return index + 1;
      },
      isSortable: false,
      isVisible: true,
    },
    {
      id: "name",
      header: "اسم المنتج",
      accessorKey: "name",
      isSortable: true,
      isVisible: true,
    },
    {
      id: "code",
      header: "رقم المنتج",
      accessorKey: "code",
      isSortable: true,
      isVisible: true,
    },
    {
      id: "brand",
      header: "الشركة الصانعة",
      accessorKey: "brand",
      isSortable: true,
      isVisible: true,
      cell: (value) => value || "غير محدد",
    },
    {
      id: "quantity",
      header: "الكمية المتوفرة",
      accessorKey: "quantity",
      isSortable: true,
      isVisible: true,
      cell: (value, row) => {
        if (!row) return "0";
        
        const quantity = row.quantity || 0;
        const reorderLevel = row.reorderLevel || 5;
        
        if (quantity <= 0) {
          return <span className="text-red-700 font-bold">{quantity}</span>;
        } else if (quantity < reorderLevel) {
          return <span className="text-orange-500 font-bold">{quantity}</span>;
        }
        
        return quantity;
      }
    },
    {
      id: "price",
      header: "سعر البيع",
      accessorKey: "price",
      cell: (_, row) => {
        if (row && typeof row.price === 'number') {
          return `${row.price.toFixed(2)} ر.س`;
        }
        return "غير محدد";
      },
      isSortable: true,
      isVisible: true,
    },
    {
      id: "costPrice",
      header: "سعر الشراء",
      accessorKey: "costPrice",
      cell: (_, row) => {
        if (row && typeof row.costPrice === 'number') {
          return `${row.costPrice.toFixed(2)} ر.س`;
        }
        return "غير محدد";
      },
      isSortable: true,
      isVisible: true,
    },
    {
      id: "size",
      header: "المقاس",
      accessorKey: "size",
      isSortable: true,
      isVisible: true,
      cell: (value) => value || "غير محدد",
    },
    {
      id: "notes",
      header: "الملاحظات",
      accessorKey: "description",
      isSortable: false,
      isVisible: true,
      cell: (value) => value || "-",
    },
    {
      id: "category",
      header: "التصنيف",
      accessorKey: "category",
      isSortable: true,
      isVisible: true,
    },
    {
      id: "status",
      header: "الحالة",
      accessorKey: "isActive",
      cell: (_, row) => {
        if (!row) return "";
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs ${row.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
            {row.isActive ? 'متوفر' : 'غير متوفر'}
          </span>
        );
      },
      isSortable: true,
      isVisible: true,
    },
  ];

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

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowDetails(true);
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    toast.success("تم حذف المنتج بنجاح");
  };

  const handleDuplicateProduct = (product: Product) => {
    navigate(`/inventory/products/duplicate/${product.id}`);
    toast.success("تم نسخ المنتج، يمكنك الآن تعديل النسخة الجديدة");
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) {
      toast.error("الرجاء تحديد المنتجات المراد حذفها أولاً");
      return;
    }

    bulkDeleteProducts();
    toast.success(`تم حذف ${selectedProducts.length} منتج بنجاح`);
  };

  const handleExport = () => {
    setShowExportDialog(true);
  };

  const handleShare = () => {
    setShowShareDialog(true);
  };

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

  return (
    <Layout>
      <Header title="إدارة المنتجات" />
      
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
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
          
          <div className="flex gap-2">
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
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">تفاصيل المنتج</DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-muted-foreground">اسم المنتج</h3>
                  <p className="text-lg">{selectedProduct.name}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground">رمز المنتج</h3>
                  <p className="text-lg">{selectedProduct.code}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground">الشركة الصانعة</h3>
                  <p>{selectedProduct.brand || "غير محدد"}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground">المقاس</h3>
                  <p>{selectedProduct.size || "غير محدد"}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground">الوصف</h3>
                  <p>{selectedProduct.description || "لا يوجد وصف"}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-muted-foreground">سعر البيع</h3>
                  <p className="text-lg font-medium">{selectedProduct.price?.toFixed(2) || "غير محدد"} ر.س</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground">سعر التكلفة</h3>
                  <p>{selectedProduct.costPrice?.toFixed(2) || "غير محدد"} ر.س</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground">الكمية المتوفرة</h3>
                  <p className={`font-medium ${selectedProduct.quantity <= 5 ? 'text-red-600' : ''}`}>
                    {selectedProduct.quantity}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground">التصنيف</h3>
                  <p>{selectedProduct.category || "غير مصنف"}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground">الباركود</h3>
                  <p>{selectedProduct.barcode || "غير محدد"}</p>
                </div>
              </div>
              
              <div className="md:col-span-2 flex justify-end gap-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => navigate(`/inventory/products/edit/${selectedProduct.id}`)}
                >
                  تعديل المنتج
                </Button>
                <Button onClick={() => setShowDetails(false)}>إغلاق</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
