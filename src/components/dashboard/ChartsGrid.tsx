import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/charts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChartData } from "@/types/custom-reports";
import { AlertsTabs } from "@/components/dashboard/AlertsTabs";

interface ChartsGridProps {
  salesData: ChartData;
  customerData: ChartData;
  alerts: any[];
  onViewAllAlerts: () => void;
}

const ChartsGrid: React.FC<ChartsGridProps> = ({ salesData, customerData, alerts, onViewAllAlerts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Sales Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={salesData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Demographics</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart data={customerData} />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Alerts</CardTitle>
            <Button variant="link" onClick={onViewAllAlerts}>View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <AlertsTabs alerts={alerts} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsGrid;
