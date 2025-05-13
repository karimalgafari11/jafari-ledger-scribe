
import { useState } from 'react';
import { toast } from 'sonner';

export interface JournalEntryFormData {
  entryNumber: string;
  date: Date;
  description: string;
  lines: {
    account: string;
    debit: number;
    credit: number;
    description?: string;
  }[];
  status: 'draft' | 'posted' | 'approved' | 'voided';
}

export const useJournalEntryForm = () => {
  const [formData, setFormData] = useState<JournalEntryFormData>({
    entryNumber: '',
    date: new Date(),
    description: '',
    lines: [
      { account: '', debit: 0, credit: 0 }
    ],
    status: 'draft'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.entryNumber) {
      newErrors.entryNumber = 'رقم القيد مطلوب';
    }
    
    if (!formData.description) {
      newErrors.description = 'وصف القيد مطلوب';
    }
    
    if (formData.lines.length === 0) {
      newErrors.lines = 'يجب إضافة سطر واحد على الأقل';
    } else {
      let totalDebit = 0;
      let totalCredit = 0;
      let hasInvalidLine = false;
      
      for (let i = 0; i < formData.lines.length; i++) {
        const line = formData.lines[i];
        totalDebit += line.debit;
        totalCredit += line.credit;
        
        if (!line.account) {
          newErrors[`lines[${i}].account`] = 'الحساب مطلوب';
          hasInvalidLine = true;
        }
        
        if (line.debit === 0 && line.credit === 0) {
          newErrors[`lines[${i}].amount`] = 'يجب إدخال مبلغ مدين أو دائن';
          hasInvalidLine = true;
        }
        
        if (line.debit > 0 && line.credit > 0) {
          newErrors[`lines[${i}].amount`] = 'لا يمكن إدخال مبلغ مدين ودائن في نفس السطر';
          hasInvalidLine = true;
        }
      }
      
      if (!hasInvalidLine && Math.abs(totalDebit - totalCredit) > 0.01) {
        newErrors.balance = 'القيد غير متوازن';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (onSubmit: (data: JournalEntryFormData) => Promise<boolean>) => {
    if (!validateForm()) {
      toast.error('يرجى تصحيح الأخطاء قبل الحفظ');
      return false;
    }
    
    setIsSubmitting(true);
    try {
      const success = await onSubmit(formData);
      if (success) {
        toast.success('تم حفظ القيد بنجاح');
        return true;
      } else {
        toast.error('حدث خطأ أثناء حفظ القيد');
        return false;
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'حدث خطأ غير معروف');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (data: Partial<JournalEntryFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const addLine = () => {
    setFormData(prev => ({
      ...prev,
      lines: [...prev.lines, { account: '', debit: 0, credit: 0 }]
    }));
  };

  const updateLine = (index: number, data: Partial<JournalEntryFormData['lines'][0]>) => {
    setFormData(prev => {
      const newLines = [...prev.lines];
      newLines[index] = { ...newLines[index], ...data };
      return { ...prev, lines: newLines };
    });
  };

  const removeLine = (index: number) => {
    if (formData.lines.length <= 1) {
      toast.error('يجب أن يحتوي القيد على سطر واحد على الأقل');
      return;
    }
    
    setFormData(prev => {
      const newLines = [...prev.lines];
      newLines.splice(index, 1);
      return { ...prev, lines: newLines };
    });
  };

  return {
    formData,
    errors,
    isSubmitting,
    updateFormData,
    addLine,
    updateLine,
    removeLine,
    handleSubmit
  };
};
