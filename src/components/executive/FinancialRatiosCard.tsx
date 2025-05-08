
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FinancialRatio } from '@/types/financial-analysis';

interface FinancialRatiosCardProps {
  ratios: FinancialRatio[];
}

export const FinancialRatiosCard: React.FC<FinancialRatiosCardProps> = ({ ratios }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">النسب المالية</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ratios.map((ratio) => (
            <div key={ratio.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{ratio.name}</div>
                <Badge 
                  variant={ratio.trend === 'up' ? 'success' : ratio.trend === 'down' ? 'destructive' : 'outline'}
                >
                  {ratio.trend === 'up' ? '▲' : ratio.trend === 'down' ? '▼' : '■'}
                </Badge>
              </div>
              
              <div className="flex items-baseline space-x-2 rtl:space-x-reverse">
                <span className="text-2xl font-bold">{ratio.value.toFixed(2)}</span>
                <span className="text-sm text-muted-foreground">/ {ratio.industry.toFixed(2)} (المعيار)</span>
              </div>
              
              {ratio.lastPeriod && (
                <div className="text-xs text-muted-foreground">
                  {ratio.value > ratio.lastPeriod ? 'زيادة' : 'انخفاض'} من {ratio.lastPeriod.toFixed(2)} في الفترة الماضية
                </div>
              )}
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>مقارنة بالمعيار</span>
                  <span>
                    {ratio.value > ratio.industry ? '+' : ''}{((ratio.value / ratio.industry - 1) * 100).toFixed(1)}%
                  </span>
                </div>
                <Progress value={(ratio.value / (ratio.industry * 1.5)) * 100} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
