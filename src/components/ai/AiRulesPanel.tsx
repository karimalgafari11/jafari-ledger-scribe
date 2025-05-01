
import React from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Badge 
} from "@/components/ui/badge";
import { 
  Bot 
} from "lucide-react";

export const AiRulesPanel: React.FC = () => {
  const accountingRules = [
    {
      title: "القيد المزدوج",
      description: "مجموع المدين يساوي مجموع الدائن في كل قيد محاسبي",
      isActive: true
    },
    {
      title: "توثيق القيود",
      description: "كل قيد محاسبي يجب أن يكون له مستند مؤيد ووصف واضح",
      isActive: true
    },
    {
      title: "الفترات المحاسبية",
      description: "يتم إقفال الفترات المحاسبية شهرياً وترحيل الأرصدة للفترة التالية",
      isActive: true
    },
    {
      title: "تدقيق المدخلات",
      description: "التحقق من صحة البيانات المدخلة وعدم تكرارها",
      isActive: true
    },
    {
      title: "قيود التسوية",
      description: "تسجيل قيود التسوية في نهاية الفترة المحاسبية لتطبيق مبدأ الاستحقاق",
      isActive: true
    },
    {
      title: "تسلسل المستندات",
      description: "تسلسل منطقي ورقمي للمستندات والفواتير والقيود",
      isActive: true
    },
    {
      title: "الترحيل للحسابات",
      description: "ترحيل كل عملية للحسابات المعنية فور تسجيلها",
      isActive: true
    },
    {
      title: "التحقق من الأرصدة",
      description: "التحقق من أرصدة الحسابات قبل إجراء العمليات المحاسبية",
      isActive: true
    }
  ];

  const validationRules = [
    {
      title: "منع الحسابات المدينة السالبة",
      description: "لا يمكن أن يكون رصيد الحسابات المدينة سالباً إلا في حالات محددة",
      severity: "critical" as const,
      canOverride: false
    },
    {
      title: "تطابق قيم الفواتير",
      description: "يجب أن تتطابق قيم البنود في الفواتير مع المجموع الكلي",
      severity: "critical" as const,
      canOverride: false
    },
    {
      title: "تحذير الحد الائتماني",
      description: "تحذير عند تجاوز العميل للحد الائتماني المسموح",
      severity: "warning" as const,
      canOverride: true
    },
    {
      title: "التحقق من أرقام الضريبة",
      description: "التحقق من صحة أرقام الضريبة والرقم الضريبي للعملاء والموردين",
      severity: "warning" as const,
      canOverride: true
    }
  ];

  const automaticEntries = [
    {
      title: "قيد المبيعات النقدية",
      description: "إنشاء قيد محاسبي آلي عند تسجيل مبيعات نقدية",
      trigger: "مبيعات نقدية",
      accounts: [
        { accountName: "الصندوق", type: "مدين" },
        { accountName: "المبيعات", type: "دائن" }
      ]
    },
    {
      title: "قيد المبيعات الآجلة",
      description: "إنشاء قيد محاسبي آلي عند تسجيل مبيعات آجلة",
      trigger: "مبيعات آجلة",
      accounts: [
        { accountName: "ذمم العملاء", type: "مدين" },
        { accountName: "المبيعات", type: "دائن" }
      ]
    },
    {
      title: "قيد المشتريات النقدية",
      description: "إنشاء قيد محاسبي آلي عند تسجيل مشتريات نقدية",
      trigger: "مشتريات نقدية",
      accounts: [
        { accountName: "المشتريات", type: "مدين" },
        { accountName: "الصندوق", type: "دائن" }
      ]
    },
    {
      title: "قيد المشتريات الآجلة",
      description: "إنشاء قيد محاسبي آلي عند تسجيل مشتريات آجلة",
      trigger: "مشتريات آجلة",
      accounts: [
        { accountName: "المشتريات", type: "مدين" },
        { accountName: "ذمم الموردين", type: "دائن" }
      ]
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">خطير</Badge>;
      case 'warning':
        return <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">تحذير</Badge>;
      case 'info':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">معلومة</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* القواعد الأساسية */}
      <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
        <CardHeader>
          <CardTitle>قواعد المحاسبة الأساسية</CardTitle>
          <CardDescription>القواعد والمبادئ الأساسية المطبقة في النظام المحاسبي</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accountingRules.map((rule, index) => (
              <Card key={index} className="border border-gray-200 bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md">{rule.title}</CardTitle>
                    <Badge variant={rule.isActive ? "default" : "outline"}>
                      {rule.isActive ? "مفعّل" : "معطل"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{rule.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* قواعد التحقق */}
      <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
        <CardHeader>
          <CardTitle>قواعد التحقق والتدقيق</CardTitle>
          <CardDescription>قواعد التحقق المطبقة للتأكد من صحة البيانات المدخلة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {validationRules.map((rule, index) => (
              <Card key={index} className="border border-gray-200 bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md">{rule.title}</CardTitle>
                    {getSeverityBadge(rule.severity)}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{rule.description}</p>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-gray-500">
                      {rule.canOverride ? "يمكن تجاوزه بصلاحيات" : "لا يمكن تجاوزه"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* القيود التلقائية */}
      <Card className="bg-white/70 backdrop-blur-sm border-blue-100">
        <CardHeader>
          <CardTitle>القيود المحاسبية التلقائية</CardTitle>
          <CardDescription>قواعد إنشاء القيود المحاسبية بشكل تلقائي بناءً على الأحداث في النظام</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automaticEntries.map((entry, index) => (
              <Card key={index} className="border border-gray-200 bg-gradient-to-br from-white to-blue-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md">{entry.title}</CardTitle>
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                      {entry.trigger}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">{entry.description}</p>
                  <div className="text-xs space-y-1 mt-2">
                    <p className="font-medium">الحسابات المتأثرة:</p>
                    {entry.accounts.map((account, accountIndex) => (
                      <div key={accountIndex} className="flex justify-between">
                        <span>{account.accountName}</span>
                        <Badge variant="outline" className={account.type === "مدين" 
                          ? "bg-blue-50 text-blue-700 border-blue-100" 
                          : "bg-amber-50 text-amber-700 border-amber-100"
                        }>
                          {account.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* دور المساعد الذكي */}
      <Card className="bg-gradient-to-r from-blue-100 to-indigo-100 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="h-5 w-5 mr-2 text-blue-600" />
            دور المساعد الذكي في تطبيق قوانين المحاسبة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-blue-700">
              يقوم المساعد الذكي بمراقبة الامتثال لقوانين المحاسبة وإرسال التنبيهات عند اكتشاف أي مخالفات.
              كما يقدم اقتراحات للتصحيح ويساعد في فهم القيود المحاسبية المعقدة وتأثيرها على المركز المالي للمنشأة.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/70">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2 text-blue-800">التنبؤ بالأخطاء</h3>
                  <p className="text-sm text-gray-600">
                    يستخدم المساعد الذكي أنماط البيانات السابقة للتنبؤ بالأخطاء المحاسبية المحتملة قبل حدوثها.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/70">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2 text-blue-800">التدقيق المستمر</h3>
                  <p className="text-sm text-gray-600">
                    يقوم بتدقيق العمليات بشكل مستمر للتأكد من اتباعها للقواعد المحاسبية المعتمدة.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/70">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-2 text-blue-800">التحسين المستمر</h3>
                  <p className="text-sm text-gray-600">
                    تحليل الأنماط واقتراح تحسينات على قواعد المحاسبة بناءً على بيانات الشركة.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
