
import React from "react";
import { Layout } from "@/components/Layout";
import HRPageHeader from "@/components/hr/HRPageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, FileText, HelpCircle, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface SupportTicket {
  id: string;
  title: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  createdAt: Date;
  category: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  employeeName: string;
  employeePhoto?: string;
  lastUpdate?: Date;
}

const faqs: FAQ[] = [
  {
    id: "faq-001",
    question: "كيف يمكنني تقديم طلب إجازة؟",
    answer: "يمكنك تقديم طلب الإجازة من خلال نظام الموارد البشرية عبر الضغط على 'طلب إجازة' في لوحة التحكم. قم بتعبئة النموذج وتحديد نوع الإجازة وتاريخ البداية والنهاية، ثم اضغط على 'تقديم الطلب'.",
    category: "الإجازات"
  },
  {
    id: "faq-002",
    question: "ما هي سياسة العمل عن بعد؟",
    answer: "تسمح الشركة حاليًا بالعمل عن بعد يومين في الأسبوع بعد التنسيق مع المدير المباشر. يجب الحضور إلى المكتب ثلاثة أيام على الأقل. يمكن زيادة أيام العمل عن بعد في حالات خاصة بعد موافقة الإدارة.",
    category: "سياسات العمل"
  },
  {
    id: "faq-003",
    question: "كيف يمكنني تحديث بياناتي الشخصية؟",
    answer: "يمكنك تحديث بياناتك الشخصية من خلال الدخول إلى ملفك الشخصي في نظام الموارد البشرية، ثم النقر على 'تعديل البيانات' وتحديث المعلومات المطلوبة ثم حفظها.",
    category: "البيانات الشخصية"
  },
  {
    id: "faq-004",
    question: "متى يتم صرف الراتب الشهري؟",
    answer: "يتم تحويل الرواتب بشكل شهري في الخامس والعشرين من كل شهر ميلادي. في حالة وقوع هذا التاريخ في عطلة رسمية أو نهاية الأسبوع، يتم التحويل في آخر يوم عمل قبله.",
    category: "الرواتب والمالية"
  },
  {
    id: "faq-005",
    question: "كيف يمكنني الحصول على شهادة تعريف بالراتب؟",
    answer: "يمكنك طلب شهادة تعريف بالراتب من خلال نظام الموارد البشرية بالضغط على 'طلب مستندات' ثم اختيار 'شهادة تعريف بالراتب' وتحديد الجهة الموجهة إليها الشهادة.",
    category: "الرواتب والمالية"
  },
  {
    id: "faq-006",
    question: "ما هي خطوات التسجيل في الدورات التدريبية؟",
    answer: "يمكنك الاطلاع على الدورات التدريبية المتاحة من خلال منصة التدريب والتطوير، ثم اختيار الدورة المناسبة والضغط على 'تسجيل'. بعد ذلك سيتم إرسال الطلب لمديرك المباشر للموافقة.",
    category: "التدريب والتطوير"
  },
];

const tickets: SupportTicket[] = [
  {
    id: "ticket-001",
    title: "طلب تصحيح بيانات التأمين الطبي",
    status: "open",
    createdAt: new Date("2023-11-05"),
    category: "التأمين الطبي",
    priority: "high",
    employeeName: "أحمد محمد علي",
    lastUpdate: new Date("2023-11-06")
  },
  {
    id: "ticket-002",
    title: "استفسار عن آلية حساب مكافأة نهاية الخدمة",
    status: "pending",
    createdAt: new Date("2023-11-03"),
    category: "الرواتب والمالية",
    priority: "medium",
    employeeName: "سارة عبدالله الخالدي",
    lastUpdate: new Date("2023-11-05")
  },
  {
    id: "ticket-003",
    title: "مشكلة في تسجيل ساعات العمل",
    status: "resolved",
    createdAt: new Date("2023-10-28"),
    category: "نظام الحضور",
    priority: "high",
    employeeName: "محمد عبدالرحمن السعيد",
    lastUpdate: new Date("2023-11-02")
  },
  {
    id: "ticket-004",
    title: "طلب تعديل مسمى وظيفي",
    status: "closed",
    createdAt: new Date("2023-10-15"),
    category: "البيانات الوظيفية",
    priority: "low",
    employeeName: "فاطمة يوسف العمري",
    lastUpdate: new Date("2023-10-25")
  },
];

const HRSupportPage: React.FC = () => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ar-SA");
  };

  const getStatusBadge = (status: SupportTicket['status']) => {
    switch (status) {
      case "open":
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">مفتوح</span>;
      case "pending":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">قيد المراجعة</span>;
      case "resolved":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">تم الحل</span>;
      case "closed":
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">مغلق</span>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: SupportTicket['priority']) => {
    switch (priority) {
      case "urgent":
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">عاجل</span>;
      case "high":
        return <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">مرتفع</span>;
      case "medium":
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">متوسط</span>;
      case "low":
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">منخفض</span>;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 rtl">
        <HRPageHeader
          title="الدعم والمساعدة"
          description="دعم ومساعدة فريق الموارد البشرية"
          showAddButton={false}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>مرحباً بك في مركز الدعم</CardTitle>
              <CardDescription>
                يمكنك العثور على إجابات لأسئلتك الشائعة أو فتح تذكرة دعم جديدة في حالة احتجت مساعدة إضافية.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button className="flex items-center gap-2">
                <MessageSquare className="ml-1 h-4 w-4" />
                فتح تذكرة دعم جديدة
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <HelpCircle className="ml-1 h-4 w-4" />
                دليل الموظفين
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="ml-1 h-4 w-4" />
                سياسات الشركة
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>تواصل مع فريق الدعم</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3 items-center">
                  <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">البريد الإلكتروني</h3>
                    <p className="text-sm text-gray-500">hr-support@company.com</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">رقم الدعم</h3>
                    <p className="text-sm text-gray-500">1234 (تحويلة داخلية)</p>
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">ساعات الدعم</h3>
                    <p className="text-sm text-gray-500">8:00 ص - 4:00 م، الأحد - الخميس</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="faq" className="mb-6">
          <TabsList className="bg-white shadow-sm rounded-lg p-1 mb-4">
            <TabsTrigger value="faq">الأسئلة الشائعة</TabsTrigger>
            <TabsTrigger value="tickets">تذاكر الدعم</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq) => (
                <Card key={faq.id} className="overflow-hidden">
                  <CardHeader className="bg-card pb-2">
                    <div className="flex gap-2 items-center">
                      <Badge variant="outline" className="bg-blue-50">
                        {faq.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="text-gray-700">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tickets" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>تذاكر الدعم</CardTitle>
                  <Button size="sm">تذكرة جديدة</Button>
                </div>
                <CardDescription>تابع حالة تذاكر الدعم الخاصة بك</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {tickets.map((ticket) => (
                    <div key={ticket.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={ticket.employeePhoto} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {ticket.employeeName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{ticket.title}</h3>
                            <div className="text-sm text-gray-500">{ticket.employeeName}</div>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0 flex flex-wrap gap-2">
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div>تاريخ الإنشاء: {formatDate(ticket.createdAt)}</div>
                          {ticket.lastUpdate && (
                            <div>آخر تحديث: {formatDate(ticket.lastUpdate)}</div>
                          )}
                          <div>التصنيف: {ticket.category}</div>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-3 md:mt-0">
                          التفاصيل <ArrowRight className="mr-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default HRSupportPage;
