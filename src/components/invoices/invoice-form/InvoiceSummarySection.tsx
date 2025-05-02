
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import { Invoice } from "@/types/invoices";
import { InvoiceDiscountForm } from "@/components/invoices/InvoiceDiscountForm";

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
  showDiscount,
  showTax
}) => {
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  const discountAmount = invoice.discountType === 'percentage' 
    ? subtotal * (invoice.discount || 0) / 100 
    : (invoice.discount || 0);
  const taxAmount = showTax ? (subtotal - discountAmount) * 0.15 : 0;
  
  const hasDiscount = invoice.discount && invoice.discount > 0;

  return (
    <div className="space-y-3">
      <Card className="border-none shadow-none">
        <CardContent className="p-2 space-y-2">
          <div className="text-sm flex justify-between items-center">
            <span>المجموع الفرعي:</span>
            <span className="font-bold">{subtotal.toFixed(2)} ر.س</span>
          </div>
          
          {showDiscount && (
            <div className="text-sm flex justify-between items-center">
              <div className="flex items-center space-x-2 rtl space-x-reverse">
                <span>الخصم:</span>
                {!isDiscountFormOpen && (
                  <Button 
                    variant="ghost" 
                    size="xs"
                    onClick={() => setIsDiscountFormOpen(true)}
                    className="h-5 w-5 p-0"
                  >
                    <Pencil size={10} />
                  </Button>
                )}
              </div>
              {isDiscountFormOpen ? (
                <div className="w-40">
                  <InvoiceDiscountForm 
                    onApply={handleApplyDiscount}
                    onCancel={() => setIsDiscountFormOpen(false)}
                    currentDiscount={invoice.discount || 0}
                    currentType={invoice.discountType || 'percentage'}
                  />
                </div>
              ) : (
                <span className="font-bold">
                  {hasDiscount ? (
                    <>
                      {discountAmount.toFixed(2)} ر.س
                      {invoice.discountType === 'percentage' && ` (${invoice.discount}%)`}
                    </>
                  ) : (
                    "0.00 ر.س"
                  )}
                </span>
              )}
            </div>
          )}
          
          {showTax && (
            <div className="text-sm flex justify-between items-center">
              <span>ضريبة القيمة المضافة (15%):</span>
              <span className="font-bold">{taxAmount.toFixed(2)} ر.س</span>
            </div>
          )}
          
          <div className="text-md border-t pt-1 flex justify-between items-center">
            <span className="font-bold">المجموع الكلي:</span>
            <span className="font-bold">{invoice.totalAmount.toFixed(2)} ر.س</span>
          </div>
          
          <div className="text-sm grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="amountPaid" className="block text-xs font-medium mb-0.5">المبلغ المدفوع:</label>
              <Input
                id="amountPaid"
                type="number"
                min="0"
                step="0.01"
                value={invoice.amountPaid || 0}
                onChange={(e) => onAmountPaidChange(parseFloat(e.target.value) || 0)}
                className="h-7 text-sm"
              />
            </div>
            <div>
              <label htmlFor="remaining" className="block text-xs font-medium mb-0.5">المتبقي:</label>
              <Input
                id="remaining"
                value={calculateRemaining()}
                readOnly
                className="bg-muted h-7 text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
