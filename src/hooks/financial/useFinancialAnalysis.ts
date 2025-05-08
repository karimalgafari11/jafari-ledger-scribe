
import { useState, useMemo, useCallback } from 'react';
import { subDays } from 'date-fns';
import { toast } from 'sonner';

// Import the necessary types and data from the separated files
import { AnalysisPeriod } from './types';
import { mockFinancialMetrics, mockFinancialRatios, insightsData, mockRecommendations } from './mockData';
import { createMockChartData } from './chartData';

// Re-export the AnalysisPeriod enum to maintain API compatibility
export { AnalysisPeriod };

export const useFinancialAnalysis = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 30),
    to: new Date()
  });
  
  const [selectedPeriod, setSelectedPeriod] = useState<AnalysisPeriod>(AnalysisPeriod.MONTH_3);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Use the mock data
  const financialMetrics = useMemo(() => mockFinancialMetrics, []);
  const financialRatios = useMemo(() => mockFinancialRatios, []);
  
  // Make sure insights is explicitly typed as string[]
  const insights = useMemo<string[]>(() => insightsData, []);
  
  const recommendations = useMemo(() => mockRecommendations, []);
  
  const chartData = useMemo(() => createMockChartData(), []);
  
  const refreshData = useCallback(() => {
    setIsLoading(true);
    
    // محاكاة لعملية تحديث البيانات من الخادم
    setTimeout(() => {
      setIsLoading(false);
      toast.success('تم تحديث البيانات المالية بنجاح');
    }, 1000);
  }, []);
  
  const exportAnalysis = useCallback(() => {
    toast.success('جاري تصدير التحليل المالي...');
    
    // محاكاة لعملية التصدير
    setTimeout(() => {
      toast.success('تم تصدير التحليل المالي بنجاح');
    }, 1500);
  }, []);

  return {
    financialMetrics,
    financialRatios,
    insights,
    recommendations,
    dateRange,
    setDateRange,
    selectedPeriod,
    setSelectedPeriod,
    refreshData,
    exportAnalysis,
    chartData,
    profitabilityData: chartData.profitabilityData,
    cashflowData: chartData.cashflowData,
    liquidityData: chartData.liquidityData,
    debtRatios: chartData.debtRatios,
    efficiencyRatios: chartData.efficiencyRatios,
    profitabilityRatios: chartData.profitabilityRatios,
    isLoading
  };
};
