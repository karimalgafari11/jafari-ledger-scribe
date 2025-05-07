
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
    // In a real app, we would fetch decisions from API
    setDecisions(mockFinancialDecisions);
  }, []);

  // Implement a financial decision
  const implementDecision = (decisionId: string) => {
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      const decision = decisions.find(d => d.id === decisionId);
      if (decision) {
        // Update decision status
        setDecisions(prevDecisions => 
          prevDecisions.map(d => 
            d.id === decisionId 
              ? { ...d, status: 'implemented', implementedAt: new Date().toISOString() } 
              : d
          )
        );
        
        // Show appropriate success message
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

  // Dismiss a financial decision
  const dismissDecision = (decisionId: string) => {
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      // Update decision status
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

  // Create a new decision (for demo)
  const createDecision = (decision: Omit<FinancialDecision, 'id' | 'createdAt' | 'status'>) => {
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      const newDecision: FinancialDecision = {
        id: uuidv4(),
        ...decision,
        createdAt: new Date().toISOString(), // Using string instead of Date
        status: 'suggested', // Using 'suggested' instead of 'pending'
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
