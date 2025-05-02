
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
    <div className="space-y-1 bg-gray-50 p-1 border border-gray-300 rounded-sm">
      <div className="grid grid-cols-2 gap-1">
        <div className="space-y-0.5">
          <div className="text-xs flex justify-between items-center">
            <span>المجموع الفرعي:</span>
            <span className="font-semibold">{subtotal.toFixed(2)}</span>
          </div>
          
          {showDiscount && (
            <div className="text-xs flex justify-between items-center">
              <div className="flex items-center space-x-1 rtl space-x-reverse">
                <span>الخصم:</span>
                {!isDiscountFormOpen && (
                  <Button 
                    variant="ghost" 
                    size="xs"
                    onClick={() => setIsDiscountFormOpen(true)}
                    className="h-4 w-4 p-0"
                  >
                    <Pencil size={8} />
                  </Button>
                )}
              </div>
              {isDiscountFormOpen ? (
                <div className="w-32">
                  <InvoiceDiscountForm 
                    onApply={handleApplyDiscount}
                    onCancel={() => setIsDiscountFormOpen(false)}
                    currentDiscount={invoice.discount || 0}
                    currentType={invoice.discountType || 'percentage'}
                  />
                </div>
              ) : (
                <span className="font-semibold">
                  {hasDiscount ? (
                    <>
                      {discountAmount.toFixed(2)}
                      {invoice.discountType === 'percentage' && ` (${invoice.discount}%)`}
                    </>
                  ) : (
                    "0.00"
                  )}
                </span>
              )}
            </div>
          )}
          
          {showTax && (
            <div className="text-xs flex justify-between items-center">
              <span>ضريبة القيمة المضافة (15%):</span>
              <span className="font-semibold">{taxAmount.toFixed(2)}</span>
            </div>
          )}
          
          <div className="text-xs border-t pt-0.5 flex justify-between items-center">
            <span className="font-bold">المجموع الكلي:</span>
            <span className="font-bold">{invoice.totalAmount.toFixed(2)}</span>
          </div>
        </div>
      
        <div className="space-y-0.5">
          <div>
            <label htmlFor="amountPaid" className="block text-xs font-medium mb-0.5">المبلغ المدفوع:</label>
            <Input
              id="amountPaid"
              type="number"
              min="0"
              step="0.01"
              value={invoice.amountPaid || 0}
              onChange={(e) => onAmountPaidChange(parseFloat(e.target.value) || 0)}
              className="h-5 text-xs"
            />
          </div>
          <div>
            <label htmlFor="remaining" className="block text-xs font-medium mb-0.5">المتبقي:</label>
            <Input
              id="remaining"
              value={calculateRemaining()}
              readOnly
              className="bg-gray-100 h-5 text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
