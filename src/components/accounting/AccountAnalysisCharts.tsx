
import React from "react";
import { Account } from "@/types/accounts";
import { PieChart, BarChart, LineChart } from "@/components/ui/charts";
import { cn } from "@/lib/utils";

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

  // Transform data for charts
  const pieChartData = {
    labels: Object.keys(typeDistribution).map(type => {
      const labels: Record<string, string> = {
        asset: 'الأصول',
        liability: 'الالتزامات',
        equity: 'حقوق الملكية',
        revenue: 'الإيرادات',
        expense: 'المصروفات'
      };
      return labels[type];
    }),
    datasets: [{
      label: 'توزيع الحسابات',
      data: Object.values(typeDistribution),
      backgroundColor: [
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 99, 132, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)'
      ]
    }]
  };

  const barChartData = {
    labels: accounts
      .filter(acc => acc.balance > 0)
      .slice(0, 5)
      .map(acc => acc.name),
    datasets: [{
      label: 'أعلى 5 أرصدة',
      data: accounts
        .filter(acc => acc.balance > 0)
        .slice(0, 5)
        .map(acc => acc.balance),
      backgroundColor: 'rgba(54, 162, 235, 0.7)',
      borderColor: 'rgba(54, 162, 235, 1)',
    }]
  };

  const lineChartData = {
    labels: ['المستوى 1', 'المستوى 2', 'المستوى 3'],
    datasets: [{
      label: 'متوسط الرصيد حسب المستوى',
      data: [1, 2, 3].map(level => {
        const levelAccounts = accounts.filter(acc => acc.level === level);
        if (levelAccounts.length === 0) return 0;
        const total = levelAccounts.reduce((sum, acc) => sum + acc.balance, 0);
        return total / levelAccounts.length;
      }),
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    }]
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">توزيع الحسابات حسب النوع</h3>
          <PieChart className="h-[300px]" data={pieChartData} />
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">أعلى 5 حسابات من حيث الرصيد</h3>
          <BarChart className="h-[300px]" data={barChartData} />
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 text-center">متوسط الأرصدة حسب المستوى</h3>
          <LineChart className="h-[300px]" data={lineChartData} />
        </div>
      </div>
    </div>
  );
}
