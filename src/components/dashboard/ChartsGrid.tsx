
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
  profitData,
  customerDebtData,
  supplierCreditData,
  costCenterData,
  dailySalesData,
  systemAlerts = [], 
  onViewAllAlerts = () => {}
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>أداء المبيعات</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={salesData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>الربحية</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={profitData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ديون العملاء</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart data={customerDebtData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>الائتمان من الموردين</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart data={supplierCreditData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>مراكز التكلفة</CardTitle>
        </CardHeader>
        <CardContent>
          <PieChart data={costCenterData} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>المبيعات اليومية</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={dailySalesData} />
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>التنبيهات الحديثة</CardTitle>
            <Button variant="link" onClick={onViewAllAlerts}>عرض الكل</Button>
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
