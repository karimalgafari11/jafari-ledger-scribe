
import React from "react";
import { Invoice } from "@/types/invoices";
import { Badge } from "@/components/ui/badge";

interface InvoiceSummaryProps {
  invoice: Invoice;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ invoice }) => {
  // حساب المجموع الفرعي (مجموع الأصناف قبل الخصم والضريبة)
  const subtotal = invoice.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // حساب الضريبة الإجمالية
  const totalTax = invoice.items.reduce((sum, item) => {
    const itemSubtotal = item.price * item.quantity;
    const itemDiscount = item.discountType === 'percentage' 
      ? itemSubtotal * (item.discount / 100) 
      : item.discount;
    const taxableAmount = itemSubtotal - itemDiscount;
    return sum + (taxableAmount * (item.tax / 100));
  }, 0);
  
  // حساب الخصم على الفاتورة
  const invoiceDiscount = invoice.discount 
    ? (invoice.discountType === 'percentage' ? subtotal * (invoice.discount / 100) : invoice.discount)
    : 0;
  
  // حساب الإجمالي
  const total = invoice.totalAmount || (subtotal - invoiceDiscount + totalTax);

  return (
    <div className="space-y-3">
      <h4 className="font-bold text-lg">ملخص الفاتورة</h4>
      
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="text-muted-foreground">المجموع الفرعي</div>
        <div className="text-left">{subtotal.toFixed(2)} ر.س</div>
        
        {invoice.discount > 0 && (
          <>
            <div className="text-muted-foreground">
              الخصم {invoice.discountType === 'percentage' && `(${invoice.discount}%)`}
            </div>
            <div className="text-left text-red-500">- {invoiceDiscount.toFixed(2)} ر.س</div>
          </>
        )}
        
        <div className="text-muted-foreground">ضريبة القيمة المضافة</div>
        <div className="text-left">{totalTax.toFixed(2)} ر.س</div>
        
        <div className="font-bold">الإجمالي</div>
        <div className="text-left font-bold">{total.toFixed(2)} ر.س</div>
      </div>
      
      {invoice.status && (
        <div className="pt-2">
          <Badge className={`${
            invoice.status === 'paid' ? 'bg-green-500' : 
            invoice.status === 'overdue' ? 'bg-red-500' : 
            invoice.status === 'pending' ? 'bg-orange-500' : 
            'bg-gray-500'
          }`}>
            {invoice.status === 'paid' ? 'مدفوعة' : 
             invoice.status === 'overdue' ? 'متأخرة' : 
             invoice.status === 'pending' ? 'قيد الانتظار' : 
             'مسودة'}
          </Badge>
        </div>
      )}
    </div>
  );
};
