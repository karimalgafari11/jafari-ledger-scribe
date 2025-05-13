// Simple error tracking utility to help debug application issues

let errorLog: Array<{
  timestamp: Date;
  message: string;
  stack?: string;
  additionalInfo?: any;
}> = [];

export const trackError = (error: Error | string, additionalInfo?: any) => {
  const errorObj = {
    timestamp: new Date(),
    message: typeof error === 'string' ? error : error.message,
    stack: typeof error !== 'string' ? error.stack : undefined,
    additionalInfo
  };
  
  errorLog.push(errorObj);
  
  // Log to console
  console.error('Application error tracked:', errorObj);
  
  // Keep only the latest 50 errors
  if (errorLog.length > 50) {
    errorLog = errorLog.slice(-50);
  }
  
  return errorObj;
};

export const getErrorLog = () => {
  return [...errorLog];
};

export const clearErrorLog = () => {
  errorLog = [];
};

// Global error handler to catch unhandled errors
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    trackError(event.error || event.message, {
      source: event.filename,
      lineNumber: event.lineno,
      columnNumber: event.colno
    });
  });
}
