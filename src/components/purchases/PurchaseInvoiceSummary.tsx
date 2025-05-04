
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
}

export const PurchaseInvoiceSummary: React.FC<PurchaseInvoiceSummaryProps> = ({
  subtotal,
  discount = 0,
  discountType = 'percentage',
  tax = 0,
  expenses = 0,
  totalAmount,
  amountPaid = 0,
  remaining,
  onApplyDiscount,
  onApplyExpenses,
  onAmountPaidChange
}) => {
  const [discountValue, setDiscountValue] = useState<number>(discount);
  const [discountMode, setDiscountMode] = useState<'percentage' | 'fixed'>(discountType);
  const [expensesValue, setExpensesValue] = useState<number>(expenses);
  const [paidAmount, setPaidAmount] = useState<number>(amountPaid);

  const handleDiscountApply = () => {
    onApplyDiscount(discountMode, discountValue);
  };

  const handleExpensesApply = () => {
    onApplyExpenses(expensesValue);
  };

  const handleAmountPaidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    setPaidAmount(newValue);
    onAmountPaidChange(newValue);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-md border space-y-3">
      <h3 className="font-semibold text-lg mb-2">ملخص الفاتورة</h3>

      <div className="grid grid-cols-2 gap-2">
        <div className="text-gray-600">المجموع قبل الخصم:</div>
        <div className="text-right font-medium">{subtotal.toFixed(2)} ريال</div>
      </div>

      <div className="border-t border-gray-200 pt-2">
        <div className="grid grid-cols-2 gap-2 items-center mb-2">
          <div className="text-gray-600">
            <div className="flex items-center gap-2">
              <span>الخصم:</span>
              <Button 
                type="button" 
                size="sm" 
                variant="ghost" 
                className="text-xs h-6 px-1"
                onClick={() => setDiscountMode(discountMode === 'percentage' ? 'fixed' : 'percentage')}
              >
                {discountMode === 'percentage' ? '%' : 'ريال'}
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <Input 
              type="number" 
              min="0" 
              value={discountValue}
              onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
              className="h-8 text-sm"
            />
            <Button 
              size="sm" 
              className="h-8 text-xs" 
              onClick={handleDiscountApply}
            >
              تطبيق
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 items-center mb-2">
          <div className="text-gray-600">مصاريف الشراء:</div>
          <div className="flex gap-2">
            <Input 
              type="number" 
              min="0" 
              value={expensesValue}
              onChange={(e) => setExpensesValue(parseFloat(e.target.value) || 0)}
              className="h-8 text-sm"
            />
            <Button 
              size="sm" 
              className="h-8 text-xs" 
              onClick={handleExpensesApply}
            >
              تطبيق
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-2">
        <div className="grid grid-cols-2 gap-2">
          <div className="text-gray-600 font-semibold">الإجمالي:</div>
          <div className="text-right font-bold text-lg">{totalAmount.toFixed(2)} ريال</div>
        </div>

        <div className="grid grid-cols-2 gap-2 items-center mt-2">
          <div className="text-gray-600">المبلغ المدفوع:</div>
          <Input 
            type="number" 
            min="0" 
            max={totalAmount}
            value={paidAmount}
            onChange={handleAmountPaidChange}
            className="h-8 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-2 bg-gray-100 p-2 rounded">
          <div className="text-gray-600 font-semibold">المبلغ المتبقي:</div>
          <div className="text-right font-bold text-red-600">{remaining.toFixed(2)} ريال</div>
        </div>
      </div>
    </div>
  );
};
