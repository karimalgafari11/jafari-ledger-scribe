
import React, { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { useExpenses } from "@/hooks/useExpenses";
import { Expense } from "@/types/expenses";
import { subDays, startOfMonth } from "date-fns";
import { toast } from "sonner";
import { ExpenseReportStats } from "@/components/expenses/ExpenseReportStats";
import { ExpenseReportFilters } from "@/components/expenses/ExpenseReportFilters";
import { ExpenseReportActions } from "@/components/expenses/ExpenseReportActions";
import { ExpenseReportCharts } from "@/components/expenses/ExpenseReportCharts";
import { ReportTable } from "@/components/reports/ReportTable";

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

  const prepareChartData = () => {
    const expensesByCategory: Record<string, number> = {};
    filteredExpenses.forEach((expense) => {
      if (!expensesByCategory[expense.category]) {
        expensesByCategory[expense.category] = 0;
      }
      expensesByCategory[expense.category] += expense.amount;
    });

    const categoryLabels = Object.keys(expensesByCategory);
    const categoryData = Object.values(expensesByCategory);

    const expensesByPaymentMethod: Record<string, number> = {
      cash: 0,
      credit: 0,
      bank: 0,
    };
    filteredExpenses.forEach((expense) => {
      expensesByPaymentMethod[expense.paymentMethod] += expense.amount;
    });

    const pieColors = [
      "rgba(255, 99, 132, 0.7)",
      "rgba(54, 162, 235, 0.7)",
      "rgba(255, 206, 86, 0.7)",
      "rgba(75, 192, 192, 0.7)",
      "rgba(153, 102, 255, 0.7)",
      "rgba(255, 159, 64, 0.7)",
    ];

    const pieChartBorderColors = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(75, 192, 192, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ];

    return {
      pieChartData: {
        labels: categoryLabels,
        datasets: [
          {
            label: "المصروفات",
            data: categoryData as number[],
            backgroundColor: pieColors,
            borderColor: pieChartBorderColors,
          },
        ],
      },
      barChartData: {
        labels: ["نقداً", "بطاقة ائتمان", "تحويل بنكي"],
        datasets: [
          {
            label: "المصروفات حسب طريقة الدفع",
            data: [
              expensesByPaymentMethod.cash,
              expensesByPaymentMethod.credit,
              expensesByPaymentMethod.bank,
            ] as number[],
            backgroundColor: "rgba(54, 162, 235, 0.7)",
            borderColor: "rgba(54, 162, 235, 1)",
          },
        ],
      },
    };
  };

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

  const chartData = prepareChartData();

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
