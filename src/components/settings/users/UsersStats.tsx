
import React, { useMemo } from 'react';
import { User } from "@/types/settings";
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, UserX, Clock } from "lucide-react";

interface UsersStatsProps {
  users: User[];
}

const UsersStats: React.FC<UsersStatsProps> = ({ users }) => {
  const stats = useMemo(() => {
    const totalUsers = users.length;
    const activeUsers = users.filter(user => user.isActive).length;
    const inactiveUsers = users.filter(user => !user.isActive).length;
    
    // حساب المستخدمين الذين سجلوا دخول في آخر 30 يوم
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentActiveUsers = users.filter(user => 
      user.lastLogin && new Date(user.lastLogin) >= thirtyDaysAgo
    ).length;

    return { totalUsers, activeUsers, inactiveUsers, recentActiveUsers };
  }, [users]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      <StatsCard 
        title="إجمالي المستخدمين"
        value={stats.totalUsers}
        icon={<Users className="h-5 w-5" />}
        color="bg-blue-100 text-blue-600"
      />
      <StatsCard 
        title="المستخدمون النشطون"
        value={stats.activeUsers}
        icon={<UserCheck className="h-5 w-5" />}
        color="bg-green-100 text-green-600"
      />
      <StatsCard 
        title="المستخدمون المعطلون"
        value={stats.inactiveUsers}
        icon={<UserX className="h-5 w-5" />}
        color="bg-rose-100 text-rose-600"
      />
      <StatsCard 
        title="نشطون خلال 30 يوم"
        value={stats.recentActiveUsers}
        icon={<Clock className="h-5 w-5" />}
        color="bg-amber-100 text-amber-600"
      />
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color }) => {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`${color} p-3 rounded-full`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersStats;
