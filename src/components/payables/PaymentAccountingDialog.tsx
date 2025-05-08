
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { JournalEntry, JournalStatus } from "@/types/journal";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, FileUp, FileDown } from "lucide-react";

interface PaymentAccountingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  paymentId: string | null;
}

export const PaymentAccountingDialog: React.FC<PaymentAccountingDialogProps> = ({
  isOpen,
  onClose,
  paymentId
}) => {
  const [journalEntry, setJournalEntry] = useState<JournalEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (paymentId && isOpen) {
      fetchJournalEntry(paymentId);
    }
  }, [paymentId, isOpen]);

  const fetchJournalEntry = async (id: string) => {
    setIsLoading(true);
    
    // This would be an API call in a real application
    try {
      // محاكاة استدعاء API لجلب القيد المرتبط بالدفعة
      setTimeout(() => {
        // قيد محاسبي وهمي للتوضيح
        const mockEntry: JournalEntry = {
          id: `je-${Math.random().toString(36).substring(2, 9)}`,
          number: `JE-${Math.floor(Math.random() * 10000)}`,
          entryNumber: `JE-${Math.floor(Math.random() * 10000)}`,
          date: new Date().toISOString().split('T')[0],
          description: "دفع مستحقات للمورد",
          lines: [
            {
              id: `line1-${Math.random().toString(36).substring(2, 9)}`,
              accountId: "231",
              accountName: "دائنون / موردين",
              description: "دفع مستحقات للمورد",
              debit: 5000,
              credit: 0
            },
            {
              id: `line2-${Math.random().toString(36).substring(2, 9)}`,
              accountId: "101",
              accountName: "الصندوق",
              description: "دفع مستحقات للمورد",
              debit: 0,
              credit: 5000
            }
          ],
          totalDebit: 5000,
          totalCredit: 5000,
          status: JournalStatus.Approved,
          createdBy: "النظام",
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        setJournalEntry(mockEntry);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      toast.error("حدث خطأ أثناء جلب بيانات القيد المحاسبي");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] rtl">
        <DialogHeader>
          <DialogTitle className="text-xl">القيد المحاسبي المرتبط بالدفعة</DialogTitle>
        </DialogHeader>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>جاري تحميل بيانات القيد المحاسبي...</p>
            </div>
          </div>
        ) : journalEntry ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">رقم القيد:</p>
                <p>{journalEntry.entryNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">التاريخ:</p>
                <p>{journalEntry.date}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm font-medium text-muted-foreground">البيان:</p>
                <p>{journalEntry.description}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">الحالة:</p>
                <Badge variant={journalEntry.status === JournalStatus.Approved ? 'success' : 'default'}>
                  {journalEntry.status === JournalStatus.Approved ? 'معتمد' : 'مسودة'}
                </Badge>
              </div>
            </div>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الحساب</TableHead>
                  <TableHead>البيان</TableHead>
                  <TableHead className="text-center"><div className="flex items-center justify-center"><FileDown className="h-4 w-4 mr-2" />مدين</div></TableHead>
                  <TableHead className="text-center"><div className="flex items-center justify-center"><FileUp className="h-4 w-4 mr-2" />دائن</div></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {journalEntry.lines.map((line) => (
                  <TableRow key={line.id}>
                    <TableCell>{line.accountName}</TableCell>
                    <TableCell>{line.description}</TableCell>
                    <TableCell className="text-center">{line.debit > 0 ? line.debit.toLocaleString() : '-'}</TableCell>
                    <TableCell className="text-center">{line.credit > 0 ? line.credit.toLocaleString() : '-'}</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/30">
                  <TableCell colSpan={2} className="font-bold">الإجمالي</TableCell>
                  <TableCell className="text-center font-bold">{journalEntry.totalDebit.toLocaleString()}</TableCell>
                  <TableCell className="text-center font-bold">{journalEntry.totalCredit.toLocaleString()}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="py-8 text-center">
            <p>لا يوجد قيد محاسبي مرتبط بهذه الدفعة</p>
          </div>
        )}
        
        <DialogFooter>
          <Button onClick={onClose}>إغلاق</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
