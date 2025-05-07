
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useFinancialDecisions } from '@/hooks/useFinancialDecisions';
import { Button } from '@/components/ui/button';
import { Calculator, DollarSign, AlertCircle, FileText } from 'lucide-react';
import { FinancialDecision } from '@/types/ai-finance';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from 'react-router-dom';

// Changed to use interface instead of React.FC<Props> pattern
interface FinancialDecisionsWidgetProps {
  performance: any;
}

const FinancialDecisionsWidget = ({ performance }: FinancialDecisionsWidgetProps) => {
  const { decisions } = useFinancialDecisions();
  const [activeType, setActiveType] = useState<'all' | 'journal_entry' | 'pricing' | 'provision' | 'variance'>('all');
  const navigate = useNavigate();
  
  // Filter decisions by selected type
  const filteredDecisions = activeType === 'all' 
    ? decisions.slice(0, 3) 
    : decisions.filter(d => d.type === activeType).slice(0, 3);
  
  // Get counts by decision type
  const journalCount = decisions.filter(d => d.type === 'journal_entry').length;
  const pricingCount = decisions.filter(d => d.type === 'pricing').length;
  const provisionCount = decisions.filter(d => d.type === 'provision').length;
  const varianceCount = decisions.filter(d => d.type === 'variance').length;

  // Classify decisions by confidence level
  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) {
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">ثقة عالية ({confidence}%)</Badge>;
    } else if (confidence >= 70) {
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">ثقة متوسطة ({confidence}%)</Badge>;
    } else {
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">تقديري ({confidence}%)</Badge>;
    }
  };

  // Render a decision card
  const renderDecisionCard = (decision: FinancialDecision) => {
    // Icon based on decision type
    let decisionIcon;
    let decisionType;
    
    switch(decision.type) {
      case 'journal_entry':
        decisionIcon = <Calculator className="h-5 w-5 text-indigo-500" />;
        decisionType = "قيد محاسبي";
        break;
      case 'pricing':
        decisionIcon = <DollarSign className="h-5 w-5 text-green-500" />;
        decisionType = "تعديل سعر";
        break;
      case 'provision':
        decisionIcon = <AlertCircle className="h-5 w-5 text-amber-500" />;
        decisionType = "مخصص";
        break;
      case 'variance':
        decisionIcon = <FileText className="h-5 w-5 text-blue-500" />;
        decisionType = "تحليل فروقات";
        break;
    }

    return (
      <div key={decision.id} className="p-3 border rounded-lg mb-2 bg-card hover:bg-accent/5 cursor-pointer transition-colors" onClick={() => navigate('/ai-financial-decisions')}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {decisionIcon}
            <div className="font-medium">{decision.title}</div>
          </div>
          <Badge variant="outline" className="text-xs">{decisionType}</Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{decision.description}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm">
            التأثير: <span className={decision.impact > 0 ? "text-green-600" : "text-red-600"}>
              {decision.impact.toLocaleString()} ريال
            </span>
          </div>
          {getConfidenceBadge(decision.confidence)}
        </div>
      </div>
    );
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-primary" />
            محرك القرارات المالي الذكي
          </CardTitle>
          <Badge>{decisions.length} قرار</Badge>
        </div>
        <CardDescription>
          اقتراحات وتوصيات مالية ذكية مبنية على تحليل البيانات
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex overflow-x-auto space-x-2 rtl:space-x-reverse">
          <Button 
            variant={activeType === 'all' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setActiveType('all')}
          >
            الكل ({decisions.length})
          </Button>
          <Button 
            variant={activeType === 'journal_entry' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setActiveType('journal_entry')}
            className="flex items-center gap-1"
          >
            <Calculator className="h-4 w-4" />
            قيود محاسبية ({journalCount})
          </Button>
          <Button 
            variant={activeType === 'pricing' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setActiveType('pricing')}
            className="flex items-center gap-1"
          >
            <DollarSign className="h-4 w-4" />
            تسعير ({pricingCount})
          </Button>
          <Button 
            variant={activeType === 'provision' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setActiveType('provision')}
            className="flex items-center gap-1"
          >
            <AlertCircle className="h-4 w-4" />
            مخصصات ({provisionCount})
          </Button>
          <Button 
            variant={activeType === 'variance' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setActiveType('variance')}
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            فروقات ({varianceCount})
          </Button>
        </div>

        <ScrollArea className="h-[280px] w-full">
          {filteredDecisions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              لا توجد قرارات أو اقتراحات في هذا القسم
            </div>
          ) : (
            filteredDecisions.map(renderDecisionCard)
          )}
        </ScrollArea>
        
        <div className="mt-4 flex justify-center">
          <Button onClick={() => navigate('/ai/financial-decisions')} size="sm">
            عرض جميع القرارات والاقتراحات
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialDecisionsWidget;
