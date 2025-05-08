
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { AiPerformanceAnalysis } from '@/types/ai-finance';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ChevronUp, 
  ChevronDown, 
  AlertTriangle, 
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  BarChart3
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface AiPerformanceReportProps {
  performance: AiPerformanceAnalysis;
}

const AiPerformanceReport: React.FC<AiPerformanceReportProps> = ({ performance }) => {
  // تحديد لون وأيقونة لمؤشر الأداء
  const getMetricInfo = (value: number, isHigherBetter: boolean = true, threshold: number = 0) => {
    const isPositive = isHigherBetter ? value > threshold : value < threshold;
    
    return {
      icon: isPositive ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />,
      color: isPositive ? 'text-green-600' : 'text-red-600',
      bgColor: isPositive ? 'bg-green-50' : 'bg-red-50',
      textColor: isPositive ? 'text-green-700' : 'text-red-700',
      borderColor: isPositive ? 'border-green-200' : 'border-red-200',
    };
  };

  // تحويل مستوى الأولوية إلى نص عربي
  const getPriorityText = (priority: 'high' | 'medium' | 'low') => {
    switch(priority) {
      case 'high': return { text: 'عالية', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
      case 'medium': return { text: 'متوسطة', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' };
      case 'low': return { text: 'منخفضة', color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-200' };
    }
  };

  // تحويل مستوى الصعوبة إلى نص عربي
  const getDifficultyText = (difficulty: 'easy' | 'moderate' | 'complex') => {
    switch(difficulty) {
      case 'easy': return { text: 'سهل', color: 'text-green-600', bgColor: 'bg-green-50', borderColor: 'border-green-200' };
      case 'moderate': return { text: 'متوسط', color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-200' };
      case 'complex': return { text: 'معقد', color: 'text-red-600', bgColor: 'bg-red-50', borderColor: 'border-red-200' };
    }
  };

  // الحصول على معلومات المؤشرات المالية
  const profitMarginInfo = getMetricInfo(performance.profitMargin);
  const currentRatioInfo = getMetricInfo(performance.currentRatio, true, 1);
  const revenueGrowthInfo = getMetricInfo(performance.revenueGrowth);
  const expenseTrendInfo = getMetricInfo(performance.expenseTrend, false);
  const cashFlowInfo = getMetricInfo(performance.cashFlow);

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5 text-primary" />
          تقرير الأداء المالي
        </CardTitle>
        <CardDescription>
          تحليل المؤشرات المالية الرئيسية وتوصيات التحسين
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <div className={`p-3 rounded-lg border ${profitMarginInfo.borderColor}`}>
            <div className="flex justify-between items-start">
              <span className="text-xs text-muted-foreground">هامش الربح</span>
              <div className={`rounded-full p-1 ${profitMarginInfo.bgColor}`}>
                {profitMarginInfo.icon}
              </div>
            </div>
            <div className={`text-lg font-bold mt-1 ${profitMarginInfo.color}`}>
              {performance.profitMargin.toFixed(1)}%
            </div>
          </div>
          
          <div className={`p-3 rounded-lg border ${currentRatioInfo.borderColor}`}>
            <div className="flex justify-between items-start">
              <span className="text-xs text-muted-foreground">نسبة التداول</span>
              <div className={`rounded-full p-1 ${currentRatioInfo.bgColor}`}>
                {currentRatioInfo.icon}
              </div>
            </div>
            <div className={`text-lg font-bold mt-1 ${currentRatioInfo.color}`}>
              {performance.currentRatio.toFixed(2)}
            </div>
          </div>
          
          <div className={`p-3 rounded-lg border ${revenueGrowthInfo.borderColor}`}>
            <div className="flex justify-between items-start">
              <span className="text-xs text-muted-foreground">نمو الإيرادات</span>
              <div className={`rounded-full p-1 ${revenueGrowthInfo.bgColor}`}>
                {revenueGrowthInfo.icon}
              </div>
            </div>
            <div className={`text-lg font-bold mt-1 ${revenueGrowthInfo.color}`}>
              {performance.revenueGrowth.toFixed(1)}%
            </div>
          </div>
          
          <div className={`p-3 rounded-lg border ${expenseTrendInfo.borderColor}`}>
            <div className="flex justify-between items-start">
              <span className="text-xs text-muted-foreground">اتجاه المصاريف</span>
              <div className={`rounded-full p-1 ${expenseTrendInfo.bgColor}`}>
                {expenseTrendInfo.icon}
              </div>
            </div>
            <div className={`text-lg font-bold mt-1 ${expenseTrendInfo.color}`}>
              {performance.expenseTrend.toFixed(1)}%
            </div>
          </div>
          
          <div className={`p-3 rounded-lg border ${cashFlowInfo.borderColor}`}>
            <div className="flex justify-between items-start">
              <span className="text-xs text-muted-foreground">التدفق النقدي</span>
              <div className={`rounded-full p-1 ${cashFlowInfo.bgColor}`}>
                {cashFlowInfo.icon}
              </div>
            </div>
            <div className={`text-lg font-bold mt-1 ${cashFlowInfo.color}`}>
              {performance.cashFlow.toLocaleString()} ريال
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            الرؤى الرئيسية
          </h3>
          
          <div className="bg-muted/30 p-3 rounded-lg space-y-2">
            {performance.keyInsights.map((insight, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <p className="text-sm">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-base font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            التوصيات
          </h3>
          
          <Accordion type="multiple" className="space-y-2">
            {performance.recommendations.map((recommendation, idx) => {
              const priorityStyle = getPriorityText(recommendation.priority);
              const difficultyStyle = getDifficultyText(recommendation.implementationDifficulty);
              
              return (
                <AccordionItem 
                  key={idx} 
                  value={`recommendation-${idx}`}
                  className={`border rounded-lg ${priorityStyle.borderColor}`}
                >
                  <AccordionTrigger className="px-3 py-2 hover:no-underline">
                    <div className="flex items-center justify-between w-full text-right">
                      <Badge className={`${priorityStyle.bgColor} ${priorityStyle.color} border-0`}>
                        {priorityStyle.text}
                      </Badge>
                      <span>{recommendation.description}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-3 pb-3 pt-1">
                    <div className="space-y-3 text-sm">
                      <p className="text-muted-foreground">{recommendation.potentialImpact}</p>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className={`${difficultyStyle.bgColor} ${difficultyStyle.color}`}>
                          صعوبة التنفيذ: {difficultyStyle.text}
                        </Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiPerformanceReport;
