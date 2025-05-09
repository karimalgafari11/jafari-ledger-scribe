
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Calendar } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, description, icon, trend }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      {trend && (
        <div className={`flex items-center mt-2 text-xs ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
          <span>{trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%</span>
          <span className="ml-1">{trend.isPositive ? "زيادة" : "انخفاض"} عن الشهر السابق</span>
        </div>
      )}
    </CardContent>
  </Card>
);

interface HRStatsCardsProps {
  stats: {
    totalEmployees: number;
    activeEmployees: number;
    onLeaveEmployees: number;
    newHires: number;
  };
}

const HRStatsCards: React.FC<HRStatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="إجمالي الموظفين"
        value={stats.totalEmployees}
        icon={<Users size={18} />}
      />
      <StatCard
        title="الموظفون النشطون"
        value={stats.activeEmployees}
        icon={<UserCheck size={18} />}
        trend={{ value: 5, isPositive: true }}
      />
      <StatCard
        title="في إجازة"
        value={stats.onLeaveEmployees}
        icon={<UserX size={18} />}
      />
      <StatCard
        title="تعيينات جديدة"
        value={stats.newHires}
        description="في آخر 30 يوم"
        icon={<Calendar size={18} />}
        trend={{ value: 12, isPositive: true }}
      />
    </div>
  );
};

export default HRStatsCards;
