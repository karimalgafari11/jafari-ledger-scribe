
import React from 'react';
import { useErrorContext } from '@/contexts/ErrorContext';
import { ErrorsList } from '@/components/ui/error-display/ErrorsList';

interface GlobalErrorDisplayProps {
  maxErrors?: number;
}

export function GlobalErrorDisplay({ maxErrors = 3 }: GlobalErrorDisplayProps) {
  const { errors, clearError, clearErrors } = useErrorContext();

  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[400px] max-w-[calc(100vw-2rem)]">
      <ErrorsList
        errors={errors}
        onDismiss={clearError}
        onClearAll={clearErrors}
        variant="compact"
        maxErrors={maxErrors}
        className="animate-in slide-in-from-right"
      />
    </div>
  );
}
