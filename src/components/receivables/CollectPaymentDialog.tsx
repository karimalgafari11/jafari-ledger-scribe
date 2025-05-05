
import React, { useState } from "react";
import { Customer } from "@/types/customers";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/utils/formatters";
import { toast } from "sonner";

interface CollectPaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export const CollectPaymentDialog: React.FC<CollectPaymentDialogProps> = ({
  isOpen,
  onClose,
  customer
}) => {
  const [amount, setAmount] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [reference, setReference] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  if (!customer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const paymentAmount = parseFloat(amount);
    
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      toast.error("يرجى إدخال مبلغ صحيح");
      return;
    }
    
    if (paymentAmount > customer.balance) {
      toast.error("المبلغ المدخل أكبر من الرصيد المستحق");
      return;
    }
    
    // محاكاة تسجيل دفعة
    toast.success(`تم تسجيل دفعة بقيمة ${formatCurrency(paymentAmount)} من العميل ${customer.name}`);
    
    // إعادة تعيين الحقول وإغلاق النافذة
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setAmount("");
    setPaymentMethod("cash");
    setReference("");
    setNotes("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">تحصيل دفعة من العميل</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="text-sm font-medium">اسم العميل:</div>
              <div>{customer.name}</div>
            </div>
            
            <div className="grid grid-cols-2 items-center gap-4">
              <div className="text-sm font-medium">الرصيد المستحق:</div>
              <div className="font-medium text-red-600">{formatCurrency(customer.balance)}</div>
            </div>
            
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="amount">مبلغ الدفعة:</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="أدخل مبلغ الدفعة"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="payment-method">طريقة الدفع:</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="اختر طريقة الدفع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">نقدي</SelectItem>
                  <SelectItem value="bank">تحويل بنكي</SelectItem>
                  <SelectItem value="check">شيك</SelectItem>
                  <SelectItem value="card">بطاقة ائتمان</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="reference">رقم المرجع:</Label>
              <Input
                id="reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                placeholder="رقم الشيك / التحويل / إيصال"
              />
            </div>
            
            <div className="grid grid-cols-2 items-start gap-4">
              <Label htmlFor="notes" className="mt-2">ملاحظات:</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="أدخل أي ملاحظات إضافية هنا"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit">
              تأكيد التحصيل
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
