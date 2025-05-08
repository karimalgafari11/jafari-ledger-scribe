
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Brain, ChartLine, LineChart } from "lucide-react";
import { useAiAssistant } from "@/hooks/useAiAssistant";

export const AiModuleCards: React.FC = () => {
  const navigate = useNavigate();
  const { analyzePerformance } = useAiAssistant();
  const performance = analyzePerformance();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="bg-gradient-to-br from-indigo-50 to-blue-50 border-blue-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-indigo-600" />
            المساعد الذكي
          </CardTitle>
          <CardDescription>
            مساعد ذكي لتحليل البيانات والإجابة على استفساراتك
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <div>جاهز للإجابة على استفساراتك</div>
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">متصل</div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => navigate("/ai/assistant")}
            className="w-full"
            variant="outline"
          >
            بدء محادثة جديدة
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-purple-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-violet-600" />
            القرارات المالية
          </CardTitle>
          <CardDescription>
            تحليل وتوصيات مالية ذكية لتحسين أداء العمل
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <div>تم تحليل الأداء المالي</div>
            <div className="bg-violet-100 text-violet-800 px-2 py-1 rounded text-xs">
              {performance ? `${performance.recommendations.length} توصيات` : 'جاري التحليل...'}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => navigate("/ai/financial-decisions")}
            className="w-full"
            variant="outline"
          >
            عرض القرارات المالية
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-teal-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ChartLine className="h-5 w-5 text-emerald-600" />
            التوقعات المالية
          </CardTitle>
          <CardDescription>
            تنبؤات مالية مستقبلية باستخدام الذكاء الاصطناعي
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <div>توقعات للأشهر القادمة</div>
            <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs">جديد</div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => navigate("/ai/financial-forecast")}
            className="w-full"
            variant="outline"
          >
            استكشاف التوقعات
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
