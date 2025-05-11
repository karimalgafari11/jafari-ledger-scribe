
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Transaction } from "@/types/transactions";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useLedgerEntries } from "@/hooks/useLedgerEntries";
import { LedgerAccount } from "@/hooks/useLedgerEntries";

interface LedgerTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'add' | 'edit' | 'view';
  transaction?: Transaction | null;
  accountId?: string | null;
}

export const LedgerTransactionDialog: React.FC<LedgerTransactionDialogProps> = ({
  open,
  onOpenChange,
  mode,
  transaction,
  accountId
}) => {
  const { addTransaction, updateTransaction, deleteTransaction, getAllAccounts } = useLedgerEntries();
  
  const [transactionData, setTransactionData] = useState<Partial<Transaction>>({
    date: new Date(),
    type: 'payment',
    reference: '',
    description: '',
    debit: 0,
    credit: 0,
  });
  
  const [date, setDate] = useState<Date | undefined>(new Date());
  const accounts = getAllAccounts();
  
  // Reset form when dialog opens or transaction changes
  useEffect(() => {
    if (transaction && (mode === 'edit' || mode === 'view')) {
      setTransactionData({
        ...transaction
      });
      setDate(transaction.date);
    } else {
      setTransactionData({
        date: new Date(),
        type: 'payment',
        reference: `REF-${Date.now().toString().substring(6)}`,
        description: '',
        debit: 0,
        credit: 0,
      });
      setDate(new Date());
    }
  }, [transaction, mode, open]);

  const handleInputChange = (field: string, value: any) => {
    setTransactionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      handleInputChange('date', selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (mode === 'add') {
      await addTransaction(transactionData);
    } else if (mode === 'edit' && transaction?.id) {
      await updateTransaction(transaction.id, transactionData);
    }
    onOpenChange(false);
  };

  const handleDelete = async () => {
    if (transaction?.id) {
      await deleteTransaction(transaction.id);
      onOpenChange(false);
    }
  };
  
  // Filter accounts as needed
  const filteredAccounts = accounts;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'إضافة حركة جديدة' : 
             mode === 'edit' ? 'تعديل الحركة' : 'تفاصيل الحركة'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="basic">معلومات أساسية</TabsTrigger>
              <TabsTrigger value="additional">معلومات إضافية</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              {/* Date Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  التاريخ
                </Label>
                <div className="col-span-3">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-right font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "اختر تاريخ"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Type Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  نوع الحركة
                </Label>
                <Select 
                  value={transactionData.type} 
                  onValueChange={(value) => handleInputChange('type', value)}
                  disabled={mode === 'view'}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر نوع الحركة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payment">دفعة</SelectItem>
                    <SelectItem value="invoice">فاتورة</SelectItem>
                    <SelectItem value="return">مرتجع</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Reference Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="reference" className="text-right">
                  المرجع
                </Label>
                <Input
                  id="reference"
                  value={transactionData.reference}
                  onChange={(e) => handleInputChange('reference', e.target.value)}
                  className="col-span-3"
                  disabled={mode === 'view'}
                />
              </div>
              
              {/* Description Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  البيان
                </Label>
                <Input
                  id="description"
                  value={transactionData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="col-span-3"
                  disabled={mode === 'view'}
                />
              </div>
              
              {/* Amount Fields */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="debit" className="text-right">
                  مدين
                </Label>
                <Input
                  id="debit"
                  type="number"
                  value={transactionData.debit}
                  onChange={(e) => handleInputChange('debit', parseFloat(e.target.value))}
                  className="col-span-3"
                  disabled={mode === 'view' || Number(transactionData.credit) > 0}
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="credit" className="text-right">
                  دائن
                </Label>
                <Input
                  id="credit"
                  type="number"
                  value={transactionData.credit}
                  onChange={(e) => handleInputChange('credit', parseFloat(e.target.value))}
                  className="col-span-3"
                  disabled={mode === 'view' || Number(transactionData.debit) > 0}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="additional" className="space-y-4">
              {/* Accounts Field */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="account" className="text-right">
                  الحساب المقابل
                </Label>
                <Select 
                  value={accountId || undefined} 
                  disabled={mode === 'view'}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="اختر الحساب" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredAccounts.map((account: LedgerAccount) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {/* Additional Fields can be added here */}
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex justify-between">
          {mode === 'view' ? (
            <Button onClick={() => onOpenChange(false)}>إغلاق</Button>
          ) : (
            <>
              {mode === 'edit' && (
                <Button 
                  variant="destructive" 
                  onClick={handleDelete}
                >
                  حذف
                </Button>
              )}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                >
                  إلغاء
                </Button>
                <Button 
                  onClick={handleSubmit}
                >
                  {mode === 'add' ? 'إضافة' : 'حفظ التغييرات'}
                </Button>
              </div>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
