
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FinancialDecision, 
  JournalEntrySuggestion,
  PricingSuggestion,
  ProvisionSuggestion,
  VarianceAnalysis
} from "@/types/ai-finance";
import { useFinancialDecisions } from "@/hooks/useFinancialDecisions";
import { Calculator, DollarSign, AlertCircle, FileText } from "lucide-react";

const FinancialDecisionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { decisions, implementDecision, dismissDecision } = useFinancialDecisions();
  
  // تصفية القرارات حسب النوع النشط
  const filteredDecisions = activeTab === "all" 
    ? decisions 
    : decisions.filter(decision => decision.type === activeTab);

  // تصنيف القرارات حسب مستوى الثقة
  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 90) {
      return <Badge variant="success" className="bg-green-100 text-green-800 border-green-300">ثقة عالية ({confidence}%)</Badge>;
    } else if (confidence >= 70) {
      return <Badge variant="warning" className="bg-amber-100 text-amber-800 border-amber-300">ثقة متوسطة ({confidence}%)</Badge>;
    } else {
      return <Badge variant="danger" className="bg-blue-100 text-blue-800 border-blue-300">تقديري ({confidence}%)</Badge>;
    }
  };

  // عرض مضمون القرار بناءً على نوعه
  const renderDecisionContent = (decision: FinancialDecision) => {
    switch(decision.type) {
      case 'journal_entry':
        return renderJournalSuggestion(decision as JournalEntrySuggestion);
      case 'pricing':
        return renderPricingSuggestion(decision as PricingSuggestion);
      case 'provision':
        return renderProvisionSuggestion(decision as ProvisionSuggestion);
      case 'variance':
        return renderVarianceAnalysis(decision as VarianceAnalysis);
      default:
        return <p>محتوى القرار غير متاح</p>;
    }
  };

  const renderJournalSuggestion = (suggestion: JournalEntrySuggestion) => (
    <div className="space-y-3 mt-2">
      {suggestion.commonError && (
        <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
          <strong className="block">خطأ محتمل:</strong> {suggestion.commonError}
        </div>
      )}
      
      <div className="border rounded-md">
        <div className="bg-gray-50 p-2 border-b font-medium text-sm flex justify-between items-center">
          <span>تفاصيل القيد المقترح</span>
          <Badge variant="outline">التأثير: {suggestion.impact.toLocaleString()} ريال</Badge>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-2 px-3 text-right">الحساب</th>
              <th className="py-2 px-3 text-right">البيان</th>
              <th className="py-2 px-3 text-left">مدين</th>
              <th className="py-2 px-3 text-left">دائن</th>
            </tr>
          </thead>
          <tbody>
            {suggestion.suggestedLines.map((line, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-3">{line.accountName} ({line.accountId})</td>
                <td className="py-2 px-3">{line.description}</td>
                <td className="py-2 px-3 text-left">{line.debit > 0 ? line.debit.toLocaleString() : "-"}</td>
                <td className="py-2 px-3 text-left">{line.credit > 0 ? line.credit.toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50">
            <tr>
              <th colSpan={2} className="py-2 px-3 text-right">المجموع</th>
              <th className="py-2 px-3 text-left">
                {suggestion.suggestedLines.reduce((sum, line) => sum + line.debit, 0).toLocaleString()}
              </th>
              <th className="py-2 px-3 text-left">
                {suggestion.suggestedLines.reduce((sum, line) => sum + line.credit, 0).toLocaleString()}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      
      {suggestion.preventionReason && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
          <strong className="block">سبب الاقتراح:</strong> {suggestion.preventionReason}
        </div>
      )}
    </div>
  );

  const renderPricingSuggestion = (suggestion: PricingSuggestion) => (
    <div className="space-y-3 mt-2">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500">المنتج:</span>
          <h4 className="font-medium">{suggestion.productName}</h4>
        </div>
        <Badge variant="outline" className={suggestion.suggestedPrice > suggestion.currentPrice ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}>
          {suggestion.suggestedPrice > suggestion.currentPrice ? "زيادة السعر" : "خفض السعر"}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-sm text-gray-500">السعر الحالي</div>
          <div className="text-lg font-semibold">{suggestion.currentPrice.toLocaleString()} ريال</div>
        </div>
        <div className="bg-blue-50 p-3 rounded border border-blue-200">
          <div className="text-sm text-gray-500">السعر المقترح</div>
          <div className="text-lg font-semibold">{suggestion.suggestedPrice.toLocaleString()} ريال</div>
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden mt-3">
        <div className="bg-gray-50 p-2 border-b font-medium text-sm">العوامل المؤثرة</div>
        <div className="p-3 text-sm space-y-2">
          <div className="flex justify-between">
            <span>نسبة التغيير</span>
            <span className={suggestion.suggestedPrice > suggestion.currentPrice ? "text-green-600" : "text-red-600"}>
              {(Math.abs(suggestion.suggestedPrice - suggestion.currentPrice) / suggestion.currentPrice * 100).toFixed(1)}%
            </span>
          </div>
          
          {suggestion.demandFactor !== undefined && (
            <div className="flex justify-between">
              <span>الطلب</span>
              <span className={suggestion.demandFactor > 0 ? "text-green-600" : "text-red-600"}>
                {suggestion.demandFactor > 0 ? "متزايد" : "منخفض"}
              </span>
            </div>
          )}
          
          {suggestion.costFactor !== undefined && (
            <div className="flex justify-between">
              <span>التكلفة</span>
              <span className={suggestion.costFactor < 0 ? "text-green-600" : "text-red-600"}>
                {suggestion.costFactor > 0 ? "متزايدة" : "منخفضة"}
              </span>
            </div>
          )}
          
          {suggestion.competitionFactor !== undefined && (
            <div className="flex justify-between">
              <span>المنافسة</span>
              <span>{suggestion.competitionFactor > 0 ? "أسعار عالية" : "أسعار منخفضة"}</span>
            </div>
          )}
          
          <div className="flex justify-between border-t pt-2">
            <span className="font-medium">الإيرادات المتوقعة</span>
            <span className="font-medium">{suggestion.expectedRevenue.toLocaleString()} ريال</span>
          </div>
        </div>
      </div>
      
      <div className="p-3 bg-amber-50 border border-amber-200 rounded text-sm">
        <strong className="block">سبب التعديل:</strong> 
        {suggestion.priceChangeReason === 'demand' && 'تغير في مستوى الطلب على المنتج'}
        {suggestion.priceChangeReason === 'cost' && 'تغير في تكلفة المنتج'}
        {suggestion.priceChangeReason === 'competition' && 'تغير في أسعار المنافسين'}
        {suggestion.priceChangeReason === 'seasonality' && 'تغير موسمي في السوق'}
        {suggestion.priceChangeReason === 'other' && 'أسباب أخرى'}
      </div>
    </div>
  );

  const renderProvisionSuggestion = (suggestion: ProvisionSuggestion) => (
    <div className="space-y-3 mt-2">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500">حساب المخصص:</span>
          <h4 className="font-medium">{suggestion.accountName}</h4>
        </div>
        <Badge className={`bg-${suggestion.riskFactor > 70 ? "red" : suggestion.riskFactor > 40 ? "amber" : "yellow"}-50 text-${suggestion.riskFactor > 70 ? "red" : suggestion.riskFactor > 40 ? "amber" : "yellow"}-700 border-${suggestion.riskFactor > 70 ? "red" : suggestion.riskFactor > 40 ? "amber" : "yellow"}-200`}>
          مستوى الخطر: {suggestion.riskFactor}%
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-sm text-gray-500">المخصص الحالي</div>
          <div className="text-lg font-semibold">{suggestion.currentAmount.toLocaleString()} ريال</div>
        </div>
        <div className="bg-blue-50 p-3 rounded border border-blue-200">
          <div className="text-sm text-gray-500">المخصص المقترح</div>
          <div className="text-lg font-semibold">{suggestion.suggestedAmount.toLocaleString()} ريال</div>
        </div>
      </div>
      
      <div className="p-3 bg-gray-50 border rounded text-sm">
        <strong className="block">نوع المخصص:</strong>
        {
          suggestion.category === 'bad_debts' ? 'مخصص ديون مشكوك في تحصيلها' :
          suggestion.category === 'inventory_obsolescence' ? 'مخصص تقادم مخزون' :
          suggestion.category === 'warranties' ? 'مخصص ضمانات' :
          suggestion.category === 'legal_claims' ? 'مخصص مطالبات قانونية' :
          'مخصص آخر'
        }
      </div>
      
      <div className="p-3 bg-amber-50 border border-amber-200 rounded text-sm">
        <strong className="block">سبب المخصص:</strong>
        {suggestion.description}
      </div>
    </div>
  );

  const renderVarianceAnalysis = (analysis: VarianceAnalysis) => (
    <div className="space-y-3 mt-2">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500">الحساب:</span>
          <h4 className="font-medium">{analysis.accountName}</h4>
        </div>
        <Badge className={`bg-${analysis.severity === 'high' ? "red" : analysis.severity === 'medium' ? "amber" : "green"}-50 text-${analysis.severity === 'high' ? "red" : analysis.severity === 'medium' ? "amber" : "green"}-700 border-${analysis.severity === 'high' ? "red" : analysis.severity === 'medium' ? "amber" : "green"}-200`}>
          {
            analysis.severity === 'high' ? 'تباين مرتفع' :
            analysis.severity === 'medium' ? 'تباين متوسط' :
            'تباين منخفض'
          }
        </Badge>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mt-2">
        <div className="bg-gray-50 p-3 rounded border">
          <div className="text-sm text-gray-500">القيمة المتوقعة</div>
          <div className="text-lg font-semibold">{analysis.expectedAmount.toLocaleString()} ريال</div>
        </div>
        <div className="bg-blue-50 p-3 rounded border border-blue-200">
          <div className="text-sm text-gray-500">القيمة الفعلية</div>
          <div className="text-lg font-semibold">{analysis.actualAmount.toLocaleString()} ريال</div>
        </div>
        <div className="bg-amber-50 p-3 rounded border border-amber-200">
          <div className="text-sm text-gray-500">الفرق</div>
          <div className={`text-lg font-semibold ${analysis.variance > 0 ? "text-green-600" : "text-red-600"}`}>
            {analysis.variance.toLocaleString()} ريال ({analysis.variancePercentage.toFixed(1)}%)
          </div>
        </div>
      </div>
      
      <div className="p-3 bg-green-50 border border-green-200 rounded text-sm">
        <strong className="block">التحليل والتفسير:</strong>
        {analysis.explanation}
      </div>
    </div>
  );

  // عرض بطاقة قرار
  const renderDecisionCard = (decision: FinancialDecision) => {
    // الأيقونة حسب نوع القرار
    let decisionIcon;
    switch(decision.type) {
      case 'journal_entry':
        decisionIcon = <Calculator className="h-5 w-5 text-indigo-500" />;
        break;
      case 'pricing':
        decisionIcon = <DollarSign className="h-5 w-5 text-green-500" />;
        break;
      case 'provision':
        decisionIcon = <AlertCircle className="h-5 w-5 text-amber-500" />;
        break;
      case 'variance':
        decisionIcon = <FileText className="h-5 w-5 text-blue-500" />;
        break;
    }

    return (
      <Card key={decision.id} className="mb-4">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {decisionIcon}
              <CardTitle className="mr-2 text-lg">
                {decision.title}
              </CardTitle>
              {getConfidenceBadge(decision.confidence)}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(decision.createdAt).toLocaleDateString('ar-SA', { 
                day: 'numeric', 
                month: 'long',
                hour: '2-digit', 
                minute: '2-digit'
              })}
            </div>
          </div>
          <CardDescription>{decision.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-3">
          {renderDecisionContent(decision)}
          
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" size="sm" onClick={() => dismissDecision(decision.id)}>
              تجاهل
            </Button>
            <Button size="sm" onClick={() => implementDecision(decision.id)}>
              تنفيذ القرار
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  // الواجهة الرئيسية
  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="محرك القرارات المالي الذكي" showBack={true} />

      <div className="grid gap-6 mt-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>القرارات والاقتراحات المالية</CardTitle>
            <CardDescription>
              تصفح وأدر القرارات واقتراحات التحسين التي قدمها المحرك الذكي
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">الكل ({decisions.length})</TabsTrigger>
                <TabsTrigger value="journal_entry" className="flex items-center gap-1">
                  <Calculator className="h-4 w-4" />
                  قيود محاسبية ({decisions.filter(d => d.type === 'journal_entry').length})
                </TabsTrigger>
                <TabsTrigger value="pricing" className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  تسعير ({decisions.filter(d => d.type === 'pricing').length})
                </TabsTrigger>
                <TabsTrigger value="provision" className="flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  مخصصات ({decisions.filter(d => d.type === 'provision').length})
                </TabsTrigger>
                <TabsTrigger value="variance" className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  فروقات ({decisions.filter(d => d.type === 'variance').length})
                </TabsTrigger>
              </TabsList>

              <ScrollArea className="h-[600px] pr-4 -mr-4">
                {filteredDecisions.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">لا توجد قرارات أو اقتراحات في هذا القسم</p>
                  </div>
                ) : (
                  filteredDecisions.map(renderDecisionCard)
                )}
              </ScrollArea>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinancialDecisionsPage;
