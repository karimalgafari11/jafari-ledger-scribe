
import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, BarChart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AiAssistantPage = () => {
  const navigate = useNavigate();

  return (
    <PageContainer title="مساعد الذكاء الاصطناعي">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">المساعد الذكي</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/ai/assistant-module")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">المساعد المحاسبي</CardTitle>
              <MessageSquare className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">مساعد محاسبي ذكي يجيب على استفساراتك</p>
              <Button variant="link" className="p-0 mt-2 h-auto">بدء المحادثة</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/ai/dashboard")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">التحليلات الذكية</CardTitle>
              <BarChart className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">تحليلات ذكية للبيانات المالية</p>
              <Button variant="link" className="p-0 mt-2 h-auto">عرض التحليلات</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/ai/financial-forecast")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-lg">التنبؤات المالية</CardTitle>
              <Zap className="h-5 w-5 text-amber-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">تنبؤات مالية باستخدام الذكاء الاصطناعي</p>
              <Button variant="link" className="p-0 mt-2 h-auto">عرض التنبؤات</Button>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>مساعد الذكاء الاصطناعي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-6 rounded-md text-center">
              <p className="text-xl text-gray-600">سيتم تطوير هذه الصفحة قريباً</p>
              <p className="text-gray-500 mt-2">يمكنك استخدام المساعد الذكي لتحليل البيانات واتخاذ القرارات المالية</p>
              <Button variant="outline" className="mt-4" onClick={() => navigate("/ai/assistant-module")}>
                <Zap className="ml-2 h-4 w-4" /> الذهاب إلى وحدة المساعد الذكي
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
};

export default AiAssistantPage;
