
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Transaction } from "@/types/transactions";
import { useAccounts } from "@/hooks/useAccounts";
import { toast } from "sonner";
import { LedgerAccount } from "@/hooks/useLedgerEntries";

interface LedgerTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'add' | 'edit' | 'view';
  transaction: Transaction | null;
  accountId: string | null;
}

export const LedgerTransactionDialog: React.FC<LedgerTransactionDialogProps> = ({
  open,
  onOpenChange,
  mode,
  transaction,
  accountId
}) => {
  // Get mock accounts
  const { accounts: allAccounts } = useAccounts();
  
  const [form, setForm] = useState({
    date: '',
    reference: '',
    description: '',
    type: 'payment',
    debit: 0,
    credit: 0,
    linkedAccount: ''
  });

  useEffect(() => {
    if (transaction && (mode === 'edit' || mode === 'view')) {
      setForm({
        date: transaction.date.toISOString().split('T')[0],
        reference: transaction.reference,
        description: transaction.description,
        type: transaction.type,
        debit: transaction.debit,
        credit: transaction.credit,
        linkedAccount: '' // In a real app, this would be loaded from the transaction
      });
    } else {
      // Reset form for add mode
      setForm({
        date: new Date().toISOString().split('T')[0],
        reference: `REF-${Date.now()}`,
        description: '',
        type: 'payment',
        debit: 0,
        credit: 0,
        linkedAccount: ''
      });
    }
  }, [transaction, mode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (name: string, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setForm(prev => ({ ...prev, [name]: numValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!form.description) {
      toast.error("الرجاء إدخال وصف للعملية");
      return;
    }
    
    if (form.debit === 0 && form.credit === 0) {
      toast.error("يجب إدخال قيمة في حقل مدين أو دائن");
      return;
    }

    if (form.debit > 0 && form.credit > 0) {
      toast.error("لا يمكن إدخال قيمة في حقل مدين و دائن معاً");
      return;
    }

    // In a real app, this would save the transaction to the database
    toast.success("تم حفظ العملية بنجاح");
    onOpenChange(false);
  };

  const getDialogTitle = () => {
    switch (mode) {
      case 'add': return 'إضافة عملية جديدة';
      case 'edit': return 'تعديل العملية';
      case 'view': return 'عرض تفاصيل العملية';
      default: return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>
            {mode === 'add' && 'إضافة عملية مالية جديدة للحساب'}
            {mode === 'edit' && 'تعديل تفاصيل العملية المالية'}
            {mode === 'view' && 'عرض تفاصيل العملية المالية'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">التاريخ</Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  readOnly={mode === 'view'}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="reference">المرجع</Label>
                <Input
                  id="reference"
                  name="reference"
                  value={form.reference}
                  onChange={handleChange}
                  readOnly={mode === 'view'}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">البيان</Label>
              <Input
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                readOnly={mode === 'view'}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">نوع العملية</Label>
              <Select
                value={form.type}
                onValueChange={(value) => handleSelectChange('type', value)}
                disabled={mode === 'view'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع العملية" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invoice">فاتورة</SelectItem>
                  <SelectItem value="payment">دفعة</SelectItem>
                  <SelectItem value="return">مرتجع</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="debit">مدين</Label>
                <Input
                  id="debit"
                  name="debit"
                  type="number"
                  min="0"
                  value={form.debit || ''}
                  onChange={(e) => handleNumberChange('debit', e.target.value)}
                  readOnly={mode === 'view'}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="credit">دائن</Label>
                <Input
                  id="credit"
                  name="credit"
                  type="number"
                  min="0"
                  value={form.credit || ''}
                  onChange={(e) => handleNumberChange('credit', e.target.value)}
                  readOnly={mode === 'view'}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedAccount">الحساب المقابل</Label>
              <Select
                value={form.linkedAccount}
                onValueChange={(value) => handleSelectChange('linkedAccount', value)}
                disabled={mode === 'view'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر الحساب المقابل" />
                </SelectTrigger>
                <SelectContent>
                  {allAccounts.filteredAccounts.map(account => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.number} - {account.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            {mode !== 'view' && (
              <Button type="submit">
                {mode === 'add' ? 'إضافة' : 'حفظ التغييرات'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
