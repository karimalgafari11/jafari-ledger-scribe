
import React from "react";
import { Invoice } from "@/types/invoices";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InvoiceDiscountForm } from "@/components/invoices/InvoiceDiscountForm";
import { InvoiceSummary } from "@/components/invoices/InvoiceSummary";

interface InvoiceSummarySectionProps {
  invoice: Invoice;
  isDiscountFormOpen: boolean;
  calculateRemaining: () => string;
  setIsDiscountFormOpen: (value: boolean) => void;
  onAmountPaidChange: (amount: number) => void;
  handleApplyDiscount: (type: 'percentage' | 'fixed', value: number) => void;
  showDiscount?: boolean;
  showTax?: boolean;
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
  return (
    <Card>
      <CardContent className="p-6 py-0">
        {isDiscountFormOpen ? (
          <InvoiceDiscountForm
            currentDiscount={invoice.discount || 0}
            currentType={invoice.discountType || 'percentage'}
            onApply={handleApplyDiscount}
            onCancel={() => setIsDiscountFormOpen(false)}
          />
        ) : (
          <div className="space-y-4">
            <InvoiceSummary invoice={invoice} showDiscount={showDiscount} showTax={showTax} />
            
            {showDiscount && (
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDiscountFormOpen(true)} 
                  className="w-full"
                >
                  {invoice.discount ? "تعديل الخصم" : "إضافة خصم"}
                </Button>
              </div>
            )}
            
            {invoice.paymentMethod === 'cash' && (
              <div className="space-y-2 pt-2 border-t border-gray-200">
                <div>
                  <label htmlFor="amount-paid" className="block text-sm font-medium mb-1">المبلغ المدفوع</label>
                  <Input
                    id="amount-paid"
                    type="number"
                    value={invoice.amountPaid || 0}
                    onChange={(e) => onAmountPaidChange(parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="flex justify-between items-center font-bold">
                  <span>المتبقي</span>
                  <span>{calculateRemaining()} ر.س</span>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
