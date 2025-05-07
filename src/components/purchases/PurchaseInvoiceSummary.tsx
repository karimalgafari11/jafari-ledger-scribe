
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DiscountForm } from "./forms/DiscountForm";

interface PurchaseInvoiceSummaryProps {
  subtotal: number;
  discount?: number;
  discountType?: 'percentage' | 'fixed';
  tax?: number;
  expenses?: number;
  totalAmount: number;
  amountPaid?: number;
  remaining: number;
  onApplyDiscount: (type: 'percentage' | 'fixed', value: number) => void;
  onApplyExpenses: (value: number) => void;
  onAmountPaidChange: (amount: number) => void;
  showDiscount?: boolean;
  showTax?: boolean;
}

export const PurchaseInvoiceSummary: React.FC<PurchaseInvoiceSummaryProps> = ({
  subtotal,
  discount,
  discountType,
  tax,
  expenses,
  totalAmount,
  amountPaid = 0,
  remaining,
  onApplyDiscount,
  onApplyExpenses,
  onAmountPaidChange,
  showDiscount = true,
  showTax = true
}) => {
  const [showDiscountForm, setShowDiscountForm] = useState(false);
  const [showTaxForm, setShowTaxForm] = useState(false);
  
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rtl">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-2">ملخص الفاتورة</h3>
            
            <div className="flex justify-between items-center">
              <span className="text-base">المجموع الفرعي:</span>
              <span className="text-base">{subtotal.toFixed(2)} ر.س</span>
            </div>
            
            {showDiscount && (
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-base">الخصم:</span>
                  <Button 
                    variant="link" 
                    className="h-auto p-0 pr-2" 
                    onClick={() => setShowDiscountForm(prev => !prev)}
                  >
                    (تعديل)
                  </Button>
                </div>
                <span className="text-base">
                  {discount ? (
                    discountType === 'percentage'
                      ? `${discount}% (${((subtotal * discount) / 100).toFixed(2)} ر.س)`
                      : `${discount.toFixed(2)} ر.س`
                  ) : '0.00 ر.س'}
                </span>
              </div>
            )}
            
            {showDiscountForm && (
              <DiscountForm 
                onApply={onApplyDiscount}
                onCancel={() => setShowDiscountForm(false)}
                currentDiscount={discount}
                currentType={discountType}
              />
            )}
            
            {showTax && (
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-base">ضريبة القيمة المضافة (15%):</span>
                </div>
                <span className="text-base">{tax ? tax.toFixed(2) : '0.00'} ر.س</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-base">مصاريف إضافية:</span>
                <Button 
                  variant="link" 
                  className="h-auto p-0 pr-2" 
                  onClick={() => setShowTaxForm(prev => !prev)}
                >
                  (تعديل)
                </Button>
              </div>
              <span className="text-base">{expenses ? expenses.toFixed(2) : '0.00'} ر.س</span>
            </div>
            
            {showTaxForm && (
              <div className="flex gap-2 items-center">
                <Input
                  type="number"
                  placeholder="قيمة المصاريف"
                  value={expenses || ''}
                  onChange={(e) => onApplyExpenses(parseFloat(e.target.value) || 0)}
                  className="text-base"
                />
                <Button 
                  size="sm" 
                  onClick={() => setShowTaxForm(false)}
                >
                  موافق
                </Button>
              </div>
            )}
            
            <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
              <span>الإجمالي:</span>
              <span>{totalAmount.toFixed(2)} ر.س</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-2">تفاصيل الدفع</h3>
            
            <div>
              <Label htmlFor="amountPaid" className="text-base">المبلغ المدفوع</Label>
              <Input
                id="amountPaid"
                type="number"
                value={amountPaid || ''}
                onChange={(e) => onAmountPaidChange(parseFloat(e.target.value) || 0)}
                className="text-base"
              />
            </div>
            
            <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
              <span>المتبقي:</span>
              <span>{remaining.toFixed(2)} ر.س</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-base">الحالة:</span>
              <span className={`text-base font-semibold ${
                remaining <= 0 ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {remaining <= 0 ? 'مدفوعة بالكامل' : 'معلقة'}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

