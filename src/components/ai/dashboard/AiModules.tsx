
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Bot, LineChart, ChartLine, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

export const AiModules: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5" />
          وحدات الذكاء الاصطناعي
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          className="p-4 rounded-lg bg-blue-50 border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors"
          onClick={() => navigate("/ai/assistant")}
        >
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            <h3 className="font-medium">المساعد الذكي</h3>
          </div>
          <p className="text-sm mt-1 text-muted-foreground">
            مساعد ذكي يجيب على استفساراتك ويساعدك في تحليل البيانات
          </p>
        </div>

        <div 
          className="p-4 rounded-lg bg-violet-50 border border-violet-100 cursor-pointer hover:bg-violet-100 transition-colors"
          onClick={() => navigate("/ai/financial-decisions")}
        >
          <div className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-violet-600" />
            <h3 className="font-medium">القرارات المالية</h3>
          </div>
          <p className="text-sm mt-1 text-muted-foreground">
            تحليلات وتوصيات ذكية لتحسين الأداء المالي واتخاذ القرارات
          </p>
        </div>

        <div 
          className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 cursor-pointer hover:bg-emerald-100 transition-colors"
          onClick={() => navigate("/ai/financial-forecast")}
        >
          <div className="flex items-center gap-2">
            <ChartLine className="h-5 w-5 text-emerald-600" />
            <h3 className="font-medium">التوقعات المالية</h3>
          </div>
          <p className="text-sm mt-1 text-muted-foreground">
            تنبؤات مستقبلية ذكية للإيرادات والمصروفات والتدفقات النقدية
          </p>
        </div>

        <Separator className="my-2" />

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => navigate("/ai/settings")}
        >
          <Zap className="h-4 w-4 ml-2" />
          إدارة إعدادات الذكاء الاصطناعي
        </Button>
      </CardContent>
    </Card>
  );
};
