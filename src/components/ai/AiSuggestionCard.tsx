
import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface AiSuggestionCardProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: ReactNode;
  // Add the missing props
  confidence?: number;
  impact?: string;
  impactValue?: number;
  type?: string;
  onAccept?: () => void;
  onDismiss?: () => void;
  onViewDetails?: () => void;
}

export const AiSuggestionCard: React.FC<AiSuggestionCardProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon,
  confidence,
  impact,
  impactValue,
  type,
  onAccept,
  onDismiss,
  onViewDetails
}) => {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-blue-100 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {icon && <div className="mt-1 shrink-0">{icon}</div>}
          <div className="flex-1">
            <h3 className="font-medium text-blue-900 mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            
            {/* Show confidence and impact if available */}
            {confidence && (
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-muted-foreground">الثقة</span>
                  <span className="text-xs font-medium">{confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-blue-600 h-1.5 rounded-full" 
                    style={{ width: `${Math.min(confidence, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            {impact && impactValue && (
              <div className="mb-3 text-xs">
                <span className="text-muted-foreground">التأثير: </span>
                <span className={`font-medium ${impact === "مرتفع" ? "text-green-600" : impact === "متوسط" ? "text-amber-600" : "text-blue-600"}`}>
                  {impact} ({impactValue.toLocaleString()} ر.س)
                </span>
              </div>
            )}
            
            <div className="flex gap-2">
              {onAccept && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-green-600 border-green-200 hover:bg-green-50"
                  onClick={onAccept}
                >
                  قبول
                </Button>
              )}
              
              {onDismiss && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={onDismiss}
                >
                  تجاهل
                </Button>
              )}
              
              {onViewDetails && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={onViewDetails}
                >
                  التفاصيل
                </Button>
              )}
              
              {actionText && onAction && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-blue-600 border-blue-200 hover:bg-blue-50"
                  onClick={onAction}
                >
                  {actionText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
