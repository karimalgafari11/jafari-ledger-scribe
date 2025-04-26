import React, { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { useExpenses } from "@/hooks/useExpenses";
import { Expense } from "@/types/expenses";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format, subDays, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";
import { ar } from "date-fns/locale";
import { toast } from "sonner";
import { PieChart, LineChart, BarChart } from "@/components/ui/charts";
import { Calendar as CalendarIcon, Download, FileText, ArrowDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const ReportTable = ({ expenses }: { expenses: Expense[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted">
            <th className="border p-2 text-right">التاريخ</th>
            <th className="border p-2 text-right">التصنيف</th>
            <th className="border p-2 text-right">الوصف</th>
            <th className="border p-2 text-right">المبلغ</th>
            <th className="border p-2 text-right">طريقة الدفع</th>
            <th className="border p-2 text-right">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id} className="hover:bg-muted/50">
              <td className="border p-2">
                {format(expense.date, "dd/MM/yyyy", { locale: ar })}
              </td>
              <td className="border p-2">{expense.category}</td>
              <td className="border p-2">{expense.description}</td>
              <td className="border p-2">{expense.amount.toLocaleString("ar-SA")} ريال</td>
              <td className="border p-2">
                {expense.paymentMethod === "cash"
                  ? "نقداً"
                  : expense.paymentMethod === "credit"
                  ? "بطاقة ائتمان"
                  : "تحويل بنكي"}
              </td>
              <td className="border p-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    expense.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : expense.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {expense.status === "approved"
                    ? "مقبول"
                    : expense.status === "rejected"
                    ? "مرفوض"
                    : "قيد الانتظار"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-muted">
            <td colSpan={3} className="border p-2 font-bold">
              الإجمالي
            </td>
            <td colSpan={3} className="border p-2 font-bold">
              {expenses.reduce((total, expense) => total + expense.amount, 0).toLocaleString("ar-SA")} ريال
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

const ExpenseReportsPage: React.FC = () => {
  const { expenses, categories, calculateExpensesByCategory } = useExpenses();
  const [reportType, setReportType] = useState<string>("all");
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
            backgroundColor: pieColors[0],
            borderColor: pieChartBorderColors[0],
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

  const chartData = prepareChartData();

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
          from: startOfYear(today),
          to: today,
        });
        break;
      default:
        break;
    }
  };

  const exportReport = (format: "excel" | "pdf") => {
    toast.success(`تم تصدير التقرير بتنسيق ${format === "excel" ? "Excel" : "PDF"}`);
  };

  const shareViaWhatsApp = () => {
    toast.success("تم نسخ رابط التقرير للمشاركة عبر WhatsApp");
  };

  return (
    <div className="container mx-auto p-6 rtl">
      <Header title="تقارير المصروفات" showBack={true} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">إجمالي المصروفات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {totalAmount.toLocaleString("ar-SA")} ريال
            </div>
            <p className="text-muted-foreground">
              خلال الفترة من{" "}
              {format(dateRange.from, "dd/MM/yyyy", { locale: ar })} إلى{" "}
              {format(dateRange.to, "dd/MM/yyyy", { locale: ar })}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">عدد المصروفات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {filteredExpenses.length} مصروف
            </div>
            <p className="text-muted-foreground">
              {selectedCategory !== "all"
                ? `تصنيف: ${selectedCategory}`
                : "جميع التصنيفات"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">المتوسط اليومي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {filteredExpenses.length > 0
                ? (
                    totalAmount /
                    (Math.ceil(
                      (dateRange.to.getTime() - dateRange.from.getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) || 1)
                  ).toFixed(2)
                : "0"}{" "}
              ريال
            </div>
            <p className="text-muted-foreground">المصروفات اليومية</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-background p-4 rounded-lg shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">الفترة</label>
            <Select
              value={dateRangePreset}
              onValueChange={handleDateRangePresetChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الفترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">آخر أسبوع</SelectItem>
                <SelectItem value="month">الشهر الحالي</SelectItem>
                <SelectItem value="quarter">آخر 3 أشهر</SelectItem>
                <SelectItem value="year">السنة الحالية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">التصنيف</label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => setSelectedCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر التصنيف" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التصنيفات</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">تاريخ محدد</label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {dateRange.from
                      ? format(dateRange.from, "dd/MM/yyyy", { locale: ar })
                      : "تاريخ البداية"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) =>
                      date && setDateRange({ ...dateRange, from: date })
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    <CalendarIcon className="ml-2 h-4 w-4" />
                    {dateRange.to
                      ? format(dateRange.to, "dd/MM/yyyy", { locale: ar })
                      : "تاريخ النهاية"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 pointer-events-auto">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) =>
                      date && setDateRange({ ...dateRange, to: date })
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">نتائج التقرير</h2>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="ml-2 h-4 w-4" />
                تصدير التقرير
                <ArrowDown className="mr-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => exportReport("excel")}>
                <FileText className="ml-2 h-4 w-4" />
                تصدير كملف Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportReport("pdf")}>
                <FileText className="ml-2 h-4 w-4" />
                تصدير كملف PDF
              </DropdownMenuItem>
              <DropdownMenuItem onClick={shareViaWhatsApp}>
                <FileText className="ml-2 h-4 w-4" />
                مشاركة عبر WhatsApp
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div ref={reportRef}>
        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
            <TabsTrigger value="table">جدول</TabsTrigger>
            <TabsTrigger value="pie">رسم دائري</TabsTrigger>
            <TabsTrigger value="bar">رسم شريطي</TabsTrigger>
          </TabsList>

          <TabsContent value="table" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <ReportTable expenses={filteredExpenses} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pie" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  {filteredExpenses.length > 0 ? (
                    <PieChart 
                      data={chartData.pieChartData} 
                      className="h-full w-full" 
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-muted-foreground">لا توجد بيانات كافية لعرض الرسم البياني</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bar" className="mt-0">
            <Card>
              <CardContent className="p-6">
                <div className="h-[400px]">
                  {filteredExpenses.length > 0 ? (
                    <BarChart 
                      data={chartData.barChartData} 
                      className="h-full w-full" 
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-muted-foreground">لا توجد بيانات كافية لعرض الرسم البياني</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExpenseReportsPage;
