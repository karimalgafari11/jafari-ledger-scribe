
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface JournalEntry {
  id?: string;
  reference: string;
  date: string;
  description: string;
  status: 'draft' | 'posted' | 'approved' | 'rejected';
  type: 'manual' | 'system' | 'recurring';
  lines: JournalEntryLine[];
  attachments?: string[];
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  metadata?: Record<string, any>;
}

export interface JournalEntryLine {
  id?: string;
  accountId: string;
  accountName?: string;
  description?: string;
  debit?: number;
  credit?: number;
  costCenterId?: string;
  costCenterName?: string;
}

export const useJournalEntryForm = () => {
  const { toast } = useToast();
  
  const [journalEntry, setJournalEntry] = useState<JournalEntry>({
    reference: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    status: 'draft',
    type: 'manual',
    lines: []
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const addLine = () => {
    setJournalEntry(prev => ({
      ...prev,
      lines: [...prev.lines, { 
        accountId: '', 
        debit: 0, 
        credit: 0 
      }]
    }));
  };
  
  const updateLine = (index: number, field: keyof JournalEntryLine, value: any) => {
    setJournalEntry(prev => {
      const newLines = [...prev.lines];
      newLines[index] = { ...newLines[index], [field]: value };
      return { ...prev, lines: newLines };
    });
  };
  
  const removeLine = (index: number) => {
    setJournalEntry(prev => {
      const newLines = [...prev.lines];
      newLines.splice(index, 1);
      return { ...prev, lines: newLines };
    });
  };
  
  const updateField = (field: keyof JournalEntry, value: any) => {
    setJournalEntry(prev => ({ ...prev, [field]: value }));
  };
  
  const validateEntry = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!journalEntry.reference) {
      newErrors.reference = 'الرجاء إدخال رقم مرجعي';
    }
    
    if (!journalEntry.date) {
      newErrors.date = 'الرجاء إدخال تاريخ';
    }
    
    if (!journalEntry.description) {
      newErrors.description = 'الرجاء إدخال وصف';
    }
    
    if (journalEntry.lines.length === 0) {
      newErrors.lines = 'الرجاء إضافة سطر واحد على الأقل';
    }
    
    // Check if entry is balanced
    const totalDebit = journalEntry.lines.reduce((sum, line) => sum + (line.debit || 0), 0);
    const totalCredit = journalEntry.lines.reduce((sum, line) => sum + (line.credit || 0), 0);
    
    if (Math.abs(totalDebit - totalCredit) > 0.01) {
      newErrors.balance = 'القيد غير متوازن';
    }
    
    // Check each line
    journalEntry.lines.forEach((line, index) => {
      if (!line.accountId) {
        newErrors[`line_${index}_account`] = 'الرجاء اختيار حساب';
      }
      
      if ((line.debit || 0) === 0 && (line.credit || 0) === 0) {
        newErrors[`line_${index}_amount`] = 'الرجاء إدخال مبلغ';
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const saveEntry = async (): Promise<boolean> => {
    if (!validateEntry()) {
      toast({
        title: "لا يمكن حفظ القيد",
        description: "الرجاء تصحيح الأخطاء المشار إليها",
        variant: "destructive"
      });
      return false;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "تم حفظ القيد بنجاح",
        description: "تم حفظ القيد برقم " + journalEntry.reference
      });
      
      return true;
    } catch (error) {
      console.error("Error saving journal entry:", error);
      toast({
        title: "فشل حفظ القيد",
        description: "حدث خطأ أثناء حفظ القيد",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const postEntry = async (): Promise<boolean> => {
    if (!validateEntry()) {
      toast({
        title: "لا يمكن ترحيل القيد",
        description: "الرجاء تصحيح الأخطاء المشار إليها",
        variant: "destructive"
      });
      return false;
    }
    
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setJournalEntry(prev => ({ ...prev, status: 'posted' }));
      
      toast({
        title: "تم ترحيل القيد بنجاح",
        description: "تم ترحيل القيد برقم " + journalEntry.reference
      });
      
      return true;
    } catch (error) {
      console.error("Error posting journal entry:", error);
      toast({
        title: "فشل ترحيل القيد",
        description: "حدث خطأ أثناء ترحيل القيد",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  const loadEntry = (entry: JournalEntry) => {
    setJournalEntry(entry);
    setErrors({});
  };
  
  return {
    journalEntry,
    isLoading,
    errors,
    addLine,
    updateLine,
    removeLine,
    updateField,
    saveEntry,
    postEntry,
    loadEntry
  };
};
