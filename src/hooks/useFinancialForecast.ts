
import { useState, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { FinancialForecast } from '@/types/financial-analysis';
import { subMonths, format } from 'date-fns';

// أنواع بيانات التوقع المالي
export type ForecastCategory = 'revenue' | 'expenses' | 'profit' | 'cash_flow' | 'inventory';
export type ForecastPeriod = '3_months' | '6_months' | '12_months' | '24_months';
export type ForecastMethod = 'ai' | 'linear' | 'seasonal' | 'weighted';

interface ForecastOptions {
  period: ForecastPeriod;
  method: ForecastMethod;
  categories: ForecastCategory[];
  includeHistorical: boolean;
  confidenceInterval: number;
}

// هوك للتوقعات المالية الذكية
export const useFinancialForecast = () => {
  // إعدادات التوقع الافتراضية
  const defaultOptions: ForecastOptions = {
    period: '6_months',
    method: 'ai',
    categories: ['revenue', 'expenses', 'profit'],
    includeHistorical: true,
    confidenceInterval: 90
  };

  // حالة التوقعات والإعدادات
  const [forecasts, setForecasts] = useState<FinancialForecast[]>([]);
  const [options, setOptions] = useState<ForecastOptions>(defaultOptions);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // توليد بيانات التوقعات الوهمية
  const generateForecasts = useCallback(() => {
    setIsLoading(true);

    // محاكاة طلب API للتوقعات
    setTimeout(() => {
      try {
        const mockForecasts: FinancialForecast[] = generateMockForecasts(options);
        setForecasts(mockForecasts);
        setLastUpdated(new Date());
        toast.success('تم تحديث التوقعات المالية بنجاح');
      } catch (error) {
        console.error('خطأ في إنشاء التوقعات:', error);
        toast.error('حدث خطأ أثناء تحديث التوقعات المالية');
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  }, [options]);

  // استدعاء بيانات التوقعات عند تغيير الخيارات
  const updateForecastOptions = useCallback((newOptions: Partial<ForecastOptions>) => {
    setOptions(prev => ({
      ...prev,
      ...newOptions
    }));
  }, []);

  // مجموعة البيانات مقسمة حسب الفئة
  const forecastsByCategory = useMemo(() => {
    const grouped = forecasts.reduce<Record<string, FinancialForecast[]>>((acc, forecast) => {
      if (!acc[forecast.category]) {
        acc[forecast.category] = [];
      }
      acc[forecast.category].push(forecast);
      return acc;
    }, {});
    
    // ترتيب البيانات داخل كل فئة حسب الشهر
    Object.keys(grouped).forEach(category => {
      grouped[category].sort((a, b) => 
        a.month.localeCompare(b.month)
      );
    });
    
    return grouped;
  }, [forecasts]);

  // بيانات الرسم البياني للتوقعات
  const chartData = useMemo(() => {
    const data = {
      revenue: {
        labels: [] as string[],
        actual: [] as number[],
        predicted: [] as number[],
        lowerBound: [] as number[],
        upperBound: [] as number[]
      },
      expenses: {
        labels: [] as string[],
        actual: [] as number[],
        predicted: [] as number[],
        lowerBound: [] as number[],
        upperBound: [] as number[]
      },
      profit: {
        labels: [] as string[],
        actual: [] as number[],
        predicted: [] as number[],
        lowerBound: [] as number[],
        upperBound: [] as number[]
      },
      cash_flow: {
        labels: [] as string[],
        actual: [] as number[],
        predicted: [] as number[],
        lowerBound: [] as number[],
        upperBound: [] as number[]
      }
    };

    // ملء بيانات المخططات من التوقعات
    Object.keys(forecastsByCategory).forEach(category => {
      if (category in data) {
        const categoryData = forecastsByCategory[category];
        data[category as keyof typeof data].labels = categoryData.map(item => item.month);
        data[category as keyof typeof data].actual = categoryData.map(item => item.actualValue || 0);
        data[category as keyof typeof data].predicted = categoryData.map(item => item.predictedValue);
        data[category as keyof typeof data].lowerBound = categoryData.map(item => item.lowerBound || item.predictedValue * 0.9);
        data[category as keyof typeof data].upperBound = categoryData.map(item => item.upperBound || item.predictedValue * 1.1);
      }
    });

    return data;
  }, [forecastsByCategory]);

  // مؤشرات أداء رئيسية مشتقة من التوقعات
  const forecastInsights = useMemo(() => {
    if (forecasts.length === 0) {
      return [];
    }

    const insights = [];
    
    // حساب النمو المتوقع في الإيرادات
    const revenueForecasts = forecasts.filter(f => f.category === 'revenue');
    if (revenueForecasts.length >= 2) {
      const firstMonth = revenueForecasts[0].predictedValue;
      const lastMonth = revenueForecasts[revenueForecasts.length - 1].predictedValue;
      const growthPercent = ((lastMonth - firstMonth) / firstMonth) * 100;
      
      insights.push({
        title: 'نمو الإيرادات المتوقع',
        value: `${growthPercent.toFixed(1)}%`,
        trend: growthPercent > 0 ? 'up' : 'down',
        description: `النمو المتوقع في الإيرادات خلال فترة التنبؤ`
      });
    }

    // تحليل نسبة الربح المتوقعة
    const profitForecasts = forecasts.filter(f => f.category === 'profit');
    const expenseForecasts = forecasts.filter(f => f.category === 'expenses');
    
    if (profitForecasts.length > 0 && revenueForecasts.length > 0) {
      const avgProfit = profitForecasts.reduce((sum, f) => sum + f.predictedValue, 0) / profitForecasts.length;
      const avgRevenue = revenueForecasts.reduce((sum, f) => sum + f.predictedValue, 0) / revenueForecasts.length;
      const profitMargin = (avgProfit / avgRevenue) * 100;
      
      insights.push({
        title: 'هامش الربح المتوقع',
        value: `${profitMargin.toFixed(1)}%`,
        trend: profitMargin > 15 ? 'up' : profitMargin > 10 ? 'neutral' : 'down',
        description: `متوسط هامش الربح المتوقع خلال فترة التنبؤ`
      });
    }

    // تحليل نقطة التعادل
    if (revenueForecasts.length > 0 && expenseForecasts.length > 0) {
      const monthlyRevenue = revenueForecasts[0].predictedValue;
      const monthlyExpenses = expenseForecasts[0].predictedValue;
      const breakevenRatio = (monthlyExpenses / monthlyRevenue) * 100;
      
      insights.push({
        title: 'نسبة التعادل',
        value: `${breakevenRatio.toFixed(1)}%`,
        trend: breakevenRatio < 70 ? 'up' : breakevenRatio < 90 ? 'neutral' : 'down',
        description: `نسبة المصاريف إلى الإيرادات المتوقعة في الشهر القادم`
      });
    }

    return insights;
  }, [forecasts]);

  // تصدير التقرير
  const exportForecastReport = useCallback(() => {
    toast.success('جاري تصدير تقرير التوقعات المالية...');
    // محاكاة لعملية تصدير التقرير
    setTimeout(() => {
      toast.success('تم تصدير التقرير بنجاح');
    }, 1500);
  }, []);

  // إعادة تعيين خيارات التوقع
  const resetOptions = useCallback(() => {
    setOptions(defaultOptions);
  }, []);

  return {
    forecasts,
    forecastsByCategory,
    chartData,
    forecastInsights,
    options,
    isLoading,
    lastUpdated,
    generateForecasts,
    updateForecastOptions,
    exportForecastReport,
    resetOptions
  };
};

// دالة محلية لإنشاء بيانات وهمية للتوقعات المالية
function generateMockForecasts(options: ForecastOptions): FinancialForecast[] {
  const { period, categories, includeHistorical } = options;
  const forecasts: FinancialForecast[] = [];
  
  // تحديد عدد الشهور بناءً على الفترة المحددة
  let monthsCount = 6;
  switch (period) {
    case '3_months': monthsCount = 3; break;
    case '6_months': monthsCount = 6; break;
    case '12_months': monthsCount = 12; break;
    case '24_months': monthsCount = 24; break;
  }
  
  // عدد الشهور التاريخية (الفعلية)
  const historicalMonths = includeHistorical ? 6 : 0;
  
  // تعيين قيم قاعدية لكل فئة
  const baseValues = {
    revenue: 120000,
    expenses: 85000,
    profit: 35000,
    cash_flow: 25000,
    inventory: 45000
  };
  
  // معدلات النمو الشهري لكل فئة
  const growthRates = {
    revenue: 0.03,
    expenses: 0.02,
    profit: 0.04,
    cash_flow: 0.025,
    inventory: -0.01
  };
  
  // إنشاء بيانات لكل فئة مطلوبة
  categories.forEach(category => {
    const baseValue = baseValues[category];
    const growthRate = growthRates[category];
    
    // إنشاء بيانات تاريخية (فعلية)
    if (includeHistorical) {
      for (let i = 0; i < historicalMonths; i++) {
        const date = subMonths(new Date(), historicalMonths - i);
        const monthLabel = format(date, 'yyyy-MM');
        
        const randomFactor = 0.9 + Math.random() * 0.2; // عامل عشوائي بين 0.9 و 1.1
        const historicalValue = baseValue * Math.pow(1 + growthRate, i) * randomFactor;
        
        forecasts.push({
          id: `${category}-hist-${i}`,
          category,
          month: monthLabel,
          actualValue: parseFloat(historicalValue.toFixed(2)),
          predictedValue: parseFloat(historicalValue.toFixed(2)),
          confidence: 1
        });
      }
    }
    
    // إنشاء بيانات مستقبلية (متوقعة)
    for (let i = 0; i < monthsCount; i++) {
      const date = subMonths(new Date(), -i);
      const monthLabel = format(date, 'yyyy-MM');
      
      const randomFactor = 0.95 + Math.random() * 0.1; // عامل عشوائي أقل للتوقعات
      const offsetMonths = includeHistorical ? i + historicalMonths : i;
      const forecastValue = baseValue * Math.pow(1 + growthRate, offsetMonths) * randomFactor;
      
      // حساب حدود الثقة
      const confidenceLevel = 0.9;
      const volatility = 0.05 + (i * 0.01); // زيادة التقلب مع مرور الوقت
      const lowerBound = forecastValue * (1 - volatility);
      const upperBound = forecastValue * (1 + volatility);
      
      forecasts.push({
        id: `${category}-fore-${i}`,
        category,
        month: monthLabel,
        predictedValue: parseFloat(forecastValue.toFixed(2)),
        lowerBound: parseFloat(lowerBound.toFixed(2)),
        upperBound: parseFloat(upperBound.toFixed(2)),
        confidence: parseFloat((confidenceLevel * (1 - (i / monthsCount) * 0.3)).toFixed(2)) // تقل نسبة الثقة مع زيادة فترة التنبؤ
      });
    }
  });
  
  return forecasts;
}
