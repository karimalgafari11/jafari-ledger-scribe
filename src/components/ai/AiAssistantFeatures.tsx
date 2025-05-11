
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
      features: ["المحادثة باللغة العربية", "الأسئلة والأجوبة", "التوصيات الذكية"]
    },
    {
      title: "معالجة البيانات",
      features: ["تحليل المبيعات", "حسابات سريعة", "تقارير مختصرة"]
    },
    {
      title: "الإشعارات والتذكيرات",
      features: ["تنبيهات المخزون", "مواعيد الفواتير", "تذكيرات المهام"]
    },
    {
      title: "تصدير البيانات",
      features: ["تقارير Excel", "ملخصات PDF", "مشاركة البيانات"]
    },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-1 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="flex justify-start items-center gap-2 h-auto py-2"
                onClick={action.action}
              >
                {action.icon}
                <span>{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">اقتراحات المحادثة</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            <Badge
              className="cursor-pointer hover:bg-primary/20"
              variant="outline"
              onClick={() => sendMessage("قم بتحليل أداء المبيعات")}
            >
              تحليل المبيعات
            </Badge>
            <Badge
              className="cursor-pointer hover:bg-primary/20"
              variant="outline"
              onClick={() => sendMessage("أنشئ فاتورة جديدة")}
            >
              إنشاء فاتورة
            </Badge>
            <Badge
              className="cursor-pointer hover:bg-primary/20"
              variant="outline"
              onClick={() => sendMessage("ابحث عن منتج برمز ABC123")}
            >
              بحث عن منتج
            </Badge>
            <Badge
              className="cursor-pointer hover:bg-primary/20"
              variant="outline"
              onClick={() => sendMessage("ما هي المصروفات المستحقة؟")}
            >
              المصروفات المستحقة
            </Badge>
            <Badge
              className="cursor-pointer hover:bg-primary/20"
              variant="outline"
              onClick={() => sendMessage("لخص أداء المبيعات لهذا الشهر")}
            >
              ملخص الأداء
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">قدرات المساعد الذكي</CardTitle>
        </CardHeader>
        <CardContent>
          {capabilities.map((category, idx) => (
            <div key={idx} className="mb-4 last:mb-0">
              <h4 className="text-sm font-medium mb-1">{category.title}</h4>
              <div className="grid grid-cols-1 gap-1">
                {category.features.map((feature, index) => (
                  <div key={index} className="text-xs text-muted-foreground flex gap-2 items-center">
                    <div className="w-1 h-1 rounded-full bg-primary"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="pt-0 border-t">
          <Button 
            variant="link" 
            className="w-full text-primary" 
            size="sm"
            onClick={() => sendMessage("ما هي جميع القدرات التي يمكنك مساعدتي بها؟")}
          >
            <MessageCircle className="h-4 w-4 mr-2" />
            استكشاف المزيد من القدرات
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
