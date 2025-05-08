
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/charts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertsTabs } from "@/components/dashboard/AlertsTabs";
import { ChartData } from "@/types/custom-reports";
import { SystemAlert } from "@/types/ai";

interface ChartsGridProps {
  salesData?: ChartData;
  customerData?: ChartData;
  profitData?: ChartData;
  customerDebtData?: ChartData;
  supplierCreditData?: ChartData;
  costCenterData?: ChartData;
  dailySalesData?: ChartData;
  profitMargin?: string;
  systemAlerts?: SystemAlert[];
  interactiveMode?: boolean;
  onViewAllAlerts?: () => void;
}

const ChartsGrid: React.FC<ChartsGridProps> = ({ 
  salesData, 
  customerData, 
  systemAlerts = [], 
  onViewAllAlerts = () => {} 
}) => {
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
          <AlertsTabs alerts={systemAlerts} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsGrid;
