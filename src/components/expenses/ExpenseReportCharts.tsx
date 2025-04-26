
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, BarChart } from "@/components/ui/charts";
import { ChartData } from "@/components/ui/charts";

interface ExpenseReportChartsProps {
  pieChartData: ChartData;
  barChartData: ChartData;
  filteredExpenses: any[];
}

export const ExpenseReportCharts: React.FC<ExpenseReportChartsProps> = ({
  pieChartData,
  barChartData,
  filteredExpenses,
}) => {
  return (
    <div>
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3 mb-6">
          <TabsTrigger value="table">جدول</TabsTrigger>
          <TabsTrigger value="pie">رسم دائري</TabsTrigger>
          <TabsTrigger value="bar">رسم شريطي</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="h-[400px] overflow-y-auto">
                {filteredExpenses.length > 0 ? (
                  <div className="h-full">
                    <p className="mb-4 font-semibold text-lg">قائمة المصروفات</p>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">
                      لا توجد بيانات كافية لعرض الجدول
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pie" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="h-[400px]">
                {filteredExpenses.length > 0 ? (
                  <PieChart data={pieChartData} className="h-full w-full" />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">
                      لا توجد بيانات كافية لعرض الرسم البياني
                    </p>
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
                  <BarChart data={barChartData} className="h-full w-full" />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-muted-foreground">
                      لا توجد بيانات كافية لعرض الرسم البياني
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
