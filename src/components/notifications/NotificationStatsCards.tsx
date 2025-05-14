
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Bell, CheckCircle2, Clock, FileClock } from "lucide-react";
import { Notification } from '@/types/notifications';

interface NotificationStatsCardsProps {
  notifications: Notification[];
}

const NotificationStatsCards = ({ notifications }: NotificationStatsCardsProps) => {
  // Count stats from notifications
  const totalCount = notifications.length;
  const unreadCount = notifications.filter(n => !n.read).length;
  const readCount = totalCount - unreadCount;
  const criticalCount = notifications.filter(n => n.priority === 'critical').length;
  const highPriorityCount = notifications.filter(n => n.priority === 'high').length;
  
  // Calculate read percentage
  const readPercentage = totalCount > 0 ? Math.round((readCount / totalCount) * 100) : 0;
  
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">إجمالي الإشعارات</CardTitle>
          <Bell className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {readCount} مقروءة, {unreadCount} غير مقروءة
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">غير مقروءة</CardTitle>
          <FileClock className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{unreadCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {unreadCount > 0 ? 'تحتاج إلى المراجعة' : 'لا توجد إشعارات جديدة'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">نسبة القراءة</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{readPercentage}%</div>
          <div className="mt-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full" 
              style={{ width: `${readPercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">أولوية عالية</CardTitle>
          <Clock className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{highPriorityCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {highPriorityCount > 0 ? 'تحتاج إلى اهتمام' : 'لا توجد إشعارات ذات أولوية عالية'}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">أولوية حرجة</CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{criticalCount}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {criticalCount > 0 ? 'تحتاج إلى اهتمام فوري' : 'لا توجد إشعارات حرجة'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationStatsCards;
