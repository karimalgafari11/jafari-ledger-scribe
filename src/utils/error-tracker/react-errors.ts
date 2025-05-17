
/**
 * التعامل مع أخطاء React
 */

import { trackError } from './core';
import { SESSION_ID } from './core';

// تتبع أخطاء عرض React
let lastRenderError = '';
let renderErrorCount = 0;

/**
 * تتبع أخطاء عرض React
 */
export const trackRenderError = (error: Error, componentStack: string) => {
  // If it's the same error repeatedly, increment counter rather than logging multiple times
  if (error.message === lastRenderError) {
    renderErrorCount++;
    if (renderErrorCount > 3) return; // Limit logging of the same error
  } else {
    lastRenderError = error.message;
    renderErrorCount = 1;
  }
  
  trackError(error, {
    component: 'react-render',
    additionalInfo: { 
      componentStack,
      sessionId: SESSION_ID,
      renderErrorCount
    },
    severity: 'critical'
  });
};
