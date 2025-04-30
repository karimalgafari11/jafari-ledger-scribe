
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, BarChart, LineChart } from "@/components/ui/charts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ReportDashboardProps {
  title: string;
  summary: string;
  pieChartData: any;
  barChartData: any;
  lineChartData: any;
}

export const ReportDashboard: React.FC<ReportDashboardProps> = ({
  title,
  summary,
  pieChartData,
  barChartData,
  lineChartData
}) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-gray-500">{summary}</p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar">
          <TabsList className="mb-4">
            <TabsTrigger value="bar">رسم بياني شريطي</TabsTrigger>
            <TabsTrigger value="pie">رسم بياني دائري</TabsTrigger>
            <TabsTrigger value="line">رسم بياني خطي</TabsTrigger>
          </TabsList>
          <TabsContent value="bar">
            <div className="h-[350px] w-full">
              <BarChart data={barChartData} />
            </div>
          </TabsContent>
          <TabsContent value="pie">
            <div className="h-[350px] w-full">
              <PieChart data={pieChartData} />
            </div>
          </TabsContent>
          <TabsContent value="line">
            <div className="h-[350px] w-full">
              <LineChart data={lineChartData} />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
