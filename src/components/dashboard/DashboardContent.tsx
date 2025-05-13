
import React, { useState } from 'react';
import DashboardWelcome from './DashboardWelcome';
import { DashboardHeader } from './DashboardHeader';
import { RecentInvoices } from './RecentInvoices';
import { Tasks } from './Tasks';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDashboardData } from '@/hooks/useDashboardData';
import { Skeleton } from '@/components/ui/skeleton';
import UpdatesNotifier from './UpdatesNotifier';
import { useDashboard } from '@/hooks/useDashboard';
import DashboardShortcuts from './DashboardShortcuts';
import KpiMetricsGrid from './KpiMetricsGrid';
import ChartsGrid from './ChartsGrid';

const DashboardContent = () => {
  const { totalRevenue, newCustomers, totalOrders, averageOrderValue, recentInvoices, tasks, isLoading, error } = useDashboardData();
  
  // Use the dashboard hook to get shortcuts, KPIs and chart data
  const {
    displayOptions,
    shortcuts,
    dashboardKpis,
    salesData,
    profitData,
    customerDebtData,
    supplierCreditData,
    costCenterData,
    dailySalesData,
    alerts
  } = useDashboard();
  
  // Dashboard Welcome state
  const [date, setDate] = useState<Date>(new Date());
  const [period, setPeriod] = useState<string>("monthly");
  
  const handleViewAllAlerts = () => {
    console.log("View all alerts clicked");
    // Navigate to alerts page or open alerts dialog in a real implementation
  };
  
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
      
      {/* Render the shortcuts section if enabled in displayOptions */}
      {displayOptions.showStats && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">الاختصارات السريعة</h2>
          <DashboardShortcuts shortcuts={shortcuts} />
        </div>
      )}

      <DashboardHeader />
      
      {/* Render the statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>إجمالي الإيرادات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>عملاء جدد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-2">
              {newCustomers}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>إجمالي الطلبات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>متوسط قيمة الطلب</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageOrderValue}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Render KPI metrics if enabled in displayOptions */}
      {displayOptions.showKpis && (
        <KpiMetricsGrid metrics={dashboardKpis} />
      )}
      
      {/* Render charts if enabled in displayOptions */}
      {displayOptions.showCharts && (
        <ChartsGrid 
          salesData={salesData}
          profitData={profitData}
          customerDebtData={customerDebtData}
          supplierCreditData={supplierCreditData}
          costCenterData={costCenterData}
          dailySalesData={dailySalesData}
          systemAlerts={alerts}
          onViewAllAlerts={handleViewAllAlerts}
        />
      )}
      
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
