
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { 
  FinancialDecision, 
  JournalEntrySuggestion,
  PricingSuggestion,
  ProvisionSuggestion,
  VarianceAnalysis
} from '@/types/ai-finance';
import { mockFinancialDecisions } from '@/data/mockFinancialDecisions';

export const useFinancialDecisions = () => {
  const [decisions, setDecisions] = useState<FinancialDecision[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // في التطبيق الحقيقي، سيتم استدعاء API لجلب القرارات
    setDecisions(mockFinancialDecisions);
  }, []);

  // تطبيق قرار مالي
  const implementDecision = (decisionId: string) => {
    setIsLoading(true);
    // محاكاة طلب API
    setTimeout(() => {
      const decision = decisions.find(d => d.id === decisionId);
      if (decision) {
        // تحديث حالة القرار
        setDecisions(prevDecisions => 
          prevDecisions.map(d => 
            d.id === decisionId 
              ? { ...d, status: 'implemented', implementedAt: new Date() } 
              : d
          )
        );
        
        // إظهار رسالة نجاح مناسبة
        switch(decision.type) {
          case 'journal_entry':
            toast.success('تم إنشاء قيد محاسبي جديد بناءً على الاقتراح');
            break;
          case 'pricing':
            toast.success('تم تحديث سعر المنتج بنجاح');
            break;
          case 'provision':
            toast.success('تم تحديث مبلغ المخصص بنجاح');
            break;
          case 'variance':
            toast.success('تم تسجيل تحليل الفروقات بنجاح');
            break;
          default:
            toast.success('تم تنفيذ القرار بنجاح');
        }
      }
      setIsLoading(false);
    }, 800);
  };

  // تجاهل قرار مالي
  const dismissDecision = (decisionId: string) => {
    setIsLoading(true);
    // محاكاة طلب API
    setTimeout(() => {
      // تحديث حالة القرار
      setDecisions(prevDecisions => 
        prevDecisions.map(d => 
          d.id === decisionId 
            ? { ...d, status: 'rejected' } 
            : d
        )
      );
      
      toast.success('تم تجاهل القرار');
      setIsLoading(false);
    }, 500);
  };

  // إنشاء قرار جديد (للعرض التوضيحي)
  const createDecision = (decision: Omit<FinancialDecision, 'id' | 'createdAt' | 'status'>) => {
    setIsLoading(true);
    // محاكاة طلب API
    setTimeout(() => {
      const newDecision: FinancialDecision = {
        id: uuidv4(),
        ...decision,
        createdAt: new Date(),
        status: 'pending',
      };
      
      setDecisions(prevDecisions => [...prevDecisions, newDecision]);
      setIsLoading(false);
      toast.success('تم إنشاء قرار جديد');
    }, 500);
  };

  return {
    decisions,
    isLoading,
    implementDecision,
    dismissDecision,
    createDecision,
  };
};
