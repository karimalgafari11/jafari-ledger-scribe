
import React from "react";
import { AlertTriangle, XCircle, Info, AlertOctagon, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ErrorDetails, ErrorSeverity } from "@/hooks/useErrorHandler";
import { cn } from "@/lib/utils";

interface ErrorDisplayProps {
  error: ErrorDetails;
  onDismiss?: () => void;
  className?: string;
  showIcon?: boolean;
  variant?: 'default' | 'compact' | 'inline';
}

export function ErrorDisplay({ 
  error, 
  onDismiss, 
  className,
  showIcon = true,
  variant = 'default'
}: ErrorDisplayProps) {
  const severity = error.severity || 'medium';
  
  const getIcon = () => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-5 w-5 text-destructive" />;
      case 'high':
        return <AlertOctagon className="h-5 w-5 text-destructive" />;
      case 'medium':
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case 'low':
      default:
        return <Info className="h-5 w-5 text-info" />;
    }
  };
  
  const getBgColor = () => {
    switch (severity) {
      case 'critical':
        return 'bg-destructive/10 border-destructive/30';
      case 'high':
        return 'bg-destructive/5 border-destructive/20';
      case 'medium':
        return 'bg-warning/10 border-warning/30';
      case 'low':
      default:
        return 'bg-info/10 border-info/30';
    }
  };
  
  if (variant === 'inline') {
    return (
      <div className={cn(
        "flex items-center gap-2 px-3 py-1.5 text-sm rounded-md", 
        getBgColor(),
        className
      )}>
        {showIcon && getIcon()}
        <span>{error.message}</span>
        {onDismiss && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 ml-auto" 
            onClick={onDismiss}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }
  
  if (variant === 'compact') {
    return (
      <div className={cn(
        "flex items-center gap-2 p-3 rounded-md border", 
        getBgColor(),
        className
      )}>
        {showIcon && getIcon()}
        <div className="flex-1">
          <p className="font-medium">{error.message}</p>
          {error.code && <p className="text-xs opacity-70">رمز الخطأ: {error.code}</p>}
        </div>
        {onDismiss && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7" 
            onClick={onDismiss}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
  
  return (
    <Card className={cn("border", getBgColor(), className)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {showIcon && <div className="mt-0.5">{getIcon()}</div>}
          <div className="flex-1">
            <h4 className="text-base font-medium mb-1">{error.message}</h4>
            {error.code && (
              <p className="text-sm text-muted-foreground mb-1">رمز الخطأ: {error.code}</p>
            )}
            {error.source && (
              <p className="text-sm text-muted-foreground mb-1">المصدر: {error.source}</p>
            )}
            {error.timestamp && (
              <p className="text-xs text-muted-foreground">
                {error.timestamp.toLocaleString('ar-SA')}
              </p>
            )}
          </div>
          {onDismiss && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={onDismiss}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
