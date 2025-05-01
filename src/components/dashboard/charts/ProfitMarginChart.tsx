
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface ProfitData {
  name: string;
  profit: number;
  profitMargin: string;
}

interface ProfitMarginChartProps {
  data: ProfitData[];
  averageProfitMargin: string;
}

const ProfitMarginChart: React.FC<ProfitMarginChartProps> = ({ data, averageProfitMargin }) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            هامش الربح
          </CardTitle>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            متوسط هامش الربح: {averageProfitMargin}%
          </Badge>
        </div>
        <CardDescription>تطور نسبة الربح والعائد</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
              <Tooltip formatter={(value, name) => 
                name === "profitMargin" ? 
                [`${value}%`, "هامش الربح"] : 
                [`${value} ريال`, "الربح"]
              } />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="profit" 
                fill="rgb(136, 132, 216, 0.3)" 
                stroke="#8884d8" 
                name="الربح"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="profitMargin" 
                stroke="#82ca9d" 
                name="هامش الربح %" 
                dot={{ stroke: '#82ca9d', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfitMarginChart;
