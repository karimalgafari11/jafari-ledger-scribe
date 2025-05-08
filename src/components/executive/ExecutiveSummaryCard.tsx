
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExecutiveSummary } from '@/types/executive-dashboard';

interface ExecutiveSummaryCardProps {
  summary: ExecutiveSummary;
  className?: string;
}

export const ExecutiveSummaryCard: React.FC<ExecutiveSummaryCardProps> = ({ summary, className }) => {
  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle>ملخص تنفيذي</CardTitle>
          <Badge
            variant={
              summary.financialHealth === 'excellent' ? 'default' :
              summary.financialHealth === 'good' ? 'success' :
              summary.financialHealth === 'fair' ? 'warning' :
              'destructive'
            }
            className="capitalize"
          >
            {summary.financialHealth === 'excellent' ? 'ممتاز' :
             summary.financialHealth === 'good' ? 'جيد' :
             summary.financialHealth === 'fair' ? 'معقول' :
             summary.financialHealth === 'poor' ? 'ضعيف' : 'حرج'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">أهم المؤشرات</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {summary.topMetrics.map((metric) => (
                <div key={metric.id} className="bg-muted rounded-lg p-3">
                  <div className="text-sm text-muted-foreground">{metric.name}</div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="text-lg font-medium">
                      {metric.value}{metric.unit}
                    </div>
                    <Badge 
                      variant={metric.trend === 'up' ? 'success' : metric.trend === 'down' ? 'destructive' : 'outline'}
                    >
                      {metric.percentChange && `${metric.percentChange > 0 ? '+' : ''}${metric.percentChange}%`}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">الرؤى الرئيسية</h3>
            <div className="space-y-2">
              {summary.keyInsights.slice(0, 3).map((insight, index) => (
                <div key={index} className="text-sm">• {insight}</div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">التوصيات</h3>
              <div className="space-y-1">
                {summary.recommendations.slice(0, 3).map((rec, index) => (
                  <div key={index} className="text-sm">• {rec}</div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">المخاطر والفرص</h3>
              <div className="space-y-1">
                {summary.risks.slice(0, 1).map((risk, index) => (
                  <div key={index} className="text-sm text-red-600">• {risk}</div>
                ))}
                {summary.opportunities.slice(0, 2).map((opp, index) => (
                  <div key={index} className="text-sm text-green-600">• {opp}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
