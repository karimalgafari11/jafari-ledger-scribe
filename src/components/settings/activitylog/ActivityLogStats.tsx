
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheck, AlertTriangle, CircleX, Activity } from "lucide-react";

interface ActivityLogStatsProps {
  stats: {
    total: number;
    success: number;
    failed: number;
    warning: number;
  };
}

const ActivityLogStats: React.FC<ActivityLogStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">إجمالي السجلات</p>
              <h3 className="text-2xl font-bold">{stats.total}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CircleCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">عمليات ناجحة</p>
              <h3 className="text-2xl font-bold">{stats.success}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">تحذيرات</p>
              <h3 className="text-2xl font-bold">{stats.warning}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <CircleX className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">عمليات فاشلة</p>
              <h3 className="text-2xl font-bold">{stats.failed}</h3>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityLogStats;
