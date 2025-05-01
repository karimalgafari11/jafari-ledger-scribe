
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface KpiMetric {
  title: string;
  value: string;
  status: "up" | "down";
  description: string;
}

interface KpiMetricsGridProps {
  metrics: KpiMetric[];
}

const KpiMetricsGrid: React.FC<KpiMetricsGridProps> = ({ metrics }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" />
        مؤشرات الأداء الرئيسية (KPIs)
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((kpi, index) => (
          <Card key={index} className="bg-gradient-to-br from-white to-gray-50 shadow-md">
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-muted-foreground mb-1">{kpi.title}</div>
              <div className="text-3xl font-bold flex items-center gap-2">
                {kpi.value}
                {kpi.status === 'up' && <TrendingUp className="h-5 w-5 text-green-500" />}
                {kpi.status === 'down' && <TrendingUp className="h-5 w-5 text-red-500 rotate-180" />}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KpiMetricsGrid;
