
import React from "react";
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Zap, ArrowLeft, BarChart, FileText } from "lucide-react";

const AiAssistantModulePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header 
        title="مساعد الذكاء الاصطناعي" 
        showBack={true}
      >
        <span className="text-sm text-gray-300">استخدام الذكاء الاصطناعي لتحليل البيانات واتخاذ القرارات</span>
      </Header>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* المساعد الذكي */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/ai/assistant")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">المساعد الذكي</CardTitle>
              <Zap className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                التفاعل مع المساعد الذكي والحصول على إجابات لاستفساراتك
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/ai/assistant"); }}>
                بدء المحادثة <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* التحليلات الذكية */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/ai/dashboard")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">التحليلات الذكية</CardTitle>
              <BarChart className="h-6 w-6 text-blue-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                عرض تحليلات ذكية للبيانات والمؤشرات الرئيسية
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/ai/dashboard"); }}>
                عرض التحليلات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* القرارات المالية */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/ai/financial-decisions")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl">القرارات المالية</CardTitle>
              <FileText className="h-6 w-6 text-green-500" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                الحصول على توصيات ذكية لاتخاذ القرارات المالية
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto" onClick={(e) => { e.stopPropagation(); navigate("/ai/financial-decisions"); }}>
                عرض التوصيات <ArrowLeft className="mr-1 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* الإجراءات السريعة */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Button onClick={() => navigate("/ai/assistant")}>
            <Zap className="mr-2 h-4 w-4" /> المساعد الذكي
          </Button>
          <Button variant="outline" onClick={() => navigate("/ai/settings")}>
            إعدادات الذكاء الاصطناعي
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default AiAssistantModulePage;
