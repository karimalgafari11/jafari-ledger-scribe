import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { JournalEntry, JournalEntryLine, JournalStatus } from "@/types/journal";
import { Save, Check, X } from "lucide-react";
import { toast } from "sonner";
import { JournalEntryForm } from "./entry-form/JournalEntryForm";

interface JournalEntryDialogProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  isViewDialogOpen: boolean;
  setIsViewDialogOpen: (open: boolean) => void;
  selectedEntry: JournalEntry | null;
  onCreateSubmit: (data: Omit<JournalEntry, "id" | "createdAt" | "updatedAt">) => void;
  onEditSubmit: (data: Partial<JournalEntry>) => void;
  generateEntryNumber: () => string;
  viewOnly?: boolean;
}

export const JournalEntryDialog: React.FC<JournalEntryDialogProps> = ({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isViewDialogOpen,
  setIsViewDialogOpen,
  selectedEntry,
  onCreateSubmit,
  onEditSubmit,
  generateEntryNumber,
  viewOnly = false,
}) => {
  const [entryNumber, setEntryNumber] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [description, setDescription] = useState("");
  const [lines, setLines] = useState<Omit<JournalEntryLine, "id">[]>([]);
  const [status, setStatus] = useState<JournalStatus>("draft");
  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);
  const [isBalanced, setIsBalanced] = useState(true);

  useEffect(() => {
    if (isCreateDialogOpen) {
      setEntryNumber(generateEntryNumber());
      setEntryDate(new Date().toISOString().split('T')[0]);
      setDescription("");
      setLines([{ accountId: "", accountName: "", description: "", debit: 0, credit: 0 }]);
      setStatus("draft");
      setTotalDebit(0);
      setTotalCredit(0);
      setIsBalanced(true);
    }
  }, [isCreateDialogOpen, generateEntryNumber]);

  useEffect(() => {
    if ((isEditDialogOpen || isViewDialogOpen) && selectedEntry) {
      setEntryNumber(selectedEntry.entryNumber);
      setEntryDate(selectedEntry.date);
      setDescription(selectedEntry.description);
      setLines(selectedEntry.lines.map(line => ({
        accountId: line.accountId,
        accountName: line.accountName,
        description: line.description,
        debit: line.debit,
        credit: line.credit
      })));
      setStatus(selectedEntry.status);
      setTotalDebit(selectedEntry.totalDebit);
      setTotalCredit(selectedEntry.totalCredit);
      setIsBalanced(selectedEntry.totalDebit === selectedEntry.totalCredit);
    }
  }, [isEditDialogOpen, isViewDialogOpen, selectedEntry]);

  useEffect(() => {
    const debitTotal = lines.reduce((sum, line) => sum + (line.debit || 0), 0);
    const creditTotal = lines.reduce((sum, line) => sum + (line.credit || 0), 0);
    
    setTotalDebit(debitTotal);
    setTotalCredit(creditTotal);
    setIsBalanced(debitTotal === creditTotal);
  }, [lines]);

  const handleLineChange = (index: number, field: keyof Omit<JournalEntryLine, "id">, value: string | number) => {
    const newLines = [...lines];
    newLines[index] = {
      ...newLines[index],
      [field]: value
    };
    setLines(newLines);
  };

  const addLine = () => {
    setLines([...lines, { accountId: "", accountName: "", description: "", debit: 0, credit: 0 }]);
  };

  const removeLine = (index: number) => {
    if (lines.length > 1) {
      setLines(lines.filter((_, i) => i !== index));
    }
  };

  const handleSave = (saveAs: JournalStatus = "draft") => {
    if (!entryNumber || !entryDate || !description) {
      toast.error("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    if (!isBalanced) {
      toast.error("مجموع المدين يجب أن يساوي مجموع الدائن");
      return;
    }

    const invalidLines = lines.filter(
      line => !line.accountId || !line.accountName || (line.debit === 0 && line.credit === 0)
    );

    if (invalidLines.length > 0) {
      toast.error("يرجى إكمال جميع بيانات سطور القيد");
      return;
    }

    const entryData = {
      entryNumber,
      date: entryDate,
      description,
      lines: lines.map(line => ({ ...line, id: uuidv4() })),
      totalDebit,
      totalCredit,
      status: saveAs,
      createdBy: "المستخدم الحالي"
    };

    if (isCreateDialogOpen) {
      onCreateSubmit(entryData);
      setIsCreateDialogOpen(false);
    } else if (isEditDialogOpen && selectedEntry) {
      onEditSubmit({ ...entryData, id: selectedEntry.id });
      setIsEditDialogOpen(false);
    }
  };

  const isCurrentlyEditable = (isCreateDialogOpen || isEditDialogOpen) && !viewOnly;

  return (
    <>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>إنشاء قيد محاسبي جديد</DialogTitle>
          </DialogHeader>
          <JournalEntryForm
            entryNumber={entryNumber}
            entryDate={entryDate}
            description={description}
            status={status}
            lines={lines}
            totalDebit={totalDebit}
            totalCredit={totalCredit}
            isBalanced={isBalanced}
            isEditable={isCurrentlyEditable}
            isCreateMode={true}
            onEntryNumberChange={setEntryNumber}
            onEntryDateChange={setEntryDate}
            onDescriptionChange={setDescription}
            onLineChange={handleLineChange}
            onAddLine={addLine}
            onRemoveLine={removeLine}
          />
          <DialogFooter className="gap-2 flex-wrap">
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              <X className="ml-1 h-4 w-4" /> إلغاء
            </Button>
            <Button variant="secondary" onClick={() => handleSave("draft")}>
              <Save className="ml-1 h-4 w-4" /> حفظ كمسودة
            </Button>
            <Button onClick={() => handleSave("approved")}>
              <Check className="ml-1 h-4 w-4" /> اعتماد القيد
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>تعديل القيد المحاسبي</DialogTitle>
          </DialogHeader>
          <JournalEntryForm
            entryNumber={entryNumber}
            entryDate={entryDate}
            description={description}
            status={status}
            lines={lines}
            totalDebit={totalDebit}
            totalCredit={totalCredit}
            isBalanced={isBalanced}
            isEditable={isCurrentlyEditable}
            isCreateMode={false}
            onEntryNumberChange={setEntryNumber}
            onEntryDateChange={setEntryDate}
            onDescriptionChange={setDescription}
            onLineChange={handleLineChange}
            onAddLine={addLine}
            onRemoveLine={removeLine}
          />
          <DialogFooter className="gap-2 flex-wrap">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              <X className="ml-1 h-4 w-4" /> إلغاء
            </Button>
            <Button variant="secondary" onClick={() => handleSave(status)}>
              <Save className="ml-1 h-4 w-4" /> حفظ التعديلات
            </Button>
            <Button onClick={() => handleSave("approved")}>
              <Check className="ml-1 h-4 w-4" /> اعتماد القيد
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>عرض تفاصيل القيد المحاسبي</DialogTitle>
          </DialogHeader>
          <JournalEntryForm
            entryNumber={entryNumber}
            entryDate={entryDate}
            description={description}
            status={status}
            lines={lines}
            totalDebit={totalDebit}
            totalCredit={totalCredit}
            isBalanced={isBalanced}
            isEditable={false}
            isCreateMode={false}
            onEntryNumberChange={setEntryNumber}
            onEntryDateChange={setEntryDate}
            onDescriptionChange={setDescription}
            onLineChange={handleLineChange}
            onAddLine={addLine}
            onRemoveLine={removeLine}
          />
          <DialogFooter className="gap-2 flex-wrap">
            <Button onClick={() => setIsViewDialogOpen(false)}>
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
