
import React from "react";
import { Layout } from "@/components/Layout";
import HRPageHeader from "@/components/hr/HRPageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, CheckCircle, Clock, FileText, User, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  status: 'open' | 'closed' | 'on-hold';
  postedDate: Date;
  applicantsCount: number;
}

interface Candidate {
  id: string;
  name: string;
  position: string;
  source: string;
  stage: 'new' | 'screening' | 'interview' | 'assessment' | 'offer' | 'hired' | 'rejected';
  rating: number;
  appliedDate: Date;
  email: string;
  photo?: string;
  tags?: string[];
}

const mockJobs: JobOpening[] = [
  {
    id: "job-001",
    title: "مطور واجهات أمامية",
    department: "تقنية المعلومات",
    location: "الرياض",
    type: "full-time",
    status: "open",
    postedDate: new Date("2023-10-15"),
    applicantsCount: 12
  },
  {
    id: "job-002",
    title: "محلل مالي",
    department: "المالية",
    location: "جدة",
    type: "full-time",
    status: "open",
    postedDate: new Date("2023-10-25"),
    applicantsCount: 8
  },
  {
    id: "job-003",
    title: "مسؤول تسويق رقمي",
    department: "التسويق",
    location: "الرياض",
    type: "full-time",
    status: "open",
    postedDate: new Date("2023-11-01"),
    applicantsCount: 15
  },
  {
    id: "job-004",
    title: "أخصائي موارد بشرية",
    department: "الموارد البشرية",
    location: "الرياض",
    type: "part-time",
    status: "on-hold",
    postedDate: new Date("2023-09-20"),
    applicantsCount: 5
  },
];

const mockCandidates: Candidate[] = [
  {
    id: "cand-001",
    name: "محمد أحمد العمري",
    position: "مطور واجهات أمامية",
    source: "LinkedIn",
    stage: "interview",
    rating: 4,
    appliedDate: new Date("2023-10-20"),
    email: "mohammed@example.com",
    tags: ["React", "TypeScript", "5+ سنوات"]
  },
  {
    id: "cand-002",
    name: "أسماء خالد الشمري",
    position: "مطور واجهات أمامية",
    source: "موقع الشركة",
    stage: "screening",
    rating: 3,
    appliedDate: new Date("2023-10-25"),
    email: "asmaa@example.com",
    tags: ["Vue.js", "CSS", "3+ سنوات"]
  },
  {
    id: "cand-003",
    name: "عبدالله سعيد الزهراني",
    position: "محلل مالي",
    source: "Indeed",
    stage: "assessment",
    rating: 5,
    appliedDate: new Date("2023-10-30"),
    email: "abdullah@example.com",
    tags: ["محاسبة", "تحليل مالي", "7+ سنوات"]
  },
  {
    id: "cand-004",
    name: "نورة فهد الدوسري",
    position: "أخصائي موارد بشرية",
    source: "توصية داخلية",
    stage: "offer",
    rating: 5,
    appliedDate: new Date("2023-10-05"),
    email: "noura@example.com",
    tags: ["موارد بشرية", "توظيف", "4+ سنوات"]
  },
];

const RecruitmentPage: React.FC = () => {
  const getJobTypeBadge = (type: JobOpening['type']) => {
    switch (type) {
      case "full-time":
        return <Badge variant="outline">دوام كامل</Badge>;
      case "part-time":
        return <Badge variant="outline">دوام جزئي</Badge>;
      case "contract":
        return <Badge variant="outline">عقد مؤقت</Badge>;
      default:
        return null;
    }
  };

  const getJobStatusBadge = (status: JobOpening['status']) => {
    switch (status) {
      case "open":
        return <Badge variant="success">مفتوح</Badge>;
      case "closed":
        return <Badge variant="destructive">مغلق</Badge>;
      case "on-hold":
        return <Badge variant="warning">معلق</Badge>;
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ar-SA");
  };

  const getStageBadge = (stage: Candidate['stage']) => {
    switch (stage) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">جديد</Badge>;
      case "screening":
        return <Badge className="bg-cyan-100 text-cyan-800 hover:bg-cyan-200">فرز</Badge>;
      case "interview":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">مقابلة</Badge>;
      case "assessment":
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">تقييم</Badge>;
      case "offer":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">عرض وظيفي</Badge>;
      case "hired":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">تم التوظيف</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">مرفوض</Badge>;
      default:
        return null;
    }
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-sm ${i < rating ? "text-yellow-500" : "text-gray-300"}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 rtl">
        <HRPageHeader
          title="الاستقطاب والتوظيف"
          description="إدارة عمليات التوظيف والمقابلات"
          onAddNew={() => console.log("إضافة وظيفة جديدة")}
          addButtonLabel="إضافة وظيفة جديدة"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-lg">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">الوظائف المفتوحة</h3>
                  <p className="text-2xl font-semibold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 text-green-700 p-3 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">المرشحين</h3>
                  <p className="text-2xl font-semibold">40</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-100 text-purple-700 p-3 rounded-lg">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">عروض مقدمة</h3>
                  <p className="text-2xl font-semibold">2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="jobs" className="mb-6">
          <TabsList className="bg-white shadow-sm rounded-lg p-1">
            <TabsTrigger value="jobs">الوظائف المفتوحة</TabsTrigger>
            <TabsTrigger value="candidates">المرشحون</TabsTrigger>
            <TabsTrigger value="scheduled">المقابلات المجدولة</TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="mt-4">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">الوظائف المفتوحة</CardTitle>
                  <Button variant="outline" size="sm">
                    نشر وظيفة جديدة
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockJobs.map((job) => (
                    <div key={job.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="font-medium">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 mt-1">
                            <span className="text-sm text-gray-500">{job.department}</span>
                            <span className="text-sm text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{job.location}</span>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0 flex items-center gap-3">
                          {getJobTypeBadge(job.type)}
                          {getJobStatusBadge(job.status)}
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="ml-1 h-4 w-4" />
                            تاريخ النشر: {formatDate(job.postedDate)}
                          </div>
                          <div className="flex items-center">
                            <Users className="ml-1 h-4 w-4" />
                            المتقدمين: {job.applicantsCount}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-3 md:mt-0">
                          عرض التفاصيل <ArrowRight className="mr-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates" className="mt-4">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg">المرشحون النشطون</CardTitle>
                <CardDescription>قائمة المرشحين الحاليين لجميع الوظائف المفتوحة</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {mockCandidates.map((candidate) => (
                    <div key={candidate.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={candidate.photo} />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              {candidate.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{candidate.name}</h3>
                            <div className="text-sm text-gray-500">{candidate.position}</div>
                          </div>
                        </div>
                        <div className="mt-3 md:mt-0">
                          {getStageBadge(candidate.stage)}
                        </div>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {candidate.tags?.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-col md:flex-row md:items-center justify-between mt-4">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="ml-1 h-4 w-4" />
                            تاريخ التقديم: {formatDate(candidate.appliedDate)}
                          </div>
                          <div className="flex items-center">
                            {getRatingStars(candidate.rating)}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-3 md:mt-0">
                          عرض الملف <ArrowRight className="mr-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="mt-4">
            <Card>
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg">المقابلات المجدولة</CardTitle>
                <CardDescription>جدول المقابلات للأسبوع الحالي</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="p-4 border border-gray-100 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Clock className="h-4 w-4 text-blue-700" />
                        </div>
                        <div>
                          <h3 className="font-medium">محمد أحمد العمري</h3>
                          <p className="text-sm text-gray-500">مطور واجهات أمامية</p>
                        </div>
                      </div>
                      <div className="mt-3 md:mt-0 text-sm">
                        <div className="font-medium">الأربعاء، 15 نوفمبر 2023</div>
                        <div className="text-gray-500">10:00 صباحاً - 11:00 صباحاً</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">مقابلة فنية</Badge>
                        <span className="text-sm text-gray-500">مع: أحمد القحطاني</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <X className="ml-1 h-4 w-4" />
                          إلغاء
                        </Button>
                        <Button size="sm">
                          <Calendar className="ml-1 h-4 w-4" />
                          إعادة جدولة
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-100 rounded-lg">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-3 rounded-full">
                          <Clock className="h-4 w-4 text-blue-700" />
                        </div>
                        <div>
                          <h3 className="font-medium">عبدالله سعيد الزهراني</h3>
                          <p className="text-sm text-gray-500">محلل مالي</p>
                        </div>
                      </div>
                      <div className="mt-3 md:mt-0 text-sm">
                        <div className="font-medium">الخميس، 16 نوفمبر 2023</div>
                        <div className="text-gray-500">1:00 ظهراً - 2:00 ظهراً</div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">مقابلة المدير</Badge>
                        <span className="text-sm text-gray-500">مع: فهد السالم</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <X className="ml-1 h-4 w-4" />
                          إلغاء
                        </Button>
                        <Button size="sm">
                          <Calendar className="ml-1 h-4 w-4" />
                          إعادة جدولة
                        </Button>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-2">
                    عرض المزيد من المقابلات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default RecruitmentPage;
