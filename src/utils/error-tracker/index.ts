
/**
 * نظام متكامل لتتبع وإدارة الأخطاء في التطبيق
 */

// استيراد الوحدات المختلفة
import { ErrorLogEntry, ErrorTrackingOptions } from './types';
import { trackError, getErrorLog, clearErrorLog, getErrorStats } from './core';
import { trackRenderError } from './react-errors';
import { detectStabilityIssues } from './stability-monitor';
import { trackPagePerformance, monitorMemoryUsage, setupPerformanceMonitoring } from './performance-monitor';
import { setupBrowserMonitors } from './browser-monitors';
import { setupNetworkMonitoring } from './network-monitor';
import { setupStabilityMonitoring } from './stability-monitor';

// تصدير الأنواع
export { ErrorLogEntry, ErrorTrackingOptions } from './types';

// واجهة برمجية مبسطة للاستخدام السريع
export const ErrorTracker = {
  error: (message: string, options?: { component?: string; additionalInfo?: any; severity?: 'critical' | 'error' | 'warning' | 'info' }) => 
    trackError(message, { ...options, severity: options?.severity || 'error' }),
  warning: (message: string, options?: { component?: string; additionalInfo?: any; severity?: 'critical' | 'error' | 'warning' | 'info' }) => 
    trackError(message, { ...options, severity: options?.severity || 'warning' }),
  info: (message: string, options?: { component?: string; additionalInfo?: any; severity?: 'critical' | 'error' | 'warning' | 'info' }) => 
    trackError(message, { ...options, severity: options?.severity || 'info' }),
  critical: (message: string, options?: { component?: string; additionalInfo?: any; severity?: 'critical' | 'error' | 'warning' | 'info' }) => 
    trackError(message, { ...options, severity: options?.severity || 'critical' }),
  renderError: trackRenderError,
  getLog: getErrorLog,
  getStats: getErrorStats,
  clear: clearErrorLog,
  detectStabilityIssues: detectStabilityIssues
};

// تصدير وظائف إضافية
export { 
  trackError, 
  getErrorLog, 
  clearErrorLog, 
  getErrorStats,
  detectStabilityIssues, 
  trackRenderError,
  trackPagePerformance,
  monitorMemoryUsage,
  setupPerformanceMonitoring,
  setupBrowserMonitors,
  setupNetworkMonitoring,
  setupStabilityMonitoring
};

// تصدير إضافي لتسهيل استخدام المكتبة
export default ErrorTracker;
