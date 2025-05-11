import React from "react";
import { PageContainer } from "@/components/PageContainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Calendar, ChevronRight, DollarSign, Gift, Star, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RewardType {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

interface RewardItem {
  id: string;
  type: string;
  employeeId: string;
  employeeName: string;
  employeePhoto?: string;
  date: Date;
  amount?: number;
  description: string;
}

const rewardTypes: RewardType[] = [
  {
    id: "bonus",
    title: "مكافأة مالية",
    description: "مكافآت مالية للأداء المتميز أو الإنجازات الخاصة",
    icon: <DollarSign className="h-5 w-5" />,
    color: "bg-green-100 text-green-800"
  },
  {
    id: "certificate",
    title: "شهادة تقدير",
    description: "شهادات تقدير للموظفين المتميزين",
    icon: <Award className="h-5 w-5" />,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: "trophy",
    title: "موظف الشهر",
    description: "جائزة للموظف المتميز شهريًا",
    icon: <Trophy className="h-5 w-5" />,
    color: "bg-yellow-100 text-yellow-800"
  },
  {
    id: "gift",
    title: "هدية رمزية",
    description: "هدايا رمزية للمناسبات والإنجازات",
    icon: <Gift className="h-5 w-5" />,
    color: "bg-purple-100 text-purple-800"
  }
];

const recentRewards: RewardItem[] = [
  {
    id: "reward-001",
    type: "bonus",
    employeeId: "emp-001",
    employeeName: "أحمد محمد علي",
    employeePhoto: undefined,
    date: new Date("2023-10-25"),
    amount: 2000,
    description: "مكافأة لإنجاز مشروع تطوير النظام قبل الموعد المحدد"
  },
  {
    id: "reward-002",
    type: "trophy",
    employeeId: "emp-004",
    employeeName: "فاطمة يوسف العمري",
    employeePhoto: undefined,
    date: new Date("2023-10-30"),
    description: "موظفة الشهر لشهر أكتوبر 2023"
  },
  {
    id: "reward-003",
    type: "certificate",
    employeeId: "emp-002",
    employeeName: "سارة عبدالله الخالدي",
    employeePhoto: undefined,
    date: new Date("2023-11-05"),
    description: "شهادة تقدير لجهودها المتميزة في قسم الموارد البشرية"
  },
  {
    id: "reward-004",
    type: "gift",
    employeeId: "emp-005",
    employeeName: "خالد سعد الدوسري",
    employeePhoto: undefined,
    date: new Date("2023-11-10"),
    description: "هدية بمناسبة مرور 3 سنوات في الشركة"
  }
];

const RewardTypeCard = ({ type }: { type: RewardType }) => {
  return (
    <Card className="overflow-hidden transition-all hover:border-primary/50">
      <CardHeader className="pb-2">
        <div className={`p-2.5 rounded-lg mb-2 inline-flex ${type.color}`}>
          {type.icon}
        </div>
        <CardTitle className="text-lg">{type.title}</CardTitle>
        <CardDescription className="text-sm mt-1">{type.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex justify-between items-center">
          <Button variant="ghost" size="sm" className="flex items-center">
            إضافة
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const RecentRewardCard = ({ reward }: { reward: RewardItem }) => {
  const type = rewardTypes.find(t => t.id === reward.type);
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("ar-SA");
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={reward.employeePhoto} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {reward.employeeName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-medium">{reward.employeeName}</h4>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`p-1 rounded ${type?.color} inline-flex items-center text-xs`}>
                {type?.icon && <span className="h-3 w-3 mr-1">{type.icon}</span>}
                {type?.title}
              </span>
              <span className="text-xs text-gray-500 flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {formatDate(reward.date)}
              </span>
            </div>
          </div>
          {reward.amount && (
            <div className="text-green-600 font-semibold">{reward.amount} ريال</div>
          )}
        </div>
        <div className="mt-3 text-sm">
          {reward.description}
        </div>
      </CardContent>
    </Card>
  );
};

const RewardsPage: React.FC = () => {
  return (
    <PageContainer title="المكافآت والحوافز">
      <div className="container mx-auto px-4 py-6 rtl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">إدارة المكافآت والحوافز للموظفين</h2>
          <Button onClick={() => console.log("إضافة مكافأة جديدة")}>
            إضافة مكافأة جديدة
          </Button>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">أنواع المكافآت</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewardTypes.map(type => (
              <RewardTypeCard key={type.id} type={type} />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">آخر المكافآت</h2>
            <Button variant="outline" size="sm">عرض الكل</Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recentRewards.map(reward => (
              <RecentRewardCard key={reward.id} reward={reward} />
            ))}
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">إحصائيات المكافآت</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">إجمالي المكافآت المالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12,500 ريال</div>
                <p className="text-xs text-muted-foreground mt-1">آخر 30 يوم</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">عدد المكافآت</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25</div>
                <p className="text-xs text-muted-foreground mt-1">آخر 30 يوم</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">الموظفون المكرمون</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground mt-1">من أصل 32 موظف</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default RewardsPage;
