
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/utils/formatters";

interface PurchaseOrderSummaryProps {
  subtotal: number;
  discount?: number;
  discountType?: 'percentage' | 'fixed';
  tax?: number;
  totalAmount: number;
  onApplyDiscount: (discount: number, discountType: 'percentage' | 'fixed') => void;
  onApplyTax: (tax: number) => void;
}

export const PurchaseOrderSummary: React.FC<PurchaseOrderSummaryProps> = ({
  subtotal,
  discount = 0,
  discountType = 'percentage',
  tax = 0,
  totalAmount,
  onApplyDiscount,
  onApplyTax
}) => {
  const [discountValue, setDiscountValue] = useState<string>(discount.toString());
  const [discountTypeValue, setDiscountTypeValue] = useState<'percentage' | 'fixed'>(discountType);
  const [taxValue, setTaxValue] = useState<string>(tax.toString());
  
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDiscountValue(value);
    onApplyDiscount(parseFloat(value) || 0, discountTypeValue);
  };
  
  const handleDiscountTypeChange = (value: 'percentage' | 'fixed') => {
    setDiscountTypeValue(value);
    onApplyDiscount(parseFloat(discountValue) || 0, value);
  };
  
  const handleTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTaxValue(value);
    onApplyTax(parseFloat(value) || 0);
  };
  
  // Calculate discount amount for display purposes
  const discountAmount = discountTypeValue === 'percentage' 
    ? subtotal * (parseFloat(discountValue) / 100)
    : parseFloat(discountValue);
  
  // Calculate tax amount for display purposes
  const taxAmount = (subtotal - discountAmount) * (parseFloat(taxValue) / 100);
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discount">الخصم</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="discount"
                    type="number"
                    value={discountValue}
                    onChange={handleDiscountChange}
                    min="0"
                    step="0.01"
                  />
                  <Select 
                    value={discountTypeValue} 
                    onValueChange={handleDiscountTypeChange}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">%</SelectItem>
                      <SelectItem value="fixed">ر.س</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="tax">الضريبة (%)</Label>
                <Input
                  id="tax"
                  type="number"
                  value={taxValue}
                  onChange={handleTaxChange}
                  className="mt-1"
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4 bg-muted p-4 rounded-md">
            <div className="flex justify-between">
              <span>المجموع:</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            
            <div className="flex justify-between text-muted-foreground">
              <span>الخصم:</span>
              <span>- {formatCurrency(discountAmount)}</span>
            </div>
            
            <div className="flex justify-between text-muted-foreground">
              <span>الضريبة ({taxValue}%):</span>
              <span>+ {formatCurrency(taxAmount)}</span>
            </div>
            
            <div className="border-t pt-2 mt-2 flex justify-between font-semibold text-lg">
              <span>الإجمالي:</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
