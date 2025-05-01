
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string;
  status: "up" | "down" | "neutral";
  description: string;
  icon?: React.ReactNode;
  iconBackground?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ 
  title, 
  value, 
  status, 
  description, 
  icon, 
  iconBackground = "bg-primary/10" 
}) => {
  return (
    <Card className="shadow-md hover:shadow-lg transition-all">
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <div>
          <CardTitle className="text-lg font-medium text-primary">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {icon && (
          <div className={`${iconBackground} p-2 rounded-full`}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
          <TrendingUp 
            className={`h-3.5 w-3.5 ${status === 'down' ? 'rotate-180 text-red-600' : 'text-green-600'}`} 
          />
          <span className={status === 'down' ? 'text-red-600' : 'text-green-600'}>
            {status === 'up' ? '↑' : '↓'}
            {status !== 'neutral' && '12.4%'}
          </span>
          {status !== 'neutral' && ' مقارنة بالفترة السابقة'}
        </p>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
