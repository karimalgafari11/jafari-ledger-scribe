import React, { useState } from "react";
import { Header } from "@/components/Header";
import { DateRange } from "react-day-picker";
import { useAiAssistant } from "@/hooks/useAiAssistant";
import { useInventoryProducts } from "@/hooks/useInventoryProducts";
import { useJournalEntries } from "@/hooks/useJournalEntries";
import FinancialDecisionsWidget from "@/components/ai/FinancialDecisionsWidget";
import StatsCards from "@/components/dashboard/StatsCards";
import KpiMetricsGrid from "@/components/dashboard/KpiMetricsGrid";
import DashboardFilters from "@/components/dashboard/DashboardFilters";
import ChartsGrid from "@/components/dashboard/ChartsGrid";

// بيانات تمثيلية - في التطبيق الحقيقي ستأتي من API
const salesData = [{
  name: "يناير",
  sales: 52470,
  target: 45000,
  expenses: 32500
}, {
  name: "فبراير",
  sales: 43820,
  target: 45000,
  expenses: 28600
}, {
  name: "مارس",
  sales: 65500,
  target: 60000,
  expenses: 42800
}, {
  name: "أبريل",
  sales: 74600,
  target: 70000,
  expenses: 35900
}, {
  name: "مايو",
  sales: 84200,
  target: 80000,
  expenses: 38400
}, {
  name: "يونيو",
  sales: 95800,
  target: 90000,
  expenses: 47200
}];
const profitData = salesData.map(item => ({
  name: item.name,
  profit: item.sales - item.expenses,
  profitMargin: ((item.sales - item.expenses) / item.sales * 100).toFixed(1)
}));
const customerDebtData = [{
  name: "شركة الأفق",
  value: 48500,
  percentage: 28
}, {
  name: "مؤسسة النور",
  value: 35200,
  percentage: 21
}, {
  name: "شركة الإبداع",
  value: 29800,
  percentage: 17
}, {
  name: "مؤسسة التقدم",
  value: 24500,
  percentage: 14
}, {
  name: "أخرى",
  value: 34000,
  percentage: 20
}];
const supplierCreditData = [{
  name: "شركة المستقبل",
  value: 67200,
  percentage: 32
}, {
  name: "مؤسسة الريادة",
  value: 54000,
  percentage: 25
}, {
  name: "شركة التطوير",
  value: 38900,
  percentage: 19
}, {
  name: "مؤسسة البناء",
  value: 31500,
  percentage: 15
}, {
  name: "أخرى",
  value: 19400,
  percentage: 9
}];
const dailySalesData = [{
  day: "السبت",
  sales: 12500
}, {
  day: "الأحد",
  sales: 14800
}, {
  day: "الاثنين",
  sales: 16200
}, {
  day: "الثلاثاء",
  sales: 15700
}, {
  day: "الأربعاء",
  sales: 18900
}, {
  day: "الخميس",
  sales: 21300
}, {
  day: "الجمعة",
  sales: 9800
}];
const costCenterData = [{
  name: "المبيعات",
  value: 145000,
  percentage: 48
}, {
  name: "التسويق",
  value: 87500,
  percentage: 29
}, {
  name: "الإدارة",
  value: 42500,
  percentage: 14
}, {
  name: "تقنية المعلومات",
  value: 27000,
  percentage: 9
}];
const Dashboard = () => {
  const {
    systemAlerts
  } = useAiAssistant();
  const {
    products
  } = useInventoryProducts();
  const {
    entries
  } = useJournalEntries();
  const [date, setDate] = useState<DateRange>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [branch, setBranch] = useState<string>('all');
  const [department, setDepartment] = useState<string>('all');

  // حساب معلومات التقارير
  const lowStockItems = products.filter(p => p.quantity <= p.reorderLevel);
  const activeProducts = products.filter(p => p.isActive);

  // حساب إجماليات الدخل والمصروفات والربح
  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
  const totalExpenses = salesData.reduce((sum, item) => sum + item.expenses, 0);
  const netProfit = totalSales - totalExpenses;
  const profitMargin = (netProfit / totalSales * 100).toFixed(1);

  // حساب الفواتير المتأخرة (مثال)
  const overdueInvoices = 12;
  const overdueTotalAmount = 48250;

  // مؤشرات الأداء الرئيسية
  const kpis = [{
    title: "نمو المبيعات",
    value: "+12.4%",
    status: "up" as const,
    description: "مقارنة بالفترة السابقة"
  }, {
    title: "نسبة الربح الإجمالي",
    value: `${profitMargin}%`,
    status: "up" as const,
    description: "من إجمالي المبيعات"
  }, {
    title: "متوسط قيمة الفاتورة",
    value: "645 ريال",
    status: "down" as const,
    description: "انخفاض 3.2% عن الشهر السابق"
  }, {
    title: "معدل تكرار الشراء",
    value: "2.8",
    status: "neutral" as const,
    description: "متوسط عدد المشتريات لكل عميل"
  }];
  return <div className="w-full p-6 rtl px-[7px] mx-[6px] py-0 bg-orange-600">
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 bg-blue-400 px-[8px] mx-0 py-[2px] my-[5px]">
        <Header title="لوحة التحكم الرئيسية" />
        <DashboardFilters date={date} onDateChange={setDate} period={period} onPeriodChange={value => setPeriod(value)} branch={branch} onBranchChange={setBranch} />
      </div>
      
      {/* بطاقات الإحصائيات الرئيسية */}
      <StatsCards totalSales={totalSales} totalExpenses={totalExpenses} netProfit={netProfit} profitMargin={profitMargin} overdueInvoices={overdueInvoices} overdueTotalAmount={overdueTotalAmount} />

      {/* مؤشرات الأداء الرئيسية */}
      <KpiMetricsGrid metrics={kpis} />

      {/* المخططات والرسوم البيانية */}
      <ChartsGrid salesData={salesData} profitData={profitData} customerDebtData={customerDebtData} supplierCreditData={supplierCreditData} costCenterData={costCenterData} dailySalesData={dailySalesData} profitMargin={profitMargin} systemAlerts={systemAlerts} />
      
      {/* FinancialDecisionsWidget من النظام الذكي */}
      <div className="mt-6">
        <FinancialDecisionsWidget />
      </div>
    </div>;
};
export default Dashboard;