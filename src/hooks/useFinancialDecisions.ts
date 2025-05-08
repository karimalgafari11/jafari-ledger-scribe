
import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { 
  FinancialDecision, 
  JournalEntrySuggestion,
  PricingSuggestion,
  ProvisionSuggestion,
  VarianceAnalysis,
  FinancialDecisionStatus
} from '@/types/ai-finance';
import { mockFinancialDecisions } from '@/data/mockFinancialDecisions';

export const useFinancialDecisions = () => {
  const [decisions, setDecisions] = useState<FinancialDecision[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    type: 'all' as 'all' | 'journal_entry' | 'pricing' | 'provision' | 'variance',
    status: 'all' as 'all' | FinancialDecisionStatus,
    sortBy: 'impact' as 'impact' | 'confidence' | 'date',
    sortOrder: 'desc' as 'asc' | 'desc'
  });

  // Fetch decisions on component mount
  useEffect(() => {
    // In a real app, we would fetch decisions from API
    setDecisions(mockFinancialDecisions);
  }, []);

  // Get filtered and sorted decisions
  const getFilteredDecisions = useCallback(() => {
    let filteredData = [...decisions];
    
    // Filter by type
    if (filters.type !== 'all') {
      filteredData = filteredData.filter(d => d.type === filters.type);
    }
    
    // Filter by status
    if (filters.status !== 'all') {
      filteredData = filteredData.filter(d => d.status === filters.status);
    }
    
    // Sort data
    filteredData.sort((a, b) => {
      if (filters.sortBy === 'date') {
        return filters.sortOrder === 'asc' 
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        const valA = a[filters.sortBy];
        const valB = b[filters.sortBy];
        return filters.sortOrder === 'asc' 
          ? (valA > valB ? 1 : -1)
          : (valA < valB ? 1 : -1);
      }
    });
    
    return filteredData;
  }, [decisions, filters]);

  // Update filters
  const updateFilters = useCallback((newFilters: Partial<typeof filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Implement a financial decision
  const implementDecision = useCallback((decisionId: string) => {
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
  }, [decisions]);

  // Accept a financial decision
  const acceptDecision = useCallback((decisionId: string) => {
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      // Update decision status
      setDecisions(prevDecisions => 
        prevDecisions.map(d => 
          d.id === decisionId 
            ? { ...d, status: 'accepted' } 
            : d
        )
      );
      
      toast.success('تم قبول القرار وسيتم تنفيذه لاحقًا');
      setIsLoading(false);
    }, 500);
  }, []);

  // Dismiss a financial decision
  const dismissDecision = useCallback((decisionId: string) => {
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
  }, []);

  // Create a new decision (for demo)
  const createDecision = useCallback((decision: Omit<FinancialDecision, 'id' | 'createdAt' | 'status'>) => {
    setIsLoading(true);
    // Simulate API request
    setTimeout(() => {
      const newDecision: FinancialDecision = {
        id: uuidv4(),
        ...decision,
        createdAt: new Date().toISOString(),
        status: 'suggested',
      };
      
      setDecisions(prevDecisions => [...prevDecisions, newDecision]);
      setIsLoading(false);
      toast.success('تم إنشاء قرار جديد');
    }, 500);
  }, []);

  // Get stats about decisions
  const getDecisionStats = useCallback(() => {
    const stats = {
      total: decisions.length,
      implemented: decisions.filter(d => d.status === 'implemented').length,
      suggested: decisions.filter(d => d.status === 'suggested').length,
      accepted: decisions.filter(d => d.status === 'accepted').length,
      rejected: decisions.filter(d => d.status === 'rejected').length,
      byType: {
        journal_entry: decisions.filter(d => d.type === 'journal_entry').length,
        pricing: decisions.filter(d => d.type === 'pricing').length,
        provision: decisions.filter(d => d.type === 'provision').length,
        variance: decisions.filter(d => d.type === 'variance').length,
      },
      totalPositiveImpact: decisions
        .filter(d => d.impact > 0)
        .reduce((sum, d) => sum + d.impact, 0),
      totalNegativeImpact: decisions
        .filter(d => d.impact < 0)
        .reduce((sum, d) => sum + d.impact, 0),
      averageConfidence: decisions.length 
        ? decisions.reduce((sum, d) => sum + d.confidence, 0) / decisions.length
        : 0
    };
    return stats;
  }, [decisions]);

  return {
    decisions,
    filteredDecisions: getFilteredDecisions(),
    isLoading,
    filters,
    updateFilters,
    implementDecision,
    acceptDecision,
    dismissDecision,
    createDecision,
    getDecisionStats
  };
};
