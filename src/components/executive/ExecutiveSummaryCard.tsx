
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ExecutiveSummary } from "@/types/executive-dashboard";
import { AlertTriangle, CheckCircle, HelpCircle, Info, XCircle } from "lucide-react";

interface ExecutiveSummaryCardProps {
  summary: ExecutiveSummary;
  className?: string;
}

export const ExecutiveSummaryCard: React.FC<ExecutiveSummaryCardProps> = ({
  summary,
  className = ""
}) => {
  const getHealthIcon = () => {
    switch (summary.financialHealth) {
      case 'excellent':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'good':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'fair':
        return <Info className="h-5 w-5 text-amber-500" />;
      case 'poor':
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'critical':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getHealthColor = () => {
    switch (summary.financialHealth) {
      case 'excellent':
        return "text-green-700 bg-green-50 border-green-200";
      case 'good':
        return "text-blue-700 bg-blue-50 border-blue-200";
      case 'fair':
        return "text-amber-700 bg-amber-50 border-amber-200";
      case 'poor':
        return "text-orange-700 bg-orange-50 border-orange-200";
      case 'critical':
        return "text-red-700 bg-red-50 border-red-200";
      default:
        return "text-gray-700 bg-gray-50 border-gray-200";
    }
  };

  const getHealthText = () => {
    switch (summary.financialHealth) {
      case 'excellent':
        return "ممتاز";
      case 'good':
        return "جيد";
      case 'fair':
        return "متوسط";
      case 'poor':
        return "ضعيف";
      case 'critical':
        return "حرج";
      default:
        return summary.financialHealth;
    }
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>الملخص التنفيذي</span>
          <Badge className={`${getHealthColor()} flex items-center gap-1 px-2 py-0.5`}>
            {getHealthIcon()}
            <span>الوضع المالي: {getHealthText()}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold mb-2">الرؤى الرئيسية</h3>
            <ul className="space-y-2">
              {summary.keyInsights.map((insight, index) => (
                <li key={index} className="text-sm flex gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold mb-2">التوصيات</h3>
            <ul className="space-y-2">
              {summary.recommendations.map((recommendation, index) => (
                <li key={index} className="text-sm flex gap-2">
                  <span className="text-blue-600">•</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="space-y-2 mb-4">
              <h3 className="text-sm font-semibold">المخاطر</h3>
              <ul className="space-y-1">
                {summary.risks.map((risk, index) => (
                  <li key={index} className="text-sm flex gap-2">
                    <span className="text-red-600">•</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-semibold">الفرص</h3>
              <ul className="space-y-1">
                {summary.opportunities.map((opportunity, index) => (
                  <li key={index} className="text-sm flex gap-2">
                    <span className="text-green-600">•</span>
                    <span>{opportunity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {summary.risks.length > 0 && summary.risks.some(risk => risk.includes("عالية")) && (
          <Alert className="mt-4 bg-red-50 text-red-700">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              هناك مخاطر مالية عالية تتطلب اهتمامك العاجل. يرجى مراجعة قسم المخاطر للتفاصيل.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
