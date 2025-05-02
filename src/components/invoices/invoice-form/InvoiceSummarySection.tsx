
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { InvoiceSummary } from "@/components/invoices/InvoiceSummary";
import { InvoiceDiscountForm } from "@/components/invoices/InvoiceDiscountForm";
import { Invoice } from "@/types/invoices";
import { Calculator } from "lucide-react";

interface InvoiceSummarySectionProps {
  invoice: Invoice;
  isDiscountFormOpen: boolean;
  calculateRemaining: () => string;
  setIsDiscountFormOpen: (isOpen: boolean) => void;
  onAmountPaidChange: (amount: number) => void;
  handleApplyDiscount: (type: 'percentage' | 'fixed', value: number) => void;
}

export const InvoiceSummarySection: React.FC<InvoiceSummarySectionProps> = ({
  invoice,
  isDiscountFormOpen,
  calculateRemaining,
  setIsDiscountFormOpen,
  onAmountPaidChange,
  handleApplyDiscount
}) => {
  return (
    <div className="space-y-4">
      <div className="border-2 border-black rounded-md p-4 space-y-4">
        <InvoiceSummary invoice={invoice} />
        
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="amountPaid" className="block text-sm font-medium mb-1">المدفوع</label>
            <Input
              id="amountPaid"
              type="number"
              value={invoice.amountPaid || ""}
              onChange={(e) => onAmountPaidChange(parseFloat(e.target.value) || 0)}
              placeholder="أدخل المبلغ المدفوع"
            />
          </div>
          <div>
            <label htmlFor="remaining" className="block text-sm font-medium mb-1">المتبقي</label>
            <Input
              id="remaining"
              value={calculateRemaining()}
              readOnly
              className="bg-muted"
            />
          </div>
        </div>

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
        <Card className="border-2 border-black">
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
  );
};
