
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartData {
  name: string;
  sales: number;
  target: number;
  expenses: number;
}

interface SalesExpensesChartProps {
  data: ChartData[];
}

const SalesExpensesChart: React.FC<SalesExpensesChartProps> = ({ data }) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            المبيعات والمصروفات
          </CardTitle>
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[120px] h-8">
              <SelectValue placeholder="عرض" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">يومي</SelectItem>
              <SelectItem value="weekly">أسبوعي</SelectItem>
              <SelectItem value="monthly">شهري</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>تحليل الإيرادات والمصروفات حسب الفترة</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ReBarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} ريال`]} />
              <Legend />
              <Bar name="المبيعات" dataKey="sales" fill="#8884d8" radius={[4, 4, 0, 0]} />
              <Bar name="المصروفات" dataKey="expenses" fill="#FF8042" radius={[4, 4, 0, 0]} />
              <Bar name="المستهدف" dataKey="target" fill="#82ca9d" radius={[4, 4, 0, 0]} />
            </ReBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesExpensesChart;
