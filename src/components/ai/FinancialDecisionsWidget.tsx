
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFinancialDecisions } from "@/hooks/useFinancialDecisions";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FinancialDecision } from "@/types/ai-finance";
import { useNavigate } from "react-router-dom";
import { Calculator, DollarSign, AlertCircle, FileText, ArrowUp } from "lucide-react";

const FinancialDecisionsWidget = () => {
  const { decisions, implementDecision } = useFinancialDecisions();
  const navigate = useNavigate();

  // عرض أحدث 3 قرارات فقط
  const latestDecisions = decisions
    .filter(decision => decision.status === 'pending')
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3);

  // استخراج إجمالي التأثير المالي الإيجابي والسلبي
  const positiveImpact = decisions
    .filter(d => d.impact > 0 && d.status === 'pending')
    .reduce((sum, d) => sum + d.impact, 0);

  const negativeImpact = decisions
    .filter(d => d.impact < 0 && d.status === 'pending')
    .reduce((sum, d) => sum + d.impact, 0);

  // تحديد أيقونة لكل نوع قرار
  const getDecisionIcon = (type: string) => {
    switch(type) {
      case 'journal_entry':
        return <Calculator className="h-4 w-4 text-indigo-500" />;
      case 'pricing':
        return <DollarSign className="h-4 w-4 text-green-500" />;
      case 'provision':
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case 'variance':
        return <FileText className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };
  
  // تنسيق مستوى الثقة
  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">{confidence}%</Badge>;
    } else if (confidence >= 70) {
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">{confidence}%</Badge>;
    } else {
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">{confidence}%</Badge>;
    }
  };

  // التنقل إلى صفحة القرارات المالية
  const handleViewAll = () => {
    navigate('/ai-financial-decisions');
  };

  // عرض قرار فردي
  const renderDecision = (decision: FinancialDecision) => (
    <div key={decision.id} className="py-3 border-b last:border-0">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          {getDecisionIcon(decision.type)}
          <h4 className="font-medium text-sm mr-2 truncate max-w-[200px]">{decision.title}</h4>
        </div>
        <div className="flex items-center gap-2">
          {getConfidenceBadge(decision.confidence)}
          <span className={`text-sm font-semibold ${decision.impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {decision.impact >= 0 ? '+' : ''}{decision.impact.toLocaleString()} ريال
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{decision.description}</p>
      <div className="flex justify-end mt-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="h-7 text-xs"
          onClick={() => implementDecision(decision.id)}
        >
          تنفيذ القرار
        </Button>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">قرارات وتوصيات مالية</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleViewAll} className="h-8">
            عرض الكل
            <ArrowUp className="h-4 w-4 mr-1 rotate-45" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-green-50 p-3 rounded border border-green-200">
            <div className="text-sm text-gray-600">التأثير الإيجابي المحتمل</div>
            <div className="text-xl font-bold text-green-600 mt-1">
              +{positiveImpact.toLocaleString()} ريال
            </div>
          </div>
          <div className="bg-red-50 p-3 rounded border border-red-200">
            <div className="text-sm text-gray-600">التأثير السلبي المحتمل</div>
            <div className="text-xl font-bold text-red-600 mt-1">
              {negativeImpact.toLocaleString()} ريال
            </div>
          </div>
        </div>

        <ScrollArea className="h-[260px]">
          {latestDecisions.length === 0 ? (
            <div className="py-8 text-center text-gray-500">
              لا توجد قرارات أو توصيات جديدة
            </div>
          ) : (
            latestDecisions.map(renderDecision)
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default FinancialDecisionsWidget;
