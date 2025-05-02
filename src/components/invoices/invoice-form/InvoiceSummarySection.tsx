
import React from "react";
import { Invoice } from "@/types/invoices";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, Plus } from "lucide-react";

interface InvoiceSummarySectionProps {
  invoice: Invoice;
  isDiscountFormOpen: boolean;
  calculateRemaining: () => string;
  setIsDiscountFormOpen: (isOpen: boolean) => void;
  onAmountPaidChange: (amount: number) => void;
  handleApplyDiscount: (type: 'percentage' | 'fixed', value: number) => void;
  showDiscount: boolean;
  showTax: boolean;
}

export const InvoiceSummarySection: React.FC<InvoiceSummarySectionProps> = ({
  invoice,
  isDiscountFormOpen,
  calculateRemaining,
  setIsDiscountFormOpen,
  onAmountPaidChange,
  handleApplyDiscount,
  showDiscount = true,
  showTax = true
}) => {
  // Calculate subtotal (sum of all item prices * quantities)
  const subtotal = invoice.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // Calculate total tax
  const totalTax = invoice.items.reduce((sum, item) => {
    const itemSubtotal = item.price * item.quantity;
    const taxAmount = itemSubtotal * (item.tax / 100);
    return sum + taxAmount;
  }, 0);

  // Calculate discount
  const discountAmount = invoice.discountType === 'percentage'
    ? (subtotal * (invoice.discount || 0) / 100)
    : (invoice.discount || 0);

  const hasDiscount = invoice.discount && invoice.discount > 0;

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="w-full md:col-span-1">
          <CardContent className="p-3">
            <h3 className="text-base font-bold mb-2">ملخص الفاتورة</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-base">المجموع الفرعي:</span>
                <span className="text-base font-semibold">{subtotal.toFixed(2)} ر.س</span>
              </div>
              
              {showDiscount && (
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-base">الخصم:</span>
                    {!isDiscountFormOpen && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setIsDiscountFormOpen(true)}
                        className="ml-1 h-6 p-1"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <span className="text-base font-semibold">
                    {hasDiscount 
                      ? `${discountAmount.toFixed(2)} ر.س ${invoice.discountType === 'percentage' ? `(${invoice.discount}%)` : ''}`
                      : "0.00 ر.س"}
                  </span>
                </div>
              )}
              
              {showTax && (
                <div className="flex justify-between items-center">
                  <span className="text-base">الضريبة (15%):</span>
                  <span className="text-base font-semibold">{totalTax.toFixed(2)} ر.س</span>
                </div>
              )}
              
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-lg font-bold">الإجمالي:</span>
                <span className="text-lg font-bold">{invoice.totalAmount.toFixed(2)} ر.س</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="w-full md:col-span-1">
          <CardContent className="p-3">
            <h3 className="text-base font-bold mb-2">الدفع</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="amountPaid" className="text-base">المبلغ المدفوع:</label>
                <Input
                  id="amountPaid"
                  type="number"
                  value={invoice.amountPaid || 0}
                  onChange={(e) => onAmountPaidChange(Number(e.target.value))}
                  className="w-40 h-9 text-base"
                />
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-base font-semibold">المبلغ المتبقي:</span>
                <span className="text-lg font-bold">{calculateRemaining()} ر.س</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-base">طريقة الدفع:</span>
                <span className="text-base font-semibold">
                  {invoice.paymentMethod === 'cash' ? 'نقداً' : 'آجل'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
