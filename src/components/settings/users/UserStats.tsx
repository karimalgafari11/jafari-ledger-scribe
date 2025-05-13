
import React from 'react';
import { User } from '@/types/settings';
import { Card, CardContent } from "@/components/ui/card";

interface UserStatsProps {
  users: User[];
}

const UserStats: React.FC<UserStatsProps> = ({ users }) => {
  const activeUsers = users.filter(user => user.isActive).length;
  const inactiveUsers = users.length - activeUsers;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-primary">{users.length}</span>
          <span className="text-sm text-muted-foreground">إجمالي المستخدمين</span>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-green-500">{activeUsers}</span>
          <span className="text-sm text-muted-foreground">المستخدمين النشطين</span>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-bold text-gray-500">{inactiveUsers}</span>
          <span className="text-sm text-muted-foreground">المستخدمين غير النشطين</span>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserStats;
