
import React, { useState, useRef, useEffect } from "react";
import { Search, Plus, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { InvoiceItem } from "@/types/invoices";
import { Product } from "@/types/inventory";
import { mockProducts } from "@/data/mockProducts";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

interface ProductSearchSectionProps {
  onAddItem: (item: Partial<InvoiceItem>) => void;
}

export const ProductSearchSection: React.FC<ProductSearchSectionProps> = ({ onAddItem }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantity, setQuantity] = useState<Record<string, number>>({});
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts.slice(0, 50));
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // معالجة البحث
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(mockProducts.slice(0, 50)); // إظهار أول 50 منتج افتراضيًا
    } else {
      const term = searchTerm.toLowerCase().trim();
      const filtered = mockProducts.filter(
        product => 
          product.name.toLowerCase().includes(term) ||
          product.code.toLowerCase().includes(term) ||
          (product.category && product.category.toLowerCase().includes(term)) ||
          (product.barcode && product.barcode.toLowerCase().includes(term))
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm]);

  // فتح نافذة البحث
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    // إعادة تعيين الكميات والعناصر المحددة
    setQuantity({});
    setSelectedItems([]);
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  // إغلاق نافذة البحث
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSearchTerm("");
  };

  // تحديد أو إلغاء تحديد صنف
  const toggleSelectItem = (productId: string) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(prev => prev.filter(id => id !== productId));
    } else {
      setSelectedItems(prev => [...prev, productId]);
      // تعيين كمية افتراضية 1 عند تحديد العنصر
      setQuantity(prev => ({ ...prev, [productId]: 1 }));
    }
  };

  // تغيير الكمية
  const handleQuantityChange = (productId: string, value: number) => {
    if (value > 0) {
      setQuantity(prev => ({ ...prev, [productId]: value }));
      
      // إضافة العنصر للمحددة إذا لم يكن موجودًا
      if (!selectedItems.includes(productId)) {
        setSelectedItems(prev => [...prev, productId]);
      }
    }
  };

  // إضافة العناصر المحددة للفاتورة
  const handleAddItems = () => {
    if (selectedItems.length === 0) {
      toast.error("الرجاء تحديد صنف واحد على الأقل");
      return;
    }

    selectedItems.forEach(productId => {
      const product = mockProducts.find(p => p.id === productId);
      if (product && quantity[productId] > 0) {
        // إنشاء عنصر فاتورة
        const invoiceItem: Partial<InvoiceItem> = {
          id: uuid(),
          productId: product.id,
          code: product.code,
          name: product.name,
          quantity: quantity[productId],
          price: product.price,
          discount: 0,
          discountType: 'percentage',
          tax: 15, // قيمة افتراضية
          total: product.price * quantity[productId]
        };
        
        onAddItem(invoiceItem);
      }
    });
    
    // إغلاق النافذة بعد الإضافة
    handleCloseDialog();
    
    // عرض رسالة نجاح
    toast.success(`تم إضافة ${selectedItems.length} من الأصناف للفاتورة`);
  };

  return (
    <>
      <Button
        onClick={handleOpenDialog}
        className="w-full border border-dashed border-gray-300 text-gray-500 hover:bg-blue-50 hover:border-blue-300"
        variant="ghost"
        size="sm"
      >
        <Plus className="h-4 w-4 ml-1" />
        إضافة صنف جديد
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-lg">اختيار أصناف من المخزون</DialogTitle>
          </DialogHeader>
          
          <div className="mb-4 flex items-center gap-2">
            <div className="relative w-full">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                ref={searchInputRef}
                className="pr-10"
                placeholder="البحث باسم الصنف أو الرمز..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <Card className="mb-4 overflow-hidden border">
            <CardContent className="p-0">
              <div className="max-h-[50vh] overflow-auto">
                <Table hoverable>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10 text-center"></TableHead>
                      <TableHead className="w-24">الرمز</TableHead>
                      <TableHead>الصنف</TableHead>
                      <TableHead className="w-32">السعر</TableHead>
                      <TableHead className="w-28">المتوفر</TableHead>
                      <TableHead className="w-24">الكمية</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          لا توجد نتائج مطابقة للبحث
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredProducts.map((product) => (
                        <TableRow 
                          key={product.id} 
                          className={`cursor-pointer ${selectedItems.includes(product.id) ? 'bg-blue-50' : ''}`}
                          onClick={() => toggleSelectItem(product.id)}
                        >
                          <TableCell className="text-center">
                            <input 
                              type="checkbox" 
                              checked={selectedItems.includes(product.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                toggleSelectItem(product.id);
                              }}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{product.code}</TableCell>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{formatCurrency(product.price)}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs ${product.quantity > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {product.quantity > 0 ? product.quantity : 'غير متوفر'}
                            </span>
                          </TableCell>
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Input
                              type="number"
                              min="1"
                              value={quantity[product.id] || ''}
                              onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 0)}
                              className="h-8 w-20"
                              disabled={product.quantity <= 0}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handleCloseDialog}>
              <X className="ml-1 h-4 w-4" />
              إلغاء
            </Button>
            <Button onClick={handleAddItems} className="bg-green-600 hover:bg-green-700">
              <Plus className="ml-1 h-4 w-4" />
              إضافة للفاتورة ({selectedItems.length})
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
