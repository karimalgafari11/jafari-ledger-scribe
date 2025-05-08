
import React from 'react';
import { 
  FinancialDecision, 
  JournalEntrySuggestion, 
  PricingSuggestion, 
  ProvisionSuggestion, 
  VarianceAnalysis 
} from '@/types/ai-finance';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, AlertCircle, FileText, Clock, CheckCircle, XCircle, ArrowUpRight, ThumbsUp } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface FinancialDecisionCardProps {
  decision: FinancialDecision;
  onImplement: (id: string) => void;
  onAccept: (id: string) => void;
  onDismiss: (id: string) => void;
  isLoading: boolean;
  showActions?: boolean;
  showDetails?: boolean;
}

export const FinancialDecisionCard: React.FC<FinancialDecisionCardProps> = ({
  decision,
  onImplement,
  onAccept,
  onDismiss,
  isLoading,
  showActions = true,
  showDetails = false
}) => {
  const getDecisionIcon = () => {
    switch(decision.type) {
      case 'journal_entry':
        return <Calculator className="h-5 w-5 text-indigo-500" />;
      case 'pricing':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'provision':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'variance':
        return <FileText className="h-5 w-5 text-blue-500" />;
      default:
        return <ArrowUpRight className="h-5 w-5 text-gray-500" />;
    }
  };

  const getDecisionTypeName = () => {
    switch(decision.type) {
      case 'journal_entry': return "قيد محاسبي";
      case 'pricing': return "تعديل سعر";
      case 'provision': return "مخصص";
      case 'variance': return "تحليل فروقات";
    }
  };

  const getStatusBadge = () => {
    switch(decision.status) {
      case 'suggested':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">مقترح</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">مقبول</Badge>;
      case 'implemented':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">منفذ</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">مرفوض</Badge>;
    }
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) {
      return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">ثقة عالية ({confidence}%)</Badge>;
    } else if (confidence >= 70) {
      return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300">ثقة متوسطة ({confidence}%)</Badge>;
    } else {
      return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">تقديري ({confidence}%)</Badge>;
    }
  };

  const renderSpecificDetails = () => {
    if (!showDetails) return null;

    switch(decision.type) {
      case 'journal_entry':
        const journalDecision = decision as JournalEntrySuggestion;
        return (
          <div className="mt-3 border-t pt-3">
            <h4 className="text-sm font-semibold mb-2">بنود القيد المقترح:</h4>
            <div className="bg-muted/50 p-2 rounded text-xs">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-right pb-1">الحساب</th>
                    <th className="text-left pb-1">مدين</th>
                    <th className="text-left pb-1">دائن</th>
                  </tr>
                </thead>
                <tbody>
                  {journalDecision.suggestedLines.map((line, idx) => (
                    <tr key={idx} className="border-b border-dashed">
                      <td className="py-1">{line.accountName}</td>
                      <td className="py-1 text-left">{line.debit ? line.debit.toLocaleString() : ''}</td>
                      <td className="py-1 text-left">{line.credit ? line.credit.toLocaleString() : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {journalDecision.preventionReason && (
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">السبب: {journalDecision.preventionReason}</span>
              </div>
            )}
          </div>
        );
      
      case 'pricing':
        const pricingDecision = decision as PricingSuggestion;
        return (
          <div className="mt-3 border-t pt-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">المنتج:</span> {pricingDecision.productName}
              </div>
              <div>
                <span className="text-muted-foreground">السعر الحالي:</span> {pricingDecision.currentPrice.toLocaleString()}
              </div>
              <div>
                <span className="text-muted-foreground">السعر المقترح:</span> 
                <span className={pricingDecision.suggestedPrice > pricingDecision.currentPrice ? "text-green-600" : "text-red-600"}>
                  {pricingDecision.suggestedPrice.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">نسبة التغيير:</span> 
                <span className={pricingDecision.suggestedPrice > pricingDecision.currentPrice ? "text-green-600" : "text-red-600"}>
                  {(((pricingDecision.suggestedPrice - pricingDecision.currentPrice) / pricingDecision.currentPrice) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-muted-foreground">الإيرادات المتوقعة:</span> {pricingDecision.expectedRevenue.toLocaleString()}
            </div>
          </div>
        );

      case 'provision':
        const provisionDecision = decision as ProvisionSuggestion;
        return (
          <div className="mt-3 border-t pt-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">الحساب:</span> {provisionDecision.accountName}
              </div>
              <div>
                <span className="text-muted-foreground">المبلغ الحالي:</span> {provisionDecision.currentAmount.toLocaleString()}
              </div>
              <div>
                <span className="text-muted-foreground">المبلغ المقترح:</span> {provisionDecision.suggestedAmount.toLocaleString()}
              </div>
              <div>
                <span className="text-muted-foreground">التصنيف:</span> 
                {provisionDecision.category === 'bad_debts' && 'ديون معدومة'}
                {provisionDecision.category === 'inventory' && 'مخزون'}
                {provisionDecision.category === 'legal' && 'قانوني'}
                {provisionDecision.category === 'other' && 'أخرى'}
              </div>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-muted-foreground">عامل المخاطرة:</span> {provisionDecision.riskFactor * 100}%
            </div>
          </div>
        );

      case 'variance':
        const varianceDecision = decision as VarianceAnalysis;
        return (
          <div className="mt-3 border-t pt-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">الحساب:</span> {varianceDecision.accountName}
              </div>
              <div>
                <span className="text-muted-foreground">المبلغ المتوقع:</span> {varianceDecision.expectedAmount.toLocaleString()}
              </div>
              <div>
                <span className="text-muted-foreground">المبلغ الفعلي:</span> {varianceDecision.actualAmount.toLocaleString()}
              </div>
              <div>
                <span className="text-muted-foreground">نسبة الفرق:</span> 
                <span className={varianceDecision.variance > 0 ? "text-green-600" : "text-red-600"}>
                  {varianceDecision.variancePercentage}%
                </span>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <span className="text-muted-foreground">التفسير:</span> {varianceDecision.explanation}
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-2">
            {getDecisionIcon()}
            <div>
              <CardTitle className="text-lg">{decision.title}</CardTitle>
              <div className="flex items-center gap-1 mt-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {format(new Date(decision.createdAt), 'PPP', { locale: ar })}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {getStatusBadge()}
            <Badge variant="outline" className="text-xs">{getDecisionTypeName()}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-3">{decision.description}</p>
        
        <div className="flex justify-between items-center my-2">
          <div className="text-sm">
            <span className="text-muted-foreground">التأثير:</span> 
            <span className={decision.impact > 0 ? "text-green-600" : "text-red-600"}>
              {decision.impact.toLocaleString()} ريال
            </span>
          </div>
          {getConfidenceBadge(decision.confidence)}
        </div>
        
        {decision.suggestedActions.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-semibold mb-1">الإجراءات المقترحة:</h4>
            <ul className="text-sm space-y-1 list-disc list-inside rtl">
              {decision.suggestedActions.map((action, idx) => (
                <li key={idx}>{action}</li>
              ))}
            </ul>
          </div>
        )}

        {renderSpecificDetails()}
      </CardContent>
      
      {showActions && (
        <CardFooter className="flex justify-end gap-2 pt-0">
          {decision.status === 'suggested' && (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onDismiss(decision.id)}
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                <XCircle className="h-4 w-4" /> تجاهل
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onAccept(decision.id)}
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                <ThumbsUp className="h-4 w-4" /> قبول
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => onImplement(decision.id)}
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                <CheckCircle className="h-4 w-4" /> تنفيذ
              </Button>
            </>
          )}
          {decision.status === 'accepted' && (
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => onImplement(decision.id)}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              <CheckCircle className="h-4 w-4" /> تنفيذ
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
