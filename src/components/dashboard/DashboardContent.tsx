
import React, { useState } from 'react';
import DashboardWelcome from './DashboardWelcome';
import { DashboardHeader } from './DashboardHeader';
import { RecentInvoices } from './RecentInvoices';
import { Tasks } from './Tasks';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';
import UpdatesNotifier from './UpdatesNotifier';

const DashboardContent = () => {
  const { totalRevenue, newCustomers, totalOrders, averageOrderValue, recentInvoices, tasks, isLoading, error } = useDashboardData();
  
  // Dashboard Welcome state
  const [date, setDate] = useState<Date>(new Date());
  const [period, setPeriod] = useState<string>("monthly");
  
  if (isLoading) {
    return (
      <div className="px-4 py-6 space-y-6">
        <DashboardHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>إجمالي الإيرادات</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>عملاء جدد</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>إجمالي الطلبات</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>متوسط قيمة الطلب</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>أحدث الفواتير</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48" />
            </CardContent>
          </Card>
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>المهام</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-6 space-y-6">
        <DashboardHeader />
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6">
      <DashboardWelcome 
        date={date}
        onDateChange={setDate}
        period={period}
        onPeriodChange={setPeriod}
        userName="المستخدم"
        companyName="نظام المحاسبة"
      />
      <UpdatesNotifier />
      <DashboardHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>إجمالي الإيرادات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue}</div>
            {/* <div className="text-sm text-gray-500">
              {calculatePercentageChange(totalRevenue, 10)}% مقارنة بالشهر الماضي
            </div> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>عملاء جدد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {newCustomers}
              {/* <ArrowUp className="h-4 w-4 text-green-500" />
              <span className="text-sm text-green-500">
                {calculatePercentageChange(newCustomers, 5)}%
              </span> */}
            </div>
            {/* <div className="text-sm text-gray-500">
              {calculatePercentageChange(newCustomers, 5)}% مقارنة بالشهر الماضي
            </div> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>إجمالي الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            {/* <div className="text-sm text-gray-500">
              {calculatePercentageChange(totalOrders, 8)}% مقارنة بالشهر الماضي
            </div> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>متوسط قيمة الطلب</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageOrderValue}</div>
            {/* <div className="text-sm text-gray-500">
              {calculatePercentageChange(averageOrderValue, 3)}% مقارنة بالشهر الماضي
            </div> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>أحدث الفواتير</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentInvoices invoices={recentInvoices} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>المهام</CardTitle>
          </CardHeader>
          <CardContent>
            <Tasks tasks={tasks} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardContent;
