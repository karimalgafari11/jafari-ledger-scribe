
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

interface VendorReportChartsProps {
  pieChartData: any;
  barChartData: any;
  lineChartData: any;
}

export const VendorReportCharts: React.FC<VendorReportChartsProps> = ({
  pieChartData,
  barChartData,
  lineChartData
}) => {
  const [activeTab, setActiveTab] = useState("bar");
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">التحليل البياني للمشتريات</h2>
        
        <Tabs defaultValue="bar" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 w-full grid grid-cols-3">
            <TabsTrigger value="bar">مشتريات حسب الشهر</TabsTrigger>
            <TabsTrigger value="pie">توزيع المشتريات</TabsTrigger>
            <TabsTrigger value="line">اتجاه المشتريات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bar" className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={barChartData?.datasets || []}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="مشتريات 2023" fill="#3b82f6" />
                <Bar dataKey="مشتريات 2022" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="pie" className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData?.datasets?.[0]?.data.map((value: number, index: number) => ({
                    name: pieChartData.labels[index],
                    value
                  })) || []}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData?.datasets?.[0]?.data.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} ريال`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="line" className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={lineChartData?.datasets || []}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="عدد طلبات الشراء" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="عدد المشتريات المستلمة" 
                  stroke="#8884d8" 
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
