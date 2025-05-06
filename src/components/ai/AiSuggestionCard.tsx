
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface AiSuggestionCardProps {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void;
  icon?: ReactNode; // Added icon prop
}

export const AiSuggestionCard: React.FC<AiSuggestionCardProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon
}) => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-blue-100 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {icon && <div className="mt-1 shrink-0">{icon}</div>}
          <div className="flex-1">
            <h3 className="font-medium text-blue-900 mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
              onClick={onAction}
            >
              {actionText}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
