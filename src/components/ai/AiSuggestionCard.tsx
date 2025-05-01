
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AiSuggestionCardProps {
  title: string;
  description: string;
  actionText: string;
  onAction?: () => void;
}

export const AiSuggestionCard: React.FC<AiSuggestionCardProps> = ({
  title,
  description,
  actionText,
  onAction = () => {}
}) => {
  return (
    <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
      <CardContent className="p-3">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
        <div className="flex justify-end mt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-7 text-xs px-2 bg-white text-blue-600 hover:bg-blue-50"
            onClick={onAction}
          >
            {actionText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
