
import React from 'react';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useFinancialForecast } from '@/hooks/useFinancialForecast';
import { FinancialForecastSettings } from '@/components/ai/FinancialForecastSettings';
import { FinancialForecastChart } from '@/components/ai/FinancialForecastChart';
import { ForecastInsightsCard } from '@/components/ai/ForecastInsightsCard';
import { FileDown, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

const FinancialForecastPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    forecastInsights,
    chartData,
    options,
    isLoading,
    lastUpdated,
    generateForecasts,
    updateForecastOptions,
    exportForecastReport,
    resetOptions
  } = useFinancialForecast();

  return (
    <div className="container mx-auto p-6 rtl">
      <Header
        title="التوقعات المالية الذكية"
        description="توقعات مستقبلية للأداء المالي باستخدام تقنيات الذكاء الاصطناعي"
        showBack={true}
        onBackClick={() => navigate('/ai')}
      />

      <div className="mt-6 space-y-6">
        {/* إعدادات التوقع */}
        <FinancialForecastSettings
          period={options.period}
          method={options.method}
          categories={options.categories}
          includeHistorical={options.includeHistorical}
          confidenceInterval={options.confidenceInterval}
          onUpdate={updateForecastOptions}
          onGenerate={generateForecasts}
          onReset={resetOptions}
          isLoading={isLoading}
        />

        {/* لوحة الرؤى */}
        <ForecastInsightsCard insights={forecastInsights} />
        
        {/* مخططات التوقع */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {options.categories.includes('revenue') && (
            <FinancialForecastChart
              title="توقعات الإيرادات"
              data={chartData.revenue}
              type="revenue"
              showConfidenceInterval={options.confidenceInterval > 0}
            />
          )}
          
          {options.categories.includes('expenses') && (
            <FinancialForecastChart
              title="توقعات المصروفات"
              data={chartData.expenses}
              type="expenses"
              showConfidenceInterval={options.confidenceInterval > 0}
            />
          )}
          
          {options.categories.includes('profit') && (
            <FinancialForecastChart
              title="توقعات الأرباح"
              data={chartData.profit}
              type="profit"
              showConfidenceInterval={options.confidenceInterval > 0}
            />
          )}
          
          {options.categories.includes('cash_flow') && (
            <FinancialForecastChart
              title="توقعات التدفق النقدي"
              data={chartData.cash_flow}
              type="cash_flow"
              showConfidenceInterval={options.confidenceInterval > 0}
            />
          )}
        </div>

        {/* معلومات التوقع ووقت التحديث */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-wrap justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {lastUpdated ? (
                  <>
                    آخر تحديث: {format(lastUpdated, 'PPP', { locale: ar })} - {format(lastUpdated, 'HH:mm')}
                  </>
                ) : (
                  'لم يتم تحديث التوقعات بعد'
                )}
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse">
                <Button variant="outline" size="sm" onClick={generateForecasts} disabled={isLoading}>
                  <RefreshCw className="h-4 w-4 ml-1" />
                  تحديث
                </Button>
                <Button variant="secondary" size="sm" onClick={exportForecastReport}>
                  <FileDown className="h-4 w-4 ml-1" />
                  تصدير التقرير
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialForecastPage;
