
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { KpiCard as KpiCardType } from "@/types/executive-dashboard";
import { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, DollarSign, Percent, TrendingDown, TrendingUp, Users } from "lucide-react";

interface KpiCardProps {
  data: KpiCardType;
}

export const KpiCard: React.FC<KpiCardProps> = ({ data }) => {
  const getIcon = (): JSX.Element => {
    const iconProps = { className: "h-5 w-5" };
    
    switch (data.icon) {
      case 'dollar':
        return <DollarSign {...iconProps} className="text-emerald-500" />;
      case 'percent':
        return <Percent {...iconProps} className="text-blue-500" />;
      case 'users':
        return <Users {...iconProps} className="text-violet-500" />;
      case 'trending-up':
        return <TrendingUp {...iconProps} className="text-green-500" />;
      case 'trending-down':
        return <TrendingDown {...iconProps} className="text-red-500" />;
      default:
        return <DollarSign {...iconProps} className="text-gray-500" />;
    }
  };
  
  const getChangeIndicator = () => {
    if (!data.percentChange) return null;
    
    const isPositive = data.status === 'up';
    const isNegative = data.status === 'down';
    
    const textColor = isPositive 
      ? "text-green-600" 
      : isNegative 
        ? "text-red-600" 
        : "text-gray-500";
    
    const Icon = isPositive 
      ? ArrowUpRight 
      : isNegative 
        ? ArrowDownRight 
        : ArrowRight;
    
    return (
      <div className={`flex items-center ${textColor}`}>
        <Icon className="h-3 w-3 mr-1" />
        <span className="text-xs font-medium">
          {isPositive && '+'}
          {data.percentChange}%
        </span>
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="p-2 rounded-md bg-gray-100">
            {getIcon()}
          </div>
          {getChangeIndicator()}
        </div>
        <div className="mt-3">
          <h2 className="text-2xl font-bold">
            {data.value}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {data.title}
          </p>
        </div>
        {data.description && (
          <p className="text-xs text-muted-foreground mt-2">
            {data.description}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
