
import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDamagedItems } from "@/hooks/useDamagedItems";
import { useLocations } from "@/hooks/useLocations";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { toast } from "sonner";

interface DamagedItemDialogProps {
  itemId: string | null;
  onClose: () => void;
}

export function DamagedItemDialog({ itemId, onClose }: DamagedItemDialogProps) {
  const { getItemById, addItem, updateItem } = useDamagedItems();
  const { warehouses } = useLocations();
  const { products } = useInventoryProducts();

  const [open, setOpen] = React.useState(true);
  
  const item = getItemById(itemId);
  
  const [formData, setFormData] = React.useState({
    productId: item?.productId || "",
    quantity: item?.quantity.toString() || "1",
    warehouseId: item?.warehouseId || "",
    reason: item?.reason || "",
    notes: item?.notes || ""
  });
  
  const selectedProduct = products.find(p => p.id === formData.productId);
  
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productId || !formData.warehouseId || !formData.reason) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const selectedProduct = products.find(p => p.id === formData.productId);
    const selectedWarehouse = warehouses.find(w => w.id === formData.warehouseId);
    
    if (!selectedProduct || !selectedWarehouse) {
      toast.error("بيانات المنتج أو المستودع غير صحيحة");
      return;
    }

    const itemData = {
      productId: formData.productId,
      productName: selectedProduct.name,
      productCode: selectedProduct.code,
      manufacturer: "الشركة المصنعة", // This would come from a real product database
      purchasePrice: selectedProduct.price * 0.6, // Example calculation
      sellingPrice: selectedProduct.price,
      quantity: parseInt(formData.quantity) || 1,
      warehouseId: formData.warehouseId,
      warehouseName: selectedWarehouse.name,
      reason: formData.reason,
      notes: formData.notes,
      date: new Date(),
      reorderLevel: selectedProduct.reorderLevel
    };

    if (itemId) {
      updateItem(itemId, itemData);
      toast.success("تم تحديث العنصر التالف بنجاح");
    } else {
      addItem(itemData);
      toast.success("تم إضافة العنصر التالف بنجاح");
    }

    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{itemId ? "تعديل عنصر تالف" : "إضافة عنصر تالف جديد"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productId" className="text-right">المنتج</Label>
              <div className="col-span-3">
                <Select 
                  value={formData.productId} 
                  onValueChange={(value) => handleSelectChange("productId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المنتج" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} ({product.code})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {selectedProduct && (
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right text-sm text-gray-500">معلومات المنتج</span>
                <div className="col-span-3 text-sm bg-gray-50 p-2 rounded border">
                  <div>الكود: {selectedProduct.code}</div>
                  <div>السعر: {selectedProduct.price.toFixed(2)}</div>
                  <div>المخزون الحالي: {selectedProduct.quantity}</div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">الكمية</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="warehouseId" className="text-right">المستودع</Label>
              <div className="col-span-3">
                <Select 
                  value={formData.warehouseId} 
                  onValueChange={(value) => handleSelectChange("warehouseId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المستودع" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map((warehouse) => (
                      <SelectItem key={warehouse.id} value={warehouse.id}>
                        {warehouse.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">سبب التلف</Label>
              <div className="col-span-3">
                <Select 
                  value={formData.reason} 
                  onValueChange={(value) => handleSelectChange("reason", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر سبب التلف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expired">منتهي الصلاحية</SelectItem>
                    <SelectItem value="damaged">تلف أثناء التخزين</SelectItem>
                    <SelectItem value="broken">كسر</SelectItem>
                    <SelectItem value="quality">مشاكل جودة</SelectItem>
                    <SelectItem value="other">أسباب أخرى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">ملاحظات</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              إلغاء
            </Button>
            <Button type="submit">
              {itemId ? "تحديث" : "إضافة"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
