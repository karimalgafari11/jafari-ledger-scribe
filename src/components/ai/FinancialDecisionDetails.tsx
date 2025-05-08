
import React from 'react';
import { 
  FinancialDecision, 
  JournalEntrySuggestion,
  PricingSuggestion, 
  ProvisionSuggestion, 
  VarianceAnalysis 
} from '@/types/ai-finance';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Calculator, 
  DollarSign, 
  AlertCircle, 
  FileText, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown,
  CheckCircle2,
  XCircle,
  Info
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

interface FinancialDecisionDetailsProps {
  decision: FinancialDecision;
}

export const FinancialDecisionDetails: React.FC<FinancialDecisionDetailsProps> = ({ decision }) => {
  // تحديد أيقونة ولون القرار
  const getDecisionIconAndColor = () => {
    switch(decision.type) {
      case 'journal_entry':
        return { icon: <Calculator className="h-6 w-6" />, color: 'bg-indigo-100 text-indigo-700' };
      case 'pricing':
        return { icon: <DollarSign className="h-6 w-6" />, color: 'bg-green-100 text-green-700' };
      case 'provision':
        return { icon: <AlertCircle className="h-6 w-6" />, color: 'bg-amber-100 text-amber-700' };
      case 'variance':
        return { icon: <FileText className="h-6 w-6" />, color: 'bg-blue-100 text-blue-700' };
      default:
        return { icon: <Info className="h-6 w-6" />, color: 'bg-gray-100 text-gray-700' };
    }
  };

  // الحصول على اسم نوع القرار بالعربية
  const getDecisionTypeName = () => {
    switch(decision.type) {
      case 'journal_entry': return "قيد محاسبي";
      case 'pricing': return "تعديل سعر";
      case 'provision': return "مخصص";
      case 'variance': return "تحليل فروقات";
      default: return "قرار مالي";
    }
  };

  // عرض حالة القرار
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

  // عرض تفاصيل قيد محاسبي
  const renderJournalEntryDetails = () => {
    const journalDecision = decision as JournalEntrySuggestion;
    
    return (
      <div className="space-y-4">
        <div className="bg-muted/40 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">بنود القيد المقترح:</h4>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-right py-2">الحساب</th>
                <th className="text-left py-2">مدين</th>
                <th className="text-left py-2">دائن</th>
              </tr>
            </thead>
            <tbody>
              {journalDecision.suggestedLines.map((line, idx) => (
                <tr key={idx} className="border-b border-dashed">
                  <td className="py-2">{line.accountName}</td>
                  <td className="py-2 text-left">{line.debit ? line.debit.toLocaleString() : '-'}</td>
                  <td className="py-2 text-left">{line.credit ? line.credit.toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {journalDecision.preventionReason && (
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
            <div className="flex gap-2">
              <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-800">السبب:</h4>
                <p className="text-sm text-amber-700">{journalDecision.preventionReason}</p>
              </div>
            </div>
          </div>
        )}

        {journalDecision.commonError && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex gap-2">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800">الخطأ الشائع:</h4>
                <p className="text-sm text-blue-700">{journalDecision.commonError}</p>
              </div>
            </div>
          </div>
        )}

        {journalDecision.affectedStatements && journalDecision.affectedStatements.length > 0 && (
          <div>
            <h4 className="font-semibold mb-1">البيانات المالية المتأثرة:</h4>
            <div className="flex gap-2 flex-wrap">
              {journalDecision.affectedStatements.includes('balance_sheet') && (
                <Badge variant="outline" className="bg-blue-50">الميزانية العمومية</Badge>
              )}
              {journalDecision.affectedStatements.includes('income_statement') && (
                <Badge variant="outline" className="bg-green-50">قائمة الدخل</Badge>
              )}
              {journalDecision.affectedStatements.includes('cash_flow') && (
                <Badge variant="outline" className="bg-purple-50">التدفقات النقدية</Badge>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  // عرض تفاصيل اقتراح تسعير
  const renderPricingDetails = () => {
    const pricingDecision = decision as PricingSuggestion;
    const priceChange = pricingDecision.suggestedPrice - pricingDecision.currentPrice;
    const priceChangePercentage = (priceChange / pricingDecision.currentPrice) * 100;
    const isIncrease = priceChange > 0;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/40 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">المنتج</p>
            <p className="font-semibold">{pricingDecision.productName}</p>
            <p className="text-xs text-muted-foreground mt-2">رمز المنتج</p>
            <p className="font-mono">{pricingDecision.productId}</p>
          </div>
          
          <div className="bg-muted/40 p-3 rounded-lg flex flex-col justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">السعر الحالي</p>
              <p className="font-semibold">{pricingDecision.currentPrice.toLocaleString()} ريال</p>
            </div>
            <div className="mt-auto">
              <p className="text-xs text-muted-foreground mb-1">السعر المقترح</p>
              <p className={`font-semibold ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
                {pricingDecision.suggestedPrice.toLocaleString()} ريال
              </p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">التغيير في السعر</span>
            <div className="flex items-center gap-1">
              {isIncrease ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm font-bold ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
                {priceChangePercentage.toFixed(1)}%
              </span>
            </div>
          </div>
          <Progress 
            value={isIncrease ? Math.min(priceChangePercentage * 2, 100) : Math.min(Math.abs(priceChangePercentage) * 2, 100)} 
            className="h-2"
            indicatorClassName={isIncrease ? 'bg-green-500' : 'bg-red-500'}
          />
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <h4 className="font-semibold text-green-800 mb-1">الإيرادات المتوقعة</h4>
          <p className="text-green-700 font-bold text-lg">{pricingDecision.expectedRevenue.toLocaleString()} ريال</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">عوامل التسعير:</h4>
          <div className="space-y-2">
            {pricingDecision.demandFactor !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-sm">عامل الطلب</span>
                <Progress 
                  value={pricingDecision.demandFactor * 100} 
                  className="h-2 w-1/2"
                  indicatorClassName="bg-blue-500"
                />
                <span className="text-sm font-medium">{(pricingDecision.demandFactor * 100).toFixed(0)}%</span>
              </div>
            )}
            
            {pricingDecision.costFactor !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-sm">عامل التكلفة</span>
                <Progress 
                  value={pricingDecision.costFactor * 100} 
                  className="h-2 w-1/2"
                  indicatorClassName="bg-orange-500"
                />
                <span className="text-sm font-medium">{(pricingDecision.costFactor * 100).toFixed(0)}%</span>
              </div>
            )}
            
            {pricingDecision.competitionFactor !== undefined && (
              <div className="flex justify-between items-center">
                <span className="text-sm">عامل المنافسة</span>
                <Progress 
                  value={pricingDecision.competitionFactor * 100} 
                  className="h-2 w-1/2"
                  indicatorClassName="bg-purple-500"
                />
                <span className="text-sm font-medium">{(pricingDecision.competitionFactor * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>
        </div>

        {pricingDecision.marketResearch && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex gap-2">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800">بيانات بحث السوق:</h4>
                <p className="text-sm text-blue-700">{pricingDecision.marketResearch}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // عرض تفاصيل المخصصات
  const renderProvisionDetails = () => {
    const provisionDecision = decision as ProvisionSuggestion;
    const provisionChange = provisionDecision.suggestedAmount - provisionDecision.currentAmount;
    const provisionChangePercentage = (provisionChange / provisionDecision.currentAmount) * 100;
    const isIncrease = provisionChange > 0;
    
    // تحويل التصنيف إلى نص عربي
    const getCategoryName = () => {
      switch(provisionDecision.category) {
        case 'bad_debts': return 'ديون معدومة';
        case 'inventory': return 'مخزون';
        case 'legal': return 'قانوني';
        case 'other': return 'أخرى';
      }
    };
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/40 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">الحساب</p>
            <p className="font-semibold">{provisionDecision.accountName}</p>
            <p className="text-xs text-muted-foreground mt-2">رمز الحساب</p>
            <p className="font-mono">{provisionDecision.accountId}</p>
          </div>
          
          <div className="bg-amber-50 p-3 rounded-lg">
            <p className="text-xs text-amber-800 mb-1">تصنيف المخصص</p>
            <div className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <p className="font-semibold text-amber-800">{getCategoryName()}</p>
            </div>
            <p className="text-xs text-amber-800 mt-2">عامل المخاطرة</p>
            <p className="font-semibold text-amber-800">{(provisionDecision.riskFactor * 100).toFixed(1)}%</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-muted-foreground mb-1">المبلغ الحالي</p>
            <p className="font-semibold">{provisionDecision.currentAmount.toLocaleString()} ريال</p>
          </div>
          
          <div className="p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-muted-foreground mb-1">المبلغ المقترح</p>
            <p className={`font-semibold ${isIncrease ? 'text-amber-600' : 'text-green-600'}`}>
              {provisionDecision.suggestedAmount.toLocaleString()} ريال
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">التغيير في المخصص</span>
            <div className="flex items-center gap-1">
              {isIncrease ? (
                <TrendingUp className="h-4 w-4 text-amber-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-green-500" />
              )}
              <span className={`text-sm font-bold ${isIncrease ? 'text-amber-600' : 'text-green-600'}`}>
                {Math.abs(provisionChangePercentage).toFixed(1)}%
              </span>
            </div>
          </div>
          <Progress 
            value={Math.min(Math.abs(provisionChangePercentage), 100)} 
            className="h-2"
            indicatorClassName={isIncrease ? 'bg-amber-500' : 'bg-green-500'}
          />
        </div>

        {provisionDecision.calculationMethod && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="flex gap-2">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800">طريقة حساب المخصص:</h4>
                <p className="text-sm text-blue-700">{provisionDecision.calculationMethod}</p>
              </div>
            </div>
          </div>
        )}

        {provisionDecision.historicalData && provisionDecision.historicalData.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">البيانات التاريخية:</h4>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px] text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-right py-2">الفترة</th>
                    <th className="text-left py-2">المبلغ</th>
                  </tr>
                </thead>
                <tbody>
                  {provisionDecision.historicalData.map((item, idx) => (
                    <tr key={idx} className="border-b border-dashed">
                      <td className="py-2">{item.period}</td>
                      <td className="py-2 text-left">{item.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // عرض تفاصيل تحليل الفروقات
  const renderVarianceDetails = () => {
    const varianceDecision = decision as VarianceAnalysis;
    const varianceValue = varianceDecision.actualAmount - varianceDecision.expectedAmount;
    const isPositive = varianceValue > 0;
    
    // تحويل شدة الفروقات إلى نص عربي
    const getSeverityName = () => {
      switch(varianceDecision.severity) {
        case 'low': return 'منخفضة';
        case 'medium': return 'متوسطة';
        case 'high': return 'مرتفعة';
      }
    };

    const getSeverityColor = () => {
      switch(varianceDecision.severity) {
        case 'low': return 'text-green-600';
        case 'medium': return 'text-amber-600';
        case 'high': return 'text-red-600';
      }
    };
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/40 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">الحساب</p>
            <p className="font-semibold">{varianceDecision.accountName}</p>
            <p className="text-xs text-muted-foreground mt-2">رمز الحساب</p>
            <p className="font-mono">{varianceDecision.accountId}</p>
          </div>
          
          <div className="bg-muted/40 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">شدة الفروقات</p>
            <p className={`font-semibold ${getSeverityColor()}`}>{getSeverityName()}</p>
            {varianceDecision.period && (
              <>
                <p className="text-xs text-muted-foreground mt-2">الفترة</p>
                <p className="font-semibold">{varianceDecision.period}</p>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-muted-foreground mb-1">المبلغ المتوقع</p>
            <p className="font-semibold">{varianceDecision.expectedAmount.toLocaleString()} ريال</p>
          </div>
          
          <div className="p-3 rounded-lg border border-gray-200">
            <p className="text-xs text-muted-foreground mb-1">المبلغ الفعلي</p>
            <p className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {varianceDecision.actualAmount.toLocaleString()} ريال
            </p>
          </div>
        </div>

        <div className="p-3 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">الفرق</span>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
              <span className={`text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {varianceDecision.variancePercentage}%
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{varianceDecision.expectedAmount.toLocaleString()}</span>
            <Progress 
              value={50 + (isPositive ? Math.min(varianceDecision.variancePercentage, 50) : -Math.min(Math.abs(varianceDecision.variancePercentage), 50))} 
              className="h-2 flex-1"
              indicatorClassName={isPositive ? 'bg-green-500' : 'bg-red-500'}
            />
            <span className="text-sm">{varianceDecision.actualAmount.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <div className="flex gap-2">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800">تفسير الفروقات:</h4>
              <p className="text-sm text-blue-700">{varianceDecision.explanation}</p>
            </div>
          </div>
        </div>

        {varianceDecision.rootCauseAnalysis && varianceDecision.rootCauseAnalysis.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">تحليل الأسباب الجذرية:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              {varianceDecision.rootCauseAnalysis.map((cause, idx) => (
                <li key={idx}>{cause}</li>
              ))}
            </ul>
          </div>
        )}

        {varianceDecision.correctionPlan && (
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="flex gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-green-800">خطة التصحيح:</h4>
                <p className="text-sm text-green-700">{varianceDecision.correctionPlan}</p>
              </div>
            </div>
          </div>
        )}

        {varianceDecision.trend && varianceDecision.trend.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">اتجاه الفروقات:</h4>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[400px] text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-right py-2">الفترة</th>
                    <th className="text-left py-2">الفرق</th>
                  </tr>
                </thead>
                <tbody>
                  {varianceDecision.trend.map((item, idx) => (
                    <tr key={idx} className="border-b border-dashed">
                      <td className="py-2">{item.period}</td>
                      <td className={`py-2 text-left ${item.variance > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.variance > 0 ? '+' : ''}{item.variance}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  // اختيار العرض المناسب حسب نوع القرار
  const renderDecisionDetails = () => {
    switch(decision.type) {
      case 'journal_entry':
        return renderJournalEntryDetails();
      case 'pricing':
        return renderPricingDetails();
      case 'provision':
        return renderProvisionDetails();
      case 'variance':
        return renderVarianceDetails();
      default:
        return <p>التفاصيل غير متوفرة لهذا النوع من القرارات.</p>;
    }
  };

  const { icon, color } = getDecisionIconAndColor();
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${color}`}>
              {icon}
            </div>
            <div>
              <CardTitle>{decision.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {getDecisionTypeName()} • {format(new Date(decision.createdAt), 'PPP', { locale: ar })}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            {getStatusBadge()}
            <Badge variant="outline" className={decision.impact >= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}>
              التأثير: {decision.impact.toLocaleString()} ريال
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm">{decision.description}</p>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Badge variant="outline">مستوى الثقة: {decision.confidence}%</Badge>
              {decision.aiConfidenceReason && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 cursor-help" title={decision.aiConfidenceReason}>
                  <Info className="h-3 w-3 mr-1" />
                  مبرر مستوى الثقة
                </Badge>
              )}
            </div>
            {decision.implementedAt && (
              <Badge variant="outline" className="bg-green-50 text-green-700">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                تم التنفيذ: {format(new Date(decision.implementedAt), 'PPP', { locale: ar })}
              </Badge>
            )}
          </div>

          <Separator />
          
          <div>
            <h3 className="font-semibold mb-3">تفاصيل القرار</h3>
            {renderDecisionDetails()}
          </div>

          {decision.suggestedActions.length > 0 && (
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="actions">
                  <AccordionTrigger className="text-blue-600 hover:no-underline hover:text-blue-700">
                    الإجراءات المقترحة
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1 list-disc list-inside text-sm">
                      {decision.suggestedActions.map((action, idx) => (
                        <li key={idx} className="text-muted-foreground">{action}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          
          {decision.tags && decision.tags.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">الوسوم:</p>
              <div className="flex flex-wrap gap-1">
                {decision.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialDecisionDetails;
