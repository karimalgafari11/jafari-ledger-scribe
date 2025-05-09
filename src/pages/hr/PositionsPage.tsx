
import React, { useState } from "react";
import { Layout } from "@/components/Layout";
import HRPageHeader from "@/components/hr/HRPageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus, Edit, Trash } from "lucide-react";
import { Position } from "@/types/hr";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";

const initialPositions: Position[] = [
  {
    id: "pos-001",
    title: "مدير تطوير البرمجيات",
    department: "تقنية المعلومات",
    description: "الإشراف على فريق تطوير البرمجيات وإدارة المشاريع التقنية",
    responsibilities: [
      "إدارة فريق المطورين",
      "تخطيط المشاريع التقنية",
      "مراجعة الكود والجودة"
    ],
    requirements: [
      "خبرة 5+ سنوات في تطوير البرمجيات",
      "خبرة في إدارة الفرق التقنية",
      "مهارات قيادية ممتازة"
    ],
    salaryRange: {
      min: 15000,
      max: 25000
    },
    isActive: true,
    vacancies: 1
  },
  {
    id: "pos-002",
    title: "مسؤول موارد بشرية",
    department: "الموارد البشرية",
    description: "إدارة عمليات التوظيف وشؤون الموظفين",
    responsibilities: [
      "إجراء المقابلات الشخصية",
      "معالجة طلبات التوظيف",
      "تطوير سياسات الموارد البشرية"
    ],
    requirements: [
      "خبرة 3+ سنوات في الموارد البشرية",
      "شهادة في إدارة الموارد البشرية",
      "مهارات تواصل ممتازة"
    ],
    salaryRange: {
      min: 12000,
      max: 18000
    },
    isActive: true,
    vacancies: 2
  },
  {
    id: "pos-003",
    title: "محاسب رئيسي",
    department: "المالية",
    description: "إدارة الحسابات المالية والتدقيق",
    responsibilities: [
      "إعداد التقارير المالية",
      "إدارة الميزانية",
      "التدقيق المالي"
    ],
    requirements: [
      "شهادة في المحاسبة",
      "خبرة 4+ سنوات",
      "معرفة بالأنظمة المحاسبية"
    ],
    salaryRange: {
      min: 14000,
      max: 22000
    },
    isActive: true,
    vacancies: 0
  }
];

const PositionsPage: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>(initialPositions);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPositions = positions.filter(position =>
    position.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    position.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 rtl">
        <HRPageHeader
          title="الوظائف والمناصب"
          description="تعريف الوظائف والمناصب وهيكلها التنظيمي"
          onAddNew={() => console.log("إضافة منصب جديد")}
          addButtonLabel="إضافة منصب جديد"
        />

        <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="البحث عن منصب..."
                className="pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button variant="outline">
                تصدير البيانات
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table hoverable striped>
              <TableHeader>
                <TableRow>
                  <TableHead>المنصب</TableHead>
                  <TableHead>القسم</TableHead>
                  <TableHead>الوصف</TableHead>
                  <TableHead>الشواغر</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead className="text-left">الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPositions.map((position) => (
                  <TableRow key={position.id}>
                    <TableCell className="font-medium">{position.title}</TableCell>
                    <TableCell>{position.department}</TableCell>
                    <TableCell className="max-w-xs truncate">{position.description}</TableCell>
                    <TableCell>{position.vacancies || 0}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        position.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}>
                        {position.isActive ? "نشط" : "غير نشط"}
                      </span>
                    </TableCell>
                    <TableCell className="text-left">
                      <Button variant="ghost" size="sm" className="ml-1">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PositionsPage;
