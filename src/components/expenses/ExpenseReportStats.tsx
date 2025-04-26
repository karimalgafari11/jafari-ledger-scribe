
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense } from "@/types/expenses";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface ExpenseReportStatsProps {
  totalAmount: number;
  filteredExpenses: Expense[];
  dateRange: {
    from: Date;
    to: Date;
  };
  selectedCategory: string;
}

export const ExpenseReportStats: React.FC<ExpenseReportStatsProps> = ({
  totalAmount,
  filteredExpenses,
  dateRange,
  selectedCategory,
}) => {
  return (
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
  );
};
