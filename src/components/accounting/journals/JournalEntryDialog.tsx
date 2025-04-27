
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JournalEntry, JournalEntryLine, JournalStatus } from "@/types/journal";
import { Plus, Trash2, Save, Check, X, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

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

  // Reset form when dialog opens/closes
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

  // Set form data when editing
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

  // Calculate totals when lines change
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
      createdBy: "المستخدم الحالي" // In a real app, this would come from the authentication system
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

  const renderDialogContent = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="entryNumber">رقم القيد</Label>
          <Input
            id="entryNumber"
            value={entryNumber}
            onChange={(e) => setEntryNumber(e.target.value)}
            disabled={!isCreateDialogOpen || !isCurrentlyEditable}
          />
        </div>
        
        <div>
          <Label htmlFor="entryDate">تاريخ القيد</Label>
          <Input
            id="entryDate"
            type="date"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            disabled={!isCurrentlyEditable}
          />
        </div>
        
        <div>
          <Label htmlFor="status">الحالة</Label>
          <Input
            id="status"
            value={status === 'draft' ? 'مسودة' : status === 'approved' ? 'معتمد' : 'ملغي'}
            disabled
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">الوصف العام</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={!isCurrentlyEditable}
          placeholder="أدخل وصفاً عاماً للقيد"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-medium">تفاصيل القيد</h3>
          {isCurrentlyEditable && (
            <Button type="button" onClick={addLine} size="sm" variant="outline">
              <Plus className="h-4 w-4 ml-1" /> إضافة سطر
            </Button>
          )}
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 w-10">#</th>
                <th className="px-2 py-3 text-right text-xs font-medium text-gray-500">الحساب</th>
                <th className="px-2 py-3 text-right text-xs font-medium text-gray-500">الوصف</th>
                <th className="px-2 py-3 text-right text-xs font-medium text-gray-500">مدين</th>
                <th className="px-2 py-3 text-right text-xs font-medium text-gray-500">دائن</th>
                {isCurrentlyEditable && (
                  <th className="px-2 py-3 text-center text-xs font-medium text-gray-500 w-10"></th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lines.map((line, index) => (
                <tr key={index}>
                  <td className="px-2 py-3 text-right text-sm text-gray-500 align-top pt-4">{index + 1}</td>
                  <td className="px-2 py-2">
                    <div className="grid gap-2">
                      {isCurrentlyEditable ? (
                        <>
                          <select
                            className="w-full p-2 border rounded-md text-sm"
                            value={line.accountId}
                            onChange={(e) => {
                              const selectedIndex = e.target.selectedIndex;
                              const accountName = selectedIndex > 0 ? e.target.options[selectedIndex].text : "";
                              handleLineChange(index, "accountId", e.target.value);
                              handleLineChange(index, "accountName", accountName);
                            }}
                          >
                            <option value="">اختر الحساب</option>
                            <option value="101">الصندوق</option>
                            <option value="102">البنك</option>
                            <option value="126">معدات مكتبية</option>
                            <option value="131">مدينون / عملاء</option>
                            <option value="411">إيرادات المبيعات</option>
                            <option value="511">مصاريف الرواتب</option>
                            <option value="521">مصاريف كهرباء</option>
                            <option value="522">مصاريف مياه</option>
                            <option value="531">مصاريف الإيجار</option>
                          </select>
                        </>
                      ) : (
                        <div className="p-2 text-sm">
                          {line.accountId} - {line.accountName}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-2 py-2">
                    <Input
                      value={line.description}
                      onChange={(e) => handleLineChange(index, "description", e.target.value)}
                      placeholder="وصف السطر"
                      disabled={!isCurrentlyEditable}
                      className="text-sm"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={line.debit}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        handleLineChange(index, "debit", value);
                        if (value > 0) {
                          handleLineChange(index, "credit", 0);
                        }
                      }}
                      disabled={!isCurrentlyEditable}
                      className="text-sm"
                    />
                  </td>
                  <td className="px-2 py-2">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={line.credit}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value) || 0;
                        handleLineChange(index, "credit", value);
                        if (value > 0) {
                          handleLineChange(index, "debit", 0);
                        }
                      }}
                      disabled={!isCurrentlyEditable}
                      className="text-sm"
                    />
                  </td>
                  {isCurrentlyEditable && (
                    <td className="px-2 py-2 text-center">
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => removeLine(index)}
                        disabled={lines.length === 1}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={3} className="px-4 py-3 text-left text-sm font-medium">
                  المجموع
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium">
                  {totalDebit.toLocaleString('ar-SA')}
                </td>
                <td className="px-4 py-3 text-right text-sm font-medium">
                  {totalCredit.toLocaleString('ar-SA')}
                </td>
                {isCurrentlyEditable && <td></td>}
              </tr>
              <tr>
                <td colSpan={5} className="px-4 py-3 text-left text-sm">
                  {isBalanced ? (
                    <span className="text-green-600">القيد متوازن</span>
                  ) : (
                    <span className="text-red-600">القيد غير متوازن ({Math.abs(totalDebit - totalCredit).toLocaleString('ar-SA')})</span>
                  )}
                </td>
                {isCurrentlyEditable && <td></td>}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDialogButtons = () => {
    if (isViewDialogOpen) {
      return (
        <Button onClick={() => setIsViewDialogOpen(false)}>
          إغلاق
        </Button>
      );
    }
    
    if (isCurrentlyEditable) {
      return (
        <>
          {isCreateDialogOpen && (
            <>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                <X className="ml-1 h-4 w-4" /> إلغاء
              </Button>
              <Button variant="secondary" onClick={() => handleSave("draft")}>
                <Save className="ml-1 h-4 w-4" /> حفظ كمسودة
              </Button>
              <Button onClick={() => handleSave("approved")}>
                <Check className="ml-1 h-4 w-4" /> اعتماد القيد
              </Button>
            </>
          )}
          {isEditDialogOpen && (
            <>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                <X className="ml-1 h-4 w-4" /> إلغاء
              </Button>
              <Button variant="secondary" onClick={() => handleSave(status)}>
                <Save className="ml-1 h-4 w-4" /> حفظ التعديلات
              </Button>
              <Button onClick={() => handleSave("approved")}>
                <Check className="ml-1 h-4 w-4" /> اعتماد القيد
              </Button>
            </>
          )}
        </>
      );
    }
    
    return null;
  };

  return (
    <>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>إنشاء قيد محاسبي جديد</DialogTitle>
          </DialogHeader>
          {renderDialogContent()}
          <DialogFooter className="gap-2 flex-wrap">
            {renderDialogButtons()}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>تعديل القيد المحاسبي</DialogTitle>
          </DialogHeader>
          {renderDialogContent()}
          <DialogFooter className="gap-2 flex-wrap">
            {renderDialogButtons()}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>عرض تفاصيل القيد المحاسبي</DialogTitle>
          </DialogHeader>
          {renderDialogContent()}
          <DialogFooter className="gap-2 flex-wrap">
            {renderDialogButtons()}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
