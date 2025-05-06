
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface SalesOrderStat {
  label: string;
  value: number;
  color: string;
}

interface SalesOrdersStatsProps {
  stats: SalesOrderStat[];
}

export const SalesOrdersStats: React.FC<SalesOrdersStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 rtl">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold mb-1 ${stat.color.split(" ")[1]}`}>
              {stat.value}
            </span>
            <span className="text-sm text-gray-600">{stat.label}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
