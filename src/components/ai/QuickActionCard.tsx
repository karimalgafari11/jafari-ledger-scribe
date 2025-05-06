
import React from "react";

export interface QuickActionCardProps {
  title: string;
  description: string;
  onClick?: () => void; // Added onClick prop
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  description,
  onClick
}) => {
  return (
    <div 
      className="p-3 border rounded-lg mb-2 bg-card hover:bg-accent/5 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <div className="font-medium text-blue-900">{title}</div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
};
