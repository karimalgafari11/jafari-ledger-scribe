
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PurchaseReturn, PurchaseReturnItem } from "@/types/purchases";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

// بيانات تجريبية للموردين
const mockVendors = [
  { id: "1", name: "شركة الأجهزة الإلكترونية" },
  { id: "2", name: "شركة المستلزمات المكتبية" },
  { id: "3", name: "شركة الأثاث المكتبي" },
  { id: "4", name: "شركة المواد الغذائية" },
];

// بيانات تجريبية للفواتير
const mockInvoices = [
  { id: "INV-001", number: "INV-001", vendorId: "1" },
  { id: "INV-002", number: "INV-002", vendorId: "2" },
  { id: "INV-003", number: "INV-003", vendorId: "3" },
  { id: "INV-004", number: "INV-004", vendorId: "4" },
];

// بيانات تجريبية للمنتجات
const mockProducts = [
  { id: "P-001", code: "P-001", name: "لاب توب HP", price: 3500, vendorId: "1" },
  { id: "P-002", code: "P-002", name: "طابعة Canon", price: 1200, vendorId: "2" },
  { id: "P-003", code: "P-003", name: "كرسي مكتبي", price: 450, vendorId: "3" },
  { id: "P-004", code: "P-004", name: "قهوة", price: 25, vendorId: "4" },
  { id: "P-005", code: "P-005", name: "ماوس لوجيتيك", price: 80, vendorId: "1" },
  { id: "P-006", code: "P-006", name: "لوحة مفاتيح", price: 120, vendorId: "1" },
];

// أسباب الإرجاع
const returnReasons = [
  "منتج تالف",
  "منتج غير مطابق للمواصفات",
  "خطأ في الطلب",
  "منتج قارب على انتهاء الصلاحية",
  "منتج زائد عن الحاجة",
  "سبب آخر"
];

interface NewPurchaseReturnDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (returnData: PurchaseReturn) => void;
}

const NewPurchaseReturnDialog: React.FC<NewPurchaseReturnDialogProps> = ({ open, onClose, onAdd }) => {
  const [vendorId, setVendorId] = useState<string>("");
  const [invoiceId, setInvoiceId] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<PurchaseReturnItem[]>([]);
  const [tax, setTax] = useState<number>(15);

  // الفواتير المفلترة بناءً على المورد المحدد
  const filteredInvoices = mockInvoices.filter(invoice => 
    vendorId ? invoice.vendorId === vendorId : true
  );

  // المنتجات المفلترة بناءً على المورد المحدد
  const filteredProducts = mockProducts.filter(product => 
    vendorId ? product.vendorId === vendorId : true
  );

  // إضافة منتج جديد للمرتجع
  const handleAddProduct = () => {
    const newItem: PurchaseReturnItem = {
      id: uuidv4(),
      productId: "",
      code: "",
      name: "",
      quantity: 1,
      price: 0,
      total: 0,
      reason: "منتج تالف"
    };
    setSelectedProducts([...selectedProducts, newItem]);
  };

  // حذف منتج من المرتجع
  const handleRemoveProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter(item => item.id !== id));
  };

  // تحديث بيانات المنتج
  const handleProductChange = (id: string, productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      setSelectedProducts(selectedProducts.map(item => 
        item.id === id ? {
          ...item,
          productId,
          code: product.code,
          name: product.name,
          price: product.price,
          total: product.price * item.quantity
        } : item
      ));
    }
  };

  // تحديث كمية المنتج
  const handleQuantityChange = (id: string, quantity: number) => {
    setSelectedProducts(selectedProducts.map(item => 
      item.id === id ? {
        ...item,
        quantity,
        total: item.price * quantity
      } : item
    ));
  };

  // تحديث سبب إرجاع المنتج
  const handleItemReasonChange = (id: string, itemReason: string) => {
    setSelectedProducts(selectedProducts.map(item => 
      item.id === id ? { ...item, reason: itemReason } : item
    ));
  };

  // حساب إجمالي المرتجع
  const subtotal = selectedProducts.reduce((sum, item) => sum + item.total, 0);
  const totalAmount = subtotal * (1 + tax / 100);

  // إنشاء مرتجع جديد
  const handleCreateReturn = () => {
    if (!vendorId) {
      alert("يرجى اختيار المورد");
      return;
    }

    if (selectedProducts.length === 0) {
      alert("يرجى إضافة منتج واحد على الأقل");
      return;
    }

    // التحقق من أن جميع المنتجات لها معرفات منتج صالحة
    const invalidProducts = selectedProducts.filter(p => !p.productId);
    if (invalidProducts.length > 0) {
      alert("يرجى اختيار منتج لجميع العناصر");
      return;
    }

    if (!reason) {
      alert("يرجى تحديد سبب الإرجاع");
      return;
    }

    const selectedVendor = mockVendors.find(v => v.id === vendorId);
    const selectedInvoice = mockInvoices.find(i => i.id === invoiceId);

    const newReturn: PurchaseReturn = {
      id: uuidv4(),
      returnNumber: `RET-${Math.floor(Math.random() * 10000)}`,
      date: new Date(),
      vendorId,
      vendorName: selectedVendor?.name || "",
      invoiceId: selectedInvoice?.id,
      invoiceNumber: selectedInvoice?.number,
      items: selectedProducts,
      subtotal,
      totalAmount,
      tax,
      status: "pending",
      reason,
      notes,
      createdBy: "المستخدم الحالي",
      createdAt: new Date()
    };

    onAdd(newReturn);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>إضافة مرتجع مشتريات جديد</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="vendor">المورد</Label>
            <Select value={vendorId} onValueChange={setVendorId}>
              <SelectTrigger id="vendor">
                <SelectValue placeholder="اختر المورد" />
              </SelectTrigger>
              <SelectContent>
                {mockVendors.map(vendor => (
                  <SelectItem key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="invoice">فاتورة الشراء (اختياري)</Label>
            <Select value={invoiceId} onValueChange={setInvoiceId}>
              <SelectTrigger id="invoice">
                <SelectValue placeholder="اختر فاتورة الشراء" />
              </SelectTrigger>
              <SelectContent>
                {/* Fix: Changed from an empty string value to a non-empty string value "none" */}
                <SelectItem value="none">بدون فاتورة</SelectItem>
                {filteredInvoices.map(invoice => (
                  <SelectItem key={invoice.id} value={invoice.id}>
                    {invoice.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label htmlFor="date">تاريخ المرتجع</Label>
            <Input id="date" type="date" value={format(new Date(), "yyyy-MM-dd")} readOnly />
          </div>
          
          <div>
            <Label htmlFor="reason">سبب الإرجاع</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="اختر سبب الإرجاع" />
              </SelectTrigger>
              <SelectContent>
                {returnReasons.map(r => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="notes">ملاحظات</Label>
          <Textarea 
            id="notes" 
            placeholder="أدخل أي ملاحظات إضافية" 
            value={notes} 
            onChange={e => setNotes(e.target.value)} 
          />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">الأصناف</h3>
            <Button type="button" variant="outline" size="sm" onClick={handleAddProduct}>
              <Plus className="mr-1 h-4 w-4" /> إضافة صنف
            </Button>
          </div>
          
          <div className="border rounded-md overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>المنتج</TableHead>
                  <TableHead>الكمية</TableHead>
                  <TableHead>السعر</TableHead>
                  <TableHead>الإجمالي</TableHead>
                  <TableHead>سبب الإرجاع</TableHead>
                  <TableHead>إجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedProducts.length > 0 ? (
                  selectedProducts.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Select 
                          value={item.productId} 
                          onValueChange={value => handleProductChange(item.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر منتج" />
                          </SelectTrigger>
                          <SelectContent>
                            {filteredProducts.map(product => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min="1" 
                          value={item.quantity} 
                          onChange={e => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          className="w-20"
                        />
                      </TableCell>
                      <TableCell>{item.price.toLocaleString()} ريال</TableCell>
                      <TableCell>{item.total.toLocaleString()} ريال</TableCell>
                      <TableCell>
                        <Select 
                          value={item.reason} 
                          onValueChange={value => handleItemReasonChange(item.id, value)}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {returnReasons.map(r => (
                              <SelectItem key={r} value={r}>
                                {r}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleRemoveProduct(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      لم تتم إضافة أصناف بعد
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between">
            <span className="font-medium">المجموع قبل الضريبة:</span>
            <span>{subtotal.toLocaleString()} ريال</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium">الضريبة:</span>
            <div className="flex items-center gap-2">
              <Input 
                type="number" 
                value={tax} 
                onChange={e => setTax(parseFloat(e.target.value) || 0)} 
                className="w-20" 
              />
              <span>%</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>الإجمالي:</span>
            <span>{totalAmount.toLocaleString()} ريال</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>إلغاء</Button>
          <Button onClick={handleCreateReturn}>إنشاء مرتجع</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewPurchaseReturnDialog;
