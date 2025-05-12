
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
import { QuickActionCard } from "./QuickActionCard";
import { motion } from "framer-motion";
import { suggestionsVariants, actionCardVariants } from "@/lib/framer-animations";

export const AiAssistantFeatures = () => {
  const { sendMessage } = useAiAssistant();

  const quickActions = [
    { 
      title: "تقرير المبيعات اليوم", 
      description: "إنشاء ملخص لمبيعات اليوم الحالي",
      action: () => sendMessage("قم بإنشاء تقرير مختصر عن مبيعات اليوم"),
      icon: <FileText className="h-4 w-4 text-indigo-600" />
    },
    { 
      title: "المنتجات منخفضة المخزون", 
      description: "عرض المنتجات التي توشك على النفاذ",
      action: () => sendMessage("ما هي المنتجات التي توشك على النفاذ؟"),
      icon: <ShoppingCart className="h-4 w-4 text-purple-600" />
    },
    { 
      title: "الفواتير المستحقة", 
      description: "قائمة الفواتير المستحقة هذا الأسبوع",
      action: () => sendMessage("اعرض قائمة الفواتير المستحقة هذا الأسبوع"),
      icon: <FileSpreadsheet className="h-4 w-4 text-blue-600" />
    },
    { 
      title: "العملاء النشطين", 
      description: "تقرير بأكثر العملاء نشاطًا هذا الشهر",
      action: () => sendMessage("من هم أكثر العملاء نشاطًا هذا الشهر؟"),
      icon: <Users className="h-4 w-4 text-green-600" />
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

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-indigo-50/80 to-blue-50/80 border-indigo-100 backdrop-blur-sm hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-indigo-700">
            <Zap className="mr-2 h-5 w-5 text-indigo-600" />
            إجراءات سريعة
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pb-4">
          <motion.div 
            className="grid grid-cols-1 gap-2"
            variants={suggestionsVariants}
            initial="hidden"
            animate="show"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                variants={actionCardVariants}
              >
                <QuickActionCard
                  title={action.title}
                  description={action.description}
                  onClick={action.action}
                  icon={action.icon}
                />
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50/80 to-cyan-50/80 border-blue-100 backdrop-blur-sm hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-blue-700">
            <BrainCircuit className="mr-2 h-5 w-5 text-blue-600" />
            اقتراحات المحادثة
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <motion.div 
            className="flex flex-wrap gap-2"
            variants={suggestionsVariants}
            initial="hidden"
            animate="show"
          >
            {[
              { text: "تحليل المبيعات", query: "قم بتحليل أداء المبيعات" },
              { text: "إنشاء فاتورة", query: "أنشئ فاتورة جديدة" },
              { text: "بحث عن منتج", query: "ابحث عن منتج برمز ABC123" },
              { text: "المصروفات المستحقة", query: "ما هي المصروفات المستحقة؟" },
              { text: "ملخص الأداء", query: "لخص أداء المبيعات لهذا الشهر" },
              { text: "حساب الضريبة", query: "حساب الضريبة على مبلغ 1000 ريال" },
              { text: "مقارنة المبيعات", query: "قارن بين مبيعات الشهر الحالي والشهر السابق" }
            ].map((suggestion, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                variants={actionCardVariants}
              >
                <Badge
                  className="cursor-pointer bg-white border border-blue-200 text-blue-700 hover:bg-blue-50 transition-colors"
                  onClick={() => handleSuggestedQuestion(suggestion.query)}
                >
                  {suggestion.text}
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50/80 to-indigo-50/80 border-purple-100 backdrop-blur-sm hover:shadow-md transition-all">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center text-purple-700">
            <Bot className="mr-2 h-5 w-5 text-purple-600" />
            قدرات المساعد الذكي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div 
            className="grid grid-cols-1 gap-4"
            variants={suggestionsVariants}
            initial="hidden"
            animate="show"
          >
            {capabilities.map((category, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-purple-100 hover:shadow-sm transition-all"
                whileHover={{ scale: 1.01, y: -2 }}
                variants={actionCardVariants}
              >
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
              </motion.div>
            ))}
          </motion.div>
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
