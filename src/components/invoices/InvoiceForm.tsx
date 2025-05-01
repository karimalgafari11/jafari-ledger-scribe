
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { InvoiceItemForm } from "./InvoiceItemForm";
import { InvoiceDiscountForm } from "./InvoiceDiscountForm";
import { InvoiceSummary } from "./InvoiceSummary";
import { Invoice, InvoiceItem } from "@/types/invoices";
import { Trash2, Plus, Pencil, Calculator, Share, Printer } from "lucide-react";
import { mockCustomers } from "@/data/mockCustomers";
import { mockProducts } from "@/data/mockProducts";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface InvoiceFormProps {
  invoice: Invoice;
  onFieldChange: (field: string, value: any) => void;
  onAddItem: (item: Partial<InvoiceItem>) => void;
  onUpdateItem: (index: number, item: Partial<InvoiceItem>) => void;
  onRemoveItem: (index: number) => void;
  onApplyDiscount: (type: 'percentage' | 'fixed', value: number) => void;
  isLoading: boolean;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  invoice,
  onFieldChange,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onApplyDiscount,
  isLoading
}) => {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [isDiscountFormOpen, setIsDiscountFormOpen] = useState(false);
  const [tableWidth, setTableWidth] = useState(100); // Default width in percent
  const tableRef = useRef<HTMLDivElement>(null);
  const isResizing = useRef(false);
  const startWidth = useRef<number>(0);
  const startX = useRef<number>(0);

  const handleAddItem = (item: Partial<InvoiceItem>) => {
    onAddItem(item);
    setIsAddingItem(false);
  };

  const handleUpdateItem = (item: Partial<InvoiceItem>) => {
    if (editingItemIndex !== null) {
      onUpdateItem(editingItemIndex, item);
      setEditingItemIndex(null);
    }
  };

  const handleEditItem = (index: number) => {
    setEditingItemIndex(index);
  };

  const handleCancelEdit = () => {
    setEditingItemIndex(null);
  };

  const handleApplyDiscount = (type: 'percentage' | 'fixed', value: number) => {
    onApplyDiscount(type, value);
    setIsDiscountFormOpen(false);
  };

  // Start table resize
  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    isResizing.current = true;
    startWidth.current = tableRef.current?.offsetWidth || 0;
    startX.current = e.clientX;
    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  // Handle table resize move
  const handleResizeMove = (e: MouseEvent) => {
    if (!isResizing.current) return;
    const parentWidth = tableRef.current?.parentElement?.offsetWidth || 1;
    const delta = e.clientX - startX.current;
    const newWidth = Math.max(50, Math.min(100, (startWidth.current + delta) / parentWidth * 100));
    setTableWidth(newWidth);
  };

  // End table resize
  const handleResizeEnd = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  // Handle share button click
  const handleShare = () => {
    // Check if Web Share API is supported
    if (navigator.share) {
      navigator.share({
        title: `فاتورة رقم ${invoice.invoiceNumber}`,
        text: `تفاصيل فاتورة مبيعات رقم ${invoice.invoiceNumber} للعميل ${invoice.customerName}`,
      }).catch(err => {
        toast.error("حدث خطأ أثناء مشاركة الفاتورة");
      });
    } else {
      // Fallback for browsers that don't support the Web Share API
      toast.info("مشاركة الفاتورة غير متاحة على هذا المتصفح");
    }
  };

  // Handle print button click
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:p-4">
      {/* معلومات العميل والفاتورة */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="invoiceNumber" className="block text-sm font-medium mb-1">رقم الفاتورة</label>
            <Input
              id="invoiceNumber"
              value={invoice.invoiceNumber}
              readOnly
              className="bg-muted"
            />
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium mb-1">تاريخ الفاتورة</label>
            <Input
              id="date"
              type="date"
              value={invoice.date ? format(new Date(invoice.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')}
              onChange={(e) => onFieldChange('date', e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium mb-1">طريقة الدفع</label>
            <RadioGroup 
              defaultValue={invoice.paymentMethod || "cash"} 
              className="flex space-x-4 rtl space-x-reverse"
              onValueChange={(value) => onFieldChange('paymentMethod', value)}
            >
              <div className="flex items-center space-x-2 rtl space-x-reverse">
                <RadioGroupItem value="cash" id="payment-cash" />
                <Label htmlFor="payment-cash">نقد</Label>
              </div>
              <div className="flex items-center space-x-2 rtl space-x-reverse">
                <RadioGroupItem value="credit" id="payment-credit" />
                <Label htmlFor="payment-credit">آجل</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium mb-1">تاريخ الاستحقاق</label>
            <Input
              id="dueDate"
              type="date"
              value={invoice.dueDate ? format(new Date(invoice.dueDate), 'yyyy-MM-dd') : ''}
              onChange={(e) => onFieldChange('dueDate', e.target.value)}
              disabled={invoice.paymentMethod === 'cash'}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="customer" className="block text-sm font-medium mb-1">العميل</label>
            <Select
              value={invoice.customerId || ""}
              onValueChange={(value) => {
                const customer = mockCustomers.find(c => c.id === value);
                onFieldChange('customerId', value);
                if (customer) {
                  onFieldChange('customerName', customer.name);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر العميل" />
              </SelectTrigger>
              <SelectContent>
                {mockCustomers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="paymentTerms" className="block text-sm font-medium mb-1">شروط الدفع</label>
            <Select
              value={invoice.paymentTerms || ""}
              onValueChange={(value) => onFieldChange('paymentTerms', value)}
              disabled={invoice.paymentMethod === 'cash'}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر شروط الدفع" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">دفع فوري</SelectItem>
                <SelectItem value="15days">خلال 15 يوم</SelectItem>
                <SelectItem value="30days">خلال 30 يوم</SelectItem>
                <SelectItem value="60days">خلال 60 يوم</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">حالة الفاتورة</label>
            <Select
              value={invoice.status || "draft"}
              onValueChange={(value) => onFieldChange('status', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الحالة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">مسودة</SelectItem>
                <SelectItem value="pending">قيد الانتظار</SelectItem>
                <SelectItem value="paid">مدفوعة</SelectItem>
                <SelectItem value="overdue">متأخرة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2 rtl space-x-reverse">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handleShare}
            >
              <Share className="ml-2 h-4 w-4" />
              مشاركة
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handlePrint}
            >
              <Printer className="ml-2 h-4 w-4" />
              طباعة
            </Button>
          </div>
        </div>
      </div>

      {/* أصناف الفاتورة */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">الأصناف</h3>
          <Button 
            onClick={() => setIsAddingItem(true)} 
            variant="outline" 
            disabled={isAddingItem || editingItemIndex !== null}
          >
            <Plus className="ml-2 h-4 w-4" />
            إضافة صنف
          </Button>
        </div>
        
        {isAddingItem && (
          <Card className="mb-4 border border-primary/20">
            <CardContent className="p-4">
              <h4 className="text-md font-bold mb-2">إضافة صنف جديد</h4>
              <InvoiceItemForm 
                onSubmit={handleAddItem}
                onCancel={() => setIsAddingItem(false)}
              />
            </CardContent>
          </Card>
        )}

        {editingItemIndex !== null && (
          <Card className="mb-4 border border-primary/20">
            <CardContent className="p-4">
              <h4 className="text-md font-bold mb-2">تعديل الصنف</h4>
              <InvoiceItemForm 
                item={invoice.items[editingItemIndex]}
                onSubmit={handleUpdateItem}
                onCancel={handleCancelEdit}
              />
            </CardContent>
          </Card>
        )}

        <div 
          ref={tableRef} 
          className="border rounded-md overflow-x-auto relative" 
          style={{ width: `${tableWidth}%` }}
        >
          {/* Resize handle */}
          <div 
            className="absolute top-0 bottom-0 right-0 w-2 cursor-ew-resize bg-primary/10 hover:bg-primary/20 transition-colors"
            onMouseDown={handleResizeStart}
          />
          
          <Table className="w-full">
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="w-12 border-r">#</TableHead>
                <TableHead className="border-r">الصنف</TableHead>
                <TableHead className="border-r">الوصف</TableHead>
                <TableHead className="border-r">الكمية</TableHead>
                <TableHead className="border-r">السعر</TableHead>
                <TableHead className="border-r">الخصم</TableHead>
                <TableHead className="border-r">الضريبة</TableHead>
                <TableHead className="border-r">الإجمالي</TableHead>
                <TableHead className="text-left border-r">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4 text-muted-foreground border">
                    لا توجد أصناف في الفاتورة. قم بإضافة صنف باستخدام زر "إضافة صنف".
                  </TableCell>
                </TableRow>
              ) : (
                invoice.items.map((item, index) => (
                  <TableRow key={index} className="border-b">
                    <TableCell className="border-r">{index + 1}</TableCell>
                    <TableCell className="border-r">{item.name}</TableCell>
                    <TableCell className="border-r">{item.description || '-'}</TableCell>
                    <TableCell className="border-r">{item.quantity}</TableCell>
                    <TableCell className="border-r">{item.price.toFixed(2)} ر.س</TableCell>
                    <TableCell className="border-r">
                      {item.discount > 0 && (
                        <Badge variant="outline">
                          {item.discountType === 'percentage' ? `${item.discount}%` : `${item.discount} ر.س`}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="border-r">
                      {item.tax > 0 && (
                        <Badge variant="outline">
                          {item.tax}%
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="border-r">{item.total.toFixed(2)} ر.س</TableCell>
                    <TableCell className="border-r">
                      <div className="flex space-x-2 rtl space-x-reverse">
                        <Button variant="ghost" size="sm" onClick={() => handleEditItem(index)}>
                          <Pencil size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onRemoveItem(index)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <div className="text-xs text-muted-foreground mt-2">* اسحب من الجانب الأيمن لتغيير حجم الجدول</div>
      </div>

      {/* ملخص الفاتورة والخصومات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="space-y-4">
          <label htmlFor="notes" className="block text-sm font-medium mb-1">ملاحظات</label>
          <Textarea
            id="notes"
            placeholder="أدخل أي ملاحظات إضافية هنا..."
            value={invoice.notes || ""}
            onChange={(e) => onFieldChange('notes', e.target.value)}
            className="min-h-[120px]"
          />
          
          <div>
            <label htmlFor="paymentInstructions" className="block text-sm font-medium mb-1">تعليمات الدفع</label>
            <Textarea
              id="paymentInstructions"
              placeholder="أدخل تعليمات الدفع هنا..."
              value={invoice.paymentInstructions || ""}
              onChange={(e) => onFieldChange('paymentInstructions', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <InvoiceSummary invoice={invoice} />
            
            <div className="mt-4 flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => setIsDiscountFormOpen(true)}
              >
                <Calculator className="ml-2 h-4 w-4" />
                إضافة خصم على الفاتورة
              </Button>
            </div>
          </div>

          {isDiscountFormOpen && (
            <Card>
              <CardContent className="p-4">
                <h4 className="text-md font-bold mb-2">إضافة خصم</h4>
                <InvoiceDiscountForm 
                  onApply={handleApplyDiscount} 
                  onCancel={() => setIsDiscountFormOpen(false)}
                  currentDiscount={{
                    type: invoice.discountType || 'percentage',
                    value: invoice.discount || 0
                  }}
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Print-only styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-section, .print-section * {
            visibility: visible;
          }
          .print-hide {
            display: none !important;
          }
          .print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
