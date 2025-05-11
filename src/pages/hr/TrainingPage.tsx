import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight, Clock, GraduationCap, Users } from "lucide-react";
import { Training } from "@/types/hr";

const trainingData: Training[] = [
  {
    id: "tr-001",
    title: "أساسيات إدارة المشاريع",
    description: "دورة تدريبية في أساسيات إدارة المشاريع وتطبيق منهجية Agile",
    startDate: new Date("2023-11-15"),
    endDate: new Date("2023-11-30"),
    provider: "معهد الإدارة المتقدمة",
    cost: 5000,
    status: "planned",
    attendees: ["emp-001", "emp-002", "emp-004"],
    skills: ["إدارة المشاريع", "Agile", "Scrum"],
    location: "قاعة التدريب - المقر الرئيسي"
  },
  {
    id: "tr-002",
    title: "تطوير مهارات التواصل",
    description: "برنامج تدريبي لتطوير مهارات التواصل والعرض",
    startDate: new Date("2023-10-05"),
    endDate: new Date("2023-10-10"),
    provider: "أكاديمية المهارات القيادية",
    cost: 3500,
    status: "completed",
    attendees: ["emp-002", "emp-003", "emp-005"],
    skills: ["مهارات التواصل", "مهارات العرض التقديمي", "التفاوض"],
    location: "فندق الريتز - قاعة الأعمال"
  },
  {
    id: "tr-003",
    title: "الأمن السيبراني للمؤسسات",
    description: "دورة تخصصية في أمن المعلومات وحماية البيانات",
    startDate: new Date("2023-12-10"),
    endDate: new Date("2023-12-18"),
    provider: "الشركة العالمية للأمن السيبراني",
    cost: 7500,
    status: "ongoing",
    attendees: ["emp-001", "emp-005"],
    skills: ["الأمن السيبراني", "حماية البيانات", "تقييم المخاطر"],
    location: "أونلاين - عبر منصة Zoom"
  },
];

const TrainingCard: React.FC<{ training: Training }> = ({ training }) => {
  const getStatusBadge = () => {
    switch (training.status) {
      case "planned":
        return <Badge variant="outline">مخطط</Badge>;
      case "ongoing":
        return <Badge variant="warning">جارٍ</Badge>;
      case "completed":
        return <Badge variant="success">مكتمل</Badge>;
      case "cancelled":
        return <Badge variant="destructive">ملغي</Badge>;
      default:
        return null;
    }
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("ar-SA");
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{training.title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">{training.description}</CardDescription>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center">
            <Calendar className="ml-2 h-4 w-4 text-gray-500" />
            <span className="text-sm">
              {formatDate(training.startDate)} - {formatDate(training.endDate)}
            </span>
          </div>
          {training.provider && (
            <div className="flex items-center">
              <GraduationCap className="ml-2 h-4 w-4 text-gray-500" />
              <span className="text-sm">{training.provider}</span>
            </div>
          )}
          <div className="flex items-center">
            <Users className="ml-2 h-4 w-4 text-gray-500" />
            <span className="text-sm">{training.attendees.length} مشاركين</span>
          </div>
          <div className="pt-2 flex justify-between items-center">
            <div className="flex space-x-2 space-x-reverse">
              {training.skills.slice(0, 2).map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {training.skills.length > 2 && (
                <Badge variant="secondary" className="text-xs">
                  +{training.skills.length - 2}
                </Badge>
              )}
            </div>
            <Button variant="ghost" size="sm" className="text-xs">
              التفاصيل <ChevronRight className="h-4 w-4 mr-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const TrainingPage: React.FC = () => {
  const ongoingTrainings = trainingData.filter(t => t.status === "ongoing");
  const plannedTrainings = trainingData.filter(t => t.status === "planned");
  const completedTrainings = trainingData.filter(t => t.status === "completed");

  return (
    <PageContainer title="التدريب والتطوير">
      <div className="container mx-auto px-4 py-6 rtl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">إدارة برامج التدريب وتطوير مهارات الموظفين</h2>
          <Button onClick={() => console.log("إضافة تدريب جديد")}>
            إضافة برنامج تدريبي جديد
          </Button>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-white shadow-sm rounded-lg p-1 mb-6">
              <TabsTrigger value="all">جميع البرامج</TabsTrigger>
              <TabsTrigger value="ongoing">الجارية</TabsTrigger>
              <TabsTrigger value="planned">المخططة</TabsTrigger>
              <TabsTrigger value="completed">المكتملة</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingData.map(training => (
                  <TrainingCard key={training.id} training={training} />
                ))}
              </div>
              {trainingData.length === 0 && (
                <div className="text-center py-10 bg-white rounded-lg">
                  <p className="text-gray-500">لا توجد برامج تدريبية</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="ongoing" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ongoingTrainings.map(training => (
                  <TrainingCard key={training.id} training={training} />
                ))}
              </div>
              {ongoingTrainings.length === 0 && (
                <div className="text-center py-10 bg-white rounded-lg">
                  <p className="text-gray-500">لا توجد برامج تدريبية جارية</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="planned" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plannedTrainings.map(training => (
                  <TrainingCard key={training.id} training={training} />
                ))}
              </div>
              {plannedTrainings.length === 0 && (
                <div className="text-center py-10 bg-white rounded-lg">
                  <p className="text-gray-500">لا توجد برامج تدريبية مخططة</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="completed" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedTrainings.map(training => (
                  <TrainingCard key={training.id} training={training} />
                ))}
              </div>
              {completedTrainings.length === 0 && (
                <div className="text-center py-10 bg-white rounded-lg">
                  <p className="text-gray-500">لا توجد برامج تدريبية مكتملة</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageContainer>
  );
};

export default TrainingPage;
