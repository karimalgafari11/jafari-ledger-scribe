import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BarChart3, Calendar, FileCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

interface EmployeeEvaluation {
  id: string;
  employeeId: string;
  employeeName: string;
  position: string;
  evaluationPeriod: string;
  completionDate: Date | null;
  status: 'pending' | 'in-progress' | 'completed';
  overallScore: number | null;
  categories: {
    name: string;
    score: number;
  }[];
}

const mockEvaluations: EmployeeEvaluation[] = [
  {
    id: "eval-001",
    employeeId: "emp-001",
    employeeName: "أحمد محمد علي",
    position: "مدير تطوير البرمجيات",
    evaluationPeriod: "الربع الثالث 2023",
    completionDate: new Date("2023-10-15"),
    status: "completed",
    overallScore: 85,
    categories: [
      { name: "الإنتاجية", score: 90 },
      { name: "جودة العمل", score: 85 },
      { name: "العمل الجماعي", score: 80 },
      { name: "المهارات القيادية", score: 85 }
    ]
  },
  {
    id: "eval-002",
    employeeId: "emp-002",
    employeeName: "سارة عبدالله الخالدي",
    position: "مسؤول موارد بشرية",
    evaluationPeriod: "الربع الثالث 2023",
    completionDate: new Date("2023-10-20"),
    status: "completed",
    overallScore: 92,
    categories: [
      { name: "الإنتاجية", score: 95 },
      { name: "جودة العمل", score: 90 },
      { name: "العمل الجماعي", score: 95 },
      { name: "المهارات القيادية", score: 88 }
    ]
  },
  {
    id: "eval-003",
    employeeId: "emp-003",
    employeeName: "محمد عبدالرحمن السعيد",
    position: "محاسب رئيسي",
    evaluationPeriod: "الربع الثالث 2023",
    completionDate: null,
    status: "in-progress",
    overallScore: null,
    categories: []
  },
  {
    id: "eval-004",
    employeeId: "emp-004",
    employeeName: "فاطمة يوسف العمري",
    position: "مدير تسويق",
    evaluationPeriod: "الربع الثالث 2023",
    completionDate: null,
    status: "pending",
    overallScore: null,
    categories: []
  }
];

const getStatusBadge = (status: EmployeeEvaluation['status']) => {
  switch (status) {
    case "pending":
      return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">لم يبدأ</span>;
    case "in-progress":
      return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">جاري التقييم</span>;
    case "completed":
      return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">مكتمل</span>;
    default:
      return null;
  }
};

const EvaluationPage: React.FC = () => {
  return (
    <PageContainer title="التقييم الوظيفي">
      <div className="container mx-auto px-4 py-6 rtl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">إدارة عمليات تقييم أداء الموظفين</h2>
          <Button onClick={() => console.log("إضافة تقييم جديد")}>
            إضافة تقييم جديد
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-lg">
                  <FileCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">تقييمات مكتملة</h3>
                  <p className="text-2xl font-semibold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 text-yellow-700 p-3 rounded-lg">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">قيد الإجراء</h3>
                  <p className="text-2xl font-semibold">1</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 text-purple-700 p-3 rounded-lg">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">متوسط التقييم</h3>
                  <p className="text-2xl font-semibold">88.5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold">تقييمات الموظفين</h2>
            <p className="text-gray-500 text-sm mt-1">الربع الثالث 2023</p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>الموظف</TableHead>
                  <TableHead>المنصب</TableHead>
                  <TableHead>فترة التقييم</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>التقييم الكلي</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockEvaluations.map((evaluation) => (
                  <TableRow key={evaluation.id}>
                    <TableCell className="font-medium">{evaluation.employeeName}</TableCell>
                    <TableCell>{evaluation.position}</TableCell>
                    <TableCell>{evaluation.evaluationPeriod}</TableCell>
                    <TableCell>{getStatusBadge(evaluation.status)}</TableCell>
                    <TableCell>
                      {evaluation.overallScore !== null ? (
                        <div className="flex items-center gap-2">
                          <Progress value={evaluation.overallScore} className="h-2 w-24" />
                          <span className="text-sm font-medium">{evaluation.overallScore}%</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-left">
                      <Button variant="ghost" size="sm" className="h-8 px-2">
                        عرض التفاصيل <ArrowRight className="mr-1 h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">أعلى المهارات تقييمًا</h2>
              <p className="text-gray-500 text-sm mt-1">بناءً على التقييمات المكتملة</p>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">الإنتاجية</span>
                    <span className="text-sm font-medium">92.5%</span>
                  </div>
                  <Progress value={92.5} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">جودة العمل</span>
                    <span className="text-sm font-medium">87.5%</span>
                  </div>
                  <Progress value={87.5} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">العمل الجماعي</span>
                    <span className="text-sm font-medium">87.5%</span>
                  </div>
                  <Progress value={87.5} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm">المهارات القيادية</span>
                    <span className="text-sm font-medium">86.5%</span>
                  </div>
                  <Progress value={86.5} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold">جدول التقييمات القادمة</h2>
              <p className="text-gray-500 text-sm mt-1">الربع الرابع 2023</p>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="p-4 border border-gray-100 rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium">تقييم نهاية العام</h4>
                      <p className="text-sm text-gray-500">1 ديسمبر - 15 ديسمبر 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">تذكير</Button>
                </div>
                
                <div className="p-4 border border-gray-100 rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium">مراجعة الأهداف السنوية</h4>
                      <p className="text-sm text-gray-500">20 ديسمبر - 25 ديسمبر 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">تذكير</Button>
                </div>
                
                <div className="p-4 border border-gray-100 rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <h4 className="font-medium">وضع أهداف Q1 2024</h4>
                      <p className="text-sm text-gray-500">26 ديسمبر - 31 ديسمبر 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">تذكير</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default EvaluationPage;
