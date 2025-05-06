
import React, { useState } from "react";
import { Customer } from "@/types/customers";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/utils/formatters";
import { toast } from "sonner";

interface SchedulePaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export const SchedulePaymentDialog: React.FC<SchedulePaymentDialogProps> = ({
  isOpen,
  onClose,
  customer
}) => {
  const [installments, setInstallments] = useState<number>(3);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().substring(0, 10)
  );
  const [period, setPeriod] = useState<number>(30);
  const [notes, setNotes] = useState<string>("");

  if (!customer) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (installments <= 0) {
      toast.error("يرجى إدخال عدد أقساط صحيح");
      return;
    }
    
    // محاكاة جدولة الدفعات
    toast.success(`تمت جدولة سداد المبلغ ${formatCurrency(customer.balance)} على ${installments} قسط للعميل ${customer.name}`);
    
    // إعادة تعيين الحقول وإغلاق النافذة
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setInstallments(3);
    setStartDate(new Date().toISOString().substring(0, 10));
    setPeriod(30);
    setNotes("");
  };

  const calculateInstallmentAmount = () => {
    return customer.balance / installments;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">جدولة سداد المديونية</DialogTitle>
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
              <Label htmlFor="installments">عدد الأقساط:</Label>
              <Input
                id="installments"
                type="number"
                min="1"
                value={installments}
                onChange={(e) => setInstallments(parseInt(e.target.value) || 1)}
                required
              />
            </div>

            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="installment-amount">قيمة القسط:</Label>
              <div className="font-medium">{formatCurrency(calculateInstallmentAmount())}</div>
            </div>
            
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="start-date">تاريخ أول قسط:</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="period">الفترة بين الأقساط (أيام):</Label>
              <Input
                id="period"
                type="number"
                min="1"
                value={period}
                onChange={(e) => setPeriod(parseInt(e.target.value) || 1)}
                required
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
              تأكيد الجدولة
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
