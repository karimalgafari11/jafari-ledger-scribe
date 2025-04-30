
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Bar, Line, BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ExchangeRateStatisticsProps {
  historicalData: {
    date: string;
    rate: number;
  }[];
  recentChanges: {
    currencyPair: string;
    percentageChange: number;
  }[];
  isLoading: boolean;
}

export const ExchangeRateStatistics: React.FC<ExchangeRateStatisticsProps> = ({
  historicalData,
  recentChanges,
  isLoading
}) => {
  if (isLoading) {
    return (
      <Card className="min-h-[300px] flex items-center justify-center">
        <div className="text-center text-gray-500">جاري تحميل البيانات...</div>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">تاريخ سعر الصرف</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={historicalData}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#8884d8" 
                name="سعر الصرف" 
                dot={false}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold mb-4">التغيرات الحديثة في أسعار الصرف (%)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={recentChanges}
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="currencyPair" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="percentageChange" 
                fill="#82ca9d" 
                name="نسبة التغير" 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
