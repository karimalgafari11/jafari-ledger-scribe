
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface InteractiveStatCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  animation?: "pulse" | "fade" | "scale";
  color?: string;
  onClick?: () => void;
}

export const InteractiveStatCard: React.FC<InteractiveStatCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  trend = "neutral",
  trendValue,
  animation,
  color = "blue",
  onClick
}) => {
  const getColorClass = () => {
    switch (color) {
      case "red":
        return {
          bg: "bg-red-50",
          border: "border-red-100",
          icon: "bg-red-100 text-red-600",
          trend: {
            up: "text-green-600",
            down: "text-red-600",
            neutral: "text-gray-600"
          }
        };
      case "green":
        return {
          bg: "bg-green-50",
          border: "border-green-100",
          icon: "bg-green-100 text-green-600",
          trend: {
            up: "text-green-600",
            down: "text-red-600",
            neutral: "text-gray-600"
          }
        };
      case "amber":
        return {
          bg: "bg-amber-50",
          border: "border-amber-100",
          icon: "bg-amber-100 text-amber-600",
          trend: {
            up: "text-green-600",
            down: "text-red-600",
            neutral: "text-gray-600"
          }
        };
      default:
        return {
          bg: "bg-white/70",
          border: "border-blue-100",
          icon: "bg-blue-100 text-blue-600",
          trend: {
            up: "text-green-600",
            down: "text-red-600",
            neutral: "text-gray-600"
          }
        };
    }
  };

  const getAnimationClass = () => {
    switch (animation) {
      case "pulse":
        return "hover:animate-pulse";
      case "fade":
        return "transition-opacity hover:opacity-90";
      case "scale":
        return "transition-transform hover:scale-[1.02]";
      default:
        return "transition-all hover:shadow-md";
    }
  };

  const colorClasses = getColorClass();
  const animationClass = getAnimationClass();

  return (
    <Card 
      className={`${colorClasses.bg} backdrop-blur-sm ${colorClasses.border} ${animationClass} cursor-pointer`} 
      onClick={onClick}
    >
      <CardContent className="pt-6 px-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${colorClasses.icon}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
        
        {trendValue && (
          <div className="flex items-center mt-2">
            {trend === "up" && <TrendingUp className="h-3 w-3 text-green-600 mr-1" />}
            {trend === "down" && <TrendingDown className="h-3 w-3 text-red-600 mr-1" />}
            {trend === "neutral" && <Minus className="h-3 w-3 text-gray-500 mr-1" />}
            <span className={`text-xs font-medium ${colorClasses.trend[trend]}`}>
              {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
