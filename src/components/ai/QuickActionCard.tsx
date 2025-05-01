
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  colorClass?: string;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({ 
  title, 
  description, 
  icon: Icon,
  colorClass = "bg-blue-100 text-blue-600" 
}) => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-blue-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer group">
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-blue-400 to-indigo-600"></div>
      <CardContent className="p-4">
        <div className="flex items-start space-x-4 space-x-reverse">
          <div className={`rounded-xl p-2.5 ${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors">
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
