
import React from "react";
import { Card } from "@/components/ui/card";

export interface QuickActionCardProps {
  title: string;
  description: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  onClick,
  icon
}) => {
  return (
    <Card 
      className="p-3 border rounded-lg bg-white hover:bg-indigo-50/80 cursor-pointer transition-all transform duration-200 hover:shadow-sm"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="bg-indigo-100 p-2 rounded-md flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <div className="font-medium text-blue-900">{title}</div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </Card>
  );
};
