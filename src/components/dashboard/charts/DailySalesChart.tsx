
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DailySalesData {
  day: string;
  sales: number;
}

interface DailySalesChartProps {
  data: DailySalesData[];
}

const DailySalesChart: React.FC<DailySalesChartProps> = ({ data }) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          المبيعات اليومية (الأسبوع الحالي)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value} ريال`, "المبيعات"]} />
              <Area type="monotone" dataKey="sales" stroke="#8884d8" fill="rgb(136, 132, 216, 0.3)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySalesChart;
