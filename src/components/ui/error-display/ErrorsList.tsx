
import React from 'react';
import { ErrorDisplay } from './ErrorDisplay';
import { ErrorDetails } from '@/hooks/useErrorHandler';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ErrorsListProps {
  errors: ErrorDetails[];
  onDismiss?: (error: ErrorDetails) => void;
  onClearAll?: () => void;
  className?: string;
  variant?: 'default' | 'compact' | 'inline';
  maxErrors?: number;
}

export function ErrorsList({
  errors,
  onDismiss,
  onClearAll,
  className,
  variant = 'default',
  maxErrors = 3
}: ErrorsListProps) {
  if (errors.length === 0) {
    return null;
  }

  const sortedErrors = [...errors].sort((a, b) => {
    // ترتيب الأخطاء حسب الشدة ثم حسب الوقت
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    const aSeverity = a.severity || 'medium';
    const bSeverity = b.severity || 'medium';

    if (severityOrder[aSeverity as keyof typeof severityOrder] !== severityOrder[bSeverity as keyof typeof severityOrder]) {
      return severityOrder[aSeverity as keyof typeof severityOrder] - severityOrder[bSeverity as keyof typeof severityOrder];
    }

    // إذا كانت الشدة متساوية، رتب حسب الوقت (الأحدث أولاً)
    const aTime = a.timestamp?.getTime() || 0;
    const bTime = b.timestamp?.getTime() || 0;
    return bTime - aTime;
  });

  const displayErrors = sortedErrors.slice(0, maxErrors);
  const hiddenErrors = sortedErrors.length - maxErrors;

  return (
    <div className={`space-y-3 ${className}`}>
      {displayErrors.map((error, index) => (
        <ErrorDisplay
          key={`${error.message}-${error.timestamp?.getTime() || index}`}
          error={error}
          onDismiss={onDismiss ? () => onDismiss(error) : undefined}
          variant={variant}
        />
      ))}
      
      {hiddenErrors > 0 && (
        <div className="text-sm text-muted-foreground px-1">
          + {hiddenErrors} أخطاء أخرى...
        </div>
      )}
      
      {onClearAll && errors.length > 1 && (
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearAll}
            className="text-xs gap-1"
          >
            <X className="h-3 w-3" />
            مسح كل الأخطاء
          </Button>
        </div>
      )}
    </div>
  );
}
