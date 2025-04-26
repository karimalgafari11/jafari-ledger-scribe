
import React, { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { useExpenses } from "@/hooks/useExpenses";
import { toast } from "sonner";
import { ExpenseReportStats } from "@/components/expenses/ExpenseReportStats";
import { ExpenseReportFilters } from "@/components/expenses/ExpenseReportFilters";
import { ExpenseReportActions } from "@/components/expenses/ExpenseReportActions";
import { ExpenseReportCharts } from "@/components/expenses/ExpenseReportCharts";
import { ReportTable } from "@/components/reports/ReportTable";
import { subDays, startOfMonth } from "date-fns";
import { prepareChartData } from "@/utils/chartUtils";

const ExpenseReportsPage: React.FC = () => {
  const { expenses, categories } = useExpenses();
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dateRangePreset, setDateRangePreset] = useState<string>("month");
  const reportRef = useRef<HTMLDivElement>(null);

  const getFilteredExpenses = () => {
    let filtered = [...expenses];

    if (dateRange.from && dateRange.to) {
      filtered = filtered.filter(
        (expense) =>
          expense.date >= dateRange.from && expense.date <= dateRange.to
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (expense) => expense.category === selectedCategory
      );
    }

    return filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const filteredExpenses = getFilteredExpenses();
  const totalAmount = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const handleDateRangePresetChange = (preset: string) => {
    setDateRangePreset(preset);
    const today = new Date();

    switch (preset) {
      case "week":
        setDateRange({
          from: subDays(today, 7),
          to: today,
        });
        break;
      case "month":
        setDateRange({
          from: startOfMonth(today),
          to: today,
        });
        break;
      case "quarter":
        setDateRange({
          from: subDays(today, 90),
          to: today,
        });
        break;
      case "year":
        setDateRange({
          from: new Date(today.getFullYear(), 0, 1),
          to: today,
        });
        break;
      default:
        break;
    }
  };

  const chartData = prepareChartData(filteredExpenses);

  const exportReport = (format: "excel" | "pdf") => {
    toast.success(`تم تصدير التقرير بتنسيق ${format === "excel" ? "Excel" : "PDF"}`);
  };

  const shareViaWhatsApp = () => {
    toast.success("تم نسخ رابط التقرير للمشاركة عبر WhatsApp");
  };

  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="تقارير المصروفات" showBack={true} />

      <ExpenseReportStats
        totalAmount={totalAmount}
        filteredExpenses={filteredExpenses}
        dateRange={dateRange}
        selectedCategory={selectedCategory}
      />

      <ExpenseReportFilters
        dateRange={dateRange}
        setDateRange={setDateRange}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        dateRangePreset={dateRangePreset}
        onDateRangePresetChange={handleDateRangePresetChange}
      />

      <ExpenseReportActions
        onExport={exportReport}
        onShare={shareViaWhatsApp}
      />

      <div ref={reportRef}>
        <ExpenseReportCharts
          pieChartData={chartData.pieChartData}
          barChartData={chartData.barChartData}
          filteredExpenses={filteredExpenses}
        />
        {filteredExpenses.length > 0 && (
          <div className="mt-6">
            <ReportTable expenses={filteredExpenses} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseReportsPage;
