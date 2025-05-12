
import { useState, useCallback } from 'react';
import { useUserActivity } from './useUserActivity';
import { toast } from 'sonner';
import { ActivityAction } from '@/types/permissions';

export type LogLevel = 'info' | 'warning' | 'error' | 'success' | 'debug';

export interface ActivityLogEntry {
  message: string;
  level: LogLevel;
  module: string;
  action: string;
  userId?: string;
  timestamp: Date;
  details?: Record<string, any>;
}

interface ActivityLoggerOptions {
  moduleName: string;
  userId?: string;
  showToasts?: boolean;
  persistToDatabase?: boolean;
  consoleOutput?: boolean;
}

export function useActivityLogger(options: ActivityLoggerOptions) {
  const [logs, setLogs] = useState<ActivityLogEntry[]>([]);
  const { logActivity } = useUserActivity();

  const createLog = useCallback((
    level: LogLevel,
    action: string,
    message: string,
    details?: Record<string, any>
  ) => {
    const logEntry: ActivityLogEntry = {
      message,
      level,
      module: options.moduleName,
      action,
      userId: options.userId,
      timestamp: new Date(),
      details
    };

    // إضافة السجل إلى الحالة المحلية
    setLogs(prev => [logEntry, ...prev]);

    // عرض إشعار Toast إذا كان مطلوباً
    if (options.showToasts) {
      switch (level) {
        case 'info':
          toast.info(message);
          break;
        case 'warning':
          toast.warning(message);
          break;
        case 'error':
          toast.error(message);
          break;
        case 'success':
          toast.success(message);
          break;
        default:
          // لا تعرض toast للمستوى debug
          break;
      }
    }

    // تسجيل في وحدة التحكم إذا كان مطلوباً
    if (options.consoleOutput) {
      const consoleMethod = {
        info: console.info,
        warning: console.warn,
        error: console.error,
        success: console.log,
        debug: console.debug
      }[level];

      consoleMethod(`[${options.moduleName}] [${action}] ${message}`, details || '');
    }

    // حفظ في قاعدة البيانات إذا كان مطلوباً
    if (options.persistToDatabase) {
      try {
        // تحويل النص إلى ActivityAction قبل تمريره إلى logActivity
        const activityAction = action as ActivityAction;
        
        // إضافة معرف المستخدم واسم المستخدم المطلوبين
        logActivity({
          action: activityAction,
          module: options.moduleName,
          details: message,
          status: level === 'error' ? 'failed' : level === 'warning' ? 'warning' : 'success',
          userId: options.userId || 'unknown-user', // إضافة معرف المستخدم
          username: options.userId || 'unknown-user' // إضافة اسم المستخدم
        });
      } catch (error) {
        console.error('فشل تسجيل النشاط في قاعدة البيانات:', error);
      }
    }

    return logEntry;
  }, [options.moduleName, options.userId, options.showToasts, options.consoleOutput, options.persistToDatabase, logActivity]);

  const info = useCallback((action: string, message: string, details?: Record<string, any>) => 
    createLog('info', action, message, details), [createLog]);
  
  const warn = useCallback((action: string, message: string, details?: Record<string, any>) => 
    createLog('warning', action, message, details), [createLog]);
  
  const error = useCallback((action: string, message: string, details?: Record<string, any>) => 
    createLog('error', action, message, details), [createLog]);
  
  const success = useCallback((action: string, message: string, details?: Record<string, any>) => 
    createLog('success', action, message, details), [createLog]);
  
  const debug = useCallback((action: string, message: string, details?: Record<string, any>) => 
    createLog('debug', action, message, details), [createLog]);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  return {
    logs,
    info,
    warn,
    error,
    success,
    debug,
    clearLogs
  };
}
