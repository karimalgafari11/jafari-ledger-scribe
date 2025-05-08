
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, ComposedChart } from 'recharts';

interface FinancialForecastChartProps {
  title: string;
  description?: string;
  data: {
    labels: string[];
    actual: number[];
    predicted: number[];
    lowerBound?: number[];
    upperBound?: number[];
  };
  type: 'revenue' | 'expenses' | 'profit' | 'cash_flow';
  showConfidenceInterval?: boolean;
}

const chartConfig = {
  revenue: {
    color: '#10b981',
    title: 'الإيرادات',
    areaColor: 'rgba(16, 185, 129, 0.1)'
  },
  expenses: {
    color: '#ef4444',
    title: 'المصروفات',
    areaColor: 'rgba(239, 68, 68, 0.1)'
  },
  profit: {
    color: '#8b5cf6',
    title: 'الأرباح',
    areaColor: 'rgba(139, 92, 246, 0.1)'
  },
  cash_flow: {
    color: '#3b82f6',
    title: 'التدفق النقدي',
    areaColor: 'rgba(59, 130, 246, 0.1)'
  }
};

export const FinancialForecastChart: React.FC<FinancialForecastChartProps> = ({
  title,
  description,
  data,
  type,
  showConfidenceInterval = true
}) => {
  // تحويل البيانات إلى التنسيق المطلوب لمكتبة recharts
  const chartData = data.labels.map((label, index) => {
    return {
      name: label,
      actual: data.actual[index],
      predicted: data.predicted[index],
      lowerBound: data.lowerBound ? data.lowerBound[index] : undefined,
      upperBound: data.upperBound ? data.upperBound[index] : undefined,
    };
  });

  const config = chartConfig[type];

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            {title || config.title}
            {data.actual.some(val => val > 0) && (
              <Badge variant="outline" className="mr-2 bg-gray-100">تشمل بيانات فعلية</Badge>
            )}
          </CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-64 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            {showConfidenceInterval ? (
              <ComposedChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                
                {/* منطقة حدود الثقة */}
                {data.lowerBound && data.upperBound && (
                  <Area
                    type="monotone"
                    dataKey="upperBound"
                    stroke="transparent"
                    fill={config.areaColor}
                    fillOpacity={0.3}
                  />
                )}
                
                {/* الخط الفعلي - سميك ومتواصل */}
                {data.actual.some(val => val > 0) && (
                  <Line
                    type="monotone"
                    dataKey="actual"
                    name="القيم الفعلية"
                    stroke={config.color}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    isAnimationActive={true}
                  />
                )}
                
                {/* خط التوقعات - منقط */}
                <Line
                  type="monotone"
                  dataKey="predicted"
                  name="القيم المتوقعة"
                  stroke={config.color}
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  isAnimationActive={true}
                />
                
                {/* الخط السفلي لمجال الثقة */}
                {data.lowerBound && (
                  <Line
                    type="monotone"
                    dataKey="lowerBound"
                    name="الحد الأدنى"
                    stroke={config.color}
                    strokeOpacity={0.3}
                    strokeWidth={0}
                    dot={false}
                  />
                )}
              </ComposedChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                
                {/* الخط الفعلي - سميك ومتواصل */}
                {data.actual.some(val => val > 0) && (
                  <Line
                    type="monotone"
                    dataKey="actual"
                    name="القيم الفعلية"
                    stroke={config.color}
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    isAnimationActive={true}
                  />
                )}
                
                {/* خط التوقعات - منقط */}
                <Line
                  type="monotone"
                  dataKey="predicted"
                  name="القيم المتوقعة"
                  stroke={config.color}
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  isAnimationActive={true}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
