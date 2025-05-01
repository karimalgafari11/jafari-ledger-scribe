
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { InvoiceItemForm } from "./InvoiceItemForm";
import { InvoiceDiscountForm } from "./InvoiceDiscountForm";
import { InvoiceSummary } from "./InvoiceSummary";
import { Invoice, InvoiceItem } from "@/types/invoices";
import { Trash2, Plus, Pencil, Calculator } from "lucide-react";
import { mockCustomers } from "@/data/mockCustomers";
import { mockProducts } from "@/data/mockProducts";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

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

  return (
    <div className="space-y-6">
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
            <label htmlFor="dueDate" className="block text-sm font-medium mb-1">تاريخ الاستحقاق</label>
            <Input
              id="dueDate"
              type="date"
              value={invoice.dueDate ? format(new Date(invoice.dueDate), 'yyyy-MM-dd') : ''}
              onChange={(e) => onFieldChange('dueDate', e.target.value)}
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

        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>الصنف</TableHead>
                <TableHead>الوصف</TableHead>
                <TableHead>الكمية</TableHead>
                <TableHead>السعر</TableHead>
                <TableHead>الخصم</TableHead>
                <TableHead>الضريبة</TableHead>
                <TableHead>الإجمالي</TableHead>
                <TableHead className="text-left">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4 text-muted-foreground">
                    لا توجد أصناف في الفاتورة. قم بإضافة صنف باستخدام زر "إضافة صنف".
                  </TableCell>
                </TableRow>
              ) : (
                invoice.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description || '-'}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price.toFixed(2)} ر.س</TableCell>
                    <TableCell>
                      {item.discount > 0 && (
                        <Badge variant="outline">
                          {item.discountType === 'percentage' ? `${item.discount}%` : `${item.discount} ر.س`}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {item.tax > 0 && (
                        <Badge variant="outline">
                          {item.tax}%
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{item.total.toFixed(2)} ر.س</TableCell>
                    <TableCell>
                      <div className="flex space-x-2 rtl">
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
    </div>
  );
};
