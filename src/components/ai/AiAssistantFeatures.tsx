
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  FileSpreadsheet,
  MessageCircle,
  Bell,
  Search,
  FileText,
  ShoppingCart,
  Users,
  Clock,
  Send,
  Zap,
  Database,
  Bot,
  BookOpen,
  BrainCircuit
} from "lucide-react";
import { useAiAssistant } from "@/hooks/useAiAssistant";

export const AiAssistantFeatures = () => {
  const { sendMessage } = useAiAssistant();

  const quickActions = [
    { 
      label: "تقرير المبيعات اليوم", 
      action: () => sendMessage("قم بإنشاء تقرير مختصر عن مبيعات اليوم"),
      icon: <FileText className="h-4 w-4" />
    },
    { 
      label: "المنتجات منخفضة المخزون", 
      action: () => sendMessage("ما هي المنتجات التي توشك على النفاذ؟"),
      icon: <ShoppingCart className="h-4 w-4" />
    },
    { 
      label: "الفواتير المستحقة", 
      action: () => sendMessage("اعرض قائمة الفواتير المستحقة هذا الأسبوع"),
      icon: <FileSpreadsheet className="h-4 w-4" />
    },
    { 
      label: "العملاء النشطين", 
      action: () => sendMessage("من هم أكثر العملاء نشاطًا هذا الشهر؟"),
      icon: <Users className="h-4 w-4" />
    },
  ];

  const capabilities = [
    {
      title: "إدارة المحادثات",
      icon: <MessageCircle className="h-5 w-5 text-indigo-500" />,
      features: ["المحادثة باللغة العربية", "الأسئلة والأجوبة", "التوصيات الذكية"]
    },
    {
      title: "معالجة البيانات",
      icon: <Database className="h-5 w-5 text-emerald-500" />,
      features: ["تحليل المبيعات", "حسابات سريعة", "تقارير مختصرة"]
    },
    {
      title: "الإشعارات والتذكيرات",
      icon: <Bell className="h-5 w-5 text-amber-500" />,
      features: ["تنبيهات المخزون", "مواعيد الفواتير", "تذكيرات المهام"]
    },
    {
      title: "تصدير البيانات",
      icon: <FileSpreadsheet className="h-5 w-5 text-blue-500" />,
      features: ["تقارير Excel", "ملخصات PDF", "مشاركة البيانات"]
    },
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-indigo-50/80 to-blue-50/80 border-indigo-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-indigo-700">
            <Zap className="mr-2 h-5 w-5 text-indigo-600" />
            إجراءات سريعة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="secondary"
                className="flex justify-start items-center gap-2 h-auto py-2 bg-white hover:bg-indigo-50 border border-indigo-100 text-indigo-700"
                onClick={action.action}
              >
                <div className="bg-indigo-100 p-1.5 rounded-md">
                  {action.icon}
                </div>
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border-blue-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-blue-700">
            <BrainCircuit className="mr-2 h-5 w-5 text-blue-600" />
            اقتراحات المحادثة
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            <Badge
              className="cursor-pointer bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
              onClick={() => sendMessage("قم بتحليل أداء المبيعات")}
            >
              تحليل المبيعات
            </Badge>
            <Badge
              className="cursor-pointer bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
              onClick={() => sendMessage("أنشئ فاتورة جديدة")}
            >
              إنشاء فاتورة
            </Badge>
            <Badge
              className="cursor-pointer bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
              onClick={() => sendMessage("ابحث عن منتج برمز ABC123")}
            >
              بحث عن منتج
            </Badge>
            <Badge
              className="cursor-pointer bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
              onClick={() => sendMessage("ما هي المصروفات المستحقة؟")}
            >
              المصروفات المستحقة
            </Badge>
            <Badge
              className="cursor-pointer bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
              onClick={() => sendMessage("لخص أداء المبيعات لهذا الشهر")}
            >
              ملخص الأداء
            </Badge>
            <Badge
              className="cursor-pointer bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
              onClick={() => sendMessage("حساب الضريبة على مبلغ 1000 ريال")}
            >
              حساب الضريبة
            </Badge>
            <Badge
              className="cursor-pointer bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
              onClick={() => sendMessage("قارن بين مبيعات الشهر الحالي والشهر السابق")}
            >
              مقارنة المبيعات
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50/80 to-indigo-50/80 border-purple-100">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-purple-700">
            <Bot className="mr-2 h-5 w-5 text-purple-600" />
            قدرات المساعد الذكي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {capabilities.map((category, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-purple-100">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  {category.icon}
                  <span className="text-purple-800">{category.title}</span>
                </h4>
                <div className="grid grid-cols-1 gap-1 ml-7">
                  {category.features.map((feature, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex gap-2 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-0 border-t">
          <Button 
            variant="link" 
            className="w-full text-purple-600" 
            size="sm"
            onClick={() => sendMessage("ما هي جميع القدرات التي يمكنك مساعدتي بها؟")}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            استكشاف المزيد من القدرات
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
