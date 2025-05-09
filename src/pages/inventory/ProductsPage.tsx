
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { ProductsToolbar } from "@/components/inventory/ProductsToolbar";
import { DataGrid, ColumnDefinition, ActionDefinition } from "@/components/inventory/DataGrid";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { Product } from "@/types/inventory";
import { Eye, Pencil, Trash2, FilePlus } from "lucide-react";
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

  const columns: ColumnDefinition[] = [
    {
      id: "code",
      header: "رقم المنتج",
      accessorKey: "code",
      isSortable: true,
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
      id: "price",
      header: "السعر",
      accessorKey: "price",
      cell: (value, row) => {
        // Verificamos si row y row.price existen antes de acceder a price
        if (row && typeof row.price === 'number') {
          return `${row.price.toFixed(2)} ر.س`;
        }
        return "غير محدد"; // "No definido" en árabe
      },
      isSortable: true,
      isVisible: true,
    },
    {
      id: "quantity",
      header: "الكمية المتاحة",
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
      cell: (value, row) => {
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

  const handleExport = (type: "pdf" | "excel") => {
    toast.success(`تم تصدير المنتجات بتنسيق ${type} بنجاح`);
  };

  const handleShare = () => {
    toast.success("تم نسخ رابط المنتجات للمشاركة");
  };

  const handleProductVisibility = (id: string, visible: boolean) => {
    // This would update product visibility in a real app
    toast.success(`تم تغيير حالة المنتج ${visible ? 'إلى متوفر' : 'إلى غير متوفر'}`);
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

  return (
    <Layout>
      <Header title="إدارة المنتجات" />
      
      <div className="p-4 md:p-6 space-y-6">
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

        <DataGrid
          data={products}
          columns={columns}
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
                  <h3 className="font-medium text-muted-foreground">رمز المنتج</h3>
                  <p className="text-lg">{selectedProduct.code}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground">اسم المنتج</h3>
                  <p className="text-lg">{selectedProduct.name}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground">الوصف</h3>
                  <p>{selectedProduct.description || "لا يوجد وصف"}</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-muted-foreground">التصنيف</h3>
                  <p>{selectedProduct.category || "غير مصنف"}</p>
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
    </Layout>
  );
};

export default ProductsPage;
