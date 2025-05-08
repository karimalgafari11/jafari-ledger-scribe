
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDown, ArrowRight, ArrowUp, BrainCircuit } from 'lucide-react';

interface ForecastInsight {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  description: string;
}

interface ForecastInsightsCardProps {
  insights: ForecastInsight[];
}

export const ForecastInsightsCard: React.FC<ForecastInsightsCardProps> = ({
  insights
}) => {
  if (!insights || insights.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <BrainCircuit className="h-5 w-5" />
            رؤى التوقعات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-6 text-muted-foreground">
            قم بإنشاء التوقعات لعرض الرؤى التحليلية
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <BrainCircuit className="h-5 w-5" />
          رؤى التوقعات
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="bg-muted/30 p-3 rounded-lg border">
              <div className="text-sm text-muted-foreground">{insight.title}</div>
              <div className="flex items-end justify-between mt-1">
                <div className="text-2xl font-medium">{insight.value}</div>
                <div className="flex items-center">
                  {insight.trend === 'up' && (
                    <ArrowUp className="h-5 w-5 text-green-500" />
                  )}
                  {insight.trend === 'down' && (
                    <ArrowDown className="h-5 w-5 text-red-500" />
                  )}
                  {insight.trend === 'neutral' && (
                    <ArrowRight className="h-5 w-5 text-amber-500" />
                  )}
                </div>
              </div>
              <div className="text-xs text-muted-foreground mt-2">{insight.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
