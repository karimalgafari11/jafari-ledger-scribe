
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatCurrency } from "@/utils/formatters";
import { toast } from "sonner";

interface MakePaymentDialogProps {
  vendor: any;
  open: boolean;
  onClose: () => void;
}

export const MakePaymentDialog: React.FC<MakePaymentDialogProps> = ({
  vendor,
  open,
  onClose
}) => {
  const [paymentAmount, setPaymentAmount] = useState(vendor?.balance || 0);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().substring(0, 10));
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!vendor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentAmount || paymentAmount <= 0) {
      toast.error("يرجى إدخال مبلغ صحيح للسداد");
      return;
    }
    
    if (paymentAmount > vendor.balance) {
      toast.error("مبلغ السداد أكبر من المستحق");
      return;
    }
    
    if (!paymentMethod) {
      toast.error("يرجى اختيار طريقة السداد");
      return;
    }
    
    setIsSubmitting(true);
    
    // محاكاة عملية السداد
    setTimeout(() => {
      toast.success(`تم تسجيل سداد مبلغ ${formatCurrency(paymentAmount)} بنجاح`);
      setIsSubmitting(false);
      onClose();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="max-w-md rtl">
        <DialogHeader>
          <DialogTitle>سداد مستحقات</DialogTitle>
          <DialogDescription>
            سداد مستحقات للمورد: {vendor.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-2">
            <div className="border rounded-lg p-3 bg-gray-50">
              <div className="text-sm text-gray-500 mb-1">إجمالي المستحق</div>
              <div className="text-lg font-bold text-purple-600">{formatCurrency(vendor.balance)}</div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="paymentAmount">مبلغ السداد</Label>
              <Input
                id="paymentAmount"
                type="number"
                step="0.01"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(parseFloat(e.target.value))}
                max={vendor.balance}
                required
                className="text-left"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentDate">تاريخ السداد</Label>
              <Input
                id="paymentDate"
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">طريقة السداد</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر طريقة السداد" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">نقدي</SelectItem>
                  <SelectItem value="bank">تحويل بنكي</SelectItem>
                  <SelectItem value="check">شيك</SelectItem>
                  <SelectItem value="credit">بطاقة ائتمانية</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentReference">رقم المرجع</Label>
              <Input
                id="paymentReference"
                type="text"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                placeholder="رقم الشيك / التحويل / المرجع"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات</Label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="ملاحظات إضافية (اختياري)"
              />
            </div>
          </div>

          <DialogFooter className="mt-4 sm:justify-between flex-row-reverse">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "جاري المعالجة..." : "تأكيد السداد"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              إلغاء
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
