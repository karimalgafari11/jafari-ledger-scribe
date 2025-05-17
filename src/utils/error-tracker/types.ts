
/**
 * أنواع البيانات المستخدمة في نظام تتبع الأخطاء
 */

// نوع خاص بسجل الخطأ
export interface ErrorLogEntry {
  timestamp: Date;
  message: string;
  stack?: string;
  component?: string;
  additionalInfo?: any;
  severity: 'critical' | 'error' | 'warning' | 'info';
  instanceId?: string; // معرف فريد للخطأ - لتجنب التكرار
}

// أنواع خيارات تتبع الخطأ
export interface ErrorTrackingOptions {
  component?: string;
  additionalInfo?: any;
  severity?: 'critical' | 'error' | 'warning' | 'info';
}
