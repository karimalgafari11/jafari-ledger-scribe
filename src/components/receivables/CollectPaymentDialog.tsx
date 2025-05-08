
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
import { Checkbox } from "@/components/ui/checkbox";
import { useAccountingRules } from "@/hooks/useAccountingRules";

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
  const [selectedInvoice, setSelectedInvoice] = useState<string>("");
  const [createJournalEntry, setCreateJournalEntry] = useState<boolean>(true);
  const { createAutomaticJournalEntry } = useAccountingRules();

  // Sample invoice data - in a real app, this would be fetched from an API
  const customerInvoices = [
    { id: "inv-001", number: "INV-2024-001", amount: 1500, dueDate: "2024-05-15" },
    { id: "inv-002", number: "INV-2024-002", amount: 2850, dueDate: "2024-05-20" },
    { id: "inv-003", number: "INV-2024-003", amount: 950, dueDate: "2024-06-01" },
  ];

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
    
    // إنشاء قيد محاسبي تلقائي إذا كان الخيار مفعل
    if (createJournalEntry) {
      try {
        const journalEntry = createAutomaticJournalEntry('payment_receipt', {
          amount: paymentAmount,
          customerName: customer.name,
          paymentMethod,
          reference: reference || `RCPT-${Date.now().toString().slice(-6)}`,
          invoiceNumber: selectedInvoice ? customerInvoices.find(inv => inv.id === selectedInvoice)?.number : undefined
        });
        
        if (journalEntry) {
          toast.success("تم إنشاء القيد المحاسبي بنجاح");
        }
      } catch (error) {
        toast.error("حدث خطأ أثناء إنشاء القيد المحاسبي");
        console.error("Journal entry creation error:", error);
      }
    }
    
    // إعادة تعيين الحقول وإغلاق النافذة
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setAmount("");
    setPaymentMethod("cash");
    setReference("");
    setNotes("");
    setSelectedInvoice("");
    setCreateJournalEntry(true);
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
              <Label htmlFor="invoice">الفاتورة:</Label>
              <Select value={selectedInvoice} onValueChange={setSelectedInvoice}>
                <SelectTrigger id="invoice">
                  <SelectValue placeholder="اختر فاتورة مستحقة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">جميع المستحقات</SelectItem>
                  {customerInvoices.map(invoice => (
                    <SelectItem key={invoice.id} value={invoice.id}>
                      {invoice.number} - {formatCurrency(invoice.amount)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Checkbox 
                id="createJournalEntry" 
                checked={createJournalEntry}
                onCheckedChange={(checked) => setCreateJournalEntry(checked as boolean)}
              />
              <Label htmlFor="createJournalEntry" className="cursor-pointer">
                إنشاء قيد محاسبي تلقائي
              </Label>
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
