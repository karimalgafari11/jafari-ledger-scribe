
import React from "react";
import { Account } from "@/types/accounts";
import { PieChart, BarChart, LineChart } from "@/components/ui/charts";
import { cn } from "@/lib/utils";
import { getPieChartColors } from "@/utils/chartUtils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AccountAnalysisChartsProps {
  accounts: Account[];
  className?: string;
}

export function AccountAnalysisCharts({ accounts, className }: AccountAnalysisChartsProps) {
  // Calculate totals by account type
  const typeDistribution = accounts.reduce((acc, account) => {
    if (!acc[account.type]) acc[account.type] = 0;
    acc[account.type] += account.balance;
    return acc;
  }, {} as Record<string, number>);

  // Get chart colors
  const { pieColors } = getPieChartColors();
  
  // Type labels in Arabic
  const typeLabels: Record<string, string> = {
    asset: 'الأصول',
    liability: 'الالتزامات',
    equity: 'حقوق الملكية',
    revenue: 'الإيرادات',
    expense: 'المصروفات'
  };
  
  // Chart colors by type
  const chartColors: Record<string, string> = {
    asset: 'rgba(59, 130, 246, 0.7)', // blue
    liability: 'rgba(239, 68, 68, 0.7)', // red
    equity: 'rgba(34, 197, 94, 0.7)', // green
    revenue: 'rgba(168, 85, 247, 0.7)', // purple
    expense: 'rgba(249, 115, 22, 0.7)', // orange
  };
  
  // Transform data for charts
  const pieChartData = {
    labels: Object.keys(typeDistribution).map(type => typeLabels[type] || type),
    datasets: [{
      label: 'توزيع الحسابات',
      data: Object.values(typeDistribution),
      backgroundColor: Object.keys(typeDistribution).map(type => chartColors[type]),
      borderColor: '#ffffff',
      borderWidth: 2
    }]
  };

  const barChartData = {
    labels: accounts
      .filter(acc => acc.balance > 0)
      .sort((a, b) => b.balance - a.balance)
      .slice(0, 5)
      .map(acc => acc.name),
    datasets: [{
      label: 'أعلى 5 أرصدة',
      data: accounts
        .filter(acc => acc.balance > 0)
        .sort((a, b) => b.balance - a.balance)
        .slice(0, 5)
        .map(acc => acc.balance),
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      borderRadius: 4
    }]
  };

  const levelAverages = [1, 2, 3].map(level => {
    const levelAccounts = accounts.filter(acc => acc.level === level);
    if (levelAccounts.length === 0) return 0;
    const total = levelAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    return total / levelAccounts.length;
  });

  const lineChartData = {
    labels: ['المستوى 1', 'المستوى 2', 'المستوى 3'],
    datasets: [{
      label: 'متوسط الرصيد حسب المستوى',
      data: levelAverages,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      tension: 0.3,
      fill: true
    }]
  };

  // Calculate summary stats
  const totalAccounts = accounts.length;
  const totalAssets = accounts.filter(acc => acc.type === 'asset').reduce((sum, acc) => sum + acc.balance, 0);
  const totalLiabilities = accounts.filter(acc => acc.type === 'liability').reduce((sum, acc) => sum + acc.balance, 0);
  const netWorth = totalAssets - totalLiabilities;

  return (
    <div className={cn("space-y-6", className)}>
      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-blue-800 font-medium">إجمالي الأصول</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">{totalAssets.toLocaleString('ar-SA')} ر.س</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-red-800 font-medium">إجمالي الالتزامات</p>
              <h3 className="text-2xl font-bold text-red-900 mt-1">{totalLiabilities.toLocaleString('ar-SA')} ر.س</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-green-800 font-medium">صافي القيمة</p>
              <h3 className="text-2xl font-bold text-green-900 mt-1">{netWorth.toLocaleString('ar-SA')} ر.س</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">توزيع الحسابات حسب النوع</CardTitle>
            <CardDescription>نسبة كل نوع من الحسابات من الإجمالي</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart className="h-[280px]" data={pieChartData} />
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">أعلى 5 حسابات من حيث الرصيد</CardTitle>
            <CardDescription>الحسابات ذات الأرصدة الأعلى</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart className="h-[280px]" data={barChartData} />
          </CardContent>
        </Card>
        
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">متوسط الأرصدة حسب المستوى</CardTitle>
            <CardDescription>مقارنة متوسط الأرصدة بين مستويات الحسابات</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart className="h-[280px]" data={lineChartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
