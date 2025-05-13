
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Invoice } from "@/types/invoices";
import { formatCurrency } from "@/utils/formatters";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { InvoiceDiscountForm } from "./InvoiceDiscountForm";

interface InvoiceSummaryProps {
  invoice: Invoice;
  isDiscountFormOpen: boolean;
  calculateRemaining: () => number;
  setIsDiscountFormOpen: (isOpen: boolean) => void;
  onAmountPaidChange: (value: number) => void;
  handleApplyDiscount: (type: 'percentage' | 'fixed', value: number) => void;
  showDiscount?: boolean;
  showTax?: boolean;
}

export const InvoiceSummarySection: React.FC<InvoiceSummaryProps> = ({
  invoice,
  isDiscountFormOpen,
  calculateRemaining,
  setIsDiscountFormOpen,
  onAmountPaidChange,
  handleApplyDiscount,
  showDiscount = true,
  showTax = true,
}) => {
  // للتأكد من أن لدينا بيانات صالحة للفاتورة
  const subtotal = invoice?.subtotal || 0;
  const discount = invoice?.discount || 0;
  const discountType = invoice?.discountType || 'fixed';
  const tax = invoice?.tax || 0;
  const totalAmount = invoice?.totalAmount || 0;
  const amountPaid = invoice?.amountPaid || 0;
  const remaining = calculateRemaining();

  // تسجيل بيانات الفاتورة للتأكد من أنها تعمل بشكل صحيح
  console.info("Invoice data in summary:", {
    items: invoice.items?.length || 0,
    subtotal,
    totalTax: tax,
    discountAmount: discount,
    totalAmount
  });

  return (
    <Card className="print-section mt-4">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* العمود الأول - المجاميع الفرعية */}
          <div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي:</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              
              {showDiscount && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">الخصم:</span>
                  <div className="flex items-center">
                    <span className="font-medium ml-2">
                      {discountType === 'percentage' ? `${discount}%` : formatCurrency(discount)}
                    </span>
                    <Popover open={isDiscountFormOpen} onOpenChange={setIsDiscountFormOpen}>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs px-2 print-hide"
                        >
                          تعديل
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <InvoiceDiscountForm 
                          onApply={handleApplyDiscount}
                          currentDiscount={discount}
                          currentType={discountType}
                          onClose={() => setIsDiscountFormOpen(false)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
              
              {showTax && (
                <div className="flex justify-between">
                  <span className="text-gray-600">الضريبة:</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>
              )}
              
              <div className="flex justify-between border-t pt-2">
                <span className="font-semibold">الإجمالي:</span>
                <span className="font-bold text-lg">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>
          
          {/* العمود الثاني - المدفوع والمتبقي */}
          <div className="md:border-r md:border-l md:px-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="amountPaid">المبلغ المدفوع</Label>
                <Input
                  id="amountPaid"
                  type="number"
                  min="0"
                  step="0.01"
                  value={amountPaid}
                  onChange={(e) => onAmountPaidChange(parseFloat(e.target.value) || 0)}
                  className="text-left"
                />
              </div>
              
              <div className="flex justify-between pt-2">
                <span className="font-semibold">المتبقي:</span>
                <span className={`font-bold ${remaining > 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {formatCurrency(remaining)}
                </span>
              </div>
            </div>
          </div>
          
          {/* العمود الثالث - معلومات الدفع */}
          <div>
            <div className="border rounded p-3 bg-gray-50">
              <h3 className="font-semibold mb-2">معلومات الدفع</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>طريقة الدفع:</span>
                  <span className="font-medium">
                    {invoice.paymentMethod === 'cash' ? 'نقدي' : 'آجل'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>حالة الدفع:</span>
                  <span className={`font-medium ${remaining <= 0 ? 'text-green-600' : 'text-amber-600'}`}>
                    {remaining <= 0 ? 'مدفوعة بالكامل' : 'غير مكتملة'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
