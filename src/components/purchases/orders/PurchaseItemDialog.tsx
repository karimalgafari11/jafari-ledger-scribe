
import React, { useState, useEffect } from "react";
import { PurchaseItem } from "@/types/purchases";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { mockProducts } from "@/data/mockProducts";
import { v4 as uuidv4 } from "uuid";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { formatCurrency } from "@/utils/formatters";

interface PurchaseItemDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: PurchaseItem) => void;
  initialItem?: PurchaseItem;
  isEditing?: boolean;
}

export const PurchaseItemDialog: React.FC<PurchaseItemDialogProps> = ({
  open,
  onClose,
  onSave,
  initialItem,
  isEditing = false
}) => {
  const defaultItem: PurchaseItem = {
    id: uuidv4(),
    productId: "",
    code: "",
    name: "",
    quantity: 1,
    price: 0,
    total: 0,
    discount: 0,
    discountType: "percentage",
    tax: 15 // Default 15% VAT in Saudi Arabia
  };
  
  const [item, setItem] = useState<PurchaseItem>(initialItem || defaultItem);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  
  useEffect(() => {
    // Calculate total whenever quantity, price, discount, or tax changes
    calculateTotal();
  }, [item.quantity, item.price, item.discount, item.discountType, item.tax]);
  
  useEffect(() => {
    // Filter products based on search term
    if (searchTerm.trim() === "") {
      setFilteredProducts(mockProducts);
    } else {
      const term = searchTerm.toLowerCase();
      setFilteredProducts(
        mockProducts.filter(
          product => 
            product.name.toLowerCase().includes(term) || 
            product.code.toLowerCase().includes(term)
        )
      );
    }
  }, [searchTerm]);
  
  const handleProductSelect = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      setItem(prev => ({
        ...prev,
        productId: product.id,
        code: product.code,
        name: product.name,
        price: product.price
      }));
      
      // Reset search
      setSearchTerm("");
    }
  };
  
  const handleInputChange = (field: keyof PurchaseItem, value: any) => {
    setItem(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const calculateTotal = () => {
    let subtotal = item.quantity * item.price;
    
    // Apply discount
    if (item.discount && item.discount > 0) {
      if (item.discountType === 'percentage') {
        subtotal -= (subtotal * (item.discount / 100));
      } else {
        subtotal -= item.discount;
      }
    }
    
    // We store the total without tax in the item.total
    // Tax will be calculated at the order level
    setItem(prev => ({
      ...prev,
      total: subtotal
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate item
    if (!item.name) {
      alert("يرجى إدخال اسم الصنف");
      return;
    }
    
    if (item.quantity <= 0) {
      alert("يرجى إدخال كمية صحيحة");
      return;
    }
    
    if (item.price <= 0) {
      alert("يرجى إدخال سعر صحيح");
      return;
    }
    
    onSave(item);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? "تعديل صنف" : "إضافة صنف جديد"}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-4">
            <div>
              <FormLabel htmlFor="productSearch">البحث عن صنف</FormLabel>
              <div className="flex gap-2">
                <Input
                  id="productSearch"
                  placeholder="ابحث بالاسم أو الرمز"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setSearchTerm("")}
                  >
                    مسح
                  </Button>
                )}
              </div>
            </div>
            
            {searchTerm && filteredProducts.length > 0 && (
              <Select onValueChange={handleProductSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر منتج" />
                </SelectTrigger>
                <SelectContent>
                  {filteredProducts.map(product => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} - {product.code} - {formatCurrency(product.price)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormLabel htmlFor="code">رمز الصنف</FormLabel>
                <Input
                  id="code"
                  value={item.code}
                  onChange={(e) => handleInputChange("code", e.target.value)}
                />
              </div>
              
              <div>
                <FormLabel htmlFor="name">اسم الصنف</FormLabel>
                <Input
                  id="name"
                  value={item.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormLabel htmlFor="quantity">الكمية</FormLabel>
                <Input
                  id="quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleInputChange("quantity", parseFloat(e.target.value) || 0)}
                  required
                  min="0.01"
                  step="0.01"
                />
              </div>
              
              <div>
                <FormLabel htmlFor="price">السعر</FormLabel>
                <Input
                  id="price"
                  type="number"
                  value={item.price}
                  onChange={(e) => handleInputChange("price", parseFloat(e.target.value) || 0)}
                  required
                  min="0.01"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <FormLabel htmlFor="discount">الخصم</FormLabel>
                <div className="flex gap-2">
                  <Input
                    id="discount"
                    type="number"
                    value={item.discount || ""}
                    onChange={(e) => handleInputChange("discount", parseFloat(e.target.value) || 0)}
                    min="0"
                    step="0.01"
                  />
                  <Select 
                    value={item.discountType} 
                    onValueChange={(value) => handleInputChange("discountType", value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">%</SelectItem>
                      <SelectItem value="fixed">ر.س</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <FormLabel htmlFor="tax">الضريبة (%)</FormLabel>
                <Input
                  id="tax"
                  type="number"
                  value={item.tax || ""}
                  onChange={(e) => handleInputChange("tax", parseFloat(e.target.value) || 0)}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
            
            <div>
              <FormLabel htmlFor="description">وصف الصنف (اختياري)</FormLabel>
              <Input
                id="description"
                value={item.description || ""}
                onChange={(e) => handleInputChange("description", e.target.value)}
              />
            </div>
            
            <div>
              <FormLabel htmlFor="notes">ملاحظات (اختياري)</FormLabel>
              <Input
                id="notes"
                value={item.notes || ""}
                onChange={(e) => handleInputChange("notes", e.target.value)}
              />
            </div>
            
            <div className="mt-4 p-3 bg-muted rounded-md">
              <div className="text-lg font-semibold">المجموع: {formatCurrency(item.total)}</div>
              {item.tax ? <div className="text-sm text-muted-foreground">
                السعر شامل الضريبة: {formatCurrency(item.total + (item.total * (item.tax / 100)))}
              </div> : null}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit">
              {isEditing ? "تحديث" : "إضافة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
